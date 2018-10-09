package gov.epa.stormwater.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import gov.epa.stormwater.model.hms.*;
import gov.epa.stormwater.service.common.SWCException;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.ListUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("hmsService")
public class HmsServiceImpl implements HmsService {

    private static Logger logger = LoggerFactory
            .getLogger(gov.epa.stormwater.service.HmsServiceImpl.class);

    @Override
    public boolean getHMSData(String filePath, String stationId, String startYear, String endYear) throws SWCException {

        try {
//               String URL = "https://qedinternal.epa.gov/hms/rest/api/hydrology/precipitation";
            String URL = "http://demo3101821.mockable.io/hms/rest/api/hydrology/precipitation";

            HmsPostModel hmsPost = new HmsPostModel();
            hmsPost.setSource("nldas");

            HmsDateTimeSpan dateTimeSpan = new HmsDateTimeSpan();
            dateTimeSpan.setStartDate("2015-01-01T00:00:00");
            dateTimeSpan.setEndDate("2015-01-08T00:00:00");
            dateTimeSpan.setDateTimeFormat("yyyy-MM-dd HH");
            hmsPost.setDateTimeSpan(dateTimeSpan);

            HmsGeometry geometry = new HmsGeometry();
            geometry.setDescription("EPA Athens Office");
            geometry.setComID(0L);
            geometry.setHucID(0L);
            HmsGeometryPoint point = new HmsGeometryPoint();
            point.setLatitude(33.925673);
            point.setLongitude(-83.355723);
            geometry.setPoint(point);
            HmsGeometryMetadata geometryMetadata = new HmsGeometryMetadata();
            geometryMetadata.setCity("Athens");
            geometryMetadata.setState("Georgia");
            geometryMetadata.setCountry("United States");
            geometry.setGeometryMetadata(geometryMetadata);
            HmsGeometryTimezone timezone = new HmsGeometryTimezone();
            timezone.setName("EST");
            timezone.setOffset(-5);
            timezone.setDls(false);
            geometry.setTimezone(timezone);
            hmsPost.setGeometry(geometry);

            hmsPost.setDataValueFormat("E3");
            hmsPost.setTemporalResolution("default");
            hmsPost.setTimeLocalized(true);
            hmsPost.setUnits("default");
            hmsPost.setOutputFormat("json");

            ObjectMapper mapper = new ObjectMapper();
            String jsonString = mapper.writeValueAsString(hmsPost);
            logger.info("jsonString: " + jsonString);

            ClientConfig config = new DefaultClientConfig();
            Client client = Client.create(config);
            WebResource service = client.resource(URL);

            ClientResponse response = service.type("application/json")
                    .post(ClientResponse.class, jsonString);

            if (response.getStatus() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + response.getStatus());
            }
            HmsResponseModel hmsResponse = response.getEntity(HmsResponseModel.class);
            logger.info("hmsResponse: " + hmsResponse);

            if(hmsResponse != null && MapUtils.isNotEmpty(hmsResponse.getData())) {
                StringBuilder sb = new StringBuilder();
                for (Map.Entry<String, List<String>> dataEntry : hmsResponse.getData().entrySet()) {
                    if(StringUtils.isBlank(dataEntry.getKey())
                            || CollectionUtils.isEmpty(dataEntry.getValue())) {
                        continue;
                    }

                    Date date = new SimpleDateFormat("yyyy-MM-dd HH").parse(dataEntry.getKey());
                    String newDateFormat = new SimpleDateFormat("yyyy  M  d  H  m").format(date);

                    sb.append(String.format("%-17s", stationId));
                    sb.append(String.format("%-21s", newDateFormat));
                    sb.append(String.format("%-10s", dataEntry.getValue().get(0)));
                    sb.append("\n");
                }
                FileUtils.writeStringToFile(new File(filePath), sb.toString());
                logger.info("Generated new hms data file: " + filePath);
            }
        } catch (ParseException | IOException e) {
            logger.error(e.getMessage(), e);
            throw new SWCException("HMS error: " + e.getMessage());
        }

        return true;
    }
}


// REQUST
     /*   "source": "nldas",
        "dateTimeSpan": {
        "startDate": "2015-01-01T00:00:00",
        "endDate": "2015-01-08T00:00:00",
        "dateTimeFormat": "yyyy-MM-dd HH"
        },
        "geometry": {
        "description": "EPA Athens Office",
        "comID": 0,
        "hucID": 0,
        "point": {
        "latitude": 33.925673,
        "longitude": -83.355723
        },
        "geometryMetadata": {
        "City": "Athens",
        "State": "Georgia",
        "Country": "United States"
        },
        "timezone": {
        "name": "EST",
        "offset": -5,
        "dls": false
        }
        },
        "dataValueFormat": "E3",
        "temporalResolution": "default",
        "timeLocalized": true,
        "units": "default",
        "outputFormat": "json"
        }*/
