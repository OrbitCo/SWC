//package gov.epa.stormwater.service;
//
//import gov.epa.stormwater.model.bls.BlsResponseModel;
//import gov.epa.stormwater.model.bls.SeriesPostModel;
//import gov.epa.stormwater.service.common.SWCException;
//import junit.framework.TestCase;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.ArrayList;
//
//
//
//
//
//@RunWith(SpringJUnit4ClassRunner.class)
//public class CostRegionalizationCacheServiceImplTest {
//
//
//    CostRegionalizationCacheServiceImpl cacheService = new CostRegionalizationCacheServiceImpl();
//
//    private static final String REGISTRATION_KEY = "qwqwqwqwqwqwqwqwq1111";
//
//    @Before
//    public void onInit(){
//
//        System.setProperty("SWCALCULATOR_HOME","/home/ad/test");
//        System.out.println("test before... get env: key SWCALCULATOR_HOME >>> ");System.getenv("SWCALCULATOR_HOME");
//    }
//
//    @Test
//    public void testGetFromCache() {
//        System.out.println("testGetFromCache");
//    }
//
////    @Test
////    public void testPutToCache() throws SWCException {
////        System.out.println("testPutToCache");
////
////    cacheService.postConstruct();
////
////
////        ArrayList<String> seriesIDs = new ArrayList<>();
////        seriesIDs.add("000003");
////        seriesIDs.add("000001");
////        seriesIDs.add("000002");
////
////        SeriesPostModel seriesPost = new SeriesPostModel();
////        seriesPost.setSeriesid(seriesIDs);
////        seriesPost.setStartyear("2017");
////        seriesPost.setEndyear("2018");
////        seriesPost.setCatalog(Boolean.FALSE);
////        seriesPost.setCalculations(Boolean.FALSE);
////        seriesPost.setAnnualaverage(Boolean.TRUE);
////        seriesPost.setRegistrationKey(REGISTRATION_KEY);
////
////
////        BlsResponseModel response = new BlsResponseModel();
////        response.setStatus("REQUEST_SUCCEEDED");
////        response.setResponseTime("123");
////
////        cacheService.putToCache(seriesPost,response);
////        cacheService.putToCache(seriesPost,response);
////
////        seriesIDs.add("00005");
////        seriesPost.setSeriesid(seriesIDs);
////        seriesPost.setStartyear("2016");
////        seriesPost.setEndyear("2017");
////
////
////        response.setStatus("REQUEST_SUCCEEDED");
////        response.setResponseTime("1234");
////
////        cacheService.putToCache(seriesPost,response);
////
////
////
////        BlsResponseModel model = cacheService.getFromCache(seriesPost);
////
////        System.out.println("model = " + model.toString());
////
////
////    }
//}