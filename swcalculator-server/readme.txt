-Djava.library.path=C:\Tomcat8\webapps\swcalculator-server\WEB-INF\classes -DSWCALCULATOR_HOME=c:\swcalculator_home

folder tomcat/bin

create a file: setenv.bat

==============================================================

set JAVA_OPTS=-Djava.library.path="C:\Tomcat\webapps\swcalculator-server\WEB-INF\classes" -DSWCALCULATOR_HOME="c:\swcalculator_home"
EXPORT JAVA_OPTS=-Djava.library.path="/home/ad/Dev/apache-tomcat-8.5.29/webapps/swcalculator-server/WEB-INF/classes" -DSWCALCULATOR_HOME="/home/ad/test/swcalculator_home"
==============================================================
SWCALCULATOR_HOME base path to the file "security-context.xml"

http://localhost:8080/swcalculator-server/api/v1/calculate/siteData


I think that it will be possible to launch, but we need a file security-context.xml
it registers all access rights without it, filter "<filter-name>springSecurityFilterChain</filter-name>" are not loaded, and the application closes
===============================================
DEBUG--2018-04-08 13:22:08--Initializing filter 'springSecurityFilterChain'
INFO --2018-04-08 13:22:08--Closing Root WebApplicationContext: startup date [Sun Apr 08 13:22:06 EEST 2018]; root of context hierarchy
===============================================

if I try disable authorization completely, then the error appears when the swagger is initialized

if I turn off the swagger, then the service will start, but it does not work correctly

so, we need this file "security-context.xml"



what  need to do to run:

1. file: stormwater-config-context.xml add path to file stormwater-email.properties
or just mocking this values in the file: stormwater-email-context.xml
=================================================================
<!-- SET default mail properties -->
    <bean id="message" class="org.springframework.mail.SimpleMailMessage">
        <!--<property name="from" value="${stormwater.emailserver.username}"/>-->

        <property name="from" value="stormwater.emailserver.username"/>

    </bean>

	 <!-- SET default mail properties -->
    <bean id="mailSender" class="org.springframework.mail.javamail.JavaMailSenderImpl">
        <!--<property name="host" value="${stormwater.emailserver.host}"/>-->
        <!--<property name="port" value="${stormwater.emailserver.port}"/>-->
        <!--<property name="username" value="${stormwater.emailserver.username}"/>-->

        <property name="host" value="host"/>
        <property name="port" value="25"/>
        <property name="username" value="username"/>

=================================================================

2. delete 2 jar files:
swcalculator-server/src/main/webapp/WEB-INF/lib/log4j-1.2.17.jar
swcalculator-server/src/main/webapp/WEB-INF/lib//log4j-over-slf4j-1.6.1.jar


3. settings for tomcat:
-Djava.library.path=c:/tomcat/webapps/swcalculator-server/WEB-INF/classes -DSWCALCULATOR_HOME=c:/swcalculator_home




<?xml version="1.0" encoding="UTF-8"?>
<siteData>
    <version>1.1</version>
    <siteName/>
    <siteLocation>40,-98.5</siteLocation>
    <siteArea>0</siteArea>
    <hydSoilGroup>B</hydSoilGroup>
    <hydConductivity>0.4</hydConductivity>
    <surfaceSlope>5</surfaceSlope>
    <rainSource>4</rainSource>
    <evapSource>0</evapSource>
    <percForest>0</percForest>
    <percMeadow>0</percMeadow>
    <percLawn>40</percLawn>
    <percDesert>0</percDesert>
    <percImpervious>60</percImpervious>
    <percDisconnection>0</percDisconnection>
    <disconnectionCaptureRatio>100</disconnectionCaptureRatio>
    <percHarvesting>0</percHarvesting>
    <harvestingCisternSize>100</harvestingCisternSize>
    <harvestingCisternNumber>50</harvestingCisternNumber>
    <harvestingEmptyingRate>4</harvestingEmptyingRate>
    <percRainGardens>0</percRainGardens>
    <rainGardensPondingHeight>6</rainGardensPondingHeight>
    <rainGardensSoilThickness>12</rainGardensSoilThickness>
    <rainGardensSoilKsat>10</rainGardensSoilKsat>
    <rainGardensCaptureRatio>5</rainGardensCaptureRatio>
    <percGreenRoofs>0</percGreenRoofs>
    <greenRoofSoilThickness>4</greenRoofSoilThickness>
    <greenRoofSoilKsat>10</greenRoofSoilKsat>
    <percStreetPlanters>0</percStreetPlanters>
    <streetPlantersPondingHeight>6</streetPlantersPondingHeight>
    <streetPlantersSoilThickness>18</streetPlantersSoilThickness>
    <streetPlantersSoilKsat>10</streetPlantersSoilKsat>
    <streetPlantersGravelThickness>12</streetPlantersGravelThickness>
    <streetPlantersCaptureRatio>6</streetPlantersCaptureRatio>
    <percInfilBasin>0</percInfilBasin>
    <infilBasinBasinDepth>6</infilBasinBasinDepth>
    <infilBasinCaptureRatio>5</infilBasinCaptureRatio>
    <percPorousPavement>0</percPorousPavement>
    <porousPavementPavementThickness>6</porousPavementPavementThickness>
    <porousPavementGravelThickness>18</porousPavementGravelThickness>
    <porousPavementCaptureRatio>100</porousPavementCaptureRatio>
    <designStorm>0</designStorm>
    <yearsAnalyzed>20</yearsAnalyzed>
    <runoffThreshold>0.1</runoffThreshold>
    <ignoreConsecStorms>false</ignoreConsecStorms>
    <climateScenario>0</climateScenario>
    <climateYear>2035</climateYear>
    <isNewDevelopment>false</isNewDevelopment>
    <isReDevelopment>true</isReDevelopment>
    <siteSuitabilityPoor>true</siteSuitabilityPoor>
    <siteSuitabilityModerate>false</siteSuitabilityModerate>
    <siteSuitabilityExcellent>false</siteSuitabilityExcellent>
    <rgPretreatment>false</rgPretreatment>
    <ibPretreatment>false</ibPretreatment>
    <ppPretreatment>false</ppPretreatment>
    <cmbCostRegion>0</cmbCostRegion>
    <tbRegMultiplier>1</tbRegMultiplier>
    <precStationID>142592</precStationID>
    <evapStationID>257070</evapStationID>
</siteData>





=================
