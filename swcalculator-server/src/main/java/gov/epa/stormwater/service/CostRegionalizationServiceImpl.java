/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import gov.epa.stormwater.model.bls.BlsCenterModel;
import gov.epa.stormwater.model.bls.SeriesModel;
import gov.epa.stormwater.model.bls.SeriesPostModel;
import gov.epa.stormwater.model.bls.BlsResponseModel;
import gov.epa.stormwater.model.bls.DataModel;

import gov.epa.stormwater.service.common.SWCException;

import java.io.IOException;

import static java.lang.Math.ceil;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author UYEN.TRAN
 */
@Service("costRegionalizationService")
public class CostRegionalizationServiceImpl implements CostRegionalizationService {

    private static Logger logger = LoggerFactory
            .getLogger(CostRegionalizationServiceImpl.class);

    //minified regionalization json data
  //  public String jsonRegDefaults = "[{\"BLSSeriesID\":\"0000\",\"State\":\"NA\",\"blsCity\":\"NATIONAL\",\"regionalFactor\":1,\"latitude\":0,\"longitude\":0,\"GEOID\":-1,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUS0000SA0E\",\"blsFuelsUtilitiesID\":\"CUUS0000SAH2\",\"regModel2014Index\":205.3048894},{\"BLSSeriesID\":\"A427\",\"State\":\"AK\",\"blsCity\":\"Anchorage\",\"regionalFactor\":1,\"latitude\":61.167916,\"longitude\":-149.847166,\"GEOID\":2305,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA427SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA427SAH2\",\"regModel2014Index\":226.7835622},{\"BLSSeriesID\":\"A319\",\"State\":\"GA\",\"blsCity\":\"Atlanta\",\"regionalFactor\":1,\"latitude\":33.824102,\"longitude\":-84.331858,\"GEOID\":3817,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA319SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA319SAH2\",\"regModel2014Index\":229.417366},{\"BLSSeriesID\":\"A103\",\"State\":\"MA\",\"blsCity\":\"Boston\",\"regionalFactor\":1,\"latitude\":42.373132,\"longitude\":-71.140708,\"GEOID\":9271,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA103SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA103SAH2\",\"regModel2014Index\":216.5301231},{\"BLSSeriesID\":\"A207\",\"State\":\"IL\",\"blsCity\":\"Chicago\",\"regionalFactor\":1,\"latitude\":41.827126,\"longitude\":-87.895427,\"GEOID\":16264,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA207SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA207SAH2\",\"regModel2014Index\":193.9052141},{\"BLSSeriesID\":\"A213\",\"State\":\"OH\",\"blsCity\":\"Cincinnati\",\"regionalFactor\":1,\"latitude\":39.185505,\"longitude\":-84.462043,\"GEOID\":16885,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA213SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA213SAH2\",\"regModel2014Index\":200.9823586},{\"BLSSeriesID\":\"A210\",\"State\":\"OH\",\"blsCity\":\"Cleveland\",\"regionalFactor\":1,\"latitude\":41.443638,\"longitude\":-81.605443,\"GEOID\":17668,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA210SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA210SAH2\",\"regModel2014Index\":191.0175351},{\"BLSSeriesID\":\"A316\",\"State\":\"TX\",\"blsCity\":\"Dallas\",\"regionalFactor\":1,\"latitude\":36.060538,\"longitude\":-102.515287,\"GEOID\":21988,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA316SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA316SAH2\",\"regModel2014Index\":205.7769973},{\"BLSSeriesID\":\"A433\",\"State\":\"CO\",\"blsCity\":\"Denver\",\"regionalFactor\":1,\"latitude\":39.710774,\"longitude\":-104.955096,\"GEOID\":23527,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA433SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA433SAH2\",\"regModel2014Index\":201.125973},{\"BLSSeriesID\":\"A208\",\"State\":\"MI\",\"blsCity\":\"Detroit\",\"regionalFactor\":1,\"latitude\":42.489752,\"longitude\":-83.227211,\"GEOID\":23824,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA208SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA208SAH2\",\"regModel2014Index\":209.0531332},{\"BLSSeriesID\":\"A426\",\"State\":\"HI\",\"blsCity\":\"Honolulu\",\"regionalFactor\":1,\"latitude\":21.364556,\"longitude\":-157.939756,\"GEOID\":89770,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA426SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA426SAH2\",\"regModel2014Index\":269.3302901},{\"BLSSeriesID\":\"A318\",\"State\":\"TX\",\"blsCity\":\"Houston\",\"regionalFactor\":1,\"latitude\":29.784308,\"longitude\":-95.393531,\"GEOID\":40429,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA318SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA318SAH2\",\"regModel2014Index\":181.8025875},{\"BLSSeriesID\":\"A421\",\"State\":\"CA\",\"blsCity\":\"Los Angeles\",\"regionalFactor\":1,\"latitude\":33.982668,\"longitude\":-118.104332,\"GEOID\":51445,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA421SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA421SAH2\",\"regModel2014Index\":234.2691355},{\"BLSSeriesID\":\"A320\",\"State\":\"FL\",\"blsCity\":\"Miami\",\"regionalFactor\":1,\"latitude\":26.175616,\"longitude\":-80.231428,\"GEOID\":56602,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA320SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA320SAH2\",\"regModel2014Index\":180.237286},{\"BLSSeriesID\":\"A212\",\"State\":\"WI\",\"blsCity\":\"Milwaukee\",\"regionalFactor\":1,\"latitude\":43.055674,\"longitude\":-88.100524,\"GEOID\":57466,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA212SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA212SAH2\",\"regModel2014Index\":201.6221956},{\"BLSSeriesID\":\"A211\",\"State\":\"MN\",\"blsCity\":\"Minneapolis\",\"regionalFactor\":1,\"latitude\":44.978156,\"longitude\":-93.2798,\"GEOID\":57628,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA211SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA211SAH2\",\"regModel2014Index\":193.9197203},{\"BLSSeriesID\":\"A101\",\"State\":\"NY\",\"blsCity\":\"New York\",\"regionalFactor\":1,\"latitude\":40.718357,\"longitude\":-73.970221,\"GEOID\":63217,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA101SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA101SAH2\",\"regModel2014Index\":192.0815131},{\"BLSSeriesID\":\"A102\",\"State\":\"PA\",\"blsCity\":\"Philadelphia\",\"regionalFactor\":1,\"latitude\":39.973331,\"longitude\":-75.298163,\"GEOID\":69076,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA102SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA102SAH2\",\"regModel2014Index\":196.349605},{\"BLSSeriesID\":\"A104\",\"State\":\"PA\",\"blsCity\":\"Pittsburgh\",\"regionalFactor\":1,\"latitude\":40.456961,\"longitude\":-79.951005,\"GEOID\":69697,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA104SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA104SAH2\",\"regModel2014Index\":213.5812894},{\"BLSSeriesID\":\"A425\",\"State\":\"OR\",\"blsCity\":\"Portland\",\"regionalFactor\":1,\"latitude\":45.520404,\"longitude\":-122.651087,\"GEOID\":71317,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA425SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA425SAH2\",\"regModel2014Index\":216.1105637},{\"BLSSeriesID\":\"A424\",\"State\":\"CA\",\"blsCity\":\"San Diego\",\"regionalFactor\":1,\"latitude\":32.928728,\"longitude\":-117.128799,\"GEOID\":78661,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA424SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA424SAH2\",\"regModel2014Index\":222.5492038},{\"BLSSeriesID\":\"A422\",\"State\":\"CA\",\"blsCity\":\"San Francisco\",\"regionalFactor\":1,\"latitude\":37.690115,\"longitude\":-122.128498,\"GEOID\":78904,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA422SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA422SAH2\",\"regModel2014Index\":246.7701289},{\"BLSSeriesID\":\"A423\",\"State\":\"WA\",\"blsCity\":\"Seattle\",\"regionalFactor\":1,\"latitude\":47.468409,\"longitude\":-122.274661,\"GEOID\":80389,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA423SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA423SAH2\",\"regModel2014Index\":215.314024},{\"BLSSeriesID\":\"A311\",\"State\":\"DC\",\"blsCity\":\"Washington\",\"regionalFactor\":1,\"latitude\":38.897394,\"longitude\":-77.18974,\"GEOID\":92242,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSA311SA0E\",\"blsFuelsUtilitiesID\":\"CUUSA311SAH2\",\"regModel2014Index\":183.9537619}]";


  //  public String jsonRegDefaults = "[{\"BLSSeriesID\":\"0000\",\"State\":\"NA\",\"blsCity\":\"NATIONAL\",\"regionalFactor\":1.000,\"latitude\":0,\"longitude\":0,\"GEOID\":-1,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUS0000SA0E\",\"blsFuelsUtilitiesID\":\"CUUS0000SAH2\",\"regModel2014Index\":205.3048894,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49G\",\"State\":\"AK\",\"blsCity\":\"Anchorage\",\"regionalFactor\":1.000,\"latitude\":61.2181,\"longitude\":-149.9003,\"GEOID\":2305,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49GSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49GSAH2\",\"regModel2014Index\":226.7835622,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S35C\",\"State\":\"GA\",\"blsCity\":\"Atlanta\",\"regionalFactor\":1.000,\"latitude\":33.749,\"longitude\":-84.388,\"GEOID\":3817,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS35CSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS35CSAH2\",\"regModel2014Index\":229.417366,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.304932,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.283199},{\"BLSSeriesID\":\"S11A\",\"State\":\"MA\",\"blsCity\":\"Boston\",\"regionalFactor\":1.000,\"latitude\":42.3601,\"longitude\":-71.0589,\"GEOID\":9271,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS11ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS11ASAH2\",\"regModel2014Index\":216.5301231,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.4592194},{\"BLSSeriesID\":\"S23A\",\"State\":\"IL\",\"blsCity\":\"Chicago\",\"regionalFactor\":1.000,\"latitude\":41.8781,\"longitude\":-87.6298,\"GEOID\":16264,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS23ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS23ASAH2\",\"regModel2014Index\":193.9052141,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.396454,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.44202},{\"BLSSeriesID\":\"S37A\",\"State\":\"TX\",\"blsCity\":\"Dallas\",\"regionalFactor\":1.000,\"latitude\":32.7767,\"longitude\":-96.797,\"GEOID\":21988,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS37ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS37ASAH2\",\"regModel2014Index\":205.7769973,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.264,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.3392},{\"BLSSeriesID\":\"S48B\",\"State\":\"CO\",\"blsCity\":\"Denver\",\"regionalFactor\":1.000,\"latitude\":39.7392,\"longitude\":-104.9903,\"GEOID\":23527,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS48BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS48BSAH2\",\"regModel2014Index\":201.125973,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S23B\",\"State\":\"MI\",\"blsCity\":\"Detroit\",\"regionalFactor\":1.000,\"latitude\":42.3314,\"longitude\":-83.0458,\"GEOID\":23824,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS23BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS23BSAH2\",\"regModel2014Index\":209.0531332,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49F\",\"State\":\"HI\",\"blsCity\":\"Honolulu\",\"regionalFactor\":1.000,\"latitude\":21.3069,\"longitude\":-157.8583,\"GEOID\":89770,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49FSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49FSAH2\",\"regModel2014Index\":269.3302901,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S37B\",\"State\":\"TX\",\"blsCity\":\"Houston\",\"regionalFactor\":1.000,\"latitude\":29.7604,\"longitude\":-95.3698,\"GEOID\":40429,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS37BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS37BSAH2\",\"regModel2014Index\":181.8025875,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49A\",\"State\":\"CA\",\"blsCity\":\"Los Angeles\",\"regionalFactor\":1.000,\"latitude\":34.0522,\"longitude\":-118.2437,\"GEOID\":51445,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49ASAH2\",\"regModel2014Index\":234.2691355,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S35B\",\"State\":\"FL\",\"blsCity\":\"Miami\",\"regionalFactor\":1.000,\"latitude\":25.7617,\"longitude\":-80.1918,\"GEOID\":56602,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS35BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS35BSAH2\",\"regModel2014Index\":180.237286,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S24A\",\"State\":\"MN\",\"blsCity\":\"Minneapolis\",\"regionalFactor\":1.000,\"latitude\":44.9778,\"longitude\":-93.265,\"GEOID\":57628,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS24ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS24ASAH2\",\"regModel2014Index\":193.9197203,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.357176,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.421136472},{\"BLSSeriesID\":\"S12A\",\"State\":\"NY\",\"blsCity\":\"New York\",\"regionalFactor\":1.000,\"latitude\":40.7128,\"longitude\":-74.006,\"GEOID\":63217,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS12ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS12ASAH2\",\"regModel2014Index\":192.0815131,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.4395572,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.4831199},{\"BLSSeriesID\":\"S12B\",\"State\":\"PA\",\"blsCity\":\"Philadelphia\",\"regionalFactor\":1.000,\"latitude\":39.9526,\"longitude\":-75.1652,\"GEOID\":69076,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS12BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS12BSAH2\",\"regModel2014Index\":196.349605,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.40557176,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.462920184},{\"BLSSeriesID\":\"S49E\",\"State\":\"CA\",\"blsCity\":\"San Diego\",\"regionalFactor\":1.000,\"latitude\":32.7157,\"longitude\":-117.1611,\"GEOID\":78661,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49ESA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49ESAH2\",\"regModel2014Index\":222.5492038,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49B\",\"State\":\"CA\",\"blsCity\":\"San Francisco\",\"regionalFactor\":1.000,\"latitude\":37.7749,\"longitude\":-122.4194,\"GEOID\":78904,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49BSAH2\",\"regModel2014Index\":246.7701289,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49D\",\"State\":\"WA\",\"blsCity\":\"Seattle\",\"regionalFactor\":1.000,\"latitude\":47.6062,\"longitude\":-122.3321,\"GEOID\":80389,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49DSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49DSAH2\",\"regModel2014Index\":215.314024,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318}]";
  public String jsonRegDefaults = "[{\"BLSSeriesID\":\"0000\",\"State\":\"NA\",\"blsCity\":\"NATIONAL\",\"regionalFactor\":1.000,\"latitude\":0,\"longitude\":0,\"GEOID\":-1,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUS0000SA0E\",\"blsFuelsUtilitiesID\":\"CUUS0000SAH2\",\"regModel2014Index\":205.3047058,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49G\",\"State\":\"AK\",\"blsCity\":\"Anchorage\",\"regionalFactor\":1.000,\"latitude\":61.2181,\"longitude\":-149.9003,\"GEOID\":2305,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49GSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49GSAH2\",\"regModel2014Index\":226.7833648,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S35C\",\"State\":\"GA\",\"blsCity\":\"Atlanta\",\"regionalFactor\":1.000,\"latitude\":33.749,\"longitude\":-84.388,\"GEOID\":3817,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS35CSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS35CSAH2\",\"regModel2014Index\":190.5211554,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.304932,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.283199},{\"BLSSeriesID\":\"S11A\",\"State\":\"MA\",\"blsCity\":\"Boston\",\"regionalFactor\":1.000,\"latitude\":42.3601,\"longitude\":-71.0589,\"GEOID\":9271,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS11ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS11ASAH2\",\"regModel2014Index\":232.4378722,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.4592194},{\"BLSSeriesID\":\"S23A\",\"State\":\"IL\",\"blsCity\":\"Chicago\",\"regionalFactor\":1.000,\"latitude\":41.8781,\"longitude\":-87.6298,\"GEOID\":16264,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS23ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS23ASAH2\",\"regModel2014Index\":220.6711174,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.396454,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.44202},{\"BLSSeriesID\":\"S37A\",\"State\":\"TX\",\"blsCity\":\"Dallas\",\"regionalFactor\":1.000,\"latitude\":32.7767,\"longitude\":-96.797,\"GEOID\":21988,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS37ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS37ASAH2\",\"regModel2014Index\":176.7855053,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.264,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.3392},{\"BLSSeriesID\":\"S48B\",\"State\":\"CO\",\"blsCity\":\"Denver\",\"regionalFactor\":1.000,\"latitude\":39.7392,\"longitude\":-104.9903,\"GEOID\":23527,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS48BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS48BSAH2\",\"regModel2014Index\":201.12597979,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S23B\",\"State\":\"MI\",\"blsCity\":\"Detroit\",\"regionalFactor\":1.000,\"latitude\":42.3314,\"longitude\":-83.0458,\"GEOID\":23824,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS23BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS23BSAH2\",\"regModel2014Index\":209.0529495,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49F\",\"State\":\"HI\",\"blsCity\":\"Honolulu\",\"regionalFactor\":1.000,\"latitude\":21.3069,\"longitude\":-157.8583,\"GEOID\":89770,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49FSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49FSAH2\",\"regModel2014Index\":269.330088,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S37B\",\"State\":\"TX\",\"blsCity\":\"Houston\",\"regionalFactor\":1.000,\"latitude\":29.7604,\"longitude\":-95.3698,\"GEOID\":40429,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS37BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS37BSAH2\",\"regModel2014Index\":181.8024075,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49A\",\"State\":\"CA\",\"blsCity\":\"Los Angeles\",\"regionalFactor\":1.000,\"latitude\":34.0522,\"longitude\":-118.2437,\"GEOID\":51445,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49ASAH2\",\"regModel2014Index\":234.2689416,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S35B\",\"State\":\"FL\",\"blsCity\":\"Miami\",\"regionalFactor\":1.000,\"latitude\":25.7617,\"longitude\":-80.1918,\"GEOID\":56602,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS35BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS35BSAH2\",\"regModel2014Index\":180.2371065,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S24A\",\"State\":\"MN\",\"blsCity\":\"Minneapolis\",\"regionalFactor\":1.000,\"latitude\":44.9778,\"longitude\":-93.265,\"GEOID\":57628,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS24ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS24ASAH2\",\"regModel2014Index\":206.5467185,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.357176,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.421136472},{\"BLSSeriesID\":\"S12A\",\"State\":\"NY\",\"blsCity\":\"New York\",\"regionalFactor\":1.000,\"latitude\":40.7128,\"longitude\":-74.006,\"GEOID\":63217,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS12ASA0E\",\"blsFuelsUtilitiesID\":\"CUUSS12ASAH2\",\"regModel2014Index\":237.7630163,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.4395572,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.4831199},{\"BLSSeriesID\":\"S12B\",\"State\":\"PA\",\"blsCity\":\"Philadelphia\",\"regionalFactor\":1.000,\"latitude\":39.9526,\"longitude\":-75.1652,\"GEOID\":69076,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS12BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS12BSAH2\",\"regModel2014Index\":230.2057182,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.40557176,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.462920184},{\"BLSSeriesID\":\"S49E\",\"State\":\"CA\",\"blsCity\":\"San Diego\",\"regionalFactor\":1.000,\"latitude\":32.7157,\"longitude\":-117.1611,\"GEOID\":78661,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49ESA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49ESAH2\",\"regModel2014Index\":222.54920133,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49B\",\"State\":\"CA\",\"blsCity\":\"San Francisco\",\"regionalFactor\":1.000,\"latitude\":37.7749,\"longitude\":-122.4194,\"GEOID\":78904,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49BSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49BSAH2\",\"regModel2014Index\":246.7699343,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318},{\"BLSSeriesID\":\"S49D\",\"State\":\"WA\",\"blsCity\":\"Seattle\",\"regionalFactor\":1.000,\"latitude\":47.6062,\"longitude\":-122.3321,\"GEOID\":80389,\"blsReadyMixConcID\":\"PCU327320327320\",\"blsTractorShovelLoadersID\":\"PCU33312033312014\",\"blsEnergyID\":\"CUUSS49DSA0E\",\"blsFuelsUtilitiesID\":\"CUUSS49DSAH2\",\"regModel2014Index\":215.3138159,\"c0_intercept\":-19.4284,\"c1_readyMix\":0.113389,\"c2_tractorShovel\":0.325493,\"c3_energy\":0.096662,\"c4_fuelUtils\":0.398318}]";

    //user is given the option to select the nearest 3 bls regions
    private static final int SHORT_LIST_COUNT = 3;
    //    private static final String REGISTRATION_KEY = "cecffbde84de416dbe4d198437f7c03e";
    private static final String REGISTRATION_KEY = "408c86477d784c4abf2b179a79d5e79f";

    //default National index computed for 2015 used as the basis for normalizing regional indexes
    private static final Double DEFAULT_2017_NATIONAL_INDEX = 208.09;
    //user is given the option to select the nearest 3 bls regions
    private static final int DCP = 2; //default number of decimal places to round 2
    //regionalization model coefficients - need to be updated periodically
    private static final Double C0_INTERCEPT = -19.4;
    private static final Double C1_READY_MIX = 0.113;
    private static final Double C2_TRACTOR_SHOVEL = 0.325;
    private static final Double C3_ENERGY = 0.096;
    private static final Double C4_FUEL_UTILS = 0.398;

    @Autowired
    private CostRegionalizationCacheService cacheService;

    @Override
    public List<BlsCenterModel> parseRegDataAndComputeDist(double lat, double lng) throws SWCException {

        List<BlsCenterModel> blsCenter = new ArrayList<BlsCenterModel>();

        try {
            //Convert Json to Object
            ObjectMapper mapper = new ObjectMapper();
            blsCenter = mapper.readValue(jsonRegDefaults, TypeFactory.defaultInstance().constructCollectionType(List.class, BlsCenterModel.class));
            blsCenter = findNearestBLSCenter(blsCenter, lng, lat);
            Boolean status = computeRegionalizationMult(blsCenter);
        } catch (IOException e) {
            logger.error("CostRegionalizationImpl.parseRegDataAndComputeDist(): " + e.toString());
            throw new SWCException("Error parsing BLS Response: " + e.toString());
        }
        return blsCenter;

    }

    @Override
    //locates nearest BLS regional center bases of the coordinates of the user's
    //study area
    public List<BlsCenterModel> findNearestBLSCenter(List<BlsCenterModel> blsCenters, double lng, double lat) throws SWCException {

        /* Did not code this as do not see it being used anywhere...
            Boolean flag = checkIfWithinUSBounds(lng, lat);
         */
        int count = 0;

        for (BlsCenterModel blsCity : blsCenters) {
            count += 1;

            if (blsCity.getBlsCity().equalsIgnoreCase("NATIONAL")) {
                blsCity.setDistToCurrentPoint(new Double(999999));
                blsCity.setSelectString(blsCity.getBlsCity() + "(NA)" + blsCity.getRegionalFactor());
            } else {
                blsCity.setDistToCurrentPoint(distanceTo(lat, lng, blsCity.getLatitude(), blsCity.getLongitude(), "M"));
                blsCity.setSelectString(blsCity.getBlsCity() + "(" + ceil(blsCity.getDistToCurrentPoint()) + " miles)" + blsCity.getRegionalFactor()); //String.Format("{0} ({1:F0} miles) {2}", blsCity.blsCity, blsCity.distToCurrentPoint, BlsCity.regionalFactor);
            }
            //System.Console.WriteLine("Element #{0}: {1}", count, BlsCity.blsCity);
        }

        //Sort list by distance
        // var sortedList = BlsCenters.OrderBy(o =  > o.distToCurrentPoint);
        Collections.sort(blsCenters, new Comparator<BlsCenterModel>() {
            @Override
            public int compare(final BlsCenterModel object1, final BlsCenterModel object2) {
                return object1.getDistToCurrentPoint().compareTo(object2.getDistToCurrentPoint());
            }
        });
        //grab only short list of centers
        List<BlsCenterModel> shortList = blsCenters.subList(0, SHORT_LIST_COUNT);
        shortList.add(blsCenters.get(blsCenters.size() - 1));   //add last item which represents NATIONAL
        BlsCenterModel blsOther = new BlsCenterModel();
        blsOther.setBlsSeriesID("Other");
        blsOther.setState("Other");
        blsOther.setBlsCity("Other");
        blsOther.setRegionalFactor(new Double(1));
        blsOther.setLatitude(new Double(0));
        blsOther.setLongitude(new Double(0));
        blsOther.setDistToCurrentPoint(new Double(999999));
        blsOther.setGeoID("Other");
        blsOther.setBlsReadyMixConcID("Other");
        blsOther.setBlsTractorShovelLoadersID("Other");
        blsOther.setBlsEnergyID("Other");
        blsOther.setBlsFuelsUtilitiesID("Other");
        blsOther.setSelectString("Other (NA) 1");
        blsOther.setInflationFactor(new Double(1));
        shortList.add(blsOther);

        return shortList;
    }

    @Override
    //computes the distance between two locations specified by lat / lon coordinates
    public double distanceTo(double lat1, double lon1, double lat2, double lon2, String unit) throws SWCException {
        double rlat1 = Math.PI * lat1 / 180;
        double rlat2 = Math.PI * lat2 / 180;
        double theta = lon1 - lon2;
        double rtheta = Math.PI * theta / 180;
        double dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        switch (unit) {
            case "K": //Kilometers
                return dist * 1.609344;
            case "N": //Nautical Miles 
                return dist * 0.8684;
            case "M": //Miles
                return dist;
        }
        return dist;
    }

    @Override
    // computes reginal multipliers for a list of BLS centers
    public boolean computeRegionalizationMult(List<BlsCenterModel> blsCenters) throws SWCException {

        boolean status = true;
        Integer count = 0;
        Calendar now = Calendar.getInstance();
        Integer currentYear = now.get(Calendar.YEAR);
        Integer currentMonth = now.get(Calendar.MONTH);
        Integer dataYear = currentYear - 1;

        //bls data is updated between the 15th and 20th of the month as of this writting so assume previous years data available in Feb
        if (currentMonth < 1) { //array starts a 0, so Feb = 1, unlike C# which had 2
            dataYear = dataYear - 1;
        }

        for (BlsCenterModel blsCenter : blsCenters) {
            count += 1;
            blsCenter.setDataYear(dataYear);
            if (count > SHORT_LIST_COUNT + 1) {
                break; //do not compute for National and other cause default multipliers are always 1 however need to compute for National so can calc inflation
            }
            List<String> seriesIDs = new ArrayList<String>();
            seriesIDs.add(blsCenter.getBlsReadyMixConcID());
            seriesIDs.add(blsCenter.getBlsTractorShovelLoadersID());
            seriesIDs.add(blsCenter.getBlsEnergyID());
            seriesIDs.add(blsCenter.getBlsFuelsUtilitiesID());
            //status = status && getBLSData(BlsCity, seriesIDs.ToArray(), dataYear.ToString(), dataYear.ToString());
            status = status && getBLSData(blsCenter, seriesIDs, dataYear.toString(), dataYear.toString());
            //Console.WriteLine("Element #{0}: {1} {2} {3} {4} {5}", count, BlsCity.blsCity, BlsCity.blsReadyMixConcID, BlsCity.blsTractorShovelLoadersID, BlsCity.blsEnergyID, BlsCity.blsFuelsUtilitiesID);
        }

        return status;

    }

    // new
    @Override
    //retrieves data via the BLS api given a valid BLS regional center, a series id and start/end year
    public boolean getBLSData(BlsCenterModel blsCity, List<String> seriesIDs, String startYear, String endYear) throws SWCException {
        /*
        var httpWebRequest = (HttpWebRequest) WebRequest.Create("http://api.bls.gov/publicAPI/v2/timeseries/data/");
        httpWebRequest.ContentType = "application/json";
        httpWebRequest.Method = "POST";
         */

        //20170103: updated from http to https as htt had redirect and stopped working
        String URL = "https://api.bls.gov/publicAPI/v2/timeseries/data/";

        long startTime = System.currentTimeMillis();

        SeriesPostModel seriesPost = new SeriesPostModel();
        seriesPost.setSeriesid(seriesIDs);
        seriesPost.setStartyear(startYear);
        seriesPost.setEndyear(endYear);
        seriesPost.setCatalog(Boolean.FALSE);
        seriesPost.setCalculations(Boolean.FALSE);
        seriesPost.setAnnualaverage(Boolean.TRUE);
        seriesPost.setRegistrationKey(REGISTRATION_KEY);


        try {
            BlsResponseModel resp = cacheService.getFromCache(seriesPost);

            if (resp == null) {
                logger.debug("### record not found in the cache, try to get data from API");

                // Create object to submit the HTTP request
                ClientConfig config = new DefaultClientConfig();
                Client client = Client.create(config);
                WebResource service = client.resource(URL);

                ObjectMapper mapper = new ObjectMapper();
                //Object to JSON in String
                String jsonString = mapper.writeValueAsString(seriesPost);

//                logger.debug("### request to API");
//                logger.debug("### jsonString = " + jsonString);

                ClientResponse response = service.type("application/json")
                        .post(ClientResponse.class, jsonString);

//                logger.debug("### response = " + response);

                if (response.getStatus() != 200) {
                    throw new RuntimeException("Failed : HTTP error code : "
                            + response.getStatus());
                }
                resp = response.getEntity(BlsResponseModel.class);
            }

            //check to see if success response received
            if (resp.getStatus().equalsIgnoreCase("REQUEST_SUCCEEDED")) {


                // check this method please !
                try {
                    computeAndSaveRegMult(blsCity, resp.getResults().getSeries());
                } catch (Exception ex) {
                    logger.error("EXCEPTION in the computeAndSaveRegMult function !!!! exception:" + ex.getMessage());
                }


                logger.debug("### put response from the API to cache");
                cacheService.putToCache(seriesPost, resp);
            }

        } catch (Exception e) {
            logger.debug("CostRegionalizationService.getBLSData error serializing object: " + e.toString());

            throw new SWCException("BLS request error: " + e.toString());
        }

        logger.info("Request time: " + (System.currentTimeMillis() - startTime) + "ms");

        return true;
    }

    @Override
    //supervises computation of regional multipliers for a BLS regional center based on a regression
    //equation previously determined by an external model
    public void computeAndSaveRegMult(BlsCenterModel blsCity, List<SeriesModel> blsSeriesArr) throws SWCException {
        String[] validSeriesIDs = {"blsReadyMixConcID", "blsTractorShovelLoadersID", "blsEnergyID", "blsFuelsUtilitiesID"};
        //var seriesLabelIDFrags = new List<string> { "PCU327320327320","PCU33312033312014","SA0E","SAH2" };
        String[] seriesLabelIDFrags = {"PCU327320327320", "PCU33312033312014", "SA0E", "SAH2"};

        String seriesIDMap = "";
        //var blsVarDict = new Dictionary<string, double>();
        Map<String, Double> blsVarDict = new HashMap<String, Double>();

        if (blsSeriesArr != null && !blsSeriesArr.isEmpty()) {
            for (SeriesModel serie : blsSeriesArr) {

                seriesIDMap = getSeriesIDMapping(serie.getSeriesID());

                for (DataModel data : serie.getData()) {
                    if (data.getPeriodName().equalsIgnoreCase("Annual")) {
                        blsVarDict.put(seriesIDMap, Double.parseDouble(data.getValue()));
                        //Console.WriteLine("BLS Series #{0}: year:{1} periodName:{2} value:{3} saved for {4}", serie.seriesID, data.year, data.periodName, data.value, seriesIDMap);
                        break;
                    }
                }
            }
        }
        //perform regionalization calcs

        blsCity.setRegionalFactor(blsCity.c0_intercept
                + (blsCity.c1_readyMix * blsVarDict.get(validSeriesIDs[0]))
                + (blsCity.c2_tractorShovel * blsVarDict.get(validSeriesIDs[1]))
                + (blsCity.c3_energy * blsVarDict.get(validSeriesIDs[2]))
                + (blsCity.c4_fuelUtils * blsVarDict.get(validSeriesIDs[3])));

        BigDecimal bd = new BigDecimal(blsCity.getRegionalFactor() / blsCity.getRegModel2014Index());
        bd = bd.setScale(DCP, RoundingMode.HALF_UP);
        blsCity.setInflationFactor(bd.doubleValue());   //(Math.Round(BlsCity.regionalFactor / BlsCity.regModel2014Index, dcp);
        bd = new BigDecimal(blsCity.getRegionalFactor() / DEFAULT_2017_NATIONAL_INDEX);
        System.out.println("National Index " + blsCity.getRegionalFactor());
        bd = bd.setScale(DCP, RoundingMode.HALF_UP);
        System.out.println("BD " + bd);
        blsCity.setRegionalFactor(bd.doubleValue()); //Math.Round(BlsCity.regionalFactor / default2015NationalIndex, DCP);        
        blsCity.setSelectString(blsCity.getBlsCity() + "(" + (int) Math.round(blsCity.getDistToCurrentPoint()) + " miles)" + blsCity.getRegionalFactor());   // = String.Format("{0} ({1:F0} miles) {2}", blsCity.blsCity, blsCity.distToCurrentPoint, blsCity.regionalFactor);
        if (blsCity.getBlsCity().equalsIgnoreCase("NATIONAL")) {
            blsCity.setSelectString(blsCity.getBlsCity() + "(NA)" + blsCity.getRegionalFactor());
        }
    }

    @Override
    //provides BLS series ID for variables used to compute regionalization multipliers
    public String getSeriesIDMapping(String seriesID) throws SWCException {

        String result = "";
        Map<String, String> seriesIDsMap = new HashMap<String, String>();
        seriesIDsMap.put("PCU327320327320", "blsReadyMixConcID");
        seriesIDsMap.put("PCU33312033312014", "blsTractorShovelLoadersID");
        seriesIDsMap.put("SA0E", "blsEnergyID");
        seriesIDsMap.put("SAH2", "blsFuelsUtilitiesID");

        //result = seriesIDsMap.get(seriesID);    

        for (Map.Entry<String, String> entry : seriesIDsMap.entrySet()) {
            //String key = entry.getKey();
            //String value = entry.getValue();
            if (seriesID.contains(entry.getKey())) {
                result = entry.getValue();
                return result;
            }
        }

        return result;
    }

}
