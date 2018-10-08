package gov.epa.stormwater.service;

import gov.epa.stormwater.model.bls.BlsCenterModel;
import gov.epa.stormwater.model.hms.HmsPostModel;
import gov.epa.stormwater.service.common.SWCException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("hmsService")
public class HmsServiceImpl implements HmsService{

       private static Logger logger = LoggerFactory
                .getLogger(gov.epa.stormwater.service.HmsServiceImpl.class);

       public boolean getHMSData( String startYear, String endYear) throws SWCException {

           String URL = "https://qedinternal.epa.gov/hms/rest/api/hydrology/precipitation";
           HmsPostModel hmsPost = new HmsPostModel();
           //set fields from mock service

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
        }*
