package gov.epa.stormwater.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import gov.epa.stormwater.model.bls.BlsCacheModel;
import gov.epa.stormwater.model.bls.BlsResponseModel;
import gov.epa.stormwater.model.bls.SeriesPostModel;
import gov.epa.stormwater.service.common.SWCException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

// new
@Service("costRegionalizationCacheService")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class CostRegionalizationCacheServiceImpl implements CostRegionalizationCacheService {
    private static Logger logger = LoggerFactory.getLogger(CostRegionalizationCacheServiceImpl.class);

    // TODO:  check file name and path

    private String PERSISTENT_CACHE_FILENAME = "costRegionalizationCache.txt";
    private static final int MEMORY_CACHE_SIZE = 1024; // elements
    private static final int MEMORY_CACHE_EXPIRE_AFTER_WRITE = 999999999; // ms
    private static final int MEMORY_CACHE_CONCURRENCY_LEVEL = 1;

    private CacheLoader<String, BlsCacheModel> loader;
    private LoadingCache<String, BlsCacheModel> cache;

    @PostConstruct
    public void onInit(){

        logger.debug("### PostConstruct Thread:"+Thread.currentThread().toString());


        logger.debug("### SWCALCULATOR_HOME = "+ System.getProperty("SWCALCULATOR_HOME"));
        PERSISTENT_CACHE_FILENAME = System.getProperty("SWCALCULATOR_HOME")+ "\\costData\\costRegionalizationCache.txt";

        logger.debug("CostRegionalizationCacheServiceImpl.postConstruct: initializing memory cache >>> " +
                "Thread: " + Thread.currentThread().toString() +
                "MEMORY_CACHE_SIZE = " + MEMORY_CACHE_SIZE + " elements " +
                "MEMORY_CACHE_EXPIRE_AFTER_WRITE = " + MEMORY_CACHE_EXPIRE_AFTER_WRITE + " ms  " +
                "MEMORY_CACHE_CONCURRENCY_LEVEL = " + MEMORY_CACHE_CONCURRENCY_LEVEL);
        logger.debug("PERSISTENT_CACHE_FILENAME = " + PERSISTENT_CACHE_FILENAME);



        loader = new CacheLoader<String, BlsCacheModel>() {
            @Override
            public BlsCacheModel load(String s) throws Exception {
                return null;
            }
        };

        cache = CacheBuilder.newBuilder()
                .concurrencyLevel(1)
                .maximumSize(MEMORY_CACHE_SIZE)
                .expireAfterWrite(MEMORY_CACHE_EXPIRE_AFTER_WRITE, TimeUnit.MILLISECONDS)
                .build(loader);

        logger.debug("### loader = " + loader);
        logger.debug("### cache = " + cache);
    }

    @Override
    public BlsResponseModel getFromCache(SeriesPostModel seriesPost) {
        logger.info("### Get From Memory Cache >>> cache size =  " +cache.size());
        String key = "";

        try {
            key = getCustomKey(seriesPost);

        } catch (SWCException e) {
            logger.debug("### CostRegionalizationCacheServiceImpl.getFromCache: " + e.getMessage());
            if(key == null || key.isEmpty()){
                logger.debug("### CostRegionalizationCacheServiceImpl.getFromCache: key empty !!!!");
                return null;
            }
        }

        BlsCacheModel model = null;
        try {
            logger.info("### get from memory cache");
            model = cache.get(key);
        } catch (Exception e) {
            logger.error("### CostRegionalizationCacheServiceImpl.getFromCache error getting element from memory cache: " + e.getMessage());
        }
        if (model != null)
            return model.getResponseModel();

        return getFromPersistentCache(key);
    }

    @Override
    public void putToCache(SeriesPostModel seriesPost, BlsResponseModel response) throws SWCException {
        logger.info("### Save To Memory Cache " );

        String key = "";

        try {
            key = getCustomKey(seriesPost);

            BlsCacheModel model = new BlsCacheModel(seriesPost, response, System.currentTimeMillis());
            cache.put(key, model);

        } catch (SWCException e) {
            logger.error("CostRegionalizationCacheServiceImpl.putToCache: request to Key serialization error >>> Error: " + e.getMessage());
            throw new SWCException("Error request to Key serialization error: " + e.toString());
        }


        // save to file
        if (getFromPersistentCache(key) != null)
            logger.info("Object already exist in the persist cache!");
        else {
            BlsCacheModel model = new BlsCacheModel(seriesPost, response, System.currentTimeMillis());
            saveToPersistentCache(model);
        }
    }


    synchronized private void saveToPersistentCache(BlsCacheModel blsCacheModel) {

        logger.info("### SaveToPersistentCache >>> "+ PERSISTENT_CACHE_FILENAME);
        String data = null;
        BufferedWriter bw = null;
        FileWriter fw = null;

        try {
            data = cacheModelToJson(blsCacheModel) + "\r\n";
            File file = new File(PERSISTENT_CACHE_FILENAME);

            // if file doesnt exists, then create it
            if (!file.exists()) {
                file.createNewFile();
            }

            // true = append file
            fw = new FileWriter(file.getAbsoluteFile(), true);
            bw = new BufferedWriter(fw);

            bw.write(data);

        } catch (SWCException e) {
            logger.error("CostRegionalizationCacheServiceImpl.saveToPersistentCache Error: " + e.getMessage());
        } catch (IOException e) {
            logger.error("CostRegionalizationCacheServiceImpl.saveToPersistentCache Error: " + e.getMessage());
        } finally {

            try {

                if (bw != null)
                    bw.close();

                if (fw != null)
                    fw.close();

            } catch (IOException ex) {
                logger.error("CostRegionalizationCacheServiceImpl.saveToPersistentCache Error: " + ex.getMessage());

            }
        }
    }

    synchronized private BlsResponseModel getFromPersistentCache(String key) {
        BlsCacheModel model = null;
        boolean finded = false;

        // Open the file
        FileInputStream fstream = null;
        try {
            fstream = new FileInputStream(PERSISTENT_CACHE_FILENAME);

            BufferedReader br = new BufferedReader(new InputStreamReader(fstream));

            String strLine;

            //Read File Line By Line
            while ((strLine = br.readLine()) != null) {
                try {
                    model = jsonToCacheModel(strLine);
                    if (getCustomKey(model.getRequestModel()).equalsIgnoreCase(key)) {
                        logger.info("data loaded from the persistent cache");
                        finded = true;
                        break;
                    }
                } catch (SWCException e) {
                    logger.error("CostRegionalizationCacheServiceImpl.getFromPersistentCache error parsing string from file: " + e.getMessage());
                }

            }

            //Close the input stream
            br.close();
        } catch (FileNotFoundException e) {
            logger.error("CostRegionalizationCacheServiceImpl.getFromPersistentCache error:" + e.getMessage());
        } catch (IOException e) {
            logger.error("CostRegionalizationCacheServiceImpl.getFromPersistentCache error:" + e.getMessage());
        } finally {
            try {
                if (fstream != null)
                    fstream.close();
            } catch (IOException e) {
                logger.error("CostRegionalizationCacheServiceImpl.getFromPersistentCache error:" + e.getMessage());

            }
        }

        if (finded)
            return model.getResponseModel();
        else
            return null;

    }


    private String getCustomKey(SeriesPostModel seriesPost) throws SWCException {

        Collections.sort(seriesPost.getSeriesid());

        ObjectMapper mapper = new ObjectMapper();
        //Object to JSON in String
        String jsonString;
        try {
            jsonString = mapper.writeValueAsString(seriesPost);
        } catch (JsonProcessingException e) {
            logger.error("CostRegionalizationCacheServiceImpl.getCustomKey: seriesPost = [" + seriesPost.toString() + "] >>> Error: " + e.getMessage());
            throw new SWCException("Error parsing BLS Request: " + e.toString());
        }

        return jsonString;
    }

    private String cacheModelToJson(BlsCacheModel model) throws SWCException {
        ObjectMapper mapper = new ObjectMapper();
        //Object to JSON in String
        String jsonString;
        try {
            jsonString = mapper.writeValueAsString(model);
        } catch (JsonProcessingException e) {
            logger.error("CostRegionalizationCacheServiceImpl.cacheModelToJson >>> Error: " + e.getMessage());
            throw new SWCException("CostRegionalizationCacheServiceImpl.cacheModelToJson >>> Error: " + e.getMessage());
        }

        return jsonString;
    }

    private BlsCacheModel jsonToCacheModel(String jsonString) throws SWCException {
        BlsCacheModel model = null;

        ObjectMapper mapper = new ObjectMapper();

        //JSON from String to Object
        try {
            model = mapper.readValue(jsonString, BlsCacheModel.class);
        } catch (IOException e) {
            logger.error("CostRegionalizationCacheServiceImpl.jsonToCacheModel  error:" + e.getMessage());
            throw new SWCException("CostRegionalizationCacheServiceImpl.jsonToCacheModel  error:" + e.getMessage());
        }
        return model;
    }


}
