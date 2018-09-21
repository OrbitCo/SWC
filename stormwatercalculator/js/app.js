sessionStorage.setItem('modal', 'homePage');
sessionStorage.setItem("siteName", "New_SWC_Site");
sessionStorage.setItem("latitude", 40);
sessionStorage.setItem("longitude", -98.5);
sessionStorage.setItem("location", "");
sessionStorage.setItem("acres", 0);
sessionStorage.setItem("soilDataChecked", false);
sessionStorage.setItem("soilType", "B");
sessionStorage.setItem("soilDrainage", 0.4);
sessionStorage.setItem("topography", 5);
sessionStorage.setItem("climateScenarioName", "None");
sessionStorage.setItem("climateScenario", 0);
sessionStorage.setItem("climateYear", 2035);
sessionStorage.setItem("forest", 0);
sessionStorage.setItem("meadow", 0);
sessionStorage.setItem("lawn", 40);
sessionStorage.setItem("desert", 0);
sessionStorage.setItem("impervious", 60);
sessionStorage.setItem("disconnection", 0);
sessionStorage.setItem("rainHarvesting", 0);
sessionStorage.setItem("rainGardens", 0);
sessionStorage.setItem("greenRoofs", 0);
sessionStorage.setItem("streetPlanters", 0);
sessionStorage.setItem("infiltrationBasins", 0);
sessionStorage.setItem("permeablePavement", 0);
sessionStorage.setItem("designStorm", 0.00);
sessionStorage.setItem("reDevelopment", true);
sessionStorage.setItem("newDevelopment", false);
sessionStorage.setItem("poor", true);
sessionStorage.setItem("moderate", false);
sessionStorage.setItem("excellent", false);
sessionStorage.setItem("costRegion", 0);
sessionStorage.setItem("yearsToAnalyze", 20);
sessionStorage.setItem("eventThreshold", 0.10);
sessionStorage.setItem("ignoreDays", false);
sessionStorage.setItem('resultsPage', "summaryResults");
sessionStorage.setItem("stationSelected", 'notSelected');
sessionStorage.setItem("yearsToCalculate", 15);


sessionStorage.setItem('resultsActive', false);
sessionStorage.setItem('baselineActive', false);
sessionStorage.setItem('printToPDF', false);
sessionStorage.setItem('costCriteria', 'capital');

var map;
var locationMarker;

var siteAreaMarker;
var siteAreaLine;
var siteLocationHandler;
var drawSiteAreaHandler;
var selectLastSiteMarkerHandler;
var addressToFind;
var siteAreaPolygon;
var siteAreaAcres = 0;
var siteRadiusPolygon;
var siteAreaMarkerArray = [];
var siteAreaMarkerLocationArray = [];
var siteAreaLineArray = [];

var soilDataURLString;
var soilDataCoordinates;
var soilDataFillColor;
var soilDataPolygonsArray;
var soilDataPolygons;
var soilDataBoolean = false;

var precipitationURLString;
var rainfallDataURLString;
var weatherDataURLString;
var rainGageArray;
var weatherStationArray;
var sameStationArray;
var rainGageMarker;
var weatherStationMarker;
var sameStationMarker;
var rainGageOptions;
var weatherStationOptions;

var climateURLString;
var warmWetData;
var medianData;
var hotDryData;
var maxWarmWetData;
var maxMedianData;
var maxHotDryData;
var maxHistoricalData;

var costURLString;
var costOptions;

var xmlString;
var summaryChartArray = [0, 0, 0];
var summaryChartArrayBaseline = [0, 0, 0];
var summaryTableArray = [0, 0, 0, 0, 0, 0, 0, 0];
var summaryTableArrayBaseline = [0, 0, 0, 0, 0, 0, 0, 0];
var rainfallRunoffEventsArray = [0];
var rainfallRunoffEventsArrayBaseline = [0];
var rainfallFrequencyArray = [0];
var runoffFrequencyArray = [0];
var rainfallFrequencyArrayBaseline = [0];
var runoffFrequencyArrayBaseline = [0];
var rainfallRetentionArray = [0];
var rainfallRetentionArrayBaseline = [0];
var runoffContributionArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var runoffContributionArrayBaseline = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var extremeEventRainfallDepthArray = [0, 0, 0, 0, 0, 0];
var extremeEventRainfallPeakArray = [0, 0, 0, 0, 0, 0];
var extremeEventRainfallDepthArrayBaseline = [0, 0, 0, 0, 0, 0];
var extremeEventRainfallPeakArrayBaseline = [0, 0, 0, 0, 0, 0];
var extremeEventRunoffDepthArray = [0, 0, 0, 0, 0, 0];
var extremeEventRunoffPeakArray = [0, 0, 0, 0, 0, 0];
var extremeEventRunoffDepthArrayBaseline = [0, 0, 0, 0, 0, 0];
var extremeEventRunoffPeakArrayBaseline = [0, 0, 0, 0, 0, 0];
var simpleTotal = 0;
var typicalTotal = 0;
var complexTotal = 0;
var costComplexity;
var baselineSiteArea;
var baselineSoilType;
var baselineSoilDrainage;
var baselineTopography;
var baselineRainGage;
var baselineWeatherStation;
var baselineClimateScenario;
var baselineForest;
var baselineMeadow;
var baselineLawn;
var baselineDesert;
var baselineImpervious;
var baselineDisconnection = 0;
var baselineRainHarvesting = 0;
var baselineRainGardens = 0;
var baselineGreenRoofs = 0;
var baselineStreetPlanters = 0;
var baselineInfiltrationBasins = 0;
var baselinePermeablePavement = 0;
var baselineYearsToAnalyze;
var baselineIgnoreWetDays;
var baselineWetDayThreshold;
var currentDisconnectionLowCapital = 0;
var currentDisconnectionHighCapital = 0;
var currentRainHarvestingLowCapital = 0;
var currentRainHarvestingHighCapital = 0;
var currentRainGardensLowCapital = 0;
var currentRainGardensHighCapital = 0;
var currentGreenRoofsLowCapital = 0;
var currentGreenRoofsHighCapital = 0;
var currentStreetPlantersLowCapital = 0;
var currentStreetPlantersHighCapital = 0;
var currentInfiltrationBasinsLowCapital = 0;
var currentInfiltrationBasinsHighCapital = 0;
var currentPermeablePavementLowCapital = 0;
var currentPermeablePavementHighCapital = 0;
var currentDisconnectionMaintenanceLow = 0;
var currentDisconnectionMaintenanceHigh = 0;
var currentRainHarvestingMaintenanceLow = 0;
var currentRainHarvestingMaintenanceHigh = 0;
var currentRainGardensMaintenanceLow = 0;
var currentRainGardensMaintenanceHigh = 0;
var currentGreenRoofsMaintenanceLow = 0;
var currentGreenRoofsMaintenanceHigh = 0;
var currentStreetPlantersMaintenanceLow = 0;
var currentStreetPlantersMaintenanceHigh = 0;
var currentInfiltrationBasinsMaintenanceLow = 0;
var currentInfiltrationBasinsMaintenanceHigh = 0;
var currentPermeablePavementMaintenanceLow = 0;
var currentPermeablePavementMaintenanceHigh = 0;
var baselineDisconnectionLowCapital = 0;
var baselineDisconnectionHighCapital = 0;
var baselineRainHarvestingLowCapital = 0;
var baselineRainHarvestingHighCapital = 0;
var baselineRainGardensLowCapital = 0;
var baselineRainGardensHighCapital = 0;
var baselineGreenRoofsLowCapital = 0;
var baselineGreenRoofsHighCapital = 0;
var baselineStreetPlantersLowCapital = 0;
var baselineStreetPlantersHighCapital = 0;
var baselineInfiltrationBasinsLowCapital = 0;
var baselineInfiltrationBasinsHighCapital = 0;
var baselinePermeablePavementLowCapital = 0;
var baselinePermeablePavementHighCapital = 0;
var baselineDisconnectionMaintenanceLow = 0;
var baselineDisconnectionMaintenanceHigh = 0;
var baselineRainHarvestingMaintenanceLow = 0;
var baselineRainHarvestingMaintenanceHigh = 0;
var baselineRainGardensMaintenanceLow = 0;
var baselineRainGardensMaintenanceHigh = 0;
var baselineGreenRoofsMaintenanceLow = 0;
var baselineGreenRoofsMaintenanceHigh = 0;
var baselineStreetPlantersMaintenanceLow = 0;
var baselineStreetPlantersMaintenanceHigh = 0;
var baselineInfiltrationBasinsMaintenanceLow = 0;
var baselineInfiltrationBasinsMaintenanceHigh = 0;
var baselinePermeablePavementMaintenanceLow = 0;
var baselinePermeablePavementMaintenanceHigh = 0;
var currentDevType;
var currentSiteSuitability;
var currentTopography;
var currentCostRegion;
var rainGardensPretreatment;
var infiltrationBasinsPretreatment;
var permeablePavementPretreatment;
var rainGardensPretreatmentBaseline = 'NA';
var infiltrationBasinsPretreatmentBaseline = 'NA';
var permeablePavementPretreatmentBaseline = 'NA';


var baselineDevType = 'NA';
var baselineSiteSuitability = 'NA';
var baselineSoilType= 'NA';
var baselineTopography = 'NA';
var baselineCostRegion = 'NA';

var dataKey;

$(document).ready(function()
{
    $('#emailModalCloseButton').click(function()
    {
        $('#emailModalBody').html('<div class="form-group"><input type="text" class="form-control" placeholder="Email Address" id="emailAddressValue" onchange="determineEmailValue()" ng-model="emailAddressValue"></div><div id="emailButton"></div>');
    });
    $(window).resize(function()
    {
         if ($(window).width() < 1025)
        {
            if (sessionStorage.modal == 'homePage')
            {
                $('#modal').css(
                {
                    'position' : 'fixed',
                    'top': '50px',
                    'left': '0px',
                    'width': '100%',
                    'height': 'calc(100% - 50px)',
                    'cursor': 'default',
                    'overflow-y': 'auto',
                    'background-size': 'cover'
                });
                $('.site-wrap').css(
                {
                    'top': '0px',
                    'bottom': '0',
                    'left': '0',
                    'width' : '100%',
                    'height': 'auto',
                    'overflow-y': 'auto'
               });
            }
            else
            {
                $('#modal').css(
                {
                  'position': 'relative',
                  'top': '0',
                  'left': '25px',
                  'width': 'calc(100% - 50px)',
                  'height': 'auto',
                  'background-color': '#fff',
                  'background-image': 'none',
                  'padding': '10px',
                  'padding-top': '0',
                  'color': '#fff',
                  'z-index': '2',
                  'font-size': '12px',
                  'color' : '#000',
                  'cursor': 'default'
                });

                $('.site-wrap').css(
                {
                    'top': '155px',
                    'bottom': '0',
                    'left': '0',
                    'width' : '100%',
                    'height': 'auto',
                    'overflow-y': 'auto'
               });
            }

           $('#bingMap').css(
           {
            'position' : 'relative',
            'top' : '-25px',
            'left' : '25px',
            'width' :'calc(100% - 50px)',
            'height' : '450px'
           });
        }
        else
        {
            $('.site-wrap').css(
            {
                'position' : 'fixed',
                'top' : '50px',
                'left' : '65px',
                'height' : 'calc(100% - 50px)',
                'width' : '100%',
                'background-color' : '#fff',
                'z-index' : '1'
            });

            if ((sessionStorage.modal == 'climateChange') || (sessionStorage.modal == 'results'))
            {
              $('#modal').css(
              {
                'top': '25px',
                'left': '25px',
                'width': 'calc(100% - 100px)',
                'height': '100%',
                'background-color': '#ffffff',
                'cursor': 'default'
              });
            }
            else
            {
              $('#modal').css(
              {
                'position': 'absolute',
                'top': '50px',
                'left': '50px',
                'width': '300px',
                'height': 'auto',
                'background-color': '#7cb2ab',
                'background-image': 'none',
                'padding': '10px',
                'padding-top': '0',
                'color': '#fff',
                'z-index': '2',
                'font-size': '12px',
                'cursor': 'move'
              });
            }
            $('#bingMap').css(
           {
            'position' : 'fixed',
            'top' : '75px',
            'left' : '85px',
            'width' :'calc(100% - 105px)',
            'height' : 'calc(100% - 100px)'
           });
        }
    });
    $('.nav-trigger').click(function()
    {
        if ($('#navigationArrow').hasClass('fa-chevron-circle-right'))
        {
            $('label[for="nav-trigger"]').css(
            {
                'left': '235px'
            });
            $('#navigationArrow').removeClass('fa-chevron-circle-right');
            $('#navigationArrow').addClass('fa-chevron-circle-left');
            $('.site-wrap').css(
            {
                'position' : 'fixed',
                'top' : '50px',
                'left' : '250px',
                'height' : 'calc(100% - 50px)',
                'width' : '87%',
                'background-color' : '#fff',
                'z-index' : '1'
            });
            $('#bingMap').css(
            {
              'left': '270px'
            });
        }
        else if ($('#navigationArrow').hasClass('fa-chevron-circle-left'))
        {
            $('label[for="nav-trigger"]').css(
            {
                'left': '48px'
            });
            $('#navigationArrow').removeClass('fa-chevron-circle-left');
            $('#navigationArrow').addClass('fa-chevron-circle-right');
            $('.site-wrap').css(
            {
                'position' : 'fixed',
                'top' : '50px',
                'left' : '65px',
                'height' : 'calc(100% - 50px)',
                'width' : '100%',
                'background-color' : '#fff',
                'z-index' : '1'
            });
            $('#bingMap').css(
            {
              'left': '85px'
            });
        }
    });
    $.ajax(
      {
        type: 'GET',
        url: 'stormwatercalculator/js/config.json',
        crossDomain: true,
        success: function(response)
        {
          dataKey = response.key;
        }
      });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        $('#openFileButton').hide();
    }
  document.getElementById("uploadFile").addEventListener("change", loadXMLFile, false);

  var everythingLoaded = setInterval(function()
  {
      if (/loaded|complete/.test(document.readyState))
      {
        clearInterval(everythingLoaded);
        pageLoaded();
      }
  }, 10);

  $("#modal").draggable(
  {
    containment: '#bingMap'
  });

  $('ul li.nav-item a').click(function() {
        $('li.nav-item a').removeClass("active");
        $(this).addClass("active");
    });

  $('#closeAlertButton').on('click', function()
  {
    $('#alertDiv').hide();
  });

  var nav = document.querySelector('.navcontainer');

    if ($(window).width() < 1025) {
        nav.addEventListener('click', function(e) {
            if (e.offsetX > (nav.offsetWidth - 10)) {
                if (($('#location').hasClass('active'))) {;
                    $('.navigation').animate({ scrollLeft: $('#soiltype').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#location').removeClass('active');
                    $('#soiltype').addClass('active');
                    $('#soiltype').trigger('click');
                    return;
                }
                if (($('#soiltype').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#soildrainage').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#soiltype').removeClass('active');
                    $('#soildrainage').addClass('active');
                    $('#soildrainage').trigger('click');
                    return;
                }
                if (($('#soildrainage').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#topography').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#soildrainage').removeClass('active');
                    $('#topography').addClass('active');
                    $('#topography').trigger('click');
                    return;
                }
                if (($('#topography').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#precipitation').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#topography').removeClass('active');
                    $('#precipitation').addClass('active');
                    $('#precipitation').trigger('click');
                    return;
                }
                if (($('#precipitation').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#climate').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#precipitation').removeClass('active');
                    $('#climate').addClass('active');
                    $('#climate').trigger('click');
                    return;
                }
                if (($('#climate').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#land').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#climate').removeClass('active');
                    $('#land').addClass('active');
                    $('#land').trigger('click');
                    return;
                }
                if (($('#land').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#lid').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#land').removeClass('active');
                    $('#lid').addClass('active');
                    $('#lid').trigger('click');
                    return;
                }
                if (($('#lid').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#cost').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#lid').removeClass('active');
                    $('#cost').addClass('active');
                    $('#cost').trigger('click');
                    return;
                }
                if (($('#cost').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#results').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#cost').removeClass('active');
                    $('#results').addClass('active');
                    $('#results').trigger('click');
                    return;
                }
            }
            if (e.pageX <= 20) {
                if (($('#soiltype').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#location').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#soiltype').removeClass('active');
                    $('#location').addClass('active');
                    $('#location').trigger('click');
                    return;
                }
                if (($('#soildrainage').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#soiltype').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#soildrainage').removeClass('active');
                    $('#soiltype').addClass('active');
                    $('#soiltype').trigger('click');
                    return;
                }
                if (($('#topography').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#soildrainage').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#topography').removeClass('active');
                    $('#soildrainage').addClass('active');
                    $('#soildrainage').trigger('click');
                    return;
                }
                if (($('#precipitation').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#topography').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#precipitation').removeClass('active');
                    $('#topography').addClass('active');
                    $('#topography').trigger('click');
                    return;
                }
                if (($('#climate').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#precipitation').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#climate').removeClass('active');
                    $('#precipitation').addClass('active');
                    $('#precipitation').trigger('click');
                    return;
                }
                if (($('#land').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#climate').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#land').removeClass('active');
                    $('#climate').addClass('active');
                    $('#climate').trigger('click');
                    return;
                }
                if (($('#lid').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#land').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#lid').removeClass('active');
                    $('#land').addClass('active');
                    $('#land').trigger('click');
                    return;
                }
                if (($('#cost').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#lid').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#cost').removeClass('active');
                    $('#lid').addClass('active');
                    $('#lid').trigger('click');
                    return;
                }
                if (($('#results').hasClass('active'))) {
                    $('.navigation').animate({ scrollLeft: $('#cost').offset().left - $('.navigation').offset().left + $('.navigation').scrollLeft() - 25 }, 400);
                    $('#results').removeClass('active');
                    $('#cost').addClass('active');
                    $('#cost').trigger('click');
                    return;
                }
            }
        });
    }
});

function pageLoaded()
{
  $('#loadApplicationDiv').hide();
}

function loadXMLFile(e)
{
  var files = e.target.files;
  var reader = new FileReader();

  reader.onload = function()
  {
    var parsed = new DOMParser().parseFromString(this.result, "text/xml");

    var xmlLocationArray = [];

    var xmlLocation = parsed.getElementsByTagName("siteLocation")[0].childNodes[0].nodeValue;

    xmlLocationArray = xmlLocation.split(',');

    sessionStorage.latitude = xmlLocationArray[0];
    sessionStorage.longitude = xmlLocationArray[1];

    // if (parsed.getElementsByTagName("siteLocationName")[0].childNodes[0].nodeValue != '')
    // {
    //     sessionStorage.location = parsed.getElementsByTagName("siteLocationName")[0].childNodes[0].nodeValue;
    // }

    sessionStorage.acres = parsed.getElementsByTagName("siteArea")[0].childNodes[0].nodeValue;

    /*
     * Gets the sites location
     */
    var location = new Microsoft.Maps.Location(xmlLocationArray[0], xmlLocationArray[1]);

    map.setView(
    {
      center: location,
      zoom: 18
    });

    map.entities.remove(locationMarker);

    locationMarker = new Microsoft.Maps.Pushpin(location);

    locationMarker.setOptions(
    {
      icon: 'stormwatercalculator/images/mapMarker.png'
    });

    map.entities.push(locationMarker);

    soilDataURLString = '/swcalculator-server/api/v1/soils?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude + '&distance=1000';

    precipitationURLString = '/swcalculator-server/api/v1/metStations?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;


    costURLString = '/swcalculator-server/api/v1/costing?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

    soilDataBoolean = false;

    removePolygons();
    removePrecipitationIcons();

    getPrecipitationData();
    getCostingRegionalization();

    /*
     * Draws site radius or custom area
     */
     if (parsed.getElementsByTagName("customAreaLatitude")[0].childNodes.length == 0)
     {
        siteRadius = sessionStorage.acres / 61.77625;
        drawSiteRadius(sessionStorage.acres);
     }
     else
     {
        var customAreaXMLArray = [];
        var customAreaLatitudeSplit = [];
        var customAreaLongitudeSplit = [];

        var siteAreaPolygonXML1 = parsed.getElementsByTagName("customAreaLatitude")[0].childNodes[0].nodeValue;
        var siteAreaPolygonXML2 = parsed.getElementsByTagName("customAreaLongitude")[0].childNodes[0].nodeValue;

        customAreaLatitudeSplit = siteAreaPolygonXML1.split(",");
        customAreaLongitudeSplit = siteAreaPolygonXML2.split(",");

        for (var i = 0; i < customAreaLatitudeSplit.length; i++)
        {
            var microsoftMap = new Microsoft.Maps.Location(customAreaLatitudeSplit[i], customAreaLongitudeSplit[i]);

            customAreaXMLArray.push(microsoftMap);
        }

        siteAreaPolygon = new Microsoft.Maps.Polygon(customAreaXMLArray,
        {
            strokeColor: '#ffb74d',
            fillColor: 'rgba(255, 183, 77, 0.6)',
            strokeThickness: 2,
        });

        map.entities.push(siteAreaPolygon);
     }



    sessionStorage.soilType = parsed.getElementsByTagName("hydSoilGroup")[0].childNodes[0].nodeValue;
    sessionStorage.soilDrainage = parsed.getElementsByTagName("hydConductivity")[0].childNodes[0].nodeValue;
    sessionStorage.topography = parsed.getElementsByTagName("surfaceSlope")[0].childNodes[0].nodeValue;
    sessionStorage.forest = parsed.getElementsByTagName("percForest")[0].childNodes[0].nodeValue;
    sessionStorage.meadow = parsed.getElementsByTagName("percMeadow")[0].childNodes[0].nodeValue;
    sessionStorage.lawn = parsed.getElementsByTagName("percLawn")[0].childNodes[0].nodeValue;
    sessionStorage.desert = parsed.getElementsByTagName("percDesert")[0].childNodes[0].nodeValue;
    sessionStorage.impervious = parsed.getElementsByTagName("percImpervious")[0].childNodes[0].nodeValue;
    sessionStorage.disconnection = parsed.getElementsByTagName("percDisconnection")[0].childNodes[0].nodeValue;
    $('#disconnectionCaptureValue').val(parsed.getElementsByTagName("disconnectionCaptureRatio")[0].childNodes[0].nodeValue);
    sessionStorage.rainHarvesting = parsed.getElementsByTagName("percHarvesting")[0].childNodes[0].nodeValue;
    $('#rainHarvestingCisternValue').val(parsed.getElementsByTagName("harvestingCisternSize")[0].childNodes[0].nodeValue);
    $('#rainHarvestingRateValue').val(parsed.getElementsByTagName("harvestingCisternNumber")[0].childNodes[0].nodeValue);
    $('#rainHarvestingFeetValue').val(parsed.getElementsByTagName("harvestingEmptyingRate")[0].childNodes[0].nodeValue);
    sessionStorage.rainGardens = parsed.getElementsByTagName("percRainGardens")[0].childNodes[0].nodeValue;
    $('#rainGardensPondingValue').val(parsed.getElementsByTagName("rainGardensPondingHeight")[0].childNodes[0].nodeValue);
    $('#rainGardensThicknessValue').val(parsed.getElementsByTagName("rainGardensSoilThickness")[0].childNodes[0].nodeValue);
    $('#rainGardensMediaValue').val(parsed.getElementsByTagName("rainGardensSoilKsat")[0].childNodes[0].nodeValue);
    $('#rainGardensCaptureValue').val(parsed.getElementsByTagName("rainGardensCaptureRatio")[0].childNodes[0].nodeValue);
    sessionStorage.greenRoofs = parsed.getElementsByTagName("percGreenRoofs")[0].childNodes[0].nodeValue;
    $('#greenRoofsThicknessValue').val(parsed.getElementsByTagName("greenRoofSoilThickness")[0].childNodes[0].nodeValue);
    $('#greenRoofsMediaValue').val(parsed.getElementsByTagName("greenRoofSoilKsat")[0].childNodes[0].nodeValue);
    sessionStorage.streetPlanters = parsed.getElementsByTagName("percStreetPlanters")[0].childNodes[0].nodeValue;
    $('#streetPlantersPondingValue').val(parsed.getElementsByTagName("streetPlantersPondingHeight")[0].childNodes[0].nodeValue);
    $('#streetPlantersThicknessValue').val(parsed.getElementsByTagName("streetPlantersSoilThickness")[0].childNodes[0].nodeValue);
    $('#streetPlantersMediaValue').val(parsed.getElementsByTagName("streetPlantersSoilKsat")[0].childNodes[0].nodeValue);
    $('#streetPlantersGravelValue').val(parsed.getElementsByTagName("streetPlantersGravelThickness")[0].childNodes[0].nodeValue);
    $('#streetPlantersCaptureValue').val(parsed.getElementsByTagName("streetPlantersCaptureRatio")[0].childNodes[0].nodeValue);
    sessionStorage.infiltrationBasins = parsed.getElementsByTagName("percInfilBasin")[0].childNodes[0].nodeValue;
    $('#infiltrationBasinsBasinValue').val(parsed.getElementsByTagName("infilBasinBasinDepth")[0].childNodes[0].nodeValue);
    $('#infiltrationBasinsCaptureValue').val(parsed.getElementsByTagName("infilBasinCaptureRatio")[0].childNodes[0].nodeValue);
    sessionStorage.permeablePavement = parsed.getElementsByTagName("percPorousPavement")[0].childNodes[0].nodeValue;
    $('#permeablePavementPavementValue').val(parsed.getElementsByTagName("porousPavementPavementThickness")[0].childNodes[0].nodeValue);
    $('#permeablePavementGravelValue').val(parsed.getElementsByTagName("porousPavementGravelThickness")[0].childNodes[0].nodeValue);
    $('#permeablePavementCaptureValue').val(parsed.getElementsByTagName("porousPavementCaptureRatio")[0].childNodes[0].nodeValue);
    sessionStorage.designStorm = parsed.getElementsByTagName("designStorm")[0].childNodes[0].nodeValue;
    sessionStorage.yearsToAnalyze = parsed.getElementsByTagName("yearsAnalyzed")[0].childNodes[0].nodeValue;
    sessionStorage.eventThreshold = parsed.getElementsByTagName("runoffThreshold")[0].childNodes[0].nodeValue;
    sessionStorage.ignoreDays = parsed.getElementsByTagName("ignoreConsecStorms")[0].childNodes[0].nodeValue;
    sessionStorage.climateScenario = parsed.getElementsByTagName("climateScenario")[0].childNodes[0].nodeValue;
    sessionStorage.climateYear = parsed.getElementsByTagName("climateYear")[0].childNodes[0].nodeValue;
    sessionStorage.newDevelopment = parsed.getElementsByTagName("isNewDevelopment")[0].childNodes[0].nodeValue;
    sessionStorage.reDevelopment = parsed.getElementsByTagName("isReDevelopment")[0].childNodes[0].nodeValue;
    sessionStorage.poor = parsed.getElementsByTagName("siteSuitabilityPoor")[0].childNodes[0].nodeValue;
    sessionStorage.moderate = parsed.getElementsByTagName("siteSuitabilityModerate")[0].childNodes[0].nodeValue;
    sessionStorage.excellent = parsed.getElementsByTagName("siteSuitabilityExcellent")[0].childNodes[0].nodeValue;
    $('#rainGardensPretreatment').prop('checked', parsed.getElementsByTagName("rgPretreatment")[0].childNodes[0].nodeValue);
    $('#infiltrationBasinsPretreatment').prop('checked', parsed.getElementsByTagName("ibPretreatment")[0].childNodes[0].nodeValue);
    $('#permeablePavementPretreatment').prop('checked', parsed.getElementsByTagName("ppPretreatment")[0].childNodes[0].nodeValue);

    setTimeout(function()
    {
      sessionStorage.rainGageID = parsed.getElementsByTagName("precStationID")[0].childNodes[0].nodeValue;
      sessionStorage.weatherStationID = parsed.getElementsByTagName("evapStationID")[0].childNodes[0].nodeValue;
      sessionStorage.rainGageName = parsed.getElementsByTagName("precStationName")[0].childNodes[0].nodeValue;
      sessionStorage.weatherStationName = parsed.getElementsByTagName("evapStationName")[0].childNodes[0].nodeValue;
      sessionStorage.costRegion = parsed.getElementsByTagName("cmbCostRegion")[0].childNodes[0].nodeValue;
      sessionStorage.costRegionName = parsed.getElementsByTagName("costRegionName")[0].childNodes[0].nodeValue;
      sessionStorage.costRegionValue = parsed.getElementsByTagName("tbRegMultiplier")[0].childNodes[0].nodeValue;
    }, 800);

    $('#getStartedButton').trigger('click');
  }

  reader.readAsText(files[0]);
}

function initializeMap()
{
    map = new Microsoft.Maps.Map('#bingMap',
        {
              credentials: 'AlGvueuNZnD_urhJrwx4LVMS2ooL_rXC57QSlQ9hIsSJwpIXBgbx4Q6PLcCcx2Fp',
              center: new Microsoft.Maps.Location(40, -98.5),
              zoom: 4,
              showLocateMeButton: false,
              enableClickableLogo: false
          });

  var center = map.getCenter();

  var exteriorRing =
  [
    center,
    new Microsoft.Maps.Location(center.latitude, center.longitude),
    new Microsoft.Maps.Location(center.latitude, center.longitude),
    center
  ];

  locationMarker = new Microsoft.Maps.Pushpin(center);

  locationMarker.setOptions(
  {
    icon: 'stormwatercalculator/images/mapMarker.png'
  });

  siteRadiusPolygon = new Microsoft.Maps.Polygon(exteriorRing,
  {
    strokeColor: '#ffb74d',
    fillColor: 'rgba(255, 183, 77, 0.6)',
    strokeThickness: 2,
  });

  map.entities.push(locationMarker);
  map.entities.push(siteRadiusPolygon);

  soilDataURLString = '/swcalculator-server/api/v1/soils?latitude=' + 40 + '&longitude=' + locationMarker.getLocation().longitude + '&distance=1000';

  precipitationURLString = '/swcalculator-server/api/v1/metStations?latitude=' + 40 + '&longitude=' + locationMarker.getLocation().longitude;

  costURLString = '/swcalculator-server/api/v1/costing?latitude=' + 40 + '&longitude=' + locationMarker.getLocation().longitude;

  getPrecipitationData();
  getCostingRegionalization();
}

function moveLocationIcon(e)
{
  if (e.targetType == 'map')
  {
    var newLocation = new Microsoft.Maps.Point(e.getX(), e.getY());
    var locTemp = e.target.tryPixelToLocation(newLocation);
    var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);

    sessionStorage.latitude = locTemp.latitude;
    sessionStorage.longitude = locTemp.longitude;
    sessionStorage.acres = 0;

    $('#acreInput').val(0);

    map.setView(
    {
      center: location
    });

    center = map.getCenter();

    map.entities.remove(locationMarker);
    map.entities.remove(siteRadiusPolygon);
    map.entities.remove(siteAreaPolygon);

    var exteriorRing =
    [
      center,
      new Microsoft.Maps.Location(center.latitude, center.longitude),
      new Microsoft.Maps.Location(center.latitude, center.longitude),
      center
    ];

    locationMarker = new Microsoft.Maps.Pushpin(location);

    locationMarker.setOptions(
    {
      icon: 'stormwatercalculator/images/mapMarker.png'
    });

    siteRadiusPolygon = new Microsoft.Maps.Polygon(exteriorRing,
    {
      strokeColor: '#ffb74d',
      fillColor: 'rgba(255, 183, 77, 0.6)',
      strokeThickness: 2,
    });

    map.entities.push(locationMarker);
    map.entities.push(siteRadiusPolygon);

    soilDataURLString = '/swcalculator-server/api/v1/soils?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude + '&distance=1000';

    precipitationURLString = '/swcalculator-server/api/v1/metStations?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

    costURLString = '/swcalculator-server/api/v1/costing?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

    soilDataBoolean = false;

    removePolygons();
    removePrecipitationIcons();

    getPrecipitationData();
    getCostingRegionalization();

    checkResultsGenerated();

    $('#acreInput').val(0);
  }
}

function MakeGeocodeRequest(credentials)
{
  var geocodeRequest = 'https://dev.virtualearth.net/REST/v1/Locations/' + addressToFind + '?output=json&jsonp=GeocodeCallback&key=' + credentials;

  CallRestService(geocodeRequest);
}

function GeocodeCallback(result)
{
  if (result &&
      result.resourceSets &&
      result.resourceSets.length > 0 &&
      result.resourceSets[0].resources &&
      result.resourceSets[0].resources.length > 0)
  {
    var bbox = result.resourceSets[0].resources[0].bbox;
    var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(bbox[0], bbox[1]), new Microsoft.Maps.Location(bbox[2], bbox[3]));

    map.setView(
    {
      bounds: viewBoundaries
    });

    var location = new Microsoft.Maps.Location(result.resourceSets[0].resources[0].point.coordinates[0], result.resourceSets[0].resources[0].point.coordinates[1]);

    map.setView(
    {
      center: location,
      zoom: 18
    });

    center = map.getCenter();

    map.entities.remove(locationMarker);
    map.entities.remove(siteRadiusPolygon);
    map.entities.remove(siteAreaPolygon);

    var exteriorRing =
    [
      center,
      new Microsoft.Maps.Location(center.latitude, center.longitude),
      new Microsoft.Maps.Location(center.latitude, center.longitude),
      center
    ];

    locationMarker = new Microsoft.Maps.Pushpin(location);

    locationMarker.setOptions(
    {
      icon: 'stormwatercalculator/images/mapMarker.png'
    });

    siteRadiusPolygon = new Microsoft.Maps.Polygon(exteriorRing,
    {
      strokeColor: '#ffb74d',
      fillColor: 'rgba(255, 183, 77, 0.6)',
      strokeThickness: 2,
    });

    map.entities.push(locationMarker);
    map.entities.push(siteRadiusPolygon);

    soilDataURLString = '/swcalculator-server/api/v1/soils?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude + '&distance=1000';

    precipitationURLString = '/swcalculator-server/api/v1/metStations?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

    costURLString = '/swcalculator-server/api/v1/costing?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

    sessionStorage.location = $('#locationInput').val();
    sessionStorage.latitude = locationMarker.getLocation().latitude;
    sessionStorage.longitude = locationMarker.getLocation().longitude;
    sessionStorage.acres = 0;

    soilDataBoolean = false;

    removePolygons();
    removePrecipitationIcons();

    getPrecipitationData();
    getCostingRegionalization();

    checkResultsGenerated();

    $('#acreInput').val(0);

   }
}

function CallRestService(request)
{
  var script = document.createElement('script');

  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', request);

  document.body.appendChild(script);
}

function drawSiteRadius()
{
  siteAreaMarkerArray = [];
  siteAreaMarkerLocationArray = [];
  siteAreaLineArray = [];

  var earthRadius = 3185.5;

  var lat = (locationMarker.getLocation().latitude * Math.PI) / 180;
  var lon = (locationMarker.getLocation().longitude * Math.PI) / 180;
  var distance = siteRadius / earthRadius;
  var points = new Array();

  for (var i = 0; i <= 360; i++)
  {
    var p2 = new Microsoft.Maps.Location(0, 0);
    brng = i * Math.PI / 180;

    p2.latitude = Math.asin(Math.sin(lat) * Math.cos(distance) + Math.cos(lat) * Math.sin(distance) * Math.cos(brng));
    p2.longitude = ((lon + Math.atan2(Math.sin(brng) * Math.sin(distance) * Math.cos(lat),
                    Math.cos(distance) - Math.sin(lat) * Math.sin(p2.latitude))) * 180) / Math.PI;
    p2.latitude = (p2.latitude * 180) / Math.PI;
    points.push(p2);
  }
  siteRadiusPolygon.setLocations(points);

  checkResultsGenerated();
}

function drawCustomArea()
{
  var selectedPin;
  var count = 1;
  var siteAreaPointArray = [];

  siteAreaMarkerArray = [];
  siteAreaMarkerLocationArray = [];
  siteAreaLineArray = [];

  siteAreaAcres = 0;

  $('#acreInput').val(0);

  sessionStorage.acres = 0;

  drawSiteAreaHandler = Microsoft.Maps.Events.addHandler(map, 'click', function(e)
  {
    if (e.targetType == 'map')
    {
      var pointLocation = new Microsoft.Maps.Point(e.getX(), e.getY());
      var locTemp = e.target.tryPixelToLocation(pointLocation);
      var location = new Microsoft.Maps.Location(locTemp.latitude, locTemp.longitude);

      siteAreaPointArray.push(location);

      siteAreaMarker = new Microsoft.Maps.Pushpin(location,
      {
        icon: 'stormwatercalculator/images/mapmarker2.png',
        draggable: false,
      });

      siteAreaMarker.customid = count;
      siteAreaMarker.siteLocation = location;

      count = count + 1;

      siteAreaLine = new Microsoft.Maps.Polyline(siteAreaPointArray,
      {
        strokeColor: '#ffb74d',
        strokeThickness: 2
      });

      siteAreaMarkerArray.push(siteAreaMarker);
      siteAreaMarkerLocationArray.push(siteAreaMarker.siteLocation);
      siteAreaLineArray.push(siteAreaLine);

      map.entities.push(siteAreaLine);
      map.entities.push(siteAreaMarker);

      selectLastSiteMarkerHandler = Microsoft.Maps.Events.addHandler(siteAreaMarker, 'click', function(e)
      {
        if (e.targetType == 'pushpin')
        {
          selectedPin = e.target;

          if (selectedPin.customid == 1)
          {
            siteAreaMarkerLocationArray.push(selectedPin.siteLocation);

            siteAreaPolygon = new Microsoft.Maps.Polygon(siteAreaMarkerLocationArray,
            {
              strokeColor: '#ffb74d',
              fillColor: 'rgba(255, 183, 77, 0.6)',
              strokeThickness: 2,
            });

            for (var i = 0; i < siteAreaMarkerLocationArray.length - 1; i++)
            {
              var p1 = siteAreaMarkerLocationArray[i];
              var p2 = siteAreaMarkerLocationArray[i + 1];

              siteAreaAcres += (((p2.longitude - p1.longitude) * Math.PI) / 180) * (2 + Math.sin((p1.latitude * Math.PI) / 180) + Math.sin((p2.latitude * Math.PI) / 180));
            }

            siteAreaAcres = siteAreaAcres * 6378137 * 6378137 / 2;
            siteAreaAcres = Math.abs(siteAreaAcres);
            siteAreaAcres = (siteAreaAcres * 0.000247105).toFixed(2);

            if (siteAreaAcres > 12)
            {
              $('#alertDiv').show();
              $('#alertText').html('Site area cannot be more than 12 acres');
              $('#acreInput').val(0);

              sessionStorage.acres = 0;
            }
            else
            {
              $('#acreInput').val(siteAreaAcres);

              sessionStorage.acres = siteAreaAcres;

              map.entities.push(siteAreaPolygon);
            }

            for (var i = 0; i < siteAreaMarkerArray.length; i++)
            {
              map.entities.remove(siteAreaMarkerArray[i]);
            }
            for (var i = 0; i < siteAreaLineArray.length; i++)
            {
              map.entities.remove(siteAreaLineArray[i]);
            }

            $('#customAreaIcon').removeClass('active');

            if ($(window).width() < 1025)
            {
                $('#customAreaIcon').css(
                {
                  'fill': '#fff'
                });
            }
            else
            {
                $('#customAreaIcon').css(
                {
                  'fill': '#7cb2ab'
                });
            }


            $('#locationInput').prop('disabled', false);
            $('#acreInput').prop('disabled', false);

            siteLocationHandler = Microsoft.Maps.Events.addHandler(map, 'click', moveLocationIcon);

            Microsoft.Maps.Events.removeHandler(drawSiteAreaHandler);

            checkResultsGenerated();
          }
          if (selectedPin.customid == (count - 1))
          {
            map.entities.remove(siteAreaMarkerArray[siteAreaMarkerArray.length - 1]);
            map.entities.remove(siteAreaLineArray[siteAreaLineArray.length - 1]);

            siteAreaMarkerArray.splice(siteAreaMarkerArray.length - 1, 1);
            siteAreaLineArray.splice(siteAreaLineArray.length - 1, 1);
            siteAreaPointArray.splice(siteAreaPointArray.length - 1, 1);
            siteAreaMarkerLocationArray.splice(siteAreaMarkerLocationArray.length - 1, 1);

            count = count - 1;
          }
        }
      });
    }
  });
}

function getSoilData(page)
{
  if (soilDataBoolean == false)
  {
    $('#loadingDiv').fadeIn(400);
    $('#loadingDivText').html('Retrieving Soil Data');

    $.ajax(
    {
      type: 'GET',
      url: soilDataURLString,
      async: true,
      dataType: 'json',
      success: function(response)
      {
        $('#loadingDiv').fadeOut(400);

        soilDataPolygonsArray = [];
        soilDataBoolean = true;

        for (var i = 0; i < response.length; i++)
        {
          soilDataCoordinates = [];

          if (page == 'soiltype')
          {
            if (response[i].soilGroup == 'A')
            {
              soilDataFillColor = 'rgba(255, 235, 59, 0.6)';
            }
            if (response[i].soilGroup == 'B')
            {
              soilDataFillColor = 'rgba(255, 128, 171, 0.6)';
            }
            if (response[i].soilGroup == 'C')
            {
              soilDataFillColor = 'rgba(126, 87, 194, 0.6)';
            }
            if (response[i].soilGroup == 'D')
            {
              soilDataFillColor = 'rgba(1, 87, 155, 0.6)';
            }
          }
          if (page == 'soildrainage')
          {
            if (response[i].ksat <= 0.01)
            {
              soilDataFillColor = 'rgba(255, 235, 59, 0.6)';
            }
            if ((response[i].ksat > 0.01) && (response[i].ksat <= 0.1))
            {
              soilDataFillColor = 'rgba(255, 128, 171, 0.6)';
            }
            if ((response[i].ksat > 0.1) && (response[i].ksat <= 1))
            {
              soilDataFillColor = 'rgba(126, 87, 194, 0.6)';
            }
            if (response[i].ksat > 1)
            {
              soilDataFillColor= 'rgba(1, 87, 155, 0.6)';
            }
          }

          if (page == 'topography')
          {
            if (response[i].slope < 5.0)
            {
              soilDataFillColor = 'rgba(255, 235, 59, 0.6)';
            }
            if ((response[i].slope >= 5.0) && (response[i].slope < 10.0))
            {
              soilDataFillColor = 'rgba(255, 128, 171, 0.6)';
            }
            if ((response[i].slope >= 10.0) && (response[i].slope < 15.0))
            {
              soilDataFillColor = 'rgba(126, 87, 194, 0.6)';
            }
            if (response[i].slope >= 15.0)
            {
              soilDataFillColor= 'rgba(1, 87, 155, 0.6)';
            }
          }

          if (Object.keys(response[i]).length != 0)
          {
            for (var j = 0; j < response[i].polygons[0].coord.length; j++)
            {
              var lat = response[i].polygons[0].coord[j].y;
              var lon = response[i].polygons[0].coord[j].x;

              soilDataCoordinates.push(new Microsoft.Maps.Location(lat,lon));
            }
          }

          soilDataPolygons = new Microsoft.Maps.Polygon(soilDataCoordinates,
          {
            fillColor: soilDataFillColor,
            strokeColor: '#000000'
          });

          soilDataPolygons.soilGroup = response[i].soilGroup;
          soilDataPolygons.ksat = response[i].ksat;
          soilDataPolygons.slope = response[i].slope;

          soilDataPolygonsArray.push(soilDataPolygons);

          Microsoft.Maps.Events.addHandler(soilDataPolygons, 'click', function (e)
          {
            if (e.targetType == 'polygon')
            {
                if (sessionStorage.modal == 'soilType')
                {
                  if (e.target.soilGroup == 'A')
                  {
                    $("#sandRadio").prop("checked", true);

                    sessionStorage.soilType = 'A';

                    checkResultsGenerated();
                  }
                  if (e.target.soilGroup == 'B')
                  {
                    $("#sandyLoamRadio").prop("checked", true);

                    sessionStorage.soilType = 'B';

                    checkResultsGenerated();
                  }
                  if (e.target.soilGroup == 'C')
                  {
                    $("#clayLoamRadio").prop("checked", true);

                    sessionStorage.soilType = 'C';

                    checkResultsGenerated();
                  }
                  if (e.target.soilGroup == 'D')
                  {
                    $("#clayRadio").prop("checked", true);

                    sessionStorage.soilType = 'D';

                    checkResultsGenerated();
                  }
              }
              if (sessionStorage.modal == 'soilDrainage')
              {
                $('#soilDrainageBox').val(e.target.ksat.toFixed(2));
                  sessionStorage.soilDrainage = e.target.ksat.toFixed(2);
                  checkResultsGenerated();
              }
              if (sessionStorage.modal == 'topography')
              {
                  if (e.target.slope < 5.0)
                  {
                    $("#flatRadio").prop("checked", true);

                    sessionStorage.topography = 2;

                    checkResultsGenerated();
                  }
                  if ((e.target.slope >= 5.0) && (e.target.slope < 10.0))
                  {
                    $("#moderatelyFlatRadio").prop("checked", true);

                    sessionStorage.topography = 5;

                    checkResultsGenerated();
                  }
                  if ((e.target.slope >= 10.0) && (e.target.slope < 15.0))
                  {
                    $("#moderatelySteepRadio").prop("checked", true);

                    sessionStorage.topography = 10;

                    checkResultsGenerated();
                  }
                  if (e.target.slope >= 15.0)
                  {
                    $("#steepRadio").prop("checked", true);

                    sessionStorage.topography = 15;

                    checkResultsGenerated();
                  }
              }
            }
          });
        }

        map.entities.push(soilDataPolygonsArray);
      }
    });
  }
}

function hidePolygons()
{
  if (soilDataBoolean == true)
  {
    for (var i = 0; i < soilDataPolygonsArray.length; i++)
    {
      soilDataPolygonsArray[i].setOptions(
      {
        visible: false
      });
    }
  }
}

function showPolygons()
{
  if (soilDataBoolean == true)
  {
    for (var i = 0; i < soilDataPolygonsArray.length; i++)
    {
      soilDataPolygonsArray[i].setOptions(
      {
        visible: true
      });
    }
  }
}

function removePolygons()
{
  if (soilDataBoolean == true)
  {
    for (var i = 0; i < soilDataPolygonsArray.length; i++)
    {
      map.entities.remove(soilDataPolygonsArray[i]);
    }
  }
}

function getPrecipitationData()
{
  $.ajax(
  {
    type: 'GET',
    url: precipitationURLString,
    async: true,
    dataType: 'json',
    success: function(response)
    {
      var rainGageCount = 0;
      var weatherStationCount = 0;

      rainGageArray = [];
      weatherStationArray = [];
      sameStationArray = [];
      rainGageOptions = [];
      weatherStationOptions = [];


      for (var i = 0; i < response.precStations.length; i++)
      {
        var location = new Microsoft.Maps.Location(response.precStations[i].lat, response.precStations[i].longitude);

        rainGageMarker = new Microsoft.Maps.Pushpin(location);
        rainGageMarker.name = response.precStations[i].staNam;
        rainGageMarker.id = rainGageCount;
        rainGageMarker.stationID = response.precStations[i].stationId;
        rainGageMarker.startDate = response.precStations[i].sdate;
        rainGageMarker.endDate = response.precStations[i].edate;
        rainGageMarker.rainfall = response.precStations[i].value;

        rainGageMarker.setOptions(
        {
          visible: false,
          icon: 'stormwatercalculator/images/rainGageIcon.png'
        });

        Microsoft.Maps.Events.addHandler(rainGageMarker, 'click', selectRainGageMarker);

        rainGageArray.push(rainGageMarker);
        rainGageOptions.push(
        {
          'name': response.precStations[i].staNam,
          'value': response.precStations[i].staNam,
          'stationID': response.precStations[i].stationId,
          'startDate': response.precStations[i].sdate,
          'endDate': response.precStations[i].edate,
          'rainfall': response.precStations[i].value
        });

        rainGageCount++;

        rainfallDataURLString = '/swcalculator-server/api/v1/metStations/download/precipData/' + response.precStations[0].stationId;

        climateURLString = '/swcalculator-server/api/v1/climate?year=2035&precStationID=' + response.precStations[0].stationId;
      }

      sessionStorage.setItem('rainGageName', rainGageArray[0].name);
      sessionStorage.setItem('rainGageID', rainGageArray[0].stationID);

      for (var i = 0; i < response.evapStations.length; i++)
      {
        var location = new Microsoft.Maps.Location(response.evapStations[i].lat, response.evapStations[i].longitude);

        weatherStationMarker = new Microsoft.Maps.Pushpin(location);
        weatherStationMarker.name = response.evapStations[i].staNam;
        weatherStationMarker.id = weatherStationCount;
        weatherStationMarker.stationID = response.evapStations[i].stationId;
        weatherStationMarker.startDate = response.evapStations[i].sdate;
        weatherStationMarker.endDate = response.evapStations[i].edate;
        weatherStationMarker.rate = (response.evapStations[i].sum / 365).toFixed(2);

        weatherStationMarker.setOptions(
        {
          visible: false,
          icon: 'stormwatercalculator/images/weatherStationIcon.png'
        });

        Microsoft.Maps.Events.addHandler(weatherStationMarker, 'click', selectWeatherStationMarker);

        weatherStationArray.push(weatherStationMarker);
        weatherStationOptions.push(
        {
          'name': response.evapStations[i].staNam,
          'value': response.evapStations[i].staNam,
          'stationID': response.evapStations[i].stationId,
          'startDate': response.evapStations[i].sdate,
          'endDate': response.evapStations[i].edate,
          'rate': (response.evapStations[i].sum / 365).toFixed(2)
        });

        weatherStationCount++;

        weatherDataURLString = '/swcalculator-server/api/v1/metStations/download/evapData/' + response.evapStations[0].stationId;

      }

      sessionStorage.setItem('weatherStationName', weatherStationArray[0].name);
      sessionStorage.setItem('weatherStationID', weatherStationArray[0].stationID);

      for (var i = 0; i < rainGageArray.length; i++)
      {
        for (var j = 0; j < weatherStationArray.length; j++)
        {
            if (i < rainGageArray.length)
            {
              if (rainGageArray[i].name == weatherStationArray[j].name)
              {
                var location = new Microsoft.Maps.Location(rainGageArray[i].getLocation().latitude, rainGageArray[i].getLocation().longitude);

                sameStationMarker = new Microsoft.Maps.Pushpin(location);
                sameStationMarker.name = rainGageArray[i].name;
                sameStationMarker.id1 = rainGageArray[i].id;
                sameStationMarker.id2 = weatherStationArray[j].id;
                sameStationMarker.stationID = rainGageArray[i].stationID;

                sameStationMarker.setOptions(
                {
                  visible: false,
                  icon: 'stormwatercalculator/images/sameStationIcon.png'
                });

                Microsoft.Maps.Events.addHandler(sameStationMarker, 'click', selectSameStationMarker);

                sameStationArray.push(sameStationMarker);

                rainGageArray.splice(i, 1);
              }
          }
        }
      }

      for (var i = 0; i < weatherStationArray.length; i++)
      {
        for (var j = 0; j < sameStationArray.length; j++)
        {
          if (weatherStationArray[i].name == sameStationArray[j].name)
          {
              weatherStationArray.splice(i, 1);
          }
        }
      }

      for (var i = 0; i < rainGageArray.length; i++)
      {
        map.entities.push(rainGageArray[i]);
      }
      for (var i = 0; i < weatherStationArray.length; i++)
      {
        map.entities.push(weatherStationArray[i]);
      }
      for (var i = 0; i < sameStationArray.length; i++)
      {
        map.entities.push(sameStationArray[i]);
      }
    }
  });
}

function showPrecipitationIcons()
{
  for (var i = 0; i < rainGageArray.length; i++)
  {
    rainGageArray[i].setOptions(
    {
      visible: true
    });
  }
  for (var i = 0; i < weatherStationArray.length; i++)
  {
    weatherStationArray[i].setOptions(
    {
      visible: true
    });
  }
  for (var i = 0; i < sameStationArray.length; i++)
  {
    sameStationArray[i].setOptions(
    {
      visible: true
    });
  }
}

function hidePrecipitationIcons()
{
  for (var i = 0; i < rainGageArray.length; i++)
  {
    rainGageArray[i].setOptions(
    {
      visible: false
    });
  }
  for (var i = 0; i < weatherStationArray.length; i++)
  {
    weatherStationArray[i].setOptions(
    {
      visible: false
    });
  }
  for (var i = 0; i < sameStationArray.length; i++)
  {
    sameStationArray[i].setOptions(
    {
      visible: false
    });
  }
}

function removePrecipitationIcons()
{
  for (var i = 0; i < rainGageArray.length; i++)
  {
    map.entities.remove(rainGageArray[i]);
  }
  for (var i = 0; i < weatherStationArray.length; i++)
  {
    map.entities.remove(weatherStationArray[i]);
  }
  for (var i = 0; i < sameStationArray.length; i++)
  {
    map.entities.remove(sameStationArray[i]);
  }
}

function selectRainGageMarker(e)
{
  if (e.targetType == 'pushpin')
  {
    for (var i = 0; i < rainGageArray.length; i++)
    {
      rainGageArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/rainGageIcon.png'
      });
    }

    for (var i = 0; i < weatherStationArray.length; i++)
    {
      if (weatherStationArray[i].image.src.includes('stormwatercalculator/images/weatherStationActiveIcon.png'))
      {
        for (var j = 0; j < sameStationArray.length; j++)
        {
          sameStationArray[j].setOptions(
          {
            icon: 'stormwatercalculator/images/sameStationIcon.png'
          });
        }
      }
    }

    e.target.setOptions(
    {
      icon: 'stormwatercalculator/images/rainGageActiveIcon.png'
    });

    var scope = angular.element(document.getElementById("rainGageSelect")).scope();

    scope.$apply(function()
    {
      scope.selectRainGageIcon(e.target.id);
    });

    sessionStorage.rainGageID = e.target.stationID;
    sessionStorage.rainGageName = e.target.name;

    rainfallDataURLString = '/swcalculator-server/api/v1/metStations/download/precipData/' + sessionStorage.rainGageID;

    climateURLString = '/swcalculator-server/api/v1/climate?year=2035&precStationID=' + sessionStorage.rainGageID;

    checkResultsGenerated();
  }
}

function selectWeatherStationMarker(e)
{
  if (e.targetType == 'pushpin')
  {

    for (var i = 0; i < weatherStationArray.length; i++)
    {
      weatherStationArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/weatherStationIcon.png'
      });
    }

    for (var i = 0; i < rainGageArray.length; i++)
    {
      if (rainGageArray[i].image.src.includes('stormwatercalculator/images/rainGageActiveIcon.png'))
      {
        for (var j = 0; j < sameStationArray.length; j++)
        {
          sameStationArray[j].setOptions(
          {
            icon: 'stormwatercalculator/images/sameStationIcon.png'
          });
        }
      }
    }

    e.target.setOptions(
    {
      icon: 'stormwatercalculator/images/weatherStationActiveIcon.png'
    });

    var scope = angular.element(document.getElementById("weatherStationSelect")).scope();

    scope.$apply(function()
    {
      scope.selectWeatherStationIcon(e.target.id);
    });

    sessionStorage.weatherStationID = e.target.stationID;
    sessionStorage.weatherStationName = e.target.name;

    weatherDataURLString = '/swcalculator-server/api/v1/metStations/download/evapData/' + sessionStorage.weatherStationID;

    checkResultsGenerated();
  }
}

function selectSameStationMarker(e)
{
  if (e.targetType == 'pushpin')
  {
    for (var i = 0; i < rainGageArray.length; i++)
    {
      rainGageArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/rainGageIcon.png'
      });
    }

    for (var i = 0; i < weatherStationArray.length; i++)
    {
      weatherStationArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/weatherStationIcon.png'
      });
    }

    for (var i = 0; i < sameStationArray.length; i++)
    {
      sameStationArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/sameStationIcon.png'
      });
    }

    e.target.setOptions(
    {
      icon: 'stormwatercalculator/images/sameStationActiveIcon.png'
    });

    var scope1 = angular.element(document.getElementById("rainGageSelect")).scope();
    var scope2 = angular.element(document.getElementById("weatherStationSelect")).scope();

    scope1.$apply(function()
    {
      scope1.selectRainGageIcon(e.target.id1);
    });

    scope2.$apply(function()
    {
      scope2.selectWeatherStationIcon(e.target.id2);
    });

    sessionStorage.rainGageID = e.target.stationID;
    sessionStorage.weatherStationID = e.target.stationID;
    sessionStorage.rainGageName = e.target.name;
    sessionStorage.weatherStationName = e.target.name;

    rainfallDataURLString = '/swcalculator-server/api/v1/metStations/download/precipData/' + sessionStorage.rainGageID;

     weatherDataURLString = '/swcalculator-server/api/v1/metStations/download/evapData/' + sessionStorage.weatherStationID;

    climateURLString = '/swcalculator-server/api/v1/climate?year=2035&precStationID=' + sessionStorage.rainGageID;

    checkResultsGenerated();
  }
}

function downloadRainfallWeatherDataMobile()
{
    var email = $('#emailAddressValue').val();

    $('#emailModalHeader').hide();
    $('#emailModalBody').html('<span>Sending Precipitation/Evaporation Data</span><br><img src="stormwatercalculator/images/Spinner.gif" height="75px" width="75px"/>');

    $.ajax(
    {
        type: 'GET',
        url: '/swcalculator-server/api/v1/email/precipData/' + sessionStorage.rainGageID + '/' + email,
        async: true,
        dataType: 'json',
        headers:
        {
            'Authorization': 'Basic c3djYWxjdWxhdG9yQGdtYWlsLmNvbTpTdDBybXdhdGVy'
        },
        success: function ()
        {
            $('#emailModalBody').html('<span>Precipitation/Evaporation Data sent.</span><button type="button" class="btn btn-default" data-dismiss="modal" style="width: 100%; eight: 50px;">Close</button>');
        },
        error: function()
        {
            $('#emailModalHeader').show();
            $('#emailModalBody').html('<div class="alert alert-warning">You have entered an invalid email address. Please enter a valid email address.</div><div class="form-group"><input type="text" class="form-control" placeholder="Email Address" id="emailAddressValue" onchange="determineEmailValue()" ng-model="emailAddressValue"></div><button type="button" class="btn btn-default" id="sendDataButton" onclick="downloadRainfallWeatherDataMobile();">Send Precipitation Data File</button>');
        }
    });

    $.ajax(
    {
        type: 'GET',
        url: '/swcalculator-server/api/v1/email/evapData/' + sessionStorage.weatherStationID + '/' + email,
        async: true,
        dataType: 'json',
        headers:
        {
            'Authorization': 'Basic c3djYWRtaW46c1Qwcm13QHQzciExMjM='
        }
    });
}

function saveSiteMobile()
{
    var email = $('#emailAddressValue').val();

    $('#emailModalHeader').hide();
    $('#emailModalBody').html('<span>Sending SWC XML File</span><br><img src="stormwatercalculator/images/Spinner.gif" height="75px" width="75px"/>');

    $.ajax(
    {
        type: 'POST',
        url: '/swcalculator-server/api/v1/email/emailXml/' + email + '?fileName=' + sessionStorage.siteName + '.xml',
        data: xmlSaveString,
        contentType: 'application/xml',
        async: true,
        headers:
        {
            'Authorization': 'Basic c3djYWRtaW46c1Qwcm13QHQzciExMjM='
        },
      //  dataType: 'json',
        success: function ()
        {
            $('#emailModalBody').html('<span>SWC XML file sent.</span><button type="button" class="btn btn-default" data-dismiss="modal" style="width: 100%; eight: 50px;">Close</button>');
        },
        error: function()
        {
            $('#emailModalHeader').show();
            $('#emailModalBody').html('<div class="alert alert-warning">You have entered an invalid email address. Please enter a valid email address.</div><div class="form-group"><input type="text" class="form-control" placeholder="Email Address" id="emailAddressValue" onchange="determineEmailValue()" ng-model="emailAddressValue"></div><button type="button" class="btn btn-default" id="sendDataButton" onclick="downloadRainfallWeatherDataMobile();">Send SWC XML File</button>');
        }
    });
}

function getClimateChangeData()
{
  $.ajax(
  {
    type: 'GET',
    url: climateURLString,
    async: true,
    dataType: 'json',
    success: function(response)
    {
      warmWetData = [];
      medianData = [];
      hotDryData = [];
      maxWarmWetData = [];
      maxMedianData = [];
      maxHotDryData = [];
      maxHistoricalData = [];

      for (var i = 0; i < response.rainDelta1.length; i++)
      {
        warmWetData.push(response.rainDelta1[i]);
        medianData.push(response.rainDelta2[i]);
        hotDryData.push(response.rainDelta3[i]);
      }

      for (var i = 0; i < response.maxRain1.length; i++)
      {
        maxWarmWetData.push(response.maxRain1[i].toFixed(2));
        maxMedianData.push(response.maxRain2[i].toFixed(2));
        maxHotDryData.push(response.maxRain3[i].toFixed(2));
        maxHistoricalData.push(response.maxRainHistorical[i].toFixed(2));
      }

      var scope = angular.element(document.getElementById("climateChangeCharts")).scope();

      scope.$apply(function()
      {
        scope.drawCharts();
      });
    }
  });
}

function changeLIDModalSlider(sliderNumber)
{
  if(sliderNumber == 0 || sliderNumber == 7 || sliderNumber == 16) {
    var disconnectionCalculatedValue = ($('#disconnectionCaptureValue').val()/100)*(parseInt($('#disconnectionValue').val())/100);
    var rainGardensCalculatedValue = ($('#rainGardensCaptureValue').val()/100)*(parseInt($('#rainGardensValue').val())/100);
    var infiltrationBasinsCalculatedValue = ($('#infiltrationBasinsCaptureValue').val()/100)*(parseInt($('#infiltrationBasinsValue').val())/100);
    sessionStorage.sumOfDiscRainInfiControls = disconnectionCalculatedValue + rainGardensCalculatedValue + infiltrationBasinsCalculatedValue;
  }
    $('.lidModalSlider:eq(' + sliderNumber + ')').bootstrapSlider('setValue', parseInt($('.sliderValue:eq(' + sliderNumber + ')').val()));
}

function calculateDesignStorm(category)
{
  var netStormDepth = parseFloat($('#designStormValue').val()) - parseFloat(sessionStorage.soilDrainage) * 12;

  if (category == 'rainHarvesting')
  {
    $('#rainHarvestingFeetValue').val((1000 * parseFloat($('#designStormValue').val())) / 12 * 7.85 / parseInt($('#rainHarvestingCisternValue').val()));

    $('#rainHarvestingFeetValue').val(Math.ceil($('#rainHarvestingFeetValue').val()));
    $('.lidModalSlider:eq(3)').bootstrapSlider('setValue', Math.ceil(parseInt($('#rainHarvestingFeetValue').val())));
  }
  if (category == 'rainGardens')
  {
    var lidDepth = parseInt($('#rainGardensPondingValue').val()) + parseInt($('#rainGardensThicknessValue').val()) * 45 / 100;

    if (netStormDepth >= lidDepth)
    {
        $('#rainGardensCaptureValue').val(1);
        $('.lidModalSlider:eq(7)').bootstrapSlider('setValue', 1);
    }
    else
    {
        $('#rainGardensCaptureValue').val(parseFloat($('#designStormValue').val()) / (lidDepth - netStormDepth));
        $('#rainGardensCaptureValue').val(Math.min($('#rainGardensCaptureValue').val()), 1);
        $('#rainGardensCaptureValue').val(Math.ceil($('#rainGardensCaptureValue').val() * 100));
        $('.lidModalSlider:eq(7)').bootstrapSlider('setValue', $('#rainGardensCaptureValue').val());
    }
  }
  if (category == 'streetPlanters')
  {
    var lidDepth = parseInt($('#streetPlantersPondingValue').val()) + (parseInt($('#streetPlantersThicknessValue').val()) * 45 / 100) + parseInt($('#streetPlantersGravelValue').val()) * 75 / (100 + 75);

    if (netStormDepth >= lidDepth)
    {
        $('#streetPlantersCaptureValue').val(1);
        $('.lidModalSlider:eq(14)').bootstrapSlider('setValue', 1);
    }
    else
    {
        $('#streetPlantersCaptureValue').val(parseFloat($('#designStormValue').val()) / (lidDepth - netStormDepth));
        $('#streetPlantersCaptureValue').val(Math.min($('#streetPlantersCaptureValue').val()), 1);
        $('#streetPlantersCaptureValue').val(Math.floor($('#streetPlantersCaptureValue').val() * 100));
        $('.lidModalSlider:eq(14)').bootstrapSlider('setValue', $('#streetPlantersCaptureValue').val());
    }
  }
  if (category == 'infiltrationBasins')
  {
    var lidDepth = parseFloat(sessionStorage.soilDrainage) * 48;

    if (parseInt($('#infiltrationBasinsBasinValue').val()) > lidDepth)
    {
        lidDepth = parseInt($('#infiltrationBasinsBasinValue').val());
    }
lidDepth = Math.min(lidDepth, 24);
    if (netStormDepth >= lidDepth)
    {
        $('#infiltrationBasinsCaptureValue').val(1);
        $('.lidModalSlider:eq(16)').bootstrapSlider('setValue', 1);
    }
    else
    {
        $('#infiltrationBasinsCaptureValue').val(parseFloat($('#designStormValue').val()) / (lidDepth - netStormDepth));
        $('#infiltrationBasinsCaptureValue').val(Math.round($('#infiltrationBasinsCaptureValue').val() * 100));
        $('.lidModalSlider:eq(16)').bootstrapSlider('setValue', $('#infiltrationBasinsCaptureValue').val());
        $('#infiltrationBasinsBasinValue').val(Math.round(lidDepth));
   $('.lidModalSlider:eq(15)').bootstrapSlider('setValue', $('#infiltrationBasinsBasinValue').val());
    }
  }
  if (category == 'permeablePavement')
  {
    var lidDepth = parseInt($('#permeablePavementGravelValue').val()) * 75 / 175;

    if (netStormDepth >= lidDepth)
    {
        $('#permeablePavementCaptureValue').val(1);
        $('.lidModalSlider:eq(19)').bootstrapSlider('setValue', 1);
    }
    else
    {
        $('#permeablePavementCaptureValue').val(parseFloat($('#designStormValue').val()) / (lidDepth - netStormDepth));
        $('#permeablePavementCaptureValue').val(Math.ceil($('#permeablePavementCaptureValue').val() * 100));
        $('.lidModalSlider:eq(19)').bootstrapSlider('setValue', $('#permeablePavementCaptureValue').val());
    }
  }
}

function restoreDefaults(category)
{
    if (category == 'disconnection')
    {
        $('#disconnectionCaptureValue').val(100);
        $('.lidModalSlider:eq(0)').bootstrapSlider('setValue', 100);
    }
    if (category == 'rainHarvesting')
    {
        $('#rainHarvestingCisternValue').val(100);
        $('#rainHarvestingRateValue').val(50);
        $('#rainHarvestingFeetValue').val(4);

        $('.lidModalSlider:eq(1)').bootstrapSlider('setValue', 100);
        $('.lidModalSlider:eq(2)').bootstrapSlider('setValue', 50);
        $('.lidModalSlider:eq(3)').bootstrapSlider('setValue', 4);
    }
    if (category == 'rainGardens')
    {
        $('#rainGardensPondingValue').val(6);
        $('#rainGardensThicknessValue').val(12);
        $('#rainGardensMediaValue').val(10);
        $('#rainGardensCaptureValue').val(5);

        $('.lidModalSlider:eq(4)').bootstrapSlider('setValue', 6);
        $('.lidModalSlider:eq(5)').bootstrapSlider('setValue', 12);
        $('.lidModalSlider:eq(6)').bootstrapSlider('setValue', 10);
        $('.lidModalSlider:eq(7)').bootstrapSlider('setValue', 5);
    }
    if (category == 'greenRoofs')
    {
        $('#greenRoofsThicknessValue').val(4);
        $('#greenRoofsMediaValue').val(10);

        $('.lidModalSlider:eq(8)').bootstrapSlider('setValue', 4);
        $('.lidModalSlider:eq(9)').bootstrapSlider('setValue', 10);
    }
    if (category == 'streetPlanters')
    {
        $('#streetPlantersPondingValue').val(6);
        $('#streetPlantersThicknessValue').val(18);
        $('#streetPlantersMediaValue').val(10);
        $('#streetPlantersGravelValue').val(12);
        $('#streetPlantersCaptureValue').val(6);

        $('.lidModalSlider:eq(10)').bootstrapSlider('setValue', 6);
        $('.lidModalSlider:eq(11)').bootstrapSlider('setValue', 18);
        $('.lidModalSlider:eq(12)').bootstrapSlider('setValue', 10);
        $('.lidModalSlider:eq(13)').bootstrapSlider('setValue', 12);
        $('.lidModalSlider:eq(14)').bootstrapSlider('setValue', 6);
    }
    if (category == 'infiltrationBasins')
    {
        $('#infiltrationBasinsBasinValue').val(6);
        $('#infiltrationBasinsCaptureValue').val(5);

        $('.lidModalSlider:eq(15)').bootstrapSlider('setValue', 6);
        $('.lidModalSlider:eq(16)').bootstrapSlider('setValue', 5);
    }
    if (category == 'permeablePavement')
    {
        $('#permeablePavementPavementValue').val(6);
        $('#permeablePavementGravelValue').val(18);
        $('#permeablePavementCaptureValue').val(100);

        $('.lidModalSlider:eq(17)').bootstrapSlider('setValue', 6);
        $('.lidModalSlider:eq(18)').bootstrapSlider('setValue', 18);
        $('.lidModalSlider:eq(19)').bootstrapSlider('setValue', 100);
    }
}

function getCostingRegionalization()
{
  $.ajax(
  {
    type: 'GET',
    url: costURLString,
    async: true,
    dataType: 'json',
    success: function(response)
    {
      costOptions = [];

      var count = 0;

      for (var i = 0; i < response.length; i++)
      {
        console.log("Inflation Factor " + response[i].inflationFactor) ;
        costOptions.push(
        {
          'name': response[i].selectString.split(')')[0] + ')',
          'value': response[i].selectString.split(')')[0] + ')',
          'selectedValue' : count,
          'regionalFactor': response[i].regionalFactor,
          'inflationFactor': response[i].inflationFactor
        });

        count++;
      }

      sessionStorage.setItem('costRegionName', costOptions[0].name);
      sessionStorage.setItem('costRegionValue', costOptions[0].regionalFactor);
      sessionStorage.setItem('inflationFactor', costOptions[0].inflationFactor);
    }
  });
}

function getResults()
{
  $('#loadingDiv').fadeIn(400);
  $('#loadingDivText').html('Generating Results');

  $.ajax(
  {
    type: 'POST',
    url: '/swcalculator-server/api/v1/calculate/siteData',
    async: true,
    contentType: 'application/xml',
    data: xmlString,
    // error : onError,
    success: function(response)
    {
      $('#loadingDiv').fadeOut(400);

      var squareFootValue = parseFloat(sessionStorage.acres) * 43560;

      var disconnectionSizeValue = parseInt($('#disconnectionCaptureValue').val());
    var rainGardensSizeValue = parseInt($('#rainGardensCaptureValue').val());
        var rainHarvestingSizeValue1 = parseInt($('#rainHarvestingCisternValue').val());
        var rainHarvestingSizeValue2 = parseInt($('#rainHarvestingFeetValue').val());
    var streetPlantersSizeValue = parseInt($('#streetPlantersCaptureValue').val());
    var infiltrationBasinsSizeValue = parseInt($('#infiltrationBasinsCaptureValue').val());
    var permeablePavementSizeValue = parseInt($('#permeablePavementCaptureValue').val());

    var costRegionValue = parseFloat(sessionStorage.costRegionValue);
    var inflationFactor = parseFloat(sessionStorage.inflationFactor);

    disconnectionArea = parseInt(sessionStorage.disconnection);
    rainwaterArea = parseInt(sessionStorage.rainHarvesting);
    rainGardensArea = parseInt(sessionStorage.rainGardens);
    greenRoofsArea = parseInt(sessionStorage.greenRoofs);
    streetPlantersArea = parseInt(sessionStorage.streetPlanters);
    infiltrationArea = parseInt(sessionStorage.infiltrationBasins);
    permeableArea = parseInt(sessionStorage.permeablePavement);

     disconnectionSquareFoot = (squareFootValue * (disconnectionArea / 100));
     disconnectionSquareFoot = (disconnectionSquareFoot * ((disconnectionSizeValue / 100)));

     rainwaterSquareFoot = ((0.001 * squareFootValue * (rainwaterArea / 100) * (rainHarvestingSizeValue1 * rainHarvestingSizeValue2)));

    rainGardensSquareFoot = (squareFootValue * (rainGardensArea / 100));
    rainGardensSquareFoot = rainGardensSquareFoot * ((rainGardensSizeValue / 100));

    greenRoofsSquareFoot = (squareFootValue * (greenRoofsArea / 100));

    streetPlantersSquareFoot = (squareFootValue * (streetPlantersArea / 100));
    streetPlantersSquareFoot = (streetPlantersSquareFoot * ((streetPlantersSizeValue / 100)));

    infiltrationBasinsSquareFoot = (squareFootValue * (infiltrationArea / 100));
    infiltrationBasinsSquareFoot = infiltrationBasinsSquareFoot * ((infiltrationBasinsSizeValue / 100));

    permeablePavementSquareFoot = (squareFootValue * (permeableArea / 100));
    permeablePavementSquareFoot = (permeablePavementSquareFoot * ((permeablePavementSizeValue / 100)));

      summaryChartArray = [];
      summaryTableArray = [];
      rainfallRunoffEventsArray = [];
      rainfallFrequencyArray = [];
      runoffFrequencyArray = [];
      rainfallRetentionArray = [];
      runoffContributionArray = [];
      extremeEventRainfallDepthArray = [];
      extremeEventRunoffDepthArray = [];
      extremeEventRainfallPeakArray = [];
      extremeEventRunoffPeakArray = [];

      simpleTotal = 0;
      typicalTotal = 0;
      complexTotal = 0;

      if (sessionStorage.newDevelopment == 'true')
      {
        simpleTotal++;
      }
      if (sessionStorage.reDevelopment == 'true')
      {
        typicalTotal++;
        complexTotal++;
      }
      if (($('#rainGardensPretreatment').prop('checked') == true) || ($('#infiltrationBasinsPretreatment').prop('checked') == true) || ($('#permeablePavementsPretreatment').prop('checked') == true))
      {
        typicalTotal++;
        complexTotal++;
      }
      if (sessionStorage.poor == 'true')
      {
        complexTotal++;
      }
      if (sessionStorage.moderate == 'true')
      {
        typicalTotal++;
      }
      if (sessionStorage.excellent == 'true')
      {
        simpleTotal++;
      }
      if (sessionStorage.topography == 2)
      {
        simpleTotal++;
      }
      if (sessionStorage.topography == 5)
      {
        simpleTotal++;
        typicalTotal++;
      }
      if (sessionStorage.topography == 10)
      {
        typicalTotal++;
        complexTotal++;
      }
      if (sessionStorage.topography == 15)
      {
        complexTotal++;;
      }
      if (sessionStorage.soilType == 'A')
      {
        simpleTotal++;
      }
      if (sessionStorage.soilType == 'B')
      {
        typicalTotal++;
      }
      if (sessionStorage.soilType == 'C')
      {
        complexTotal++;
      }
      if (sessionStorage.soilType == 'D')
      {
        complexTotal++;
      }

      if (sessionStorage.disconnection != 0)
      {
        currentDisconnectionMaintenanceLow = ((0.05 * disconnectionSquareFoot) + 1e-13) * costRegionValue * inflationFactor;
        currentDisconnectionMaintenanceHigh = (0.0751 * disconnectionSquareFoot) * costRegionValue * inflationFactor;
      }
      else
      {
        currentDisconnectionMaintenanceLow = 0;
        currentDisconnectionMaintenanceHigh = 0;
      }
      if (sessionStorage.rainHarvesting != 0)
      {
         currentRainHarvestingMaintenanceLow = ((0.1003 * rainwaterSquareFoot) + 0.0002) * costRegionValue * inflationFactor;
         currentRainHarvestingMaintenanceHigh = ((0.2407 * rainwaterSquareFoot) + 0.0006) * costRegionValue * inflationFactor;
      }
      else
      {
        currentRainHarvestingMaintenanceLow = 0;
        currentRainHarvestingMaintenanceHigh = 0;
      }
      if (sessionStorage.rainGardens != 0)
      {
        currentRainGardensMaintenanceLow = (0.0675 * rainGardensSquareFoot) * costRegionValue * inflationFactor;
        currentRainGardensMaintenanceHigh = (1.632 * rainGardensSquareFoot) * costRegionValue * inflationFactor;
      }
      else
      {
          currentRainGardensMaintenanceLow = 0;
          currentRainGardensMaintenanceHigh = 0;
      }
      if (sessionStorage.greenRoofs != 0)
      {
          currentGreenRoofsMaintenanceLow = ((0.0281 * greenRoofsSquareFoot) + 6e-14) * costRegionValue * inflationFactor;
          currentGreenRoofsMaintenanceHigh = ((0.2821 * greenRoofsSquareFoot) + 1e-12) * costRegionValue * inflationFactor;
      }
      else
      {
          currentGreenRoofsMaintenanceLow = 0;
          currentGreenRoofsMaintenanceHigh = 0;
      }
      if (sessionStorage.streetPlanters != 0)
      {
          currentStreetPlantersMaintenanceLow = (0.045 * streetPlantersSquareFoot) * costRegionValue * inflationFactor;
          currentStreetPlantersMaintenanceHigh = ((1.0697 * streetPlantersSquareFoot) + 4e-12) * costRegionValue * inflationFactor;
      }
      else
      {
          currentStreetPlantersMaintenanceLow= 0;
          currentStreetPlantersMaintenanceHigh = 0;
      }
      if (sessionStorage.infiltrationBasins != 0)
      {
          currentInfiltrationBasinsMaintenanceLow = ((0.0487 * infiltrationBasinsSquareFoot) + 2e-13) * costRegionValue * inflationFactor;
          currentInfiltrationBasinsMaintenanceHigh = ((1.7689 * infiltrationBasinsSquareFoot) + 8e-12) * costRegionValue * inflationFactor;
      }
      else
      {
          currentInfiltrationBasinsMaintenanceLow = 0;
          currentInfiltrationBasinsMaintenanceHigh = 0;
      }
      if (sessionStorage.permeablePavement != 0)
      {
          currentPermeablePavementMaintenanceLow  = (0.0563 * permeablePavementSquareFoot) * costRegionValue * inflationFactor;
          currentPermeablePavementMaintenanceHigh = ((0.3075 * permeablePavementSquareFoot) + 1e-12) * costRegionValue * inflationFactor;
      }
      else
      {
          currentPermeablePavementMaintenanceLow= 0;
          currentPermeablePavementMaintenanceHigh = 0;
      }

      if ((complexTotal >= typicalTotal) && (complexTotal >= simpleTotal))
       {
         costComplexity = 'complex';
       }
       else if ((typicalTotal >= complexTotal) && (typicalTotal >= simpleTotal))
       {
         costComplexity = 'typical';
       }
       else
       {
         costComplexity = 'simple';
       }

      if (costComplexity == 'simple')
      {
        if (sessionStorage.disconnection != 0)
        {
          currentDisconnectionLowCapital = ((0.2142 * disconnectionSquareFoot) + 159.75) * costRegionValue * inflationFactor;
          currentDisconnectionHighCapital = ((1.9321 * disconnectionSquareFoot) + 1041.3) * costRegionValue * inflationFactor;
        }
        else
        {
          currentDisconnectionLowCapital = 0;
          currentDisconnectionHighCapital = 0;
        }
        if (sessionStorage.rainHarvesting != 0)
        {
          currentRainHarvestingLowCapital = ((0.3844 * rainwaterSquareFoot) + 61.8) * costRegionValue * inflationFactor;
          currentRainHarvestingHighCapital = ((0.577 * rainwaterSquareFoot) + 1812.9) * costRegionValue * inflationFactor;
        }
        else
        {
          currentRainHarvestingLowCapital = 0;
          currentRainHarvestingHighCapital = 0;
        }
        if (sessionStorage.rainGardens != 0)
        {
          currentRainGardensLowCapital = ((0.2717 * rainGardensSquareFoot) + 346.08) * costRegionValue * inflationFactor;
          currentRainGardensHighCapital = ((0.9204 * rainGardensSquareFoot) + 2021) * costRegionValue * inflationFactor;
        }
        else
        {
          currentRainGardensLowCapital = 0;
          currentRainGardensHighCapital = 0;
        }
        if (sessionStorage.greenRoofs != 0)
        {
          currentGreenRoofsLowCapital = ((0.5421 * greenRoofsSquareFoot) + 1975.2) * costRegionValue * inflationFactor;
          currentGreenRoofsHighCapital = ((1.5215 * greenRoofsSquareFoot) + 2631.6) * costRegionValue * inflationFactor;
        }
        else
        {
          currentGreenRoofsLowCapital = 0;
          currentGreenRoofsHighCapital = 0;
        }
        if (sessionStorage.streetPlanters != 0)
        {
          currentStreetPlantersLowCapital = ((0.5592 * streetPlantersSquareFoot) + 1928.2) * costRegionValue * inflationFactor;
          currentStreetPlantersHighCapital = ((1.6359 * streetPlantersSquareFoot) + 2254.4) * costRegionValue * inflationFactor;
        }
        else
        {
          currentStreetPlantersLowCapital = 0;
          currentStreetPlantersHighCapital = 0;
        }
        if (sessionStorage.infiltrationBasins != 0)
        {
          currentInfiltrationBasinsLowCapital = ((0.8205 * infiltrationBasinsSquareFoot) + 1928.2) * costRegionValue * inflationFactor;
          currentInfiltrationBasinsHighCapital = ((0.8339 * infiltrationBasinsSquareFoot) + 2896.1) * costRegionValue * inflationFactor;
        }
        else
        {
          currentInfiltrationBasinsLowCapital = 0;
          currentInfiltrationBasinsHighCapital = 0;
        }
        if (sessionStorage.permeablePavement != 0)
        {
          currentPermeablePavementLowCapital = ((2.3502 * permeablePavementSquareFoot) + 1545) * costRegionValue * inflationFactor;
          currentPermeablePavementHighCapital = ((3.5355 * permeablePavementSquareFoot) + 1672.5) * costRegionValue * inflationFactor;
        }
        else
        {
          currentPermeablePavementLowCapital = 0;
          currentPermeablePavementHighCapital = 0;
        }
      }
      if (costComplexity == 'typical')
      {
        if (sessionStorage.disconnection != 0)
        {
          currentDisconnectionLowCapital = ((3.65 * disconnectionSquareFoot) + 1922.8) * costRegionValue * inflationFactor;
          currentDisconnectionHighCapital = ((4.6869 * disconnectionSquareFoot) + 2864.7) * costRegionValue * inflationFactor;
        }
        else
        {
          currentDisconnectionLowCapital = 0;
          currentDisconnectionHighCapital = 0;
        }
        if (sessionStorage.rainHarvesting != 0)
        {
          currentRainHarvestingLowCapital = ((0.7697 * rainwaterSquareFoot) + 3564) * costRegionValue * inflationFactor;
          currentRainHarvestingHighCapital = ((1.0891 * rainwaterSquareFoot) + 3957) * costRegionValue * inflationFactor;
        }
        else
        {
          currentRainHarvestingLowCapital = 0;
          currentRainHarvestingHighCapital = 0;
        }
        if (sessionStorage.rainGardens != 0)
        {
          currentRainGardensLowCapital = ((1.5691 * rainGardensSquareFoot) + 3696) * costRegionValue * inflationFactor;
          currentRainGardensHighCapital = ((3.29 * rainGardensSquareFoot) + 6873.8) * costRegionValue * inflationFactor;
        }
        else
        {
          currentRainGardensLowCapital = 0;
          currentRainGardensHighCapital = 0;
        }
        if (sessionStorage.greenRoofs != 0)
        {
          currentGreenRoofsLowCapital = ((2.5009 * greenRoofsSquareFoot) + 3288) * costRegionValue * inflationFactor;
          currentGreenRoofsHighCapital = ((5.0205 * greenRoofsSquareFoot) + 12056) * costRegionValue * inflationFactor;
        }
        else
        {
          currentGreenRoofsLowCapital = 0;
          currentGreenRoofsHighCapital = 0;
        }
        if (sessionStorage.streetPlanters != 0)
        {
          currentStreetPlantersLowCapital = ((2.7125 * streetPlantersSquareFoot) + 2580.6) * costRegionValue * inflationFactor;
          currentStreetPlantersHighCapital = ((6.5348 * streetPlantersSquareFoot) + 8371.9) * costRegionValue * inflationFactor;
        }
        else
        {
          currentStreetPlantersLowCapital = 0;
          currentStreetPlantersHighCapital = 0;
        }
        if (sessionStorage.infiltrationBasins != 0)
        {
          currentInfiltrationBasinsLowCapital = ((0.8473 * infiltrationBasinsSquareFoot) + 3864) * costRegionValue * inflationFactor;
          currentInfiltrationBasinsHighCapital = ((2.3002 * infiltrationBasinsSquareFoot) + 8457) * costRegionValue * inflationFactor;
        }
        else
        {
          currentInfiltrationBasinsLowCapital = 0;
          currentInfiltrationBasinsHighCapital = 0;
        }
        if (sessionStorage.permeablePavement != 0)
        {
          currentPermeablePavementLowCapital = ((4.7209 * permeablePavementSquareFoot) + 1800)  * costRegionValue * inflationFactor;
          currentPermeablePavementHighCapital = ((6.2951 * permeablePavementSquareFoot + 2775))  * costRegionValue * inflationFactor;
        }
        else
        {
          currentPermeablePavementLowCapital = 0;
          currentPermeablePavementHighCapital = 0;
        }


      }
      if (costComplexity == 'complex')
      {
        if (sessionStorage.disconnection != 0)
        {
          currentDisconnectionLowCapital = ((5.7238 * disconnectionSquareFoot) + 3806.5) * costRegionValue * inflationFactor;
          currentDisconnectionHighCapital = ((6.7608 * disconnectionSquareFoot) + 4748.3) * costRegionValue * inflationFactor;
        }
        else
        {
          currentDisconnectionLowCapital = 0;
          currentDisconnectionHighCapital = 0;
        }
        if (sessionStorage.rainHarvesting != 0)
        {
          currentRainHarvestingLowCapital = ((1.4085 * rainwaterSquareFoot) + 4350) * costRegionValue * inflationFactor;
          currentRainHarvestingHighCapital = ((1.728 * rainwaterSquareFoot) + 4743) * costRegionValue * inflationFactor;
        }
        else
        {
          currentRainHarvestingLowCapital = 0;
          currentRainHarvestingHighCapital = 0;
        }
        if (sessionStorage.rainGardens != 0)
        {
          currentRainGardensLowCapital = ((5.0109 * rainGardensSquareFoot) + 10052) * costRegionValue * inflationFactor;
          currentRainGardensHighCapital = ((6.7319 * rainGardensSquareFoot) + 13229) * costRegionValue * inflationFactor;
        }
        else
        {
          currentRainGardensLowCapital = 0;
          currentRainGardensHighCapital = 0;
        }
        if (sessionStorage.greenRoofs != 0)
        {
          currentGreenRoofsLowCapital = ((7.5401 * greenRoofsSquareFoot) + 20824) * costRegionValue * inflationFactor;
          currentGreenRoofsHighCapital = ((10.06 * greenRoofsSquareFoot) + 29592) * costRegionValue * inflationFactor;
        }
        else
        {
          currentGreenRoofsLowCapital = 0;
          currentGreenRoofsHighCapital = 0;
        }
        if (sessionStorage.streetPlanters != 0)
        {
          currentStreetPlantersLowCapital = ((10.357 * streetPlantersSquareFoot) + 14163) * costRegionValue * inflationFactor;
          currentStreetPlantersHighCapital = ((14.179 * streetPlantersSquareFoot) + 19955) * costRegionValue * inflationFactor;
        }
        else
        {
          currentStreetPlantersLowCapital = 0;
          currentStreetPlantersHighCapital = 0;
        }
        if (sessionStorage.infiltrationBasins != 0)
        {
          currentInfiltrationBasinsLowCapital = ((3.7531 * infiltrationBasinsSquareFoot) + 13050) * costRegionValue * inflationFactor;
          currentInfiltrationBasinsHighCapital = ((5.2059 * infiltrationBasinsSquareFoot) + 17643) * costRegionValue * inflationFactor;
        }
        else
        {
          currentInfiltrationBasinsLowCapital = 0;
          currentInfiltrationBasinsHighCapital = 0;
        }
        if (sessionStorage.permeablePavement != 0)
        {
          currentPermeablePavementLowCapital = ((7.8694 * permeablePavementSquareFoot) + 3750) * costRegionValue * inflationFactor;
          currentPermeablePavementHighCapital = ((9.4437 * permeablePavementSquareFoot) + 4275) * costRegionValue * inflationFactor;
        }
        else
        {
          currentPermeablePavementLowCapital = 0;
          currentPermeablePavementHighCapital = 0;
        }
      }

      summaryChartArray = [response.runoffModel.annualRunoff.toFixed(2), response.runoffModel.annualInfil.toFixed(2), response.runoffModel.annualEvap.toFixed(2)];

      for (var i = 0; i < response.runoffModel.runoffStats.length; i++)
      {

        summaryTableArray.push(response.runoffModel.runoffStats[i].toFixed(2));

      }

      for (var i = 0; i < response.runoffModel.rainRunoffList.length; i++)
      {
        rainfallRunoffEventsArray.push(
        {
          x: response.runoffModel.rainRunoffList[i].x.toFixed(2),
          y: response.runoffModel.rainRunoffList[i].y.toFixed(2)
        });
      }

      for (var i = 0; i < response.runoffModel.rainFreqList.length; i++)
      {
        rainfallFrequencyArray.push(
        {
          x: response.runoffModel.rainFreqList[i].x.toFixed(2),
          y: response.runoffModel.rainFreqList[i].y.toFixed(2)
        });
      }

      for (var i = 0; i < response.runoffModel.runoffFreqList.length; i++)
      {
        runoffFrequencyArray.push(
        {
          x: response.runoffModel.runoffFreqList[i].x.toFixed(2),
          y: response.runoffModel.runoffFreqList[i].y.toFixed(2)
        });
      }

      for (var i = 0; i < response.runoffModel.retentionPcntList.length; i++)
      {
        rainfallRetentionArray.push(
        {
          x: response.runoffModel.retentionPcntList[i].x.toFixed(2),
          y: response.runoffModel.retentionPcntList[i].y.toFixed(2)
        })
      }

      if (response.runoffModel.runoffPcntList.length != 0)
      {
        for (var i = 0; i < response.runoffModel.runoffPcntList.length; i++)
        {
          runoffContributionArray.push(response.runoffModel.runoffPcntList[i].y.toFixed(2))
        }
      }
      else
      {
        runoffContributionArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }

      for (var i = 0; i < response.xeventModel.rainfall.length; i++)
      {
        extremeEventRainfallDepthArray.push(response.xeventModel.rainfall[i].toFixed(2));
        extremeEventRunoffDepthArray.push(response.xeventModel.runoff[i].toFixed(2));
      }

      for (var i = 0; i < response.xeventModel.peakRainfall.length; i++)
      {
        extremeEventRainfallPeakArray.push(response.xeventModel.peakRainfall[i].toFixed(2));
        extremeEventRunoffPeakArray.push(response.xeventModel.peakRunoff[i].toFixed(2));
      }

      $('#currentRainfall').html(summaryTableArray[0]);

      var scope = angular.element(document.getElementById("summaryResultsTable")).scope();

      scope.$apply(function()
      {
        scope.summaryResults = [
        {
          "Name": 'Average Annual Rainfall (inches)',
          "Current" : summaryTableArray[0],
          "Baseline" : summaryTableArrayBaseline[0]
        },
        {
          "Name": 'Average Annual Runoff (inches)',
          "Current" : summaryTableArray[1],
          "Baseline" : summaryTableArrayBaseline[1]
        },
        {
          "Name": 'Days per Year with Rainfall',
          "Current" : summaryTableArray[2],
          "Baseline" : summaryTableArrayBaseline[2]
        },
        {
          "Name": 'Days per Year with Runoff',
          "Current" : summaryTableArray[3],
          "Baseline" : summaryTableArrayBaseline[3]
        },
        {
          "Name": 'Percent of Wet Days Retained',
          "Current" : summaryTableArray[4],
          "Baseline" : summaryTableArrayBaseline[4]
        },
        {
          "Name": 'Smallest Rainfall w/ Runoff (inches)',
          "Current" : summaryTableArray[5],
          "Baseline" : summaryTableArrayBaseline[5]
        },
        {
          "Name": 'Largest Rainfall w/o Runoff (inches)',
          "Current" : summaryTableArray[6],
          "Baseline" : summaryTableArrayBaseline[6]
        },
        {
          "Name": 'Max Rainfall Retained (inches)',
          "Current" : summaryTableArray[7],
          "Baseline" : summaryTableArrayBaseline[7]
        }];

        scope.summary1Data = [summaryChartArray[0], summaryChartArray[1], summaryChartArray[2]];
        scope.rainfallRunoffEventsData = [rainfallRunoffEventsArray, rainfallRunoffEventsArrayBaseline];
        scope.rainfallRunoffFrequencyData = [rainfallFrequencyArray, runoffFrequencyArray, rainfallFrequencyArrayBaseline, runoffFrequencyArrayBaseline];
        scope.rainfallRetentionData = [rainfallRetentionArray, rainfallRetentionArrayBaseline];
        scope.runoffContributionData = [runoffContributionArray, runoffContributionArrayBaseline];
        scope.extremeEventDepthData = [extremeEventRainfallDepthArray, extremeEventRunoffDepthArray, extremeEventRainfallDepthArrayBaseline, extremeEventRunoffDepthArrayBaseline];
        scope.extremeEventPeakData = [extremeEventRainfallPeakArray, extremeEventRunoffPeakArray, extremeEventRainfallPeakArrayBaseline, extremeEventRunoffPeakArrayBaseline];

        if (sessionStorage.baselineActive == 'false')
        {
             scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];

            scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];
        }
        if (sessionStorage.baselineActive == 'true')
        {
            scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];

            scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
        }

        if (sessionStorage.costCriteria == 'capital')
        {
            if (sessionStorage.baselineActive == 'false')
            {
                scope.costsData = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];

            if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

            scope.costSummaryTableData = [
            {
              name: 'Disconnection',
              drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
              preTreatment: 'No / No',
              currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital.toFixed(2) - baselineDisconnectionLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital.toFixed(2) - baselineDisconnectionHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rainwater Harvesting',
              drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
              preTreatment: 'No / No',
              currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainHarvestingLowCapital.toFixed(2) - baselineRainHarvestingLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainHarvestingHighCapital.toFixed(2) - baselineRainHarvestingHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rain Gardens',
              drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
              preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
              currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainGardensLowCapital.toFixed(2) - baselineRainGardensLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainGardensHighCapital.toFixed(2) - baselineRainGardensHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Green Roofs',
              drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
              preTreatment: 'No / No',
              currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentGreenRoofsLowCapital.toFixed(2) - baselineGreenRoofsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentGreenRoofsHighCapital.toFixed(2) - baselineGreenRoofsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Street Planters',
              drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
              preTreatment: 'No / No',
              currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentStreetPlantersLowCapital.toFixed(2) - baselineStreetPlantersLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentStreetPlantersHighCapital.toFixed(2) - baselineStreetPlantersHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Infiltration Basins',
              drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
              preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
              currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentInfiltrationBasinsLowCapital.toFixed(2) - baselineInfiltrationBasinsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentInfiltrationBasinsHighCapital.toFixed(2) - baselineInfiltrationBasinsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Permeable Pavement',
              drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
              preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
              currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentPermeablePavementLowCapital.toFixed(2) - baselinePermeablePavementLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentPermeablePavementHighCapital.toFixed(2) - baselinePermeablePavementHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Total',
              drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
              preTreatment: 'Varies',
              currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }];
            }
            if (sessionStorage.baselineActive == 'true')
            {
                scope.costsData = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];



            scope.costSummaryTableData = [
            {
              name: 'Disconnection',
              drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
              preTreatment: 'No / No',
              currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rainwater Harvesting',
              drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
              preTreatment: 'No / No',
              currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rain Gardens',
              drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
              preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
              currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainGardensLowCapital - baselineRainGardensLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainGardensHighCapital - baselineRainGardensHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Green Roofs',
              drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
              preTreatment: 'No / No',
              currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Street Planters',
              drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
              preTreatment: 'No / No',
              currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Infiltration Basins',
              drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
              preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
              currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Permeable Pavement',
              drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
              preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
              currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Total',
              drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
              preTreatment: 'Varies',
              currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }];


            }
        }
        if (sessionStorage.costCriteria == 'maintenance')
        {
            if (sessionStorage.baselineActive == 'false')
            {
                scope.costsData = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];

                if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

                scope.costSummaryTableData = [
        {
          name: 'Disconnection',
          drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
          preTreatment: 'No / No',
          currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionLowCapital.toFixed(2) - baselineDisconnectionLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionHighCapital.toFixed(2) - baselineDisconnectionHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rainwater Harvesting',
          drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
          preTreatment: 'No / No',
          currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainHarvestingLowCapital.toFixed(2) - baselineRainHarvestingLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainHarvestingHighCapital.toFixed(2) - baselineRainHarvestingHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rain Gardens',
          drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
          preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
          currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainGardensLowCapital.toFixed(2) - baselineRainGardensLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainGardensHighCapital.toFixed(2) - baselineRainGardensHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Green Roofs',
          drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
          preTreatment: 'No / No',
          currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentGreenRoofsLowCapital.toFixed(2) - baselineGreenRoofsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentGreenRoofsHighCapital.toFixed(2) - baselineGreenRoofsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Street Planters',
          drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
          preTreatment: 'No / No',
          currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentStreetPlantersLowCapital.toFixed(2) - baselineStreetPlantersLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentStreetPlantersHighCapital.toFixed(2) - baselineStreetPlantersHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Infiltration Basins',
          drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
          preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
          currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentInfiltrationBasinsLowCapital.toFixed(2) - baselineInfiltrationBasinsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentInfiltrationBasinsHighCapital.toFixed(2) - baselineInfiltrationBasinsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Permeable Pavement',
          drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
          preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
          currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentPermeablePavementLowCapital.toFixed(2) - baselinePermeablePavementLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentPermeablePavementHighCapital.toFixed(2) - baselinePermeablePavementHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Total',
          drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
          preTreatment: 'Varies',
          currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }];
            }
            if (sessionStorage.baselineActive == 'true')
            {
                scope.costsData = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
            }

        }

        if(sessionStorage.baselineActive == true) {
    			scope.costSummaryTableInfoData = [
    			{
    				name: 'Dev. Type',
    				currentScenario: currentDevType,
    				baselineScenario: baselineDevType
    			},
    			{
    				name: 'Site Suitability',
    				currentScenario: currentSiteSuitability,
    				baselineScenario: baselineSiteSuitability
    			},
    			{
    				name: 'Topography',
    				currentScenario: currentTopography,
    				baselineScenario: baselineTopography
    			},
    			{
    				name: 'Soil Type',
    				currentScenario: sessionStorage.soilType,
    				baselineScenario: baselineSoilType
    			},
    			{
    				name: 'Cost Region',
    				currentScenario: sessionStorage.costRegionName + " " + sessionStorage.costRegionValue,
    				baselineScenario: baselineCostRegion
    			}];
    		}
    		else {
    			if(sessionStorage.baselineActive == false) {
    			  scope.costSummaryTableInfoData = [
      			  {
        				name: 'Dev. Type',
        				currentScenario: currentDevType,
        				baselineScenario: 'NA'
      			  },
      			  {
        				name: 'Site Suitability',
        				currentScenario: currentSiteSuitability,
        				baselineScenario: 'NA'
      			  },
      			  {
        				name: 'Topography',
        				currentScenario: currentTopography,
        				baselineScenario: 'NA'
      			  },
      			  {
        				name: 'Soil Type',
        				currentScenario: sessionStorage.soilType,
        				baselineScenario: 'NA'
      			  },
      			  {
        				name: 'Cost Region',
        				currentScenario: sessionStorage.costRegionName + " " + sessionStorage.costRegionValue,
        				baselineScenario: 'NA'
      			  }
            ];
    			}
    		}
      });

      $('#refreshResultsButton').prop('disabled', true);
      if (sessionStorage.baselineActive == 'true')
        {
            $('#useBaselineButton').prop('disabled', true);
            $('#removeBaselineButton').prop('disabled', false);
        }
        else
        {
            $('#useBaselineButton').prop('disabled', false);
            $('#removeBaselineButton').prop('disabled', true);
        }
      $('#resultsPDFButton').prop('disabled', false);

      sessionStorage.resultsActive = true;
      sessionStorage.printToPDF = true;
    },
    error : function (jqXHR, status, err) {
    //  if(jqXHR.status == 500) {
        $('#alertDiv').show();
        $('#alertText').html('An error has occurred. Redirecting you to the home page');
        $('#closeAlertButton').remove();
        setTimeout(function(){
          window.location.href ="/stormwatercalculator";
      }, 3000);
    //  }

    }
  });

}

function onError(){
  $('#alertDiv').show();
  $('#alertText').html('Error Occured');
}
function checkResultsGenerated()
{
  if (sessionStorage.resultsActive == 'true')
  {
    $('#alertDiv').show();

    $('#alertText').html('Site data has changed - results need to be refreshed');

    $('#refreshResultsButton').prop('disabled', false);

    sessionStorage.resultsActive = false;
  }
}

var app = angular.module("stormwaterCalculator", ["ngRoute", "chart.js"]);

app.config(function($routeProvider, $locationProvider)
{
  $routeProvider.when("/stormwatercalculator/",
  {
    templateUrl: "stormwatercalculator/modals/homepage.html",
    controller: "homepageCtrl",
    resolve:
    {
      check: function()
      {
        $('#modal').css(
        {
          'position': 'fixed',
          'top': '50px',
          'left': '0',
          'width': '100%',
          'height': 'calc(100% - 50px)',
          'cursor': 'default',
          'overflow-y': 'auto',
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background-size': 'cover',
          'background-size': 'cover'
        });

        $('label[for="nav-trigger"]').css(
        {
            'display': 'none'
        });

        $('.navcontainer').hide();
      }
    }
  }).when("/stormwatercalculator/location",
  {
    templateUrl: "/stormwatercalculator/modals/location.html",
    controller: "locationCtrl",
    resolve:
    {
      check: function()
      {
        $('#bingMap').show();

        sessionStorage.modal = 'location';

        siteLocationHandler = Microsoft.Maps.Events.addHandler(map, 'click', moveLocationIcon);

        hidePolygons();
        hidePrecipitationIcons();

        if ($(window).width() < 1025)
        {
            $('.site-wrap').css(
            {
                'top': '155px',
                'bottom': '0',
                'left': '0',
                'width' : '100%',
                'height': 'auto',
                'overflow-y': 'auto'
           });

           $('#modal').css(
            {
              'position': 'relative',
              'top': '0',
              'left': '25px',
              'width': 'calc(100% - 50px)',
              'height': 'auto',
              'background-color': '#fff',
              'background-image': 'none',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'color' : '#000',
              'cursor': 'default'
            });

           $('#bingMap').css(
           {
            'position' : 'relative',
            'left' : '25px',
            'width' :'calc(100% - 50px)',
            'height' : '450px'
           });
        }
        else
        {
            $('.site-wrap').css(
            {
                'position' : 'fixed',
                'top' : '50px',
                'left' : '65px',
                'height' : 'calc(100% - 50px)',
                'width' : '100%',
                'background-color' : '#fff',
                'z-index' : '1'
            });

            $('#modal').css(
            {
              'position': 'absolute',
              'top': '50px',
              'left': '50px',
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'background-image': 'none',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
            $('#bingMap').css(
           {
            'position' : 'fixed',
            'top' : '75px',
            'left' : '85px',
            'width' :'calc(100% - 105px)',
            'height' : 'calc(100% - 100px)'
           });
        }

        $('label[for="nav-trigger"]').css(
        {
            'display': 'block'
        });

        map.setOptions(
        {
          showZoomButtons: true,
        });

        $('.navcontainer').show();
      }
    }
  }).when("/stormwatercalculator/soiltype",
  {
    templateUrl: "/stormwatercalculator/modals/soiltype.html",
    controller: "soildataCtrl",
    resolve:
    {
      check: function()
      {
        $('#bingMap').show();
        sessionStorage.modal = 'soilType';

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePrecipitationIcons();
        getSoilData('soiltype');

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        if (sessionStorage.soilDataChecked == 'false')
        {
            showPolygons();
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });

        if (soilDataBoolean == true)
        {
          for (var i = 0; i < soilDataPolygonsArray.length; i++)
          {
            if (soilDataPolygonsArray[i].soilGroup == 'A')
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(255, 235, 59, 0.6)'
              });
            }
            if (soilDataPolygonsArray[i].soilGroup == 'B')
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(255, 128, 171, 0.6)'
              });
            }
            if (soilDataPolygonsArray[i].soilGroup == 'C')
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(126, 87, 194, 0.6)'
              });
            }
            if (soilDataPolygonsArray[i].soilGroup == 'D')
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(1, 87, 155, 0.6)'
              });
            }
          }
        }
      }
    }
  }).when("/stormwatercalculator/soildrainage",
  {
    templateUrl: "stormwatercalculator/modals/soildrainage.html",
    controller: "soildataCtrl",
    resolve:
    {
      check: function()
      {
        $('#bingMap').show();
        sessionStorage.modal = 'soilDrainage';

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePrecipitationIcons();
        getSoilData('soildrainage');

        if (sessionStorage.soilDataChecked == 'false')
        {
            showPolygons();
        }

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });

        if (soilDataBoolean == true)
        {
          for (var i = 0; i < soilDataPolygonsArray.length; i++)
          {
            if (soilDataPolygonsArray[i].ksat <= 0.01)
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(255, 235, 59, 0.6)'
              });
            }
            if ((soilDataPolygonsArray[i].ksat > 0.01) && (soilDataPolygonsArray[i].ksat <= 0.1))
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(255, 128, 171, 0.6)'
              });
            }
            if ((soilDataPolygonsArray[i].ksat > 0.1) && (soilDataPolygonsArray[i].ksat <= 1))
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(126, 87, 194, 0.6)'
              });
            }
            if (soilDataPolygonsArray[i].ksat > 1)
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(1, 87, 155, 0.6)'
              });
            }
          }
        }
      }
    }
  }).when("/stormwatercalculator/topography",
  {
    templateUrl: "/stormwatercalculator/modals/topography.html",
    controller: "soildataCtrl",
    resolve:
    {
      check: function()
      {
        $('#bingMap').show();
        sessionStorage.modal = 'topography';

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePrecipitationIcons();
        getSoilData('topography');

        if (sessionStorage.soilDataChecked == 'false')
        {
            showPolygons();
        }

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });

        if (soilDataBoolean == true)
        {
          for (var i = 0; i < soilDataPolygonsArray.length; i++)
          {
            if (soilDataPolygonsArray[i].slope < 5.0)
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(255, 235, 59, 0.6)'
              });
            }
            if ((soilDataPolygonsArray[i].slope >= 5.0) && (soilDataPolygonsArray[i].slope < 10.0))
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(255, 128, 171, 0.6)'
              });
            }
            if ((soilDataPolygonsArray[i].slope >= 10.0) && (soilDataPolygonsArray[i].slope < 15.0))
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(126, 87, 194, 0.6)'
              });
            }
            if (soilDataPolygonsArray[i].slope >= 15.0)
            {
              soilDataPolygonsArray[i].setOptions(
              {
                fillColor: 'rgba(1, 87, 155, 0.6)'
              });
            }
          }
        }
      }
    }
  }).when("/stormwatercalculator/precipitation",
  {
    templateUrl: "/stormwatercalculator/modals/precipitation.html",
    controller: "precipitationCtrl",
    resolve:
    {
      check: function()
      {
        $('#bingMap').show();
        sessionStorage.modal = 'precipitation';

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePolygons();
        showPrecipitationIcons();

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });

        map.setView(
        {
          zoom: 10
        });
      }
    }
  }).when("/stormwatercalculator/climatechange",
  {
    templateUrl: "/stormwatercalculator/modals/climatechange.html",
    controller: "climatechangeCtrl",
    resolve:
    {
      check: function()
      {
        sessionStorage.modal = 'climateChange';

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        getClimateChangeData();

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'top': '25px',
              'left': '25px',
              'width': 'calc(100% - 100px)',
              'height': '100%',
              'background-color': '#ffffff',
              'cursor': 'default'
            });
        }

        $('#bingMap').hide();

        map.setOptions(
        {
          showZoomButtons: false,
        });
      }
    }
  }).when("/stormwatercalculator/landcover",
  {
    templateUrl: "/stormwatercalculator/modals/landcover.html",
    controller: "landcoverCtrl",
    resolve:
    {
      check: function()
      {
        sessionStorage.modal = 'landCover';
        $('#bingMap').show();

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePolygons();
        hidePrecipitationIcons();

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });

        map.setView(
        {
          mapTypeId: Microsoft.Maps.MapTypeId.aerial,
          zoom: 18
        });
      }
    }
  }).when("/stormwatercalculator/lidcontrols",
  {
    templateUrl: "/stormwatercalculator/modals/lidcontrols.html",
    controller: "lidcontrolsCtrl",
    resolve:
    {
      check: function()
      {
        sessionStorage.modal = 'lidControls';
        $('#bingMap').show();

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePolygons();
        hidePrecipitationIcons();

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });
      }
    }
  }).when("/stormwatercalculator/projectcost",
  {
    templateUrl: "/stormwatercalculator/modals/projectcost.html",
    controller: "projectcostCtrl",
    resolve:
    {
      check: function()
      {
        sessionStorage.modal = 'projectCost';
        $('#bingMap').show();

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        hidePolygons();
        hidePrecipitationIcons();

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'position': 'absolute',
              'top': $('#modal').position().top,
              'left': $('#modal').position().left,
              'width': '300px',
              'height': 'auto',
              'background-color': '#7cb2ab',
              'padding': '10px',
              'padding-top': '0',
              'color': '#fff',
              'z-index': '2',
              'font-size': '12px',
              'cursor': 'move'
            });
        }

        map.setOptions(
        {
          showZoomButtons: true,
        });
      }
    }
  }).when("/stormwatercalculator/results",
  {
    templateUrl: "/stormwatercalculator/modals/results.html",
    controller: "resultsCtrl",
    resolve:
    {
      check: function()
      {
        sessionStorage.modal = 'results';
        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        if ($(window).width() > 1025)
        {
            $('#modal').css(
            {
              'top': '25px',
              'left': '25px',
              'width': 'calc(100% - 100px)',
              'height': '100%',
              'background-color': '#ffffff',
              'cursor': 'default'
            });
        }

        $('#bingMap').hide();
      }
    }
  });

  $locationProvider.html5Mode(true);

});

app.controller("homepageCtrl", function($scope, $location)
{
    $scope.go = function(path)
    {
      $location.path(path);

      if ($scope.nameYourSite == undefined)
      {
        sessionStorage.siteName = 'New_SWC_Site';
      }
      else
      {
        sessionStorage.siteName = $scope.nameYourSite;
      }
      $('.navigationLink').removeClass('disabled');
    }
});

app.controller("navigationCtrl", function($scope, $location)
{
    $scope.go = function(path)
    {
      $location.path(path);
    }
    $scope.openSaveModal = function()
    {
      $('#saveSiteModal').modal();
      $('#iconBar').trigger('click');
    }
    $scope.saveSite = function()
    {
      console.log("SAVE SITE");
        var customAreaLatitudeArray = [];
        var customAreaLongitudeArray = [];

        for (var i = 0; i < siteAreaMarkerLocationArray.length; i++)
        {
            customAreaLatitudeArray.push(siteAreaMarkerLocationArray[i].latitude);
            customAreaLongitudeArray.push(siteAreaMarkerLocationArray[i].longitude);
        }

        xmlSaveString =
          '<?xml version="1.0" encoding="UTF-8" ?>' + '\n' +
          '<siteData>' + '\n' +
          '<version>1.1</version>' + '\n' +
          '<siteName/>' + '\n' +
          '<siteLocation>' + sessionStorage.latitude + "," + sessionStorage.longitude + '</siteLocation>' + '\n' +
          '<siteLocationName>' + sessionStorage.location + '</siteLocationName>' + '\n' +
          '<siteArea>' + sessionStorage.acres + '</siteArea>' + '\n' +
          '<customAreaLatitude>' + customAreaLatitudeArray + '</customAreaLatitude>' + '\n' +
          '<customAreaLongitude>' + customAreaLongitudeArray + '</customAreaLongitude>' + '\n' +
          '<hydSoilGroup>' + sessionStorage.soilType+ '</hydSoilGroup>' + '\n' +
          '<hydConductivity>' + sessionStorage.soilDrainage + '</hydConductivity>' + '\n' +
          '<surfaceSlope>' + sessionStorage.topography + '</surfaceSlope>' + '\n' +
          '<rainSource>4</rainSource>' + '\n' +
          '<evapSource>0</evapSource>' + '\n' +
          '<percForest>' + sessionStorage.forest + '</percForest>' + '\n' +
          '<percMeadow>' + sessionStorage.meadow + '</percMeadow>' + '\n' +
          '<percLawn>' + sessionStorage.lawn + '</percLawn>' + '\n' +
          '<percDesert>' + sessionStorage.desert + '</percDesert>' + '\n' +
          '<percImpervious>' + sessionStorage.impervious + '</percImpervious>' + '\n' +
          '<percDisconnection>' + sessionStorage.disconnection + '</percDisconnection>' + '\n' +
          '<disconnectionCaptureRatio>' + $('#disconnectionCaptureValue').val() + '</disconnectionCaptureRatio>' + '\n' +
          '<percHarvesting>' + sessionStorage.rainHarvesting + '</percHarvesting>' + '\n' +
          '<harvestingCisternSize>' + $('#rainHarvestingCisternValue').val() + '</harvestingCisternSize>' + '\n' +
          '<harvestingCisternNumber>' + $('#rainHarvestingRateValue').val() + '</harvestingCisternNumber>' + '\n' +
          '<harvestingEmptyingRate>' + $('#rainHarvestingFeetValue').val() + '</harvestingEmptyingRate>' + '\n' +
          '<percRainGardens>' + sessionStorage.rainGardens + '</percRainGardens>' + '\n' +
          '<rainGardensPondingHeight>' + $('#rainGardensPondingValue').val() + '</rainGardensPondingHeight>' + '\n' +
          '<rainGardensSoilThickness>' + $('#rainGardensThicknessValue').val() + '</rainGardensSoilThickness>' + '\n' +
          '<rainGardensSoilKsat>' + $('#rainGardensMediaValue').val() + '</rainGardensSoilKsat>' + '\n' +
          '<rainGardensCaptureRatio>' + $('#rainGardensCaptureValue').val() + '</rainGardensCaptureRatio>' + '\n' +
          '<percGreenRoofs>' + sessionStorage.greenRoofs + '</percGreenRoofs>' + '\n' +
          '<greenRoofSoilThickness>' + $('#greenRoofsThicknessValue').val() + '</greenRoofSoilThickness>' + '\n' +
          '<greenRoofSoilKsat>' + $('#greenRoofsMediaValue').val() + '</greenRoofSoilKsat>' + '\n' +
          '<percStreetPlanters>' + sessionStorage.streetPlanters + '</percStreetPlanters>' + '\n' +
          '<streetPlantersPondingHeight>' + $('#streetPlantersPondingValue').val() + '</streetPlantersPondingHeight>' + '\n' +
          '<streetPlantersSoilThickness>' + $('#streetPlantersThicknessValue').val() + '</streetPlantersSoilThickness>' + '\n' +
          '<streetPlantersSoilKsat>' + $('#streetPlantersMediaValue').val() + '</streetPlantersSoilKsat>' + '\n' +
          '<streetPlantersGravelThickness>' + $('#streetPlantersGravelValue').val() + '</streetPlantersGravelThickness>' + '\n' +
          '<streetPlantersCaptureRatio>' + $('#streetPlantersCaptureValue').val() + '</streetPlantersCaptureRatio>' + '\n' +
          '<percInfilBasin>' + sessionStorage.infiltrationBasins + '</percInfilBasin>' + '\n' +
          '<infilBasinBasinDepth>' + $('#infiltrationBasinsBasinValue').val() + '</infilBasinBasinDepth>' + '\n' +
          '<infilBasinCaptureRatio>' + $('#infiltrationBasinsCaptureValue').val() + '</infilBasinCaptureRatio>' + '\n' +
          '<percPorousPavement>' + sessionStorage.permeablePavement + '</percPorousPavement>' + '\n' +
          '<porousPavementPavementThickness>' + $('#permeablePavementPavementValue').val() + '</porousPavementPavementThickness>' + '\n' +
          '<porousPavementGravelThickness>' + $('#permeablePavementGravelValue').val() + '</porousPavementGravelThickness>' + '\n' +
          '<porousPavementCaptureRatio>' + $('#permeablePavementCaptureValue').val() + '</porousPavementCaptureRatio>' + '\n' +
          '<designStorm>' + sessionStorage.designStorm + '</designStorm>' + '\n' +
          '<yearsAnalyzed>' + sessionStorage.yearsToAnalyze + '</yearsAnalyzed>' + '\n' +
          '<runoffThreshold>' + sessionStorage.eventThreshold + '</runoffThreshold>' + '\n' +
          '<ignoreConsecStorms>' + sessionStorage.ignoreDays + '</ignoreConsecStorms>' + '\n' +
          '<climateScenario>' + sessionStorage.climateScenario + '</climateScenario>' + '\n' +
          '<climateYear>' + sessionStorage.climateYear + '</climateYear>' + '\n' +
          '<isNewDevelopment>' + sessionStorage.newDevelopment + '</isNewDevelopment>' + '\n' +
          '<isReDevelopment>' + sessionStorage.reDevelopment + '</isReDevelopment>' + '\n' +
          '<siteSuitabilityPoor>' + sessionStorage.poor + '</siteSuitabilityPoor>' + '\n' +
          '<siteSuitabilityModerate>' + sessionStorage.moderate + '</siteSuitabilityModerate>' + '\n' +
          '<siteSuitabilityExcellent>' + sessionStorage.excellent + '</siteSuitabilityExcellent>' + '\n' +
          '<rgPretreatment>' + $('#rainGardensPretreatment').prop('checked') + '</rgPretreatment>' + '\n' +
          '<ibPretreatment>' + $('#infiltrationBasinsPretreatment').prop('checked') + '</ibPretreatment>' + '\n' +
          '<ppPretreatment>' + $('#permeablePavementPretreatment').prop('checked') + '</ppPretreatment>' + '\n' +
          '<cmbCostRegion>' + sessionStorage.costRegion + '</cmbCostRegion>' + '\n' +
          '<tbRegMultiplier>' + sessionStorage.costRegionValue + '</tbRegMultiplier>' + '\n' +
          '<costRegionName>' + sessionStorage.costRegionName + '</costRegionName>' + '\n' +
          '<precStationID>' + sessionStorage.rainGageID + '</precStationID>' + '\n' +
          '<evapStationID>' + sessionStorage.weatherStationID  + '</evapStationID>' + '\n' +
          '<precStationName>' + sessionStorage.rainGageName + '</precStationName>' + '\n' +
          '<evapStationName>' + sessionStorage.weatherStationName  + '</evapStationName>' + '\n' +
          '</siteData>';

      //  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      //  {
            $('#emailModal').modal();
            $('#emailButton').html('<button type="button" class="btn btn-default" id="sendDataButton" onclick="saveSiteMobile();">Send SWC XML File</button>');
      //  }
      /*  else
        {
          var xmlFileText = new Blob([xmlSaveString],
          {
            type: "text/xml;charset=utf-8;"
          });

          saveAs(xmlFileText, sessionStorage.siteName + ".xml");

          $('#saveSiteButtons').hide();
          $('#saveSiteModalBody').css(
          {
            'height': '145px'
          });
          $('#nameYourSite').show();
          $('#saveSiteModalTitle').html('Name Your Site');
        }*/
    }
    $scope.selectNo = function()
    {
      $('#saveSiteButtons').hide();
      $('#saveSiteModalBody').css(
      {
        'height': '145px'
      });
      $('#nameYourSite').show();
      $('#saveSiteModalTitle').html('Name Your Site');
    }
    $scope.getStarted = function()
    {
      sessionStorage.siteName = $scope.newSiteName;
      sessionStorage.latitude = 40;
      sessionStorage.longitude = -98.5;
      sessionStorage.location = '';
      sessionStorage.acres = 0;
      sessionStorage.soilType = 'B';
      sessionStorage.soilDrainage = 0.4;
      sessionStorage.topography = 5;
      sessionStorage.climateScenarioName = 'None';
      sessionStorage.climateScenario = 0;
      sessionStorage.climateYear = 2035;
      sessionStorage.forest = 0;
      sessionStorage.meadow = 0;
      sessionStorage.lawn = 40;
      sessionStorage.desert = 0;
      sessionStorage.impervious = 60;
      sessionStorage.disconnection = 0;
      sessionStorage.rainHarvesting = 0;
      sessionStorage.rainGardens = 0;
      sessionStorage.greenRoofs = 0;
      sessionStorage.streetPlanters = 0;
      sessionStorage.infiltrationBasins = 0;
      sessionStorage.permeablePavement = 0;
      sessionStorage.designStorm = 0.00;
      sessionStorage.reDevelopment = true;
      sessionStorage.newDevelopment = false;
      sessionStorage.poor = true;
      sessionStorage.moderate = false;
      sessionStorage.excellent = false;
      sessionStorage.costRegion = 0;
      sessionStorage.yearsToAnalyze = 20;
      sessionStorage.eventThreshold = 0.10;
      sessionStorage.ignoreDays = false;
      sessionStorage.resultsPage = 'summaryResults';
      sessionStorage.resultsActive = false;
      sessionStorage.baselineActive = false;
      sessionStorage.printToPDF = false;
      sessionStorage.costCriteria = 'capital';

        /*
         * Gets the sites location
         */
        var location = new Microsoft.Maps.Location(40, -98.5);

        map.setView(
        {
          center: location,
          zoom: 4
        });

        map.entities.remove(locationMarker);

        locationMarker = new Microsoft.Maps.Pushpin(location);

        locationMarker.setOptions(
        {
          icon: 'stormwatercalculator/images/mapMarker.png'
        });

        map.entities.push(locationMarker);

        soilDataURLString = '/swcalculator-server/api/v1/soils?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude + '&distance=1000';

        precipitationURLString = '/swcalculator-server/api/v1/metStations?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

        costURLString = '/swcalculator-server/api/v1/costing?latitude=' + locationMarker.getLocation().latitude + '&longitude=' + locationMarker.getLocation().longitude;

        soilDataBoolean = false;

        removePolygons();
        removePrecipitationIcons();

        getPrecipitationData();
        getCostingRegionalization();

        /*
         * Draws site radius
         */
        siteRadius = sessionStorage.acres / 61.77625;
        drawSiteRadius(sessionStorage.acres);

      $location.path('stormwatercalculator/location');

      $('#saveSiteModal').modal('toggle');

      $scope.newSiteName = '';
      $('#saveSiteButtons').show();
      $('#saveSiteModalBody').css(
      {
        'height': '80px'
      });
      $('#nameYourSite').hide();
      $('#saveSiteModalTitle').html('Would you like to save your site?');
    }
    $scope.uploadFile = function()
    {
      $('#uploadFile').trigger("click");
    }
    $scope.openResources = function()
    {
      $('#resourcesModal').modal();
        $('#iconBar').trigger('click');
    }
});

app.controller("locationCtrl", function($scope)
{
    $scope.locationSearch = sessionStorage.location;
    $scope.siteRadius = parseFloat(sessionStorage.acres);

    $scope.findCurrentLocation = function()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function(position)
            {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                addressToFind = lat + ',' + lng;
                map.getCredentials(MakeGeocodeRequest);
            });
        }
    }
    $scope.searchLocation = function(address)
    {
      addressToFind = address;
      map.getCredentials(MakeGeocodeRequest);
    }

    $scope.drawRadius = function(radius)
    {
      map.entities.remove(siteAreaPolygon);

      if ($('#acreInput').val() < 13)
      {
        siteRadius = radius / 61.77625;
        drawSiteRadius(radius);

        sessionStorage.acres = radius;
      }
      else
      {
        $('#alertDiv').show();
        $('#alertText').html('Site area cannot be more than 12 acres');
        $('#acreInput').val(12);

        siteRadius = 12 / 61.77625;
        drawSiteRadius(12);

        sessionStorage.acres = 12;
      }

      if ($('#acreInput').val() == '')
      {
        $('#acreInput').val(0);
      }
    }

    $scope.drawCustomArea = function()
    {
      if ($('#customAreaIcon').hasClass('active'))
      {
        $('#customAreaIcon').removeClass('active');

        if ($(window).width() < 1025)
        {
            $('#customAreaIcon').css(
            {
              'fill': '#fff'
            });
        }
        else
        {
            $('#customAreaIcon').css(
            {
              'fill': '#7cb2ab'
            });
        }

        $('#locationInput').prop('disabled', false);
        $('#acreInput').prop('disabled', false);

        for (var i = 0; i < siteAreaMarkerArray.length; i++)
        {
            map.entities.remove(siteAreaMarkerArray[i]);
        }
        for (var i = 0; i < siteAreaLineArray.length; i++)
        {
            map.entities.remove(siteAreaLineArray[i]);
        }

       siteLocationHandler = Microsoft.Maps.Events.addHandler(map, 'click', moveLocationIcon);

       Microsoft.Maps.Events.removeHandler(drawSiteAreaHandler);
      }
      else
      {
        $('#customAreaIcon').addClass('active');

        $('#customAreaIcon').css(
        {
          'fill': '#ffb74d'
        });

        $('#locationInput').prop('disabled', true);
        $('#acreInput').prop('disabled', true);

        $scope.drawRadius(0);

        Microsoft.Maps.Events.removeHandler(siteLocationHandler);

        drawCustomArea();
      }
    }
});

app.controller('soildataCtrl', function($scope, $route)
{
    if (sessionStorage.soilDataChecked == 'true')
    {
        $('#soilDataCheckbox').prop('checked', true);
    }
    else
    {
        $('#soilDataCheckbox').prop('checked', false);
    }
  if (sessionStorage.soilType == 'A')
  {
    $('#sandRadio').prop('checked', true);
  }
  if (sessionStorage.soilType == 'B')
  {
    $('#sandyLoamRadio').prop('checked', true);
  }
  if (sessionStorage.soilType == 'C')
  {
    $('#clayLoamRadio').prop('checked', true);
  }
  if (sessionStorage.soilType == 'D')
  {
    $('#clayRadio').prop('checked', true);
  }

    $scope.soilDrainageValue = parseFloat(sessionStorage.soilDrainage);

  if (sessionStorage.topography == 2)
  {
    $('#flatRadio').prop('checked', true);
  }
  if (sessionStorage.topography == 5)
  {
    $('#moderatelyFlatRadio').prop('checked', true);
  }
  if (sessionStorage.topography == 10)
  {
    $('#moderatelySteepRadio').prop('checked', true);
  }
  if (sessionStorage.topography == 15)
  {
    $('#steepRadio').prop('checked', true);
  }

  $scope.hidePolygons = function()
  {
    if ($('#soilDataCheckbox').is(':checked'))
    {
      hidePolygons();
      sessionStorage.soilDataChecked = true;
    }
    else
    {
      showPolygons();
      sessionStorage.soilDataChecked = false;
    }
  }

  $scope.checkSoilType = function()
  {
    if ($('#sandRadio').is(':checked'))
    {
      sessionStorage.soilType = 'A';

      if ((sessionStorage.soilDrainage != 4.0) || (sessionStorage.soilDrainage != 0.4) || (sessionStorage.soilDrainage != 0.04) || (sessionStorage.soilDrainage != 0.01))
      {
        sessionStorage.soilDrainage = 4.0;
      }

      checkResultsGenerated();
    }
    if ($('#sandyLoamRadio').is(':checked'))
    {
      sessionStorage.soilType = 'B';

      if ((sessionStorage.soilDrainage != 4.0) || (sessionStorage.soilDrainage != 0.4) || (sessionStorage.soilDrainage != 0.04) || (sessionStorage.soilDrainage != 0.01))
      {
        sessionStorage.soilDrainage = 0.4;
      }

      checkResultsGenerated();
    }
    if ($('#clayLoamRadio').is(':checked'))
    {
      sessionStorage.soilType = 'C';

      if ((sessionStorage.soilDrainage != 4.0) || (sessionStorage.soilDrainage != 0.4) || (sessionStorage.soilDrainage != 0.04) || (sessionStorage.soilDrainage != 0.01))
      {
        sessionStorage.soilDrainage = 0.04;
      }

      checkResultsGenerated();
    }
    if ($('#clayRadio').is(':checked'))
    {
      sessionStorage.soilType = 'D';

      if ((sessionStorage.soilDrainage != 4.0) || (sessionStorage.soilDrainage != 0.4) || (sessionStorage.soilDrainage != 0.04) || (sessionStorage.soilDrainage != 0.01))
      {
        sessionStorage.soilDrainage = 0.01;
      }

      checkResultsGenerated();
    }
  }

  $scope.checkSoilDrainage = function()
  {
    sessionStorage.soilDrainage = $scope.soilDrainageValue;
    checkResultsGenerated();
  }

  $scope.checkTopography = function()
   {
     if ($('#flatRadio').is(':checked'))
     {
       sessionStorage.topography = 2;
       checkResultsGenerated();
     }
     if ($('#moderatelyFlatRadio').is(':checked'))
     {
       sessionStorage.topography = 5;
       checkResultsGenerated();
     }
     if ($('#moderatelySteepRadio').is(':checked'))
     {
       sessionStorage.topography = 10;
       checkResultsGenerated();
     }
     if ($('#steepRadio').is(':checked'))
     {
       sessionStorage.topography = 15;
       checkResultsGenerated();
     }
   }

  $scope.help = function()
  {
    $('#helpModal').modal();

    if ($route.current.templateUrl == 'stormwatercalculator/modals/soiltype.html')
    {
      $('#helpText').html("<p>Soil type is identified by its Hydrologic Soil Group, a classification used by soil scientists to characterize the physical nature and runoff potential of a soil. Roughly speaking, Group A is sand, Group B sandy loam, Group C clay loam, and Group D clay. The Calculator uses soil type to infer a site's infiltration properties.</p><p>Soil type data may not be available for your particular site.</p>");
    }
    if ($route.current.templateUrl == 'modals/soildrainage.html')
    {
      $('#helpText').html("<p>The rate at which standing water infiltrates into a soil is measured by its saturated hydraulic conductivity. Soils with higher conductivity produce less runoff.</p><p>Conductivity data might not be available for your particular site.</p>");
    }
    if ($route.current.templateUrl == 'soildrainagemodals/topography.html')
    {
      $('#helpText').html("<p>Site topography, as measured by surface slope (feet of drop per 100 feet of length), affects how fast stormwater will run off a site. Flatter slopes produce slower runoff flow rates and provide more opportunity for rainfall to infiltrate into the soil.</p><p>Slope data may not be available for your particular site.</p>");
    }
  }
});

app.controller('precipitationCtrl', function($scope)
{
 // console.log('rainGageOptions');
  //console.log(rainGageOptions);
  $scope.rainGageNames = rainGageOptions;
  $scope.weatherStationNames = weatherStationOptions;

  $scope.rainGageSelect = sessionStorage.rainGageName;
  $scope.rainStartDate = $scope.rainGageNames[0].startDate;
  //-----------Rain End Date
  $scope.rainEndDate = $scope.rainGageNames[0].endDate;
  $scope.rainRainfall= $scope.rainGageNames[0].rainfall;

  $scope.weatherStationSelect = sessionStorage.weatherStationName;
  $scope.weatherStartDate = $scope.weatherStationNames[0].startDate;
  $scope.weatherEndDate = $scope.weatherStationNames[0].endDate;
  $scope.weatherRate = $scope.weatherStationNames[0].rate;

  for (var i = 0; i < rainGageArray.length; i++)
  {
    if ($scope.rainGageSelect == rainGageArray[i].name)
    {
      rainGageArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/rainGageActiveIcon.png'
      });
    }
  }

  for (var i = 0; i < weatherStationArray.length; i++)
  {
    if ($scope.weatherStationSelect == weatherStationArray[i].name)
    {
      weatherStationArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/weatherStationActiveIcon.png'
      });
    }
  }

  for (var i = 0; i < sameStationArray.length; i++)
  {
    if (($scope.rainGageSelect == sameStationArray[i].name) || ($scope.weatherStationSelect == sameStationArray[i].name))
    {
      sameStationArray[i].setOptions(
      {
        icon: 'stormwatercalculator/images/sameStationActiveIcon.png'
      });
    }
  }

  $scope.selectRainGageDropdown = function()
  {
    var rainGageNames=$scope.rainGageNames;
    for (var i = 0; i < rainGageNames.length; i++)
    {
      if (rainGageNames[i].name == $scope.rainGageSelect)
      {
        // rainGageArray[i].setOptions(
        // {
        //  icon: 'images/rainGageIcon.png'
        // });

        $scope.rainStartDate = rainGageNames[i].startDate;
        $scope.rainEndDate = rainGageNames[i].endDate;
        $scope.rainRainfall= rainGageNames[i].rainfall;



        sessionStorage.stationSelected = 'selected';

        var sYear = parseInt(new Date(rainGageNames[i].startDate).getFullYear());
        var eYear= parseInt(new Date(rainGageNames[i].endDate).getFullYear());
        var tYear = eYear - sYear + 1;
        if ( tYear < parseInt(sessionStorage.yearsToAnalyze) ){
          sessionStorage.setItem('yearsActualDifference', tYear);
          sessionStorage.yearsToCalculate = tYear;
        }
        else {
          sessionStorage.setItem('yearsActualDifference', tYear);
          sessionStorage.yearsToCalculate = sessionStorage.yearsToAnalyze;
        }
      }
    }

    for (var i = 0; i < sameStationArray.length; i++)
    {
      if (sameStationArray[i].name == $scope.rainGageSelect)
      {
        sameStationArray[i].setOptions(
        {
          icon: 'stormwatercalculator/images/sameStationActiveIcon.png'
        });
      }
      else
      {
        if (sameStationArray[i].name != $scope.weatherStationSelect)
        {
          sameStationArray[i].setOptions(
          {
            icon: 'stormwatercalculator/images/sameStationIcon.png'
          });
        }
      }
    }

    for (var i = 0; i < weatherStationArray.length; i++)
    {
      if (weatherStationArray[i].image.src.includes('images/weatherStationActiveIcon.png'))
      {
        for (var j = 0; j < sameStationArray.length; j++)
        {
          if (sameStationArray[j].name == $scope.rainGageSelect)
          {
            sameStationArray[j].setOptions(
            {
              icon: 'stormwatercalculator/images/sameStationActiveIcon.png'
            });
          }
          else
          {
            sameStationArray[j].setOptions(
            {
              icon: 'stormwatercalculator/images/sameStationIcon.png'
            });
          }
        }
      }
    }
    checkResultsGenerated();
  }

  $scope.selectWeatherStationDropdown = function()
  {
    const weatherStationNames = $scope.weatherStationNames;
    for (var i = 0; i < weatherStationNames.length; i++)
    {
      if (weatherStationNames[i].name == $scope.weatherStationSelect)
      {
        $scope.weatherStartDate = weatherStationNames[i].startDate;
        $scope.weatherEndDate = weatherStationNames[i].endDate;
        $scope.weatherRate = weatherStationNames[i].rate;
      }

    }

    for (var i = 0; i < sameStationArray.length; i++)
    {
      if (sameStationArray[i].name == $scope.weatherStationSelect)
      {
        sameStationArray[i].setOptions(
        {
          icon: 'stormwatercalculator/images/sameStationActiveIcon.png'
        });
      }
      else
      {
        if (sameStationArray[i].name != $scope.rainGageSelect)
        {
          sameStationArray[i].setOptions(
          {
            icon: 'stormwatercalculator/images/sameStationIcon.png'
          });
        }
      }
    }

    for (var i = 0; i < rainGageArray.length; i++)
    {
      if (rainGageArray[i].image.src.includes('stormwatercalculator/images/rainGageActiveIcon.png'))
      {
        for (var j = 0; j < sameStationArray.length; j++)
        {
          if (sameStationArray[j].name == $scope.weatherStationSelect)
          {
            sameStationArray[j].setOptions(
            {
              icon: 'stormwatercalculator/images/sameStationActiveIcon.png'
            });
          }
          else
          {
            sameStationArray[j].setOptions(
            {
              icon: 'stormwatercalculator/images/sameStationIcon.png'
            });
          }
        }
      }
    }
    checkResultsGenerated();
  }

  $scope.selectRainGageIcon = function(id)
  {
    $scope.rainGageSelect = $scope.rainGageNames[id].value;
    $scope.rainStartDate = $scope.rainGageNames[id].startDate;
    $scope.rainEndDate = $scope.rainGageNames[id].endDate;
    $scope.rainRainfall = $scope.rainGageNames[id].rainfall;

    sessionStorage.stationSelected = 'selected';
    var sYear = parseInt(new Date($scope.rainGageNames[id].startDate).getFullYear());
    var eYear= parseInt(new Date($scope.rainGageNames[id].endDate).getFullYear());
    var tYear = eYear - sYear + 1;
    if ( tYear < parseInt(sessionStorage.yearsToAnalyze) ){
      sessionStorage.setItem('yearsActualDifference', tYear);
    sessionStorage.yearsToCalculate = tYear;
    }
    else {
      sessionStorage.setItem('yearsActualDifference', tYear);
    sessionStorage.yearsToCalculate = sessionStorage.yearsToAnalyze;
    }
  }

  $scope.selectWeatherStationIcon = function(id)
  {
    $scope.weatherStationSelect = $scope.weatherStationNames[id].value;
    $scope.weatherStartDate = $scope.weatherStationNames[id].startDate;
    $scope.weatherEndDate = $scope.weatherStationNames[id].endDate;
    $scope.weatherRate = $scope.weatherStationNames[id].rate;
  }

  $scope.downloadPrecipitationData = function(e)
  {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        $('#emailModal').modal();
        $('#emailButton').html('<button type="button" class="btn btn-default" id="sendDataButton" onclick="downloadRainfallWeatherDataMobile();">Send Precipitation Data File</button>');
    }
    else
    {
        window.open(rainfallDataURLString);
        window.open(weatherDataURLString);
    }
  }

  $scope.help = function()
  {
    $('#helpModal').modal();

    $('#helpText').html('<p>The Calculator computes runoff for your site using a long-term record of historical hourly rainfall data recorded at a nearby National Weather Service rain gage. It also calculates evaporation rates from historical daily temperature measurements recorded at the closest National Weather Service weather stations to your site.</p>');
  }
});

app.controller('climatechangeCtrl', function($scope)
{
  if (sessionStorage.climateScenario == 0)
  {
    $('#noChangeRadio').prop('checked', true);
  }
  if (sessionStorage.climateScenario == 1)
  {
    $('#hotDryRadio').prop('checked', true);
  }
  if (sessionStorage.climateScenario == 2)
  {
    $('#medianRadio').prop('checked', true);
  }
  if (sessionStorage.climateScenario == 3)
  {
      $('#warmWetRadio').prop('checked', true);
  }

  if (sessionStorage.climateYear == 2035)
  {
    $('#nearTermRadio').prop('checked', true);

    $('#percentageChangeHeader').html('Percentage Change in Monthly Rainfall for Near Term Projections');
    $('#maxRainfallHeader').html('Annual Max. Day Rainfall (inches) for Near Term Projections');
  }
  if (sessionStorage.climateYear == 2060)
  {
    $('#farTermRadio').prop('checked', true);

    $('#percentageChangeHeader').html('Percentage Change in Monthly Rainfall for Far Term Projections');
    $('#maxRainfallHeader').html('Annual Max. Day Rainfall (inches) for Far Term Projections');
  }


  $scope.drawCharts = function()
  {
    $scope.label1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.series1 = ['Hot/Dry', 'Median', 'Warm/Wet'];
    $scope.data1 =
    [
      warmWetData,
      medianData,
      hotDryData
    ];
    $scope.colors1 =
    [
      {
        backgroundColor: '#7cb2ab',
        borderColor: '#7cb2ab',
        fill: false
      },
      {
        backgroundColor: '#bcd75f',
        borderColor: '#bcd75f',
        fill: false
      },
      {
        backgroundColor: '#ffb74d',
        borderColor: '#ffb74d',
        fill: false
      }
    ];
    $scope.data1Options =
    {
      scales:
      {
        xAxes: [
        {
            scaleLabel:
            {
              display: true,
              labelString: 'Month'
            }
        }],
        yAxes: [
        {
          scaleLabel:
          {
            display: true,
            labelString: 'Percentage'
          }
        }]
      },
      legend:
      {
        display: true
      }
    };
    $scope.data1OptionsPDF =
    {
      scales:
      {
        xAxes: [
        {
            scaleLabel:
            {
              display: true,
              labelString: 'Month'
            }
        }],
        yAxes: [
        {
          scaleLabel:
          {
            display: true,
            labelString: 'Percentage'
          }
        }]
      },
      legend:
      {
        display: true
      },
        animation:
        {
            onComplete: function(animation)
            {
                document.getElementById('percentageChangeChartImage').setAttribute('src', this.toBase64Image());
            }
        },
        responsive: false
    };

    $scope.label2 = ["5", "10", "15", "30", "50", "100"];
    $scope.series2 = ['Hot/Dry', 'Median', 'Warm/Wet', 'Historical'];
    $scope.data2 =
    [
      maxWarmWetData,
      maxMedianData,
      maxHotDryData,
      maxHistoricalData
    ];
    $scope.colors2 =
    [
      {
        backgroundColor: '#FFEB3B',
        borderColor: '#FFEB3B',
        fill: false
      },
      {
        backgroundColor: '#FF80AB',
        borderColor: '#FF80AB',
        fill: false
      },
      {
        backgroundColor: '#7E57C2',
        borderColor: '#7E57C2',
        fill: false
      },
      {
        backgroundColor: '#01579B',
        borderColor: '#01579B',
        fill: false
      }
    ];
    $scope.data2Options =
    {
      scales:
      {
        xAxes: [
        {
            scaleLabel:
            {
              display: true,
              labelString: 'Return Period (years)'
            }
        }],
        yAxes: [
        {
          scaleLabel:
          {
            display: true,
            labelString: 'Rainfall (inches)'
          }
        }]
      },
      legend:
      {
        display: true
      }
    };
    $scope.data2OptionsPDF =
    {
      scales:
      {
        xAxes: [
        {
            scaleLabel:
            {
              display: true,
              labelString: 'Return Period (years)'
            }
        }],
        yAxes: [
        {
          scaleLabel:
          {
            display: true,
            labelString: 'Rainfall (inches)'
          }
        }]
      },
      legend:
      {
        display: true
      },
      animation:
        {
            onComplete: function(animation)
            {
                document.getElementById('maxRainfallChartImage').setAttribute('src', this.toBase64Image());
            }
        },
        responsive: false
    };
  }

  $scope.checkClimateScenario = function()
  {
    if ($('#noChangeRadio').is(':checked'))
    {
      sessionStorage.climateScenario = 0;
      checkResultsGenerated();
    }
        if ($('#hotDryRadio').is(':checked'))
    {
      sessionStorage.climateScenario = 1;
      checkResultsGenerated();
    }
    if ($('#medianRadio').is(':checked'))
    {
      sessionStorage.climateScenario = 2;
      checkResultsGenerated();
    }
      if ($('#warmWetRadio').is(':checked'))
    {
      sessionStorage.climateScenario = 3;
      checkResultsGenerated();
    }
  }

  $scope.getNearTermData = function()
  {
    climateURLString = '/swcalculator-server/api/v1/climate?year=2035&precStationID=' + sessionStorage.rainGageID;

    $('#percentageChangeHeader').html('Percentage Change in Monthly Rainfall for Near Term Projections');
    $('#maxRainfallHeader').html('Annual Max. Day Rainfall (inches) for Near Term Projections');

    getClimateChangeData();

    sessionStorage.climateYear = 2035;

    checkResultsGenerated();
  }

  $scope.getFarTermData = function()
  {
    climateURLString = '/swcalculator-server/api/v1/climate?year=2060&precStationID=' + sessionStorage.rainGageID;

    $('#percentageChangeHeader').html('Percentage Change in Monthly Rainfall for Far Term Projections');
    $('#maxRainfallHeader').html('Annual Max. Day Rainfall (inches) for Far Term Projections');

    getClimateChangeData();

    sessionStorage.climateYear = 2060;

    checkResultsGenerated();
  }

  $scope.printPDF = function()
  {
    var doc = new jsPDF('p', 'pt', 'letter');
    var percentageChangeChartImage = $('#percentageChangeChartImage');
    var maxRainfallChartImage = $('#maxRainfallChartImage');
    var centeredText = function(text, y)
    {
        var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(textOffset, y, text);
    }
    var width = doc.internal.pageSize.width;

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Climate Change", 60);

    centeredText($('#percentageChangeHeader').html(), 100);

    doc.addImage(percentageChangeChartImage[0], 'png', 25, 110, 550, 275);

    centeredText($('#maxRainfallHeader').html(), 425);

    doc.addImage(maxRainfallChartImage[0], 'png', 25, 435, 550, 275);

    doc.save('SW-Calculator-Climate-Change.pdf');
  }

});

app.controller('landcoverCtrl', function($scope)
{
  $scope.forestValue = parseInt(sessionStorage.forest);
  $scope.meadowValue = parseInt(sessionStorage.meadow);
  $scope.lawnValue = parseInt(sessionStorage.lawn);
  $scope.desertValue = parseInt(sessionStorage.desert);
  $scope.imperviousValue = parseInt(sessionStorage.impervious);

  $('.landSlider').bootstrapSlider();
  $('.landSlider:eq(0)').bootstrapSlider('setValue', $scope.forestValue);
  $('.landSlider:eq(1)').bootstrapSlider('setValue', $scope.meadowValue);
  $('.landSlider:eq(2)').bootstrapSlider('setValue', $scope.lawnValue);
  $('.landSlider:eq(3)').bootstrapSlider('setValue', $scope.desertValue);

  $('.landSlider').on('slideStart', function()
  {
    $("#modal").draggable(
    {
      disabled: true
    });
  });

  $('.landSlider').on('slideStop', function()
  {
    $("#modal").draggable(
    {
      disabled: false
    });
  });

  $('.landSlider').on('change', function(slideEvt)
  {
    $(this).parent().next('div').find(':input').val(slideEvt.value.newValue);

    var sliderID = $(this).attr('data-slider-id').replace("Slider", "");

    sessionStorage.setItem(sliderID, slideEvt.value.newValue);

    $('#imperviousValue').val(100 - (parseInt($('#forestValue').val()) + parseInt($('#meadowValue').val()) + parseInt($('#lawnValue').val()) + parseInt($('#desertValue').val())));

    sessionStorage.impervious = $('#imperviousValue').val();

    if ($('#imperviousValue').val() < 0)
    {
      $('#alertDiv').show();
      $('#alertText').html('Impervious value cannot be less than 0.');

      $('.landSlider').bootstrapSlider('setValue', 0);

      $('#forestValue').val(0);
      $('#meadowValue').val(0);
      $('#lawnValue').val(0);
      $('#desertValue').val(0);
      $('#imperviousValue').val(100);

      sessionStorage.forest = 0;
      sessionStorage.meadow = 0;
      sessionStorage.lawn = 0;
      sessionStorage.desert = 0;
      sessionStorage.impervious = 100;
    }

    checkResultsGenerated();

  });

  $scope.changeLandSlider = function(value, category)
  {
    if (category == 'forest')
    {
      $('.landSlider:eq(0)').bootstrapSlider('setValue', value);
      $('#imperviousValue').val(100 - (parseInt($('#forestValue').val()) + parseInt($('#meadowValue').val()) + parseInt($('#lawnValue').val()) + parseInt($('#desertValue').val())));

      sessionStorage.forest = value;
      sessionStorage.impervious = $('#imperviousValue').val();

      if ($('#imperviousValue').val() < 0)
      {
        $('#alertDiv').show();
        $('#alertText').html('Impervious value cannot be less than 0.');

        $('.landSlider').bootstrapSlider('setValue', 0);

        $('#forestValue').val(0);
        $('#meadowValue').val(0);
        $('#lawnValue').val(0);
        $('#desertValue').val(0);
        $('#imperviousValue').val(100);

        sessionStorage.forest = 0;
        sessionStorage.meadow = 0;
        sessionStorage.lawn = 0;
        sessionStorage.desert = 0;
        sessionStorage.impervious = 100;
      }
    }
    if (category == 'meadow')
    {
      $('.landSlider:eq(1)').bootstrapSlider('setValue', value);
      $('#imperviousValue').val(100 - (parseInt($('#forestValue').val()) + parseInt($('#meadowValue').val()) + parseInt($('#lawnValue').val()) + parseInt($('#desertValue').val())));

      sessionStorage.meadow = value;
      sessionStorage.impervious = $('#imperviousValue').val();

      if ($('#imperviousValue').val() < 0)
      {
        $('#alertDiv').show();
        $('#alertText').html('Impervious value cannot be less than 0.');

        $('.landSlider').bootstrapSlider('setValue', 0);

        $('#forestValue').val(0);
        $('#meadowValue').val(0);
        $('#lawnValue').val(0);
        $('#desertValue').val(0);
        $('#imperviousValue').val(100);

        sessionStorage.forest = 0;
        sessionStorage.meadow = 0;
        sessionStorage.lawn = 0;
        sessionStorage.desert = 0;
        sessionStorage.impervious = 100;
      }
    }
    if (category == 'lawn')
    {
      $('.landSlider:eq(2)').bootstrapSlider('setValue', value);
      $('#imperviousValue').val(100 - (parseInt($('#forestValue').val()) + parseInt($('#meadowValue').val()) + parseInt($('#lawnValue').val()) + parseInt($('#desertValue').val())));

      sessionStorage.lawn = value;
      sessionStorage.impervious = $('#imperviousValue').val();

      if ($('#imperviousValue').val() < 0)
      {
        $('#alertDiv').show();
        $('#alertText').html('Impervious value cannot be less than 0.');

        $('.landSlider').bootstrapSlider('setValue', 0);

        $('#forestValue').val(0);
        $('#meadowValue').val(0);
        $('#lawnValue').val(0);
        $('#desertValue').val(0);
        $('#imperviousValue').val(100);

        sessionStorage.forest = 0;
        sessionStorage.meadow = 0;
        sessionStorage.lawn = 0;
        sessionStorage.desert = 0;
        sessionStorage.impervious = 100;
      }
    }
    if (category == 'desert')
    {
      $('.landSlider:eq(3)').bootstrapSlider('setValue', value);
      $('#imperviousValue').val(100 - (parseInt($('#forestValue').val()) + parseInt($('#meadowValue').val()) + parseInt($('#lawnValue').val()) + parseInt($('#desertValue').val())));

      sessionStorage.desert = value;
      sessionStorage.impervious = $('#imperviousValue').val();

      if ($('#imperviousValue').val() < 0)
      {
        $('#alertDiv').show();
        $('#alertText').html('Total land cover exceeds 100%.');

        $('.landSlider').bootstrapSlider('setValue', 0);

        $('#forestValue').val(0);
        $('#meadowValue').val(0);
        $('#lawnValue').val(0);
        $('#desertValue').val(0);
        $('#imperviousValue').val(100);

        sessionStorage.forest = 0;
        sessionStorage.meadow = 0;
        sessionStorage.lawn = 0;
        sessionStorage.desert = 0;
        sessionStorage.impervious = 100;
      }
    }

    checkResultsGenerated();
  }
  $scope.help = function()
  {
    $('#helpModal').modal();

    $('#helpText').html("<p>Enter the percentage of the site's area covered by each type of non-impervious surface. The remaining area is considered to be directly connected impervious surfaces (roofs, sidewalks, streets, parking lots, etc. that drain directly off-site). Disconnecting some of this area, to run onto lawns for example, is an LID option appearing on the next page.</p><p>Choose a land cover distribution that reflects the stage of development being analyzed, such as pre-development, current or future development. Total runoff volume is highly dependent on the amount of impervious area and less so on how the non-impervious area is divided between the different land cover categories.</p><p>Non-impervious land cover type will affect the amount of rainfall captured on vegetation or in natural depressions. It also determines surface roughness. Rougher surfaces slow down overland flow allowing more opportunity for infiltration.</p>");
  }
});

app.controller('lidcontrolsCtrl', function($scope)
{
  $scope.disconnectionValue = parseInt(sessionStorage.disconnection);
  $scope.rainHarvestingValue = parseInt(sessionStorage.rainHarvesting);
  $scope.rainGardensValue = parseInt(sessionStorage.rainGardens);
  $scope.greenRoofsValue = parseInt(sessionStorage.greenRoofs);
  $scope.streetPlantersValue = parseInt(sessionStorage.streetPlanters);
  $scope.infiltrationBasinsValue = parseInt(sessionStorage.infiltrationBasins);
  $scope.permeablePavementValue = parseInt(sessionStorage.permeablePavement);
  $scope.designStormValue = parseFloat(sessionStorage.designStorm);

  $('.lidSlider').bootstrapSlider();
  $('.lidSlider:eq(0)').bootstrapSlider('setValue', $scope.disconnectionValue);
  $('.lidSlider:eq(1)').bootstrapSlider('setValue', $scope.rainHarvestingValue);
  $('.lidSlider:eq(2)').bootstrapSlider('setValue', $scope.rainGardensValue);
  $('.lidSlider:eq(3)').bootstrapSlider('setValue', $scope.greenRoofsValue);
  $('.lidSlider:eq(4)').bootstrapSlider('setValue', $scope.streetPlantersValue);
  $('.lidSlider:eq(5)').bootstrapSlider('setValue', $scope.infiltrationBasinsValue);
  $('.lidSlider:eq(6)').bootstrapSlider('setValue', $scope.permeablePavementValue);
  $('.lidModalSlider').bootstrapSlider();

  // popup

  var disconnectionCalculatedValue = ($('#disconnectionCaptureValue').val()/100)*($scope.disconnectionValue/100);
  var rainGardensCalculatedValue = ($('#rainGardensCaptureValue').val()/100)*($scope.rainGardensValue/100);
  var infiltrationBasinsCalculatedValue = ($('#infiltrationBasinsCaptureValue').val()/100)*($scope.infiltrationBasinsValue/100);
  sessionStorage.sumOfDiscRainInfiControls = disconnectionCalculatedValue + rainGardensCalculatedValue + infiltrationBasinsCalculatedValue;

  $('.lidSlider').on('slideStart', function()
  {
    $("#modal").draggable(
    {
      disabled: true
    });
  });

  $('.lidSlider').on('slideStop', function()
  {
    $("#modal").draggable(
    {
      disabled: false
    });
  });

  $('.lidSlider').on('change', function(slideEvt)
  {
    $(this).parent().next('div').find(':input').val(slideEvt.value.newValue);

    var sliderID = $(this).attr('data-slider-id').replace("Slider", "");

    sessionStorage.setItem(sliderID, slideEvt.value.newValue);
    var disconnectionCalculatedValue = ($('#disconnectionCaptureValue').val()/100)*(parseInt($('#disconnectionValue').val())/100);
    var rainGardensCalculatedValue = ($('#rainGardensCaptureValue').val()/100)*(parseInt($('#rainGardensValue').val())/100);
    var infiltrationBasinsCalculatedValue = ($('#infiltrationBasinsCaptureValue').val()/100)*(parseInt($('#infiltrationBasinsValue').val())/100);
    sessionStorage.sumOfDiscRainInfiControls = disconnectionCalculatedValue + rainGardensCalculatedValue + infiltrationBasinsCalculatedValue;

    if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
    {
      $('#alertDiv').show();
      $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

      $('.lidSlider').bootstrapSlider('setValue', 0);

      $('#disconnectionValue').val(0);
      $('#rainHarvestingValue').val(0);
      $('#rainGardensValue').val(0);
      $('#greenRoofsValue').val(0);
      $('#streetPlantersValue').val(0);
      $('#infiltrationBasinsValue').val(0);
      $('#permeablePavementValue').val(0);

      sessionStorage.disconnection = 0;
      sessionStorage.rainHarvesting = 0;
      sessionStorage.rainGardens = 0;
      sessionStorage.greenRoofs = 0;
      sessionStorage.streetPlanters = 0;
      sessionStorage.infiltrationBasins = 0;
      sessionStorage.permeablePavement = 0;
    }


    checkResultsGenerated();

  });

  $('.lidModalSlider').on('change', function(slideEvt)
  {
    $(this).parent().next('div').find(':input').val(slideEvt.value.newValue);
    if($(".lidModalSlider").attr('data-slider-id') == "disconnectionCaptureSlider" || $(".lidModalSlider").attr('data-slider-id') == "rainGardensCaptureSlider" || $(".lidModalSlider").attr('data-slider-id') == "infiltrationBasinsCaptureSlider") {
      var disconnectionCalculatedValue = ($('#disconnectionCaptureValue').val()/100)*(parseInt($('#disconnectionValue').val())/100);
      var rainGardensCalculatedValue = ($('#rainGardensCaptureValue').val()/100)*(parseInt($('#rainGardensValue').val())/100);
      var infiltrationBasinsCalculatedValue = ($('#infiltrationBasinsCaptureValue').val()/100)*(parseInt($('#infiltrationBasinsValue').val())/100);
      sessionStorage.sumOfDiscRainInfiControls = disconnectionCalculatedValue + rainGardensCalculatedValue + infiltrationBasinsCalculatedValue;
    }
    checkResultsGenerated();
  });

  $scope.changeLIDSlider = function(value, category)
  {
    console.log("Slider One");
    if(category == 'disconnection' || category == 'rainGardens' || category == 'infiltrationBasins') {
      var disconnectionCalculatedValue = ($('#disconnectionCaptureValue').val()/100)*(parseInt($('#disconnectionValue').val())/100);
      var rainGardensCalculatedValue = ($('#rainGardensCaptureValue').val()/100)*(parseInt($('#rainGardensValue').val())/100);
      var infiltrationBasinsCalculatedValue = ($('#infiltrationBasinsCaptureValue').val()/100)*(parseInt($('#infiltrationBasinsValue').val())/100);
      sessionStorage.sumOfDiscRainInfiControls = disconnectionCalculatedValue + rainGardensCalculatedValue + infiltrationBasinsCalculatedValue;
    }

    if (category == 'disconnection')
    {
      $('.lidSlider:eq(0)').bootstrapSlider('setValue', value);

      sessionStorage.disconnection = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }

    }
    if (category == 'rainHarvesting')
    {
      $('.lidSlider:eq(1)').bootstrapSlider('setValue', value);

      sessionStorage.rainHarvesting = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }
    }
    if (category == 'rainGardens')
    {
      $('.lidSlider:eq(2)').bootstrapSlider('setValue', value);

      sessionStorage.rainGardens = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }
    }
    if (category == 'greenRoofs')
    {
      $('.lidSlider:eq(3)').bootstrapSlider('setValue', value);

      sessionStorage.greenRoofs = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }
    }
    if (category == 'streetPlanters')
    {
      $('.lidSlider:eq(4)').bootstrapSlider('setValue', value);

      sessionStorage.streetPlanters = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }
    }
    if (category == 'infiltrationBasins')
    {
      $('.lidSlider:eq(5)').bootstrapSlider('setValue', value);

      sessionStorage.infiltrationBasins = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) > 100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }
    }
    if (category == 'permeablePavement')
    {
      $('.lidSlider:eq(6)').bootstrapSlider('setValue', value);

      sessionStorage.permeablePavement = value;

      if ((parseInt($('#disconnectionValue').val()) + parseInt($('#rainHarvestingValue').val()) + parseInt($('#rainGardensValue').val()) + parseInt($('#greenRoofsValue').val()) + parseInt($('#streetPlantersValue').val()) + parseInt($('#infiltrationBasinsValue').val()) + parseInt($('#permeablePavementValue').val())) >100)
      {
        $('#alertDiv').show();
        $('#alertText').html('The amount of impervious area assigned for treatment by LID controls exceeds the total impervious area on the site.');

        $('.lidSlider').bootstrapSlider('setValue', 0);

        $('#disconnectionValue').val(0);
        $('#rainHarvestingValue').val(0);
        $('#rainGardensValue').val(0);
        $('#greenRoofsValue').val(0);
        $('#streetPlantersValue').val(0);
        $('#infiltrationBasinsValue').val(0);
        $('#permeablePavementValue').val(0);

        sessionStorage.disconnection = 0;
        sessionStorage.rainHarvesting = 0;
        sessionStorage.rainGardens = 0;
        sessionStorage.greenRoofs = 0;
        sessionStorage.streetPlanters = 0;
        sessionStorage.infiltrationBasins = 0;
        sessionStorage.permeablePavement = 0;
      }
    }

    checkResultsGenerated();
  }
  $scope.changeDesignStorm = function()
  {
    if ($scope.designStormValue > 0)
    {
      $('.designStormButton').prop('disabled', false);
      sessionStorage.designStorm = $scope.designStormValue;
    }
    else
    {
      $('.designStormButton').prop('disabled', true);
    }
    if ($scope.designStormValue > 6)
    {
      $('#alertDiv').show();
        $('#alertText').html('Design Storm for Sizing value cannot be more than 6 inches.');

        $scope.designStormValue = 6;
        sessionStorage.designStorm = 6;
    }

    checkResultsGenerated();
  }
  $scope.help = function()
  {
    $('#helpModal').modal();

    $('#helpText').html("<p>Low Impact Development (LID) controls are landscaping practices designed to collect runoff from impervious surfaces and retain it on site.</p><p>Entering a non-zero design storm depth will allow you to automatically size an LID control to capture storms of that size when you click on the LID's name to bring up its design form.</p>");
  }
});

app.controller('projectcostCtrl', function($scope)
{
  $scope.costNames = costOptions;
  $scope.costRegionSelect = sessionStorage.costRegionName;

  $scope.regionalMultiplierValue = parseFloat(sessionStorage.costRegionValue);

  if (sessionStorage.reDevelopment == 'true')
  {
    $('#reDevelopmentRadio').prop('checked', true);
  }
  if (sessionStorage.newDevelopment == 'true')
  {
    $('#newDevelopmentRadio').prop('checked', true);
  }
  if (sessionStorage.poor == 'true')
  {
    $('#poorRadio').prop('checked', true);
  }
  if (sessionStorage.moderate == 'true')
  {
    $('#moderateRadio').prop('checked', true);
  }
  if (sessionStorage.excellent == 'true')
  {
    $('#excellentRadio').prop('checked', true);
  }

  $scope.changeProjectType = function(type)
  {
    if (type == 'reDevelopment')
    {
      sessionStorage.reDevelopment = true;
      sessionStorage.newDevelopment = false;

      checkResultsGenerated();
    }
    if (type == 'newDevelopment')
    {
      sessionStorage.reDevelopment = false;
      sessionStorage.newDevelopment = true;

      checkResultsGenerated();
    }
  }

  $scope.changeSiteSuitability = function(type)
  {
    if (type == 'poor')
    {
      sessionStorage.poor = true;
      sessionStorage.moderate = false;
      sessionStorage.excellent = false;

      checkResultsGenerated();
    }
    if (type == 'moderate')
    {
      sessionStorage.poor = false;
      sessionStorage.moderate = true;
      sessionStorage.excellent = false;

      checkResultsGenerated();
    }
    if (type == 'excellent')
    {
      sessionStorage.poor = false;
      sessionStorage.moderate = false;
      sessionStorage.excellent = true;

      checkResultsGenerated();
    }
  }

  $scope.changeCostRegion = function()
  {
    sessionStorage.costRegionName = $scope.costRegionSelect;

    for (var i = 0; i < costOptions.length; i++)
    {
      if ($scope.costRegionSelect == costOptions[i].value)
      {
        sessionStorage.costRegion = costOptions[i].selectedValue;
        sessionStorage.costRegionValue = costOptions[i].regionalFactor;
        sessionStorage.inflationFactor = costOptions[i].inflationFactor;

        $('#regionalMultiplierValue').val(costOptions[i].regionalFactor);

        if (sessionStorage.costRegion == 4)
        {
          $('#regionalMultiplierValue').prop('disabled', false);
        }
        else
        {
          $('#regionalMultiplierValue').prop('disabled', true);
        }
      }
    }

    checkResultsGenerated();
  }

  $scope.changeMultiplierValue = function()
  {
    sessionStorage.costRegionValue = $scope.regionalMultiplierValue;
    sessionStorage.inflationFactor = $scope.inflationFactor;

    checkResultsGenerated();
  }
});

app.controller('resultsCtrl', function($scope)
{
    var perv = sessionStorage.sumOfDiscRainInfiControls * (sessionStorage.impervious/100);
    if(perv > 1 - parseInt(sessionStorage.impervious)/100) {
      $('#alertDiv').show();
      $('#alertText').html('There is not enough pervious land area on the site to handle the disconnected impervious area or to construct rain gardens or an infiltration basin. Try decreasing either the amount of impervious area treated by these controls or their Capture Ratios.');
    }

    if (sessionStorage.resultsActive == 'false')
    {
        $('#refreshResultsButton').prop('disabled', false);
    }
    if (sessionStorage.resultsActive == 'true')
    {
        $('#refreshResultsButton').prop('disabled', true);
    }
    if ((sessionStorage.baselineActive == 'false') && (sessionStorage.printToPDF == 'false'))
    {
        $('#useBaselineButton').prop('disabled', true);
        $('#removeBaselineButton').prop('disabled', true);
    }
    if ((sessionStorage.baselineActive == 'false') && (sessionStorage.printToPDF == 'true'))
    {
        $('#useBaselineButton').prop('disabled', false);
        $('#removeBaselineButton').prop('disabled', true);
    }
    if (sessionStorage.baselineActive == 'true')
    {
        $('#useBaselineButton').prop('disabled', true);
        $('#removeBaselineButton').prop('disabled', false);
    }
    if (sessionStorage.printToPDF == 'false')
    {
        $('#resultsPDFButton').prop('disabled', true);
    }
    if (sessionStorage.printToPDF == 'true')
    {
        $('#resultsPDFButton').prop('disabled', false);
    }

  if (sessionStorage.resultsPage == 'siteDescription')
  {
    $('#siteDescriptionRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'summaryResults')
  {
    $('#summaryResultsRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'rainfallRunoffEvents')
  {
    $('#rainfallRunoffEventsRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'rainfallRunoffExceedance')
  {
    $('#rainfallRunoffExceedanceRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'rainfallRetention')
  {
    $('#rainfallRetentionRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'runoffContribution')
  {
    $('#runoffContributionRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'extremeEvent')
  {
    $('#extremeEventRadio').prop('checked', true);
  }
  if (sessionStorage.resultsPage == 'costSummary')
  {
    $('#costSummaryRadio').prop('checked', true);
  }

//----2222222------Years to calculate

  $scope.rainGageNames = rainGageOptions;
  $scope.weatherStationNames = weatherStationOptions;

  $scope.rainGageSelect = sessionStorage.rainGageName;
  $scope.rainStartDate = $scope.rainGageNames[0].startDate;

  $scope.rainEndDate = $scope.rainGageNames[0].endDate;

  var sYear = parseInt(new Date($scope.rainGageNames[0].startDate).getFullYear());
  var eYear= parseInt(new Date($scope.rainGageNames[0].endDate).getFullYear());
  var tYear = eYear - sYear + 1;


if (sessionStorage.stationSelected == 'notSelected'){
      if ( tYear < parseInt(sessionStorage.yearsToAnalyze) ){
        sessionStorage.setItem('yearsActualDifference', tYear);
        $scope.yearsValue = tYear;
      }
      else {
            sessionStorage.setItem('yearsActualDifference', tYear);
            $scope.yearsValue = parseInt(sessionStorage.yearsToAnalyze);
      }
  }

if (sessionStorage.stationSelected == 'selected'){
  console.log("Station changed. Years to calculate   " + sessionStorage.yearsToCalculate);

  $scope.yearsValue = parseInt(sessionStorage.yearsToCalculate);


}




//--------------
  $scope.eventValue = parseFloat(sessionStorage.eventThreshold);

  $scope.summary1Labels = ["Runoff", "Infiltration", "Evaporation"];
  $scope.summary1Data = [summaryChartArray[0], summaryChartArray[1], summaryChartArray[2]];
  $scope.summary1Colors = ['#7cb2ab', '#bcd75f', '#ffb74d'];
  $scope.summary1Options = {
    legend:
    {
      display: true,
      position: 'top'
    }
  };
  $scope.summary1OptionsPDF = {
    legend:
    {
      display: true,
      position: 'top'
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('summaryResultsChart1Image').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };
  $scope.summary2OptionsPDF = {
    legend:
    {
      display: true,
      position: 'top'
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('summaryResultsChart2Image').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  if (sessionStorage.baselineActive == 'false')
  {
      $scope.showBaseline = false;

      $scope.siteDescriptionCharacteristics = [
      {
        "Name": 'Site Area (acres)',
        "Current" : sessionStorage.acres
      },
      {
        "Name": 'Hydrologic Soil Group',
        "Current" : sessionStorage.soilType
      },
      {
        "Name": 'Hydraulic Conductivity (in/hr)',
        "Current" : sessionStorage.soilDrainage
      },
      {
        "Name": 'Surface Slope (%)',
        "Current" : sessionStorage.topography
      },
      {
        "Name": 'Precip. Data Source',
        "Current" : sessionStorage.rainGageName
      },
      {
        "Name": 'Evap. Data Source',
        "Current" : sessionStorage.weatherStationName
      },
      {
        "Name": 'Climate Change Scenario',
        "Current" : sessionStorage.climateScenarioName
      }];

      $scope.siteDescriptionLandCover = [
      {
        "Name": '% Forest',
        "Current" : sessionStorage.forest
      },
      {
        "Name": '% Meadow',
        "Current" : sessionStorage.meadow
      },
      {
        "Name": '% Lawn',
        "Current" : sessionStorage.lawn
      },
      {
        "Name": '% Desert',
        "Current" : sessionStorage.desert
      },
      {
        "Name": '% Impervious',
        "Current" : sessionStorage.impervious
      }];

      $scope.siteDescriptionLIDControls = [
      {
        "Name": 'Disconnection',
        "Current" : sessionStorage.disconnection
      },
      {
        "Name": 'Rain Harvesting',
        "Current" : sessionStorage.rainHarvesting
      },
      {
        "Name": 'Rain Gardens',
        "Current" : sessionStorage.rainGardens
      },
      {
        "Name": 'Green Roofs',
        "Current" : sessionStorage.greenRoofs
      },
      {
        "Name": 'Street Planters',
        "Current" : sessionStorage.streetPlanters
      },
      {
        "Name": 'Infiltration Basins',
        "Current" : sessionStorage.infiltrationBasins
      },
      {
        "Name": 'Porous Pavement',
        "Current" : sessionStorage.permeablePavement
      }];

      $scope.siteDescriptionOptions = [
      {
        "Name": 'Years Analyzed',
        "Current" : sessionStorage.yearsToAnalyze
      },
      {
        "Name": 'Ignore Consecutive Wet Days',
        "Current" : sessionStorage.ignoreDays.charAt(0).toUpperCase() + sessionStorage.ignoreDays.slice(1)
      },
      {
        "Name": 'Wet Day Threshold (inches)',
        "Current" : sessionStorage.eventThreshold
      }];

      $('#currentRainfall').html(summaryTableArray[0]);

      $scope.summaryResults = [
      {
        "Name": 'Average Annual Rainfall (inches)',
        "Current" : summaryTableArray[0]
      },
      {
        "Name": 'Average Annual Runoff (inches)',
        "Current" : summaryTableArray[1]
      },
      {
        "Name": 'Days per Year with Rainfall',
        "Current" : summaryTableArray[2]
      },
      {
        "Name": 'Days per Year with Runoff',
        "Current" : summaryTableArray[3]
      },
      {
        "Name": 'Percent of Wet Days Retained',
        "Current" : summaryTableArray[4]
      },
      {
        "Name": 'Smallest Rainfall w/ Runoff (inches)',
        "Current" : summaryTableArray[5]
      },
      {
        "Name": 'Largest Rainfall w/o Runoff (inches)',
        "Current" : summaryTableArray[6]
      },
      {
        "Name": 'Max Rainfall Retained (inches)',
        "Current" : summaryTableArray[7]
      }];

  }
    if (sessionStorage.baselineActive == 'true')
    {
        $('#currentScenarioPieChart').addClass('col-md-6');

        $scope.showBaseline = true;

        $scope.siteDescriptionCharacteristics = [
        {
          "Name": 'Site Area (acres)',
          "Current" : sessionStorage.acres,
          "Baseline": baselineSiteArea
        },
        {
          "Name": 'Hydrologic Soil Group',
          "Current" : sessionStorage.soilType,
          "Baseline": baselineSoilType
        },
        {
          "Name": 'Hydraulic Conductivity (in/hr)',
          "Current" : sessionStorage.soilDrainage,
          "Baseline": baselineSoilDrainage
        },
        {
          "Name": 'Surface Slope (%)',
          "Current" : sessionStorage.topography,
          "Baseline": baselineTopography
        },
        {
          "Name": 'Precip. Data Source',
          "Current" : sessionStorage.rainGageName,
          "Baseline": baselineRainGage
        },
        {
          "Name": 'Evap. Data Source',
          "Current" : sessionStorage.weatherStationName,
          "Baseline": baselineWeatherStation
        },
        {
          "Name": 'Climate Change Scenario',
          "Current" : sessionStorage.climateScenarioName,
          "Baseline": baselineClimateScenario
        }];

        $scope.siteDescriptionLandCover = [
        {
          "Name": '% Forest',
          "Current" : sessionStorage.forest,
          "Baseline": baselineForest
        },
        {
          "Name": '% Meadow',
          "Current" : sessionStorage.meadow,
          "Baseline": baselineMeadow
        },
        {
          "Name": '% Lawn',
          "Current" : sessionStorage.lawn,
          "Baseline": baselineLawn
        },
        {
          "Name": '% Desert',
          "Current" : sessionStorage.desert,
          "Baseline": baselineDesert
        },
        {
          "Name": '% Impervious',
          "Current" : sessionStorage.impervious,
          "Baseline": baselineImpervious
        }];

        $scope.siteDescriptionLIDControls = [
        {
          "Name": 'Disconnection',
          "Current" : sessionStorage.disconnection,
          "Baseline": baselineDisconnection
        },
        {
          "Name": 'Rain Harvesting',
          "Current" : sessionStorage.rainHarvesting,
          "Baseline": baselineRainHarvesting
        },
        {
          "Name": 'Rain Gardens',
          "Current" : sessionStorage.rainGardens,
          "Baseline": baselineRainGardens
        },
        {
          "Name": 'Green Roofs',
          "Current" : sessionStorage.greenRoofs,
          "Baseline": baselineGreenRoofs
        },
        {
          "Name": 'Street Planters',
          "Current" : sessionStorage.streetPlanters,
          "Baseline": baselineStreetPlanters
        },
        {
          "Name": 'Infiltration Basins',
          "Current" : sessionStorage.infiltrationBasins,
          "Baseline": baselineInfiltrationBasins
        },
        {
          "Name": 'Porous Pavement',
          "Current" : sessionStorage.permeablePavement,
          "Baseline": baselinePermeablePavement
        }];

        $scope.siteDescriptionOptions = [
        {
          "Name": 'Years Analyzed',
          "Current" : sessionStorage.yearsToAnalyze,
          "Baseline": baselineYearsToAnalyze
        },
        {
          "Name": 'Ignore Consecutive Wet Days',
          "Current" : sessionStorage.ignoreDays.charAt(0).toUpperCase() + sessionStorage.ignoreDays.slice(1),
          "Baseline": baselineIgnoreWetDays
        },
        {
          "Name": 'Wet Day Threshold (inches)',
          "Current" : sessionStorage.eventThreshold,
          "Baseline": baselineWetDayThreshold
        }];

        $('#currentRainfall').html(summaryTableArray[0]);
        $('#baselineRainfall').html(summaryTableArrayBaseline[0]);

        $scope.summaryResults = [
        {
          "Name": 'Average Annual Rainfall (inches)',
          "Current" : summaryTableArray[0],
          "Baseline" : summaryTableArrayBaseline[0]
        },
        {
          "Name": 'Average Annual Runoff (inches)',
          "Current" : summaryTableArray[1],
          "Baseline" : summaryTableArrayBaseline[1]
        },
        {
          "Name": 'Days per Year with Rainfall',
          "Current" : summaryTableArray[2],
          "Baseline" : summaryTableArrayBaseline[2]
        },
        {
          "Name": 'Days per Year with Runoff',
          "Current" : summaryTableArray[3],
          "Baseline" : summaryTableArrayBaseline[3]
        },
        {
          "Name": 'Percent of Wet Days Retained',
          "Current" : summaryTableArray[4],
          "Baseline" : summaryTableArrayBaseline[4]
        },
        {
          "Name": 'Smallest Rainfall w/ Runoff (inches)',
          "Current" : summaryTableArray[5],
          "Baseline" : summaryTableArrayBaseline[5]
        },
        {
          "Name": 'Largest Rainfall w/o Runoff (inches)',
          "Current" : summaryTableArray[6],
          "Baseline" : summaryTableArrayBaseline[6]
        },
        {
          "Name": 'Max Rainfall Retained (inches)',
          "Current" : summaryTableArray[7],
          "Baseline" : summaryTableArrayBaseline[7]
        }];

        $scope.summary2Labels = ["Runoff", "Infiltration", "Evaporation"];
        $scope.summary2Data = [summaryChartArrayBaseline[0], summaryChartArrayBaseline[1], summaryChartArrayBaseline[2]];
        $scope.summary2Colors = ['#7cb2ab', '#bcd75f', '#ffb74d'];
        $scope.summary2Options = {
            legend:
            {
              display: true,
              position: 'top'
            }
        }
    }


  $scope.rainfallRunoffEventsSeries = ['Current Scenario', 'Baseline Scenario'];
  $scope.rainfallRunoffEventsData = [rainfallRunoffEventsArray, rainfallRunoffEventsArrayBaseline];
  $scope.rainfallRunoffEventsColors =
  [
    {
      backgroundColor: '#01579B',
      borderColor: '#000',
      pointBackgroundColor: '#01579B',
      pointBorderColor: '#000',
      showLine: false
    },
    {
      backgroundColor: '#7E57C2',
      borderColor: '#000',
      pointBackgroundColor: '#7E57C2',
      pointBorderColor: '#000',
      showLine: false
    }
  ];
  $scope.rainfallRunoffEventsOptions =
  {
    scales:
    {
      xAxes: [
      {
          type: 'linear',
          position: 'bottom',
          ticks:
          {
            suggestedMin: 0,
            beginAtZero: true
          },
          scaleLabel:
          {
            display: true,
            labelString: 'Daily Rainfall (inches)'
          }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Daily Runoff (inches)'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };
  $scope.rainfallRunoffEventsOptionsPDF =
  {
    scales:
    {
      xAxes: [
      {
          type: 'linear',
          position: 'bottom',
          ticks:
          {
            suggestedMin: 0,
            beginAtZero: true
          },
          scaleLabel:
          {
            display: true,
            labelString: 'Daily Rainfall (inches)'
          }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Daily Runoff (inches)'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('rainfallRunoffEventsChartImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  $scope.rainfallRunoffFrequencySeries = ['Rainfall', 'Runoff', 'Rainfall Baseline', 'Runoff Baseline'];
  $scope.rainfallRunoffFrequencyData = [rainfallFrequencyArray, runoffFrequencyArray, rainfallFrequencyArrayBaseline, runoffFrequencyArrayBaseline];
  $scope.rainfallRunoffFrequencyColors =
  [
    {
      backgroundColor: '#01579B',
      borderColor: '#01579B',
      pointRadius: 3,
      pointBorderColor: '#000',
      showLine: true,
      fill: false
    },
    {
      backgroundColor: '#7E57C2',
      borderColor: '#7E57C2',
      pointRadius: 3,
      pointBorderColor: '#000',
      showLine: true,
      fill: false
    },
    {
      backgroundColor: '#FF80AB',
      borderColor: '#FF80AB',
      pointRadius: 3,
      pointBorderColor: '#000',
      showLine: true,
      fill: false
    },
    {
      backgroundColor: '#FFEB3B',
      borderColor: '#FFEB3B',
      pointRadius: 3,
      pointBorderColor: '#000',
      showLine: true,
      fill: false
    }
  ];
  $scope.rainfallRunoffFrequencyOptions =
  {
    scales:
    {
      xAxes: [
      {
          type: 'linear',
          position: 'bottom',
          ticks:
          {
            suggestedMin: 0,
            beginAtZero: true
          },
          scaleLabel:
          {
            display: true,
            labelString: 'Depth (inches)'
          }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Days per Year Exceeded'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };

  $scope.rainfallRunoffFrequencyOptionsPDF =
  {
    scales:
    {
      xAxes: [
      {
          type: 'linear',
          position: 'bottom',
          ticks:
          {
            suggestedMin: 0,
            beginAtZero: true
          },
          scaleLabel:
          {
            display: true,
            labelString: 'Depth (inches)'
          }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Days per Year Exceeded'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('rainfallRunoffFrequencyChartImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  $scope.rainfallRetentionSeries = ['Current Scenario', 'Baseline Scenario'];
  $scope.rainfallRetentionData = [rainfallRetentionArray, rainfallRetentionArrayBaseline];
  $scope.rainfallRetentionColors =
  [
    {
      backgroundColor: '#01579B',
      borderColor: '#01579B',
      pointRadius: 3,
      pointBorderColor: '#000',
      showLine: true,
      fill: false
    },
    {
      backgroundColor: '#7E57C2',
      borderColor: '#7E57C2',
      pointRadius: 3,
      pointBorderColor: '#000',
      showLine: true,
      fill: false
    }
  ];
  $scope.rainfallRetentionOptions =
  {
    scales:
    {
      xAxes: [
      {
          type: 'linear',
          position: 'bottom',
          ticks:
          {
            suggestedMin: 0,
            beginAtZero: true
          },
          scaleLabel:
          {
            display: true,
            labelString: 'Daily Rainfall (inches)'
          }
      }],
      yAxes: [
      {
       ticks:
        {
          min: 0,
          max: 100,
          stepSize: 10
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Percent of Time Retained'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };

  $scope.rainfallRetentionOptionsPDF =
  {
    scales:
    {
      xAxes: [
      {
          type: 'linear',
          position: 'bottom',
          ticks:
          {
            suggestedMin: 0,
            beginAtZero: true
          },
          scaleLabel:
          {
            display: true,
            labelString: 'Daily Rainfall (inches)'
          }
      }],
      yAxes: [
      {
       ticks:
        {
          min: 0,
          max: 100,
          stepSize: 10
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Percent of Time Retained'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('rainfallRetentionChartImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  $scope.runoffContributionSeries = ['Current Scenario', 'Baseline Scenario'];
  $scope.runoffContributionLabels = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '75%', '80%', '85%', '90%', '95%', '99%'];
  $scope.runoffContributionData = [runoffContributionArray, runoffContributionArrayBaseline];
  $scope.runoffContributionColors =
  [
    {
      backgroundColor: '#01579B',
      borderColor: '#01579B',
    },
    {
      backgroundColor: '#7E57C2',
      borderColor: '#7E57C2',
    }
  ];
  $scope.runoffContributionOptions =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'Daily Rainfall Percentile'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Percent of Total Runoff'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };

  $scope.runoffContributionOptionsPDF =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'Daily Rainfall Percentile'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: 'Percent of Total Runoff'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('runoffContributionChartImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  $scope.extremeEventSeries = ['Rainfall', 'Runoff', 'Rainfall Baseline', 'Runoff Baseline'];
  $scope.extremeEventLabels = ['5', '10', '15', '30', '50', '100'];
  $scope.extremeEventColors =
  [
    {
      backgroundColor: '#01579B',
      borderColor: '#01579B',
    },
    {
      backgroundColor: '#7E57C2',
      borderColor: '#7E57C2',
    },
    {
      backgroundColor: '#FF80AB',
      borderColor: '#FF80AB',
    },
    {
      backgroundColor: '#FFEB3B',
      borderColor: '#FFEB3B',
    }
  ];
  $scope.extremeEvent1Options =
  {
    scales:
    {
      xAxes: [
      {
          stacked: true,
          scaleLabel:
          {
            display: true,
            labelString: 'Return Period (years)'
          }
      }],
      yAxes: [
      {
        ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        stacked: true,
        scaleLabel:
        {
          display: true,
          labelString: 'Depth (inches)'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };
  $scope.extremeEvent1OptionsPDF =
  {
    scales:
    {
      xAxes: [
      {
          stacked: true,
          scaleLabel:
          {
            display: true,
            labelString: 'Return Period (years)'
          }
      }],
      yAxes: [
      {
        ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        stacked: true,
        scaleLabel:
        {
          display: true,
          labelString: 'Depth (inches)'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('extremeEventDepthChartImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };
  $scope.extremeEvent2Options =
  {
    scales:
    {
      xAxes: [
      {
          stacked: true,
          scaleLabel:
          {
            display: true,
            labelString: 'Return Period (years)'
          }
      }],
      yAxes: [
      {
        ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        stacked: true,
        scaleLabel:
        {
          display: true,
          labelString: 'Intensity (in/hr)'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };
  $scope.extremeEvent2OptionsPDF =
  {
    scales:
    {
      xAxes: [
      {
          stacked: true,
          scaleLabel:
          {
            display: true,
            labelString: 'Return Period (years)'
          }
      }],
      yAxes: [
      {
        ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        stacked: true,
        scaleLabel:
        {
          display: true,
          labelString: 'Intensity (in/hr)'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('extremeEventPeakChartImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  $scope.extremeEventDepthData = [extremeEventRainfallDepthArray, extremeEventRunoffDepthArray, extremeEventRainfallDepthArrayBaseline, extremeEventRunoffDepthArrayBaseline];

  $scope.extremeEventPeakData = [extremeEventRainfallPeakArray, extremeEventRunoffPeakArray, extremeEventRainfallPeakArrayBaseline, extremeEventRunoffPeakArrayBaseline];

  $scope.costsSeries = ['Current Scenario', 'Baseline Scenario'];
  $scope.costsLabels = ['D', 'RH', 'RG', 'GR', 'SP', 'IB', 'PP'];

  if(sessionStorage.costCriteria) {
      if(sessionStorage.costCriteria == 'capital') {
          $scope.costsData = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];
      }
      else {
        if(sessionStorage.costCriteria == 'maintenance') {
          $scope.costsData = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
        }
      }

  } else {
      $scope.costsData = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
  }



  if (sessionStorage.baselineActive == 'false')
  {
      $scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];

      $scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [0, 0, 0, 0, 0, 0, 0]];
  }
  if (sessionStorage.baselineActive == 'true')
  {
      $scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];

      $scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
  }




  // $scope.costsDataCapital = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
  // $scope.costsDataMaintenance = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
  $scope.costsColors =
  [
    {
      backgroundColor: '#01579B',
      borderColor: '#01579B',
    },
    {
      backgroundColor: '#7E57C2',
      borderColor: '#7E57C2',
    }
  ];
  $scope.costsOptions =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'LID Controls'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: '2017 US Dollars'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };
  $scope.costsOptionsCapital =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'LID Controls'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: '2017 US Dollars'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };
  $scope.costsOptionsCapitalPDF =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'LID Controls'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: '2017 US Dollars'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('costsChartCapitalImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };
  $scope.costsOptionsMaintenance =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'LID Controls'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: '2017 US Dollars'
        }
      }]
    },
    legend:
    {
      display: true
    }
  };
  $scope.costsOptionsMaintenancePDF =
  {
    scales:
    {
      xAxes: [
      {
        scaleLabel:
        {
          display: true,
          labelString: 'LID Controls'
        }
      }],
      yAxes: [
      {
       ticks:
        {
          suggestedMin: 0,
          beginAtZero: true
        },
        scaleLabel:
        {
          display: true,
          labelString: '2017 US Dollars'
        }
      }]
    },
    legend:
    {
      display: true
    },
    animation:
    {
        onComplete: function(animation)
        {
            document.getElementById('costsChartMaintenanceImage').setAttribute('src', this.toBase64Image());
        }
    },
    responsive: false
  };

  if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

$scope.costSummaryTableData = [
            {
              name: 'Disconnection',
              drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
              preTreatment: 'No / No',
              currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rainwater Harvesting',
              drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
              preTreatment: 'No / No',
              currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rain Gardens',
              drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
              preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
              currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainGardensLowCapital - baselineRainGardensLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainGardensHighCapital - baselineRainGardensHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Green Roofs',
              drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
              preTreatment: 'No / No',
              currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Street Planters',
              drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
              preTreatment: 'No / No',
              currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Infiltration Basins',
              drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
              preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
              currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Permeable Pavement',
              drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
              preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
              currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Total',
              drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
              preTreatment: 'Varies',
              currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }];

            if (sessionStorage.reDevelopment == 'true')
        {
            currentDevType = 'Re-Development'
        }
        if (sessionStorage.newDevelopment == 'true')
        {
            currentDevType = 'New Development'
        }
        if (sessionStorage.poor == 'true')
        {
            currentSiteSuitability = 'Poor'
        }
        if (sessionStorage.moderate == 'true')
        {
            currentSiteSuitability = 'Moderate'
        }
        if (sessionStorage.excellent == 'true')
        {
            currentSiteSuitability = 'Excellent'
        }
        if (sessionStorage.topography == 2)
        {
            currentTopography = 'Flat (2% Slope)'
        }
        if (sessionStorage.topography == 5)
        {
            currentTopography = 'Mod. Flat (5% Slope)'
        }
        if (sessionStorage.topography == 10)
        {
            currentTopography = 'Mod. Steep (10% Slope)'
        }
        if (sessionStorage.topography == 15)
        {
            currentTopography = 'Steep (15% Slope)'
        }

  $scope.costSummaryTableInfoData = [
    {
        name: 'Dev. Type',
        currentScenario: currentDevType,
        baselineScenario: baselineDevType
      },
      {
        name: 'Site Suitability',
        currentScenario: currentSiteSuitability,
        baselineScenario: baselineSiteSuitability
      },
      {
        name: 'Topography',
        currentScenario: currentTopography,
        baselineScenario: baselineTopography
      },
      {
        name: 'Soil Type',
        currentScenario: sessionStorage.soilType,
        baselineScenario: baselineSoilType
      },
      {
        name: 'Cost Region',
        currentScenario: sessionStorage.costRegionName + " " + sessionStorage.costRegionValue,
        baselineScenario: baselineCostRegion
      }];

  $scope.changeChartView = function(page)
  {
    $('.resultsView').hide();
    $('#' + page).show();

    sessionStorage.resultsPage = page;
  }

  const yearsValueAtLoadTime = $scope.yearsValue;

  // when actual difference between is greater than 20, then we need to assign difference value to limit of input box.
  if(sessionStorage.getItem('yearsActualDifference') && sessionStorage.getItem('yearsActualDifference') > 20) {
     $scope.yearsValueTemp = parseInt(sessionStorage.getItem('yearsActualDifference'));
   }
   else {
    $scope.yearsValueTemp = $scope.yearsValue;
   }


  $scope.changeYearsToAnalyze = function()
  {
    if($scope.yearsValue > yearsValueAtLoadTime || typeof $scope.yearsValue == "undefined") {

      if(sessionStorage.getItem('yearsActualDifference') &&  sessionStorage.getItem('yearsActualDifference') > 20) {
        if(typeof $scope.yearsValue == "undefined") {
            $scope.yearsValue = parseInt(yearsValueAtLoadTime);
        }
      }
      else {
        $scope.yearsValue = parseInt(yearsValueAtLoadTime);
      }

    }
    sessionStorage.yearsToAnalyze = $scope.yearsValue;
    checkResultsGenerated();
  }

  $scope.changeEventThreshold = function()
  {
    sessionStorage.eventThreshold = $scope.eventValue;
    checkResultsGenerated();
  }

  $scope.checkIgnoreDays = function()
  {
    if ($('#ignoreDaysCheckbox').is(':checked'))
    {
      sessionStorage.ignoreDays = true;
      checkResultsGenerated();
    }
    else
    {
      sessionStorage.ignoreDays = false;
      checkResultsGenerated();
    }
  }

  $scope.generateResults = function()
  {
    console.log()
    xmlString =
      '<?xml version="1.0" encoding="UTF-8" ?>' + '\n' +
      '<siteData>' + '\n' +
      '<version>1.1</version>' + '\n' +
      '<siteName/>' + '\n' +
      '<siteLocation>' + sessionStorage.latitude + "," + sessionStorage.longitude + '</siteLocation>' + '\n' +
      '<siteArea>' + sessionStorage.acres + '</siteArea>' + '\n' +
      '<hydSoilGroup>' + sessionStorage.soilType + '</hydSoilGroup>' + '\n' +
      '<hydConductivity>' + sessionStorage.soilDrainage + '</hydConductivity>' + '\n' +
      '<surfaceSlope>' + sessionStorage.topography + '</surfaceSlope>' + '\n' +
      '<demoValue>abcd</demoValue>' + '\n' +
      '<rainSource>4</rainSource>' + '\n' +
      '<evapSource>0</evapSource>' + '\n' +
      '<percForest>' + sessionStorage.forest + '</percForest>' + '\n' +
      '<percMeadow>' + sessionStorage.meadow + '</percMeadow>' + '\n' +
      '<percLawn>' + sessionStorage.lawn + '</percLawn>' + '\n' +
      '<percDesert>' + sessionStorage.desert + '</percDesert>' + '\n' +
      '<percImpervious>' + sessionStorage.impervious + '</percImpervious>' + '\n' +
      '<percDisconnection>' + sessionStorage.disconnection + '</percDisconnection>' + '\n' +
      '<disconnectionCaptureRatio>' + $('#disconnectionCaptureValue').val() + '</disconnectionCaptureRatio>' + '\n' +
      '<percHarvesting>' + sessionStorage.rainHarvesting + '</percHarvesting>' + '\n' +
      '<harvestingCisternSize>' + $('#rainHarvestingCisternValue').val() + '</harvestingCisternSize>' + '\n' +
      '<harvestingCisternNumber>' + $('#rainHarvestingRateValue').val() + '</harvestingCisternNumber>' + '\n' +
      '<harvestingEmptyingRate>' + $('#rainHarvestingFeetValue').val() + '</harvestingEmptyingRate>' + '\n' +
      '<percRainGardens>' + sessionStorage.rainGardens + '</percRainGardens>' + '\n' +
      '<rainGardensPondingHeight>' + $('#rainGardensPondingValue').val() + '</rainGardensPondingHeight>' + '\n' +
      '<rainGardensSoilThickness>' + $('#rainGardensThicknessValue').val() + '</rainGardensSoilThickness>' + '\n' +
      '<rainGardensSoilKsat>' + $('#rainGardensMediaValue').val() + '</rainGardensSoilKsat>' + '\n' +
      '<rainGardensCaptureRatio>' + $('#rainGardensCaptureValue').val() + '</rainGardensCaptureRatio>' + '\n' +
      '<percGreenRoofs>' + sessionStorage.greenRoofs + '</percGreenRoofs>' + '\n' +
      '<greenRoofSoilThickness>' + $('#greenRoofsThicknessValue').val() + '</greenRoofSoilThickness>' + '\n' +
      '<greenRoofSoilKsat>' + $('#greenRoofsMediaValue').val() + '</greenRoofSoilKsat>' + '\n' +
      '<percStreetPlanters>' + sessionStorage.streetPlanters + '</percStreetPlanters>' + '\n' +
      '<streetPlantersPondingHeight>' + $('#streetPlantersPondingValue').val() + '</streetPlantersPondingHeight>' + '\n' +
      '<streetPlantersSoilThickness>' + $('#streetPlantersThicknessValue').val() + '</streetPlantersSoilThickness>' + '\n' +
      '<streetPlantersSoilKsat>' + $('#streetPlantersMediaValue').val() + '</streetPlantersSoilKsat>' + '\n' +
      '<streetPlantersGravelThickness>' + $('#streetPlantersGravelValue').val() + '</streetPlantersGravelThickness>' + '\n' +
      '<streetPlantersCaptureRatio>' + $('#streetPlantersCaptureValue').val() + '</streetPlantersCaptureRatio>' + '\n' +
      '<percInfilBasin>' + sessionStorage.infiltrationBasins + '</percInfilBasin>' + '\n' +
      '<infilBasinBasinDepth>' + $('#infiltrationBasinsBasinValue').val() + '</infilBasinBasinDepth>' + '\n' +
      '<infilBasinCaptureRatio>' + $('#infiltrationBasinsCaptureValue').val() + '</infilBasinCaptureRatio>' + '\n' +
      '<percPorousPavement>' + sessionStorage.permeablePavement + '</percPorousPavement>' + '\n' +
      '<porousPavementPavementThickness>' + $('#permeablePavementPavementValue').val() + '</porousPavementPavementThickness>' + '\n' +
      '<porousPavementGravelThickness>' + $('#permeablePavementGravelValue').val() + '</porousPavementGravelThickness>' + '\n' +
      '<porousPavementCaptureRatio>' + $('#permeablePavementCaptureValue').val() + '</porousPavementCaptureRatio>' + '\n' +
      '<designStorm>' + sessionStorage.designStorm + '</designStorm>' + '\n' +
      '<yearsAnalyzed>' + $scope.yearsValue + '</yearsAnalyzed>' + '\n' +
      '<runoffThreshold>' + sessionStorage.eventThreshold + '</runoffThreshold>' + '\n' +
      '<ignoreConsecStorms>' + sessionStorage.ignoreDays + '</ignoreConsecStorms>' + '\n' +
      '<climateScenario>' + sessionStorage.climateScenario + '</climateScenario>' + '\n' +
      '<climateYear>' + sessionStorage.climateYear + '</climateYear>' + '\n' +
      '<isNewDevelopment>' + sessionStorage.newDevelopment + '</isNewDevelopment>' + '\n' +
      '<isReDevelopment>' + sessionStorage.reDevelopment + '</isReDevelopment>' + '\n' +
      '<siteSuitabilityPoor>' + sessionStorage.poor + '</siteSuitabilityPoor>' + '\n' +
      '<siteSuitabilityModerate>' + sessionStorage.moderate + '</siteSuitabilityModerate>' + '\n' +
      '<siteSuitabilityExcellent>' + sessionStorage.excellent + '</siteSuitabilityExcellent>' + '\n' +
      '<rgPretreatment>' + $('#rainGardensPretreatment').prop('checked') + '</rgPretreatment>' + '\n' +
      '<ibPretreatment>' + $('#infiltrationBasinsPretreatment').prop('checked') + '</ibPretreatment>' + '\n' +
      '<ppPretreatment>' + $('#permeablePavementPretreatment').prop('checked') + '</ppPretreatment>' + '\n' +
      '<cmbCostRegion>' + sessionStorage.costRegion + '</cmbCostRegion>' + '\n' +
      '<tbRegMultiplier>' + sessionStorage.costRegionValue + '</tbRegMultiplier>' + '\n' +
      '<precStationID>' + sessionStorage.rainGageID + '</precStationID>' + '\n' +
      '<evapStationID>' + sessionStorage.weatherStationID  + '</evapStationID>' + '\n' +

      '<lidData>' + '\n' +

'<idCapture>' + $('#disconnectionCaptureValue').val() + '</idCapture>' + '\n' +

'<rhSize>' + $('#rainHarvestingCisternValue').val() + '</rhSize>' + '\n' +
'<rhDrainRate>' + $('#rainHarvestingRateValue').val() + '</rhDrainRate>' + '\n' +
'<rhNumber>' + $('#rainHarvestingFeetValue').val() + '</rhNumber>' + '\n' +

'<rgRimHeight>' + $('#rainGardensPondingValue').val() + '</rgRimHeight>' + '\n' +
'<rgSoilHeight>' + $('#rainGardensThicknessValue').val() + '</rgSoilHeight>' + '\n' +
'<rgSoilKsat>' + $('#rainGardensMediaValue').val() + '</rgSoilKsat>' + '\n' +
'<rgCapture>' + $('#rainGardensCaptureValue').val() + '</rgCapture>' + '\n' +

'<grSoilHeight>' + $('#greenRoofsThicknessValue').val() + '</grSoilHeight>' + '\n' +
'<grSoilKsat>' + $('#greenRoofsMediaValue').val() + '</grSoilKsat>' + '\n' +


'<spRimHeight>' + $('#streetPlantersPondingValue').val() + '</spRimHeight>' + '\n' +
'<spSoilHeight>' + $('#streetPlantersThicknessValue').val() + '</spSoilHeight>' + '\n' +
'<spSoilKsat>' + $('#streetPlantersMediaValue').val() + '</spSoilKsat>' + '\n' +
'<spDrainHeight>' + $('#streetPlantersGravelValue').val() + '</spDrainHeight>' + '\n' +
'<spCapture>' + $('#streetPlantersCaptureValue').val() + '</spCapture>' + '\n' +

'<ibHeight>' + $('#infiltrationBasinsBasinValue').val() + '</ibHeight>' + '\n' +
'<ibCapture>' + $('#infiltrationBasinsCaptureValue').val() + '</ibCapture>' + '\n' +

'<ppPaveHeight>' + $('#permeablePavementPavementValue').val() + '</ppPaveHeight>' + '\n' +
'<ppDrainHeigh>' + $('#permeablePavementGravelValue').val() + '</ppDrainHeigh>' + '\n' +
'<ppCapture>' + $('#permeablePavementCaptureValue').val() + '</ppCapture>' + '\n' +

      '</lidData>' + '\n' +

      '</siteData>';

      getResults();
  }

  $scope.useAsBaseline = function()
  {
    sessionStorage.baselineActive = true;

    baselineSiteArea = sessionStorage.acres;
    baselineSoilType = sessionStorage.soilType;
    baselineSoilDrainage = sessionStorage.soilDrainage;
    baselineTopography = sessionStorage.topography;
    baselineRainGage = sessionStorage.rainGageName;
    baselineWeatherStation = sessionStorage.weatherStationName;
    baselineClimateScenario = sessionStorage.climateScenarioName;
    baselineForest = sessionStorage.forest;
    baselineMeadow = sessionStorage.meadow;
    baselineLawn = sessionStorage.lawn;
    baselineDesert = sessionStorage.desert;
    baselineImpervious = sessionStorage.impervious;
    baselineDisconnection = sessionStorage.disconnection;
    baselineRainHarvesting = sessionStorage.rainHarvesting;
    baselineRainGardens = sessionStorage.rainGardens;
    baselineGreenRoofs = sessionStorage.greenRoofs;
    baselineStreetPlanters = sessionStorage.streetPlanters;
    baselineInfiltrationBasins = sessionStorage.infiltrationBasins;
    baselinePermeablePavement = sessionStorage.permeablePavement;
    baselineYearsToAnalyze = sessionStorage.yearsToAnalyze;
    baselineIgnoreWetDays = sessionStorage.ignoreDays.charAt(0).toUpperCase() + sessionStorage.ignoreDays.slice(1);
    baselineWetDayThreshold = sessionStorage.eventThreshold;

    baselineDisconnectionLowCapital = currentDisconnectionLowCapital;
    baselineDisconnectionHighCapital = currentDisconnectionHighCapital;
    baselineRainHarvestingLowCapital = currentRainHarvestingLowCapital;
    baselineRainHarvestingHighCapital = currentRainHarvestingHighCapital;
    baselineRainGardensLowCapital = currentRainGardensLowCapital;
    baselineRainGardensHighCapital = currentRainGardensHighCapital;
    baselineGreenRoofsLowCapital = currentGreenRoofsLowCapital;
    baselineGreenRoofsHighCapital = currentGreenRoofsHighCapital;
    baselineStreetPlantersLowCapital = currentStreetPlantersLowCapital;
    baselineStreetPlantersHighCapital = currentStreetPlantersHighCapital;
    baselineInfiltrationBasinsLowCapital = currentInfiltrationBasinsLowCapital;
    baselineInfiltrationBasinsHighCapital = currentInfiltrationBasinsHighCapital;
    baselinePermeablePavementLowCapital = currentPermeablePavementLowCapital;
    baselinePermeablePavementHighCapital = currentPermeablePavementHighCapital;
    baselineDisconnectionMaintenanceLow = currentDisconnectionMaintenanceLow;
    baselineDisconnectionMaintenanceHigh = currentDisconnectionMaintenanceHigh;
    baselineRainHarvestingMaintenanceLow = currentRainHarvestingMaintenanceLow;
    baselineRainHarvestingMaintenanceHigh = currentRainHarvestingMaintenanceHigh;
    baselineRainGardensMaintenanceLow = currentRainGardensMaintenanceLow;
    baselineRainGardensMaintenanceHigh = currentRainGardensMaintenanceHigh;
    baselineGreenRoofsMaintenanceLow = currentGreenRoofsMaintenanceLow;
    baselineGreenRoofsMaintenanceHigh = currentGreenRoofsMaintenanceHigh;
    baselineStreetPlantersMaintenanceLow = currentStreetPlantersMaintenanceLow;
    baselineStreetPlantersMaintenanceHigh = currentStreetPlantersMaintenanceHigh;
    baselineInfiltrationBasinsMaintenanceLow = currentInfiltrationBasinsMaintenanceLow;
    baselineInfiltrationBasinsMaintenanceHigh = currentInfiltrationBasinsMaintenanceHigh;
    baselinePermeablePavementMaintenanceLow = currentPermeablePavementMaintenanceLow;
    baselinePermeablePavementMaintenanceHigh= currentPermeablePavementMaintenanceHigh;

    summaryChartArrayBaseline = summaryChartArray;
    summaryTableArrayBaseline = summaryTableArray;
    rainfallRunoffEventsArrayBaseline = rainfallRunoffEventsArray;
    rainfallFrequencyArrayBaseline = rainfallFrequencyArray;
    runoffFrequencyArrayBaseline = runoffFrequencyArray;
    rainfallRetentionArrayBaseline = rainfallRetentionArray;
    runoffContributionArrayBaseline = runoffContributionArray;
    extremeEventRainfallDepthArrayBaseline = extremeEventRainfallDepthArray;
    extremeEventRunoffDepthArrayBaseline = extremeEventRunoffDepthArray;
    extremeEventRainfallPeakArrayBaseline = extremeEventRainfallPeakArray;
    extremeEventRunoffPeakArrayBaseline = extremeEventRunoffPeakArray;

    baselineDevType = currentDevType;
    baselineSiteSuitability = currentSiteSuitability;
    baselineTopography = currentTopography;
    baselineCostRegion = sessionStorage.costRegionName + " " + sessionStorage.costRegionValue;

    rainGardensPretreatmentBaseline = rainGardensPretreatment;
    infiltrationBasinsPretreatmentBaseline = infiltrationBasinsPretreatment;
    permeablePavementPretreatmentBaseline = permeablePavementPretreatment;

    $scope.costSummaryTableInfoData = [
    {
        name: 'Dev. Type',
        currentScenario: currentDevType,
        baselineScenario: baselineDevType
      },
      {
        name: 'Site Suitability',
        currentScenario: currentSiteSuitability,
        baselineScenario: baselineSiteSuitability
      },
      {
        name: 'Topography',
        currentScenario: currentTopography,
        baselineScenario: baselineTopography
      },
      {
        name: 'Soil Type',
        currentScenario: sessionStorage.soilType,
        baselineScenario: baselineSoilType
      },
      {
        name: 'Cost Region',
        currentScenario: sessionStorage.costRegionName + " " + sessionStorage.costRegionValue,
        baselineScenario: baselineCostRegion
      }];

    $scope.showBaseline = true;

    $scope.siteDescriptionCharacteristics = [
    {
      "Name": 'Site Area (acres)',
      "Current" : sessionStorage.acres,
      "Baseline": baselineSiteArea
    },
    {
      "Name": 'Hydrologic Soil Group',
      "Current" : sessionStorage.soilType,
      "Baseline": baselineSoilType
    },
    {
      "Name": 'Hydraulic Conductivity (in/hr)',
      "Current" : sessionStorage.soilDrainage,
      "Baseline": baselineSoilDrainage
    },
    {
      "Name": 'Surface Slope (%)',
      "Current" : sessionStorage.topography,
      "Baseline": baselineTopography
    },
    {
      "Name": 'Precip. Data Source',
      "Current" : sessionStorage.rainGageName,
      "Baseline": baselineRainGage
    },
    {
      "Name": 'Evap. Data Source',
      "Current" : sessionStorage.weatherStationName,
      "Baseline": baselineWeatherStation
    },
    {
      "Name": 'Climate Change Scenario',
      "Current" : sessionStorage.climateScenarioName,
      "Baseline": baselineClimateScenario
    }];

    $scope.siteDescriptionLandCover = [
    {
      "Name": '% Forest',
      "Current" : sessionStorage.forest,
      "Baseline": baselineForest
    },
    {
      "Name": '% Meadow',
      "Current" : sessionStorage.meadow,
      "Baseline": baselineMeadow
    },
    {
      "Name": '% Lawn',
      "Current" : sessionStorage.lawn,
      "Baseline": baselineLawn
    },
    {
      "Name": '% Desert',
      "Current" : sessionStorage.desert,
      "Baseline": baselineDesert
    },
    {
      "Name": '% Impervious',
      "Current" : sessionStorage.impervious,
      "Baseline": baselineImpervious
    }];

    $scope.siteDescriptionLIDControls = [
    {
      "Name": 'Disconnection',
      "Current" : sessionStorage.disconnection,
      "Baseline": baselineDisconnection
    },
    {
      "Name": 'Rain Harvesting',
      "Current" : sessionStorage.rainHarvesting,
      "Baseline": baselineRainHarvesting
    },
    {
      "Name": 'Rain Gardens',
      "Current" : sessionStorage.rainGardens,
      "Baseline": baselineRainGardens
    },
    {
      "Name": 'Green Roofs',
      "Current" : sessionStorage.greenRoofs,
      "Baseline": baselineGreenRoofs
    },
    {
      "Name": 'Street Planters',
      "Current" : sessionStorage.streetPlanters,
      "Baseline": baselineStreetPlanters
    },
    {
      "Name": 'Infiltration Basins',
      "Current" : sessionStorage.infiltrationBasins,
      "Baseline": baselineInfiltrationBasins
    },
    {
      "Name": 'Porous Pavement',
      "Current" : sessionStorage.permeablePavement,
      "Baseline": baselinePermeablePavement
    }];

    $scope.siteDescriptionOptions = [
    {
      "Name": 'Years Analyzed',
      "Current" : sessionStorage.yearsToAnalyze,
      "Baseline": baselineYearsToAnalyze
    },
    {
      "Name": 'Ignore Consecutive Wet Days',
      "Current" : sessionStorage.ignoreDays.charAt(0).toUpperCase() + sessionStorage.ignoreDays.slice(1),
      "Baseline": baselineIgnoreWetDays
    },
    {
      "Name": 'Wet Day Threshold (inches)',
      "Current" : sessionStorage.eventThreshold,
      "Baseline": baselineWetDayThreshold
    }];

    $scope.summary2Labels = ["Runoff", "Infiltration", "Evaporation"];
    $scope.summary2Data = [summaryChartArrayBaseline[0], summaryChartArrayBaseline[1], summaryChartArrayBaseline[2]];
    $scope.summary2Colors = ['#7cb2ab', '#bcd75f', '#ffb74d'];
    $scope.summary2Options = {
    legend:
    {
      display: true,
      position: 'top'
    }
    };

    $('#currentRainfall').html(summaryTableArray[0]);
    $('#baselineRainfall').html(summaryTableArrayBaseline[0]);

    $scope.summaryResults = [
    {
      "Name": 'Average Annual Rainfall (inches)',
      "Current" : summaryTableArray[0],
      "Baseline" : summaryTableArrayBaseline[0]
    },
    {
      "Name": 'Average Annual Runoff (inches)',
      "Current" : summaryTableArray[1],
      "Baseline" : summaryTableArrayBaseline[1]
    },
    {
      "Name": 'Days per Year with Rainfall',
      "Current" : summaryTableArray[2],
      "Baseline" : summaryTableArrayBaseline[2]
    },
    {
      "Name": 'Days per Year with Runoff',
      "Current" : summaryTableArray[3],
      "Baseline" : summaryTableArrayBaseline[3]
    },
    {
      "Name": 'Percent of Wet Days Retained',
      "Current" : summaryTableArray[4],
      "Baseline" : summaryTableArrayBaseline[4]
    },
    {
      "Name": 'Smallest Rainfall w/ Runoff (inches)',
      "Current" : summaryTableArray[5],
      "Baseline" : summaryTableArrayBaseline[5]
    },
    {
      "Name": 'Largest Rainfall w/o Runoff (inches)',
      "Current" : summaryTableArray[6],
      "Baseline" : summaryTableArrayBaseline[6]
    },
    {
      "Name": 'Max Rainfall Retained (inches)',
      "Current" : summaryTableArray[7],
      "Baseline" : summaryTableArrayBaseline[7]
    }];

    $scope.rainfallRunoffEventsData = [rainfallRunoffEventsArray, rainfallRunoffEventsArrayBaseline];
    $scope.rainfallRunoffFrequencyData = [rainfallFrequencyArray, runoffFrequencyArray, rainfallFrequencyArrayBaseline, runoffFrequencyArrayBaseline];
    $scope.rainfallRetentionData = [rainfallRetentionArray, rainfallRetentionArrayBaseline];
    $scope.runoffContributionData = [runoffContributionArray, runoffContributionArrayBaseline];
    $scope.extremeEventDepthData = [extremeEventRainfallDepthArray, extremeEventRunoffDepthArray, extremeEventRainfallDepthArrayBaseline, extremeEventRunoffDepthArrayBaseline];
    $scope.extremeEventPeakData = [extremeEventRainfallPeakArray, extremeEventRunoffPeakArray, extremeEventRainfallPeakArrayBaseline, extremeEventRunoffPeakArrayBaseline];

    if (sessionStorage.costCriteria == 'capital')
    {
        if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

        $scope.costSummaryTableData = [
        {
          name: 'Disconnection',
          drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
          preTreatment: 'No / No',
          currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionLowCapital.toFixed(2) - baselineDisconnectionLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionHighCapital.toFixed(2) - baselineDisconnectionHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rainwater Harvesting',
          drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
          preTreatment: 'No / No',
          currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainHarvestingLowCapital.toFixed(2) - baselineRainHarvestingLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainHarvestingHighCapital.toFixed(2) - baselineRainHarvestingHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rain Gardens',
          drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
          preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
          currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainGardensLowCapital.toFixed(2) - baselineRainGardensLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainGardensHighCapital.toFixed(2) - baselineRainGardensHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Green Roofs',
          drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
          preTreatment: 'No / No',
          currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentGreenRoofsLowCapital.toFixed(2) - baselineGreenRoofsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentGreenRoofsHighCapital.toFixed(2) - baselineGreenRoofsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Street Planters',
          drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
          preTreatment: 'No / No',
          currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentStreetPlantersLowCapital.toFixed(2) - baselineStreetPlantersLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentStreetPlantersHighCapital.toFixed(2) - baselineStreetPlantersHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Infiltration Basins',
          drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
          preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
          currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentInfiltrationBasinsLowCapital.toFixed(2) - baselineInfiltrationBasinsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentInfiltrationBasinsHighCapital.toFixed(2) - baselineInfiltrationBasinsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Permeable Pavement',
          drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
          preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
          currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentPermeablePavementLowCapital.toFixed(2) - baselinePermeablePavementLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentPermeablePavementHighCapital.toFixed(2) - baselinePermeablePavementHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Total',
          drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
          preTreatment: 'Varies',
          currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }];

        $scope.costsData = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];

         $scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];
    }
    if (sessionStorage.costCriteria == 'maintenance')
    {
        if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

        $scope.costSummaryTableData = [
        {
          name: 'Disconnection',
          drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
          preTreatment: 'No / No',
          currentLow: '$' + currentDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow.toFixed(2) - baselineDisconnectionMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh.toFixed(2) - baselineDisconnectionMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rainwater Harvesting',
          drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
          preTreatment: 'No / No',
          currentLow: '$' + currentRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainHarvestingMaintenanceLow.toFixed(2) - baselineRainHarvestingMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainHarvestingMaintenanceHigh.toFixed(2) - baselineRainHarvestingMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rain Gardens',
          drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
          preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
          currentLow: '$' + currentRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainGardensMaintenanceLow.toFixed(2) - baselineRainGardensMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainGardensMaintenanceHigh.toFixed(2) - baselineRainGardensMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Green Roofs',
          drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
          preTreatment: 'No / No',
          currentLow: '$' + currentGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentGreenRoofsMaintenanceLow.toFixed(2) - baselineGreenRoofsMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentGreenRoofsMaintenanceHigh.toFixed(2) - baselineGreenRoofsMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Street Planters',
          drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
          preTreatment: 'No / No',
          currentLow: '$' + currentStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentStreetPlantersMaintenanceLow.toFixed(2) - baselineStreetPlantersMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentStreetPlantersMaintenanceHigh.toFixed(2) - baselineStreetPlantersMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Infiltration Basins',
          drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
          preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
          currentLow: '$' + currentInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentInfiltrationBasinsMaintenanceLow.toFixed(2) - baselineInfiltrationBasinsMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentInfiltrationBasinsMaintenanceHigh.toFixed(2) - baselineInfiltrationBasinsMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Permeable Pavement',
          drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
          preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
          currentLow: '$' + currentPermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentPermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselinePermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselinePermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentPermeablePavementMaintenanceLow.toFixed(2) - baselinePermeablePavementMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentPermeablePavementMaintenanceHigh.toFixed(2) - baselinePermeablePavementMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Total',
          drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
          preTreatment: 'Varies',
          currentLow: '$' + (currentDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + (currentDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + (baselineDisconnectionMaintenanceLow + baselineRainHarvestingMaintenanceLow + baselineRainGardensMaintenanceLow + baselineGreenRoofsMaintenanceLow + baselineStreetPlantersMaintenanceLow + baselineInfiltrationBasinsMaintenanceLow + baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + (baselineDisconnectionMaintenanceHigh + baselineRainHarvestingMaintenanceHigh + baselineRainGardensMaintenanceHigh + baselineGreenRoofsMaintenanceHigh + baselineStreetPlantersMaintenanceHigh + baselineInfiltrationBasinsMaintenanceHigh + baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow - baselineDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow - baselineRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow - baselineRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow - baselineGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow - baselineStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow - baselineInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow - baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh - baselineDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh - baselineRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh - baselineRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh - baselineGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh - baselineStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh - baselineInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh - baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }];

        $scope.costsData = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];

        $scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
    }

    $('#currentScenarioPieChart').addClass('col-md-6');

    $('#useBaselineButton').prop('disabled', true);
    $('#removeBaselineButton').prop('disabled', false);
  };

  $scope.removeBaseline = function()
  {
    sessionStorage.baselineActive = false;

    summaryTableArrayBaseline = summaryTableArray;
    rainfallRunoffEventsArrayBaseline = [0];
    rainfallFrequencyArrayBaseline = [0];
    runoffFrequencyArrayBaseline = [0];
    rainfallRetentionArrayBaseline = [0];
    runoffContributionArrayBaseline = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    extremeEventRainfallDepthArrayBaseline = [0, 0, 0, 0, 0, 0];
    extremeEventRainfallPeakArrayBaseline = [0, 0, 0, 0, 0, 0];
    extremeEventRunoffDepthArrayBaseline = [0, 0, 0, 0, 0, 0];
    extremeEventRunoffPeakArrayBaseline = [0, 0, 0, 0, 0, 0];

    $scope.showBaseline = false;

     baselineDisconnectionLowCapital = 0;
baselineDisconnectionHighCapital = 0;
baselineRainHarvestingLowCapital = 0;
baselineRainHarvestingHighCapital = 0;
baselineRainGardensLowCapital = 0;
baselineRainGardensHighCapital = 0;
baselineGreenRoofsLowCapital = 0;
baselineGreenRoofsHighCapital = 0;
baselineStreetPlantersLowCapital = 0;
baselineStreetPlantersHighCapital = 0;
baselineInfiltrationBasinsLowCapital = 0;
baselineInfiltrationBasinsHighCapital = 0;
baselinePermeablePavementLowCapital = 0;
baselinePermeablePavementHighCapital = 0;
baselineDisconnectionMaintenanceLow = 0;
baselineDisconnectionMaintenanceHigh = 0;
baselineRainHarvestingMaintenanceLow = 0;
baselineRainHarvestingMaintenanceHigh = 0;
baselineRainGardensMaintenanceLow = 0;
baselineRainGardensMaintenanceHigh = 0;
baselineGreenRoofsMaintenanceLow = 0;
baselineGreenRoofsMaintenanceHigh = 0;
baselineStreetPlantersMaintenanceLow = 0;
baselineStreetPlantersMaintenanceHigh = 0;
baselineInfiltrationBasinsMaintenanceLow = 0;
baselineInfiltrationBasinsMaintenanceHigh = 0;
baselinePermeablePavementMaintenanceLow = 0;
baselinePermeablePavementMaintenanceHigh = 0;

    if (sessionStorage.costCriteria == 'capital')
        {
                    if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

$scope.costSummaryTableData = [
            {
              name: 'Disconnection',
              drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
              preTreatment: 'No / No',
              currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital.toFixed(2) - baselineDisconnectionLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital.toFixed(2) - baselineDisconnectionHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rainwater Harvesting',
              drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
              preTreatment: 'No / No',
              currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainHarvestingLowCapital.toFixed(2) - baselineRainHarvestingLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainHarvestingHighCapital.toFixed(2) - baselineRainHarvestingHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rain Gardens',
              drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
              preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
              currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainGardensLowCapital.toFixed(2) - baselineRainGardensLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainGardensHighCapital.toFixed(2) - baselineRainGardensHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Green Roofs',
              drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
              preTreatment: 'No / No',
              currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentGreenRoofsLowCapital.toFixed(2) - baselineGreenRoofsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentGreenRoofsHighCapital.toFixed(2) - baselineGreenRoofsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Street Planters',
              drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
              preTreatment: 'No / No',
              currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentStreetPlantersLowCapital.toFixed(2) - baselineStreetPlantersLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentStreetPlantersHighCapital.toFixed(2) - baselineStreetPlantersHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Infiltration Basins',
              drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
              preTreatment: infiltrationBasinsPretreatment  + ' / NA',
              currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentInfiltrationBasinsLowCapital.toFixed(2) - baselineInfiltrationBasinsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentInfiltrationBasinsHighCapital.toFixed(2) - baselineInfiltrationBasinsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Permeable Pavement',
              drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
              preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
              currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentPermeablePavementLowCapital.toFixed(2) - baselinePermeablePavementLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentPermeablePavementHighCapital.toFixed(2) - baselinePermeablePavementHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Total',
              drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
              preTreatment: 'Varies',
              currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }];
        }
        if (sessionStorage.costCriteria == 'maintenance')
        {
                                if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

            $scope.costSummaryTableData = [
        {
          name: 'Disconnection',
          drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
          preTreatment: 'No / No',
          currentLow: '$' + currentDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow.toFixed(2) - baselineDisconnectionMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh.toFixed(2) - baselineDisconnectionMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rainwater Harvesting',
          drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
          preTreatment: 'No / No',
          currentLow: '$' + currentRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainHarvestingMaintenanceLow.toFixed(2) - baselineRainHarvestingMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainHarvestingMaintenanceHigh.toFixed(2) - baselineRainHarvestingMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rain Gardens',
          drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
          preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
          currentLow: '$' + currentRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainGardensMaintenanceLow.toFixed(2) - baselineRainGardensMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainGardensMaintenanceHigh.toFixed(2) - baselineRainGardensMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Green Roofs',
          drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
          preTreatment: 'No / No',
          currentLow: '$' + currentGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentGreenRoofsMaintenanceLow.toFixed(2) - baselineGreenRoofsMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentGreenRoofsMaintenanceHigh.toFixed(2) - baselineGreenRoofsMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Street Planters',
          drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
          preTreatment: 'NA / NA',
          currentLow: '$' + currentStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentStreetPlantersMaintenanceLow.toFixed(2) - baselineStreetPlantersMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentStreetPlantersMaintenanceHigh.toFixed(2) - baselineStreetPlantersMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Infiltration Basins',
          drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
          preTreatment: infiltrationBasinsPretreatment + ' / No',
          currentLow: '$' + currentInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentInfiltrationBasinsMaintenanceLow.toFixed(2) - baselineInfiltrationBasinsMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentInfiltrationBasinsMaintenanceHigh.toFixed(2) - baselineInfiltrationBasinsMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Permeable Pavement',
          drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
          preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
          currentLow: '$' + currentPermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentPermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselinePermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselinePermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentPermeablePavementMaintenanceLow.toFixed(2) - baselinePermeablePavementMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentPermeablePavementMaintenanceHigh.toFixed(2) - baselinePermeablePavementMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Total',
          drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
          preTreatment: 'Varies',
          currentLow: '$' + (currentDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + (currentDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + (baselineDisconnectionMaintenanceLow + baselineRainHarvestingMaintenanceLow + baselineRainGardensMaintenanceLow + baselineGreenRoofsMaintenanceLow + baselineStreetPlantersMaintenanceLow + baselineInfiltrationBasinsMaintenanceLow + baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + (baselineDisconnectionMaintenanceHigh + baselineRainHarvestingMaintenanceHigh + baselineRainGardensMaintenanceHigh + baselineGreenRoofsMaintenanceHigh + baselineStreetPlantersMaintenanceHigh + baselineInfiltrationBasinsMaintenanceHigh + baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow - baselineDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow - baselineRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow - baselineRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow - baselineGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow - baselineStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow - baselineInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow - baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh - baselineDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh - baselineRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh - baselineRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh - baselineGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh - baselineStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh - baselineInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh - baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }];
        }

    $scope.summary1Data = [summaryChartArray[0], summaryChartArray[1], summaryChartArray[2]];
    $scope.rainfallRunoffEventsData = [rainfallRunoffEventsArray, rainfallRunoffEventsArrayBaseline];
    $scope.rainfallRunoffFrequencyData = [rainfallFrequencyArray, runoffFrequencyArray, rainfallFrequencyArrayBaseline, runoffFrequencyArrayBaseline];
    $scope.rainfallRetentionData = [rainfallRetentionArray, rainfallRetentionArrayBaseline];
    $scope.runoffContributionData = [runoffContributionArray, runoffContributionArrayBaseline];
    $scope.extremeEventDepthData = [extremeEventRainfallDepthArray, extremeEventRunoffDepthArray, extremeEventRainfallDepthArrayBaseline, extremeEventRunoffDepthArrayBaseline];
    $scope.extremeEventPeakData = [extremeEventRainfallPeakArray, extremeEventRunoffPeakArray, extremeEventRainfallPeakArrayBaseline, extremeEventRunoffPeakArrayBaseline];

    $('#currentScenarioPieChart').removeClass('col-md-6');

    $('#useBaselineButton').prop('disabled', false);
    $('#removeBaselineButton').prop('disabled', true);
  }

  $scope.changeCostCriteria = function()
  {
    if ($('#typeOfCostsLink').hasClass('maintenanceCosts'))
    {
        $('#typeOfCostsLink').removeClass('maintenanceCosts');
        $('#typeOfCostsLink').addClass('capitalCosts');

        $('#typeOfCostsLink').html('Capital Costs');

        $('#costsSummaryHeader').html('Estimate of Annual Probable Maintenance Costs');

        sessionStorage.costCriteria = 'maintenance';

        if (sessionStorage.baselineActive == 'false')
        {
            if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

            $scope.costSummaryTableData = [
        {
          name: 'Disconnection',
          drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
          preTreatment: 'No / No',
          currentLow: '$' + currentDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow.toFixed(2) - baselineDisconnectionMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh.toFixed(2) - baselineDisconnectionMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rainwater Harvesting',
          drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
          preTreatment: 'No / No',
          currentLow: '$' + currentRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainHarvestingMaintenanceLow.toFixed(2) - baselineRainHarvestingMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainHarvestingMaintenanceHigh.toFixed(2) - baselineRainHarvestingMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rain Gardens',
          drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
          preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
          currentLow: '$' + currentRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainGardensMaintenanceLow.toFixed(2) - baselineRainGardensMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainGardensMaintenanceHigh.toFixed(2) - baselineRainGardensMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Green Roofs',
          drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
          preTreatment: 'No / No',
          currentLow: '$' + currentGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentGreenRoofsMaintenanceLow.toFixed(2) - baselineGreenRoofsMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentGreenRoofsMaintenanceHigh.toFixed(2) - baselineGreenRoofsMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Street Planters',
          drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
          preTreatment: 'No / No',
          currentLow: '$' + currentStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentStreetPlantersMaintenanceLow.toFixed(2) - baselineStreetPlantersMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentStreetPlantersMaintenanceHigh.toFixed(2) - baselineStreetPlantersMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Infiltration Basins',
          drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
          preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
          currentLow: '$' + currentInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentInfiltrationBasinsMaintenanceLow.toFixed(2) - baselineInfiltrationBasinsMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentInfiltrationBasinsMaintenanceHigh.toFixed(2) - baselineInfiltrationBasinsMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Permeable Pavement',
          drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
          preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
          currentLow: '$' + currentPermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentPermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselinePermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselinePermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentPermeablePavementMaintenanceLow.toFixed(2) - baselinePermeablePavementMaintenanceLow.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentPermeablePavementMaintenanceHigh.toFixed(2) - baselinePermeablePavementMaintenanceHigh.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Total',
          drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
          preTreatment: 'Varies',
          currentLow: '$' + (currentDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + (currentDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + (baselineDisconnectionMaintenanceLow + baselineRainHarvestingMaintenanceLow + baselineRainGardensMaintenanceLow + baselineGreenRoofsMaintenanceLow + baselineStreetPlantersMaintenanceLow + baselineInfiltrationBasinsMaintenanceLow + baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + (baselineDisconnectionMaintenanceHigh + baselineRainHarvestingMaintenanceHigh + baselineRainGardensMaintenanceHigh + baselineGreenRoofsMaintenanceHigh + baselineStreetPlantersMaintenanceHigh + baselineInfiltrationBasinsMaintenanceHigh + baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow - baselineDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow - baselineRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow - baselineRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow - baselineGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow - baselineStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow - baselineInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow - baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh - baselineDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh - baselineRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh - baselineRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh - baselineGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh - baselineStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh - baselineInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh - baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }];
        // console.log($scope.costSummaryTableData);
            $scope.costsData = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];

            $scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
        }
        if (sessionStorage.baselineActive == 'true')
        {
            if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

            $scope.costSummaryTableData = [
        {
          name: 'Disconnection',
          drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
          preTreatment: 'No / No',
          currentLow: '$' + currentDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineDisconnectionMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineDisconnectionMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow - baselineDisconnectionMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh - baselineDisconnectionMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rainwater Harvesting',
          drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
          preTreatment: 'No / No',
          currentLow: '$' + currentRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainHarvestingMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainHarvestingMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainHarvestingMaintenanceLow - baselineRainHarvestingMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainHarvestingMaintenanceHigh - baselineRainHarvestingMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Rain Gardens',
          drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
          preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
          currentLow: '$' + currentRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineRainGardensMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineRainGardensMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentRainGardensMaintenanceLow - baselineRainGardensMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentRainGardensMaintenanceHigh - baselineRainGardensMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Green Roofs',
          drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
          preTreatment: 'No / No',
          currentLow: '$' + currentGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineGreenRoofsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineGreenRoofsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentGreenRoofsMaintenanceLow - baselineGreenRoofsMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentGreenRoofsMaintenanceHigh - baselineGreenRoofsMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Street Planters',
          drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
          preTreatment: 'NA / NA',
          currentLow: '$' + currentStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineStreetPlantersMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineStreetPlantersMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentStreetPlantersMaintenanceLow - baselineStreetPlantersMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentStreetPlantersMaintenanceHigh - baselineStreetPlantersMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Infiltration Basins',
          drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
          preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
          currentLow: '$' + currentInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselineInfiltrationBasinsMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselineInfiltrationBasinsMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentInfiltrationBasinsMaintenanceLow - baselineInfiltrationBasinsMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentInfiltrationBasinsMaintenanceHigh - baselineInfiltrationBasinsMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Permeable Pavement',
          drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
          preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
          currentLow: '$' + currentPermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          currentHigh: '$' + currentPermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + baselinePermeablePavementMaintenanceLow.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + baselinePermeablePavementMaintenanceHigh.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentPermeablePavementMaintenanceLow - baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentPermeablePavementMaintenanceHigh - baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
          name: 'Total',
          drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
          preTreatment: 'Varies',
          currentLow: '$' + (currentDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + (currentDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineLow: '$' + (baselineDisconnectionMaintenanceLow + baselineRainHarvestingMaintenanceLow + baselineRainGardensMaintenanceLow + baselineGreenRoofsMaintenanceLow + baselineStreetPlantersMaintenanceLow + baselineInfiltrationBasinsMaintenanceLow + baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          baselineHigh: '$' + (baselineDisconnectionMaintenanceHigh + baselineRainHarvestingMaintenanceHigh + baselineRainGardensMaintenanceHigh + baselineGreenRoofsMaintenanceHigh + baselineStreetPlantersMaintenanceHigh + baselineInfiltrationBasinsMaintenanceHigh + baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceLow: '$' + (currentDisconnectionMaintenanceLow - baselineDisconnectionMaintenanceLow + currentRainHarvestingMaintenanceLow - baselineRainHarvestingMaintenanceLow + currentRainGardensMaintenanceLow - baselineRainGardensMaintenanceLow + currentGreenRoofsMaintenanceLow - baselineGreenRoofsMaintenanceLow + currentStreetPlantersMaintenanceLow - baselineStreetPlantersMaintenanceLow + currentInfiltrationBasinsMaintenanceLow - baselineInfiltrationBasinsMaintenanceLow + currentPermeablePavementMaintenanceLow - baselinePermeablePavementMaintenanceLow).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          differenceHigh: '$' + (currentDisconnectionMaintenanceHigh - baselineDisconnectionMaintenanceHigh + currentRainHarvestingMaintenanceHigh - baselineRainHarvestingMaintenanceHigh + currentRainGardensMaintenanceHigh - baselineRainGardensMaintenanceHigh + currentGreenRoofsMaintenanceHigh - baselineGreenRoofsMaintenanceHigh + currentStreetPlantersMaintenanceHigh - baselineStreetPlantersMaintenanceHigh + currentInfiltrationBasinsMaintenanceHigh - baselineInfiltrationBasinsMaintenanceHigh + currentPermeablePavementMaintenanceHigh - baselinePermeablePavementMaintenanceHigh).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }];
        $scope.costsData = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];

        $scope.costsDataMaintenance = [[((currentDisconnectionMaintenanceLow + currentDisconnectionMaintenanceHigh) / 2).toFixed(2), ((currentRainHarvestingMaintenanceLow + currentRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((currentRainGardensMaintenanceLow + currentRainGardensMaintenanceHigh) / 2).toFixed(2), ((currentGreenRoofsMaintenanceLow + currentGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((currentStreetPlantersMaintenanceLow + currentStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((currentInfiltrationBasinsMaintenanceLow + currentInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((currentPermeablePavementMaintenanceLow + currentPermeablePavementMaintenanceHigh) / 2).toFixed(2)], [((baselineDisconnectionMaintenanceLow + baselineDisconnectionMaintenanceHigh) / 2).toFixed(2), ((baselineRainHarvestingMaintenanceLow + baselineRainHarvestingMaintenanceHigh) / 2).toFixed(2), ((baselineRainGardensMaintenanceLow + baselineRainGardensMaintenanceHigh) / 2).toFixed(2), ((baselineGreenRoofsMaintenanceLow + baselineGreenRoofsMaintenanceHigh) / 2).toFixed(2), ((baselineStreetPlantersMaintenanceLow + baselineStreetPlantersMaintenanceHigh) / 2).toFixed(2), ((baselineInfiltrationBasinsMaintenanceLow + baselineInfiltrationBasinsMaintenanceHigh) / 2).toFixed(2), ((baselinePermeablePavementMaintenanceLow + baselinePermeablePavementMaintenanceHigh) / 2).toFixed(2)]];
        }
    }
    else if ($('#typeOfCostsLink').hasClass('capitalCosts'))
    {
        $('#typeOfCostsLink').addClass('maintenanceCosts');
        $('#typeOfCostsLink').removeClass('capitalCosts');

        $('#typeOfCostsLink').html('Maintenance Costs');

        $('#costsSummaryHeader').html('Estimate of Probable Capital Costs (estimates in 2017 US.$)');

        sessionStorage.costCriteria = 'capital';

        if (sessionStorage.baselineActive == 'false')
        {
            if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

            $scope.costSummaryTableData = [
            {
              name: 'Disconnection',
              drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
              preTreatment: 'No / No',
              currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital.toFixed(2) - baselineDisconnectionLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital.toFixed(2) - baselineDisconnectionHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rainwater Harvesting',
              drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
              preTreatment: 'No / No',
              currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainHarvestingLowCapital.toFixed(2) - baselineRainHarvestingLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainHarvestingHighCapital.toFixed(2) - baselineRainHarvestingHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rain Gardens',
              drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
              preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
              currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainGardensLowCapital.toFixed(2) - baselineRainGardensLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainGardensHighCapital.toFixed(2) - baselineRainGardensHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Green Roofs',
              drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
              preTreatment: 'No / No',
              currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentGreenRoofsLowCapital.toFixed(2) - baselineGreenRoofsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentGreenRoofsHighCapital.toFixed(2) - baselineGreenRoofsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Street Planters',
              drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
              preTreatment: 'No / No',
              currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentStreetPlantersLowCapital.toFixed(2) - baselineStreetPlantersLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentStreetPlantersHighCapital.toFixed(2) - baselineStreetPlantersHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Infiltration Basins',
              drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
              preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
              currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentInfiltrationBasinsLowCapital.toFixed(2) - baselineInfiltrationBasinsLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentInfiltrationBasinsHighCapital.toFixed(2) - baselineInfiltrationBasinsHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Permeable Pavement',
              drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
              preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
              currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentPermeablePavementLowCapital.toFixed(2) - baselinePermeablePavementLowCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentPermeablePavementHighCapital.toFixed(2) - baselinePermeablePavementHighCapital.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            },
            {
              name: 'Total',
              drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
              preTreatment: 'Varies',
              currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }];

            $scope.costsData = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];

            $scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];
        }
        if (sessionStorage.baselineActive == 'true')
        {
            if ($('#rainGardensPretreatment').is(':checked'))
            {
                rainGardensPretreatment = 'Yes';
            }
            else
            {
                rainGardensPretreatment = 'No';
            }
            if ($('#infiltrationBasinsPretreatment').is(':checked'))
            {
                infiltrationBasinsPretreatment = 'Yes';
            }
            else
            {
                infiltrationBasinsPretreatment = 'No';
            }
            if ($('#permeablePavementPretreatment').is(':checked'))
            {
                permeablePavementPretreatment = 'Yes';
            }
            else
            {
                permeablePavementPretreatment = 'No';
            }

            $scope.costSummaryTableData = [
            {
              name: 'Disconnection',
              drainageArea: sessionStorage.disconnection  + ' / ' + baselineDisconnection,
              preTreatment: 'No / No',
              currentLow: '$' + currentDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineDisconnectionLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineDisconnectionHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rainwater Harvesting',
              drainageArea: sessionStorage.rainHarvesting  + ' / ' + baselineRainHarvesting,
              preTreatment: 'No / No',
              currentLow: '$' + currentRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainHarvestingLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainHarvestingHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainHarvestingLowCapital.toFixed(2) - baselineRainHarvestingLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainHarvestingHighCapital.toFixed(2) - baselineRainHarvestingHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Rain Gardens',
              drainageArea: sessionStorage.rainGardens + ' / ' + baselineRainGardens,
              preTreatment: rainGardensPretreatment + ' / ' + rainGardensPretreatmentBaseline,
              currentLow: '$' + currentRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineRainGardensLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineRainGardensHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentRainGardensLowCapital - baselineRainGardensLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentRainGardensHighCapital - baselineRainGardensHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Green Roofs',
              drainageArea: sessionStorage.greenRoofs  + ' / ' + baselineGreenRoofs,
              preTreatment: 'No / No',
              currentLow: '$' + currentGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineGreenRoofsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineGreenRoofsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Street Planters',
              drainageArea: sessionStorage.streetPlanters  + ' / ' + baselineStreetPlanters,
              preTreatment: 'No / No',
              currentLow: '$' + currentStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineStreetPlantersLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineStreetPlantersHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Infiltration Basins',
              drainageArea: sessionStorage.infiltrationBasins  + ' / ' + baselineInfiltrationBasins,
              preTreatment: infiltrationBasinsPretreatment + ' / ' + infiltrationBasinsPretreatmentBaseline,
              currentLow: '$' + currentInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselineInfiltrationBasinsLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselineInfiltrationBasinsHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Permeable Pavement',
              drainageArea: sessionStorage.permeablePavement + ' / ' + baselinePermeablePavement,
              preTreatment: permeablePavementPretreatment + ' / ' + permeablePavementPretreatmentBaseline,
              currentLow: '$' + currentPermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              currentHigh: '$' + currentPermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + baselinePermeablePavementLowCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + baselinePermeablePavementHighCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            },
            {
              name: 'Total',
              drainageArea: (parseInt(sessionStorage.disconnection) + parseInt(sessionStorage.rainHarvesting) + parseInt(sessionStorage.rainGardens) + parseInt(sessionStorage.greenRoofs) + parseInt(sessionStorage.streetPlanters) + parseInt(sessionStorage.infiltrationBasins) + parseInt(sessionStorage.permeablePavement)) + ' / ' + (parseInt(baselineDisconnection) + parseInt(baselineRainHarvesting) + parseInt(baselineRainGardens) + parseInt(baselineGreenRoofs) + parseInt(baselineStreetPlanters) + parseInt(baselineInfiltrationBasins) + parseInt(baselinePermeablePavement)),
              preTreatment: 'Varies',
              currentLow: '$' + (currentDisconnectionLowCapital + currentRainHarvestingLowCapital + currentRainGardensLowCapital + currentGreenRoofsLowCapital + currentStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                  currentHigh: '$' + (currentDisconnectionHighCapital + currentRainHarvestingHighCapital + currentRainGardensHighCapital + currentGreenRoofsHighCapital + currentStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineLow: '$' + (baselineDisconnectionLowCapital + baselineRainHarvestingLowCapital + baselineRainGardensLowCapital + baselineGreenRoofsLowCapital + baselineStreetPlantersLowCapital + baselineInfiltrationBasinsLowCapital + baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              baselineHigh: '$' + (baselineDisconnectionHighCapital + baselineRainHarvestingHighCapital + baselineRainGardensHighCapital + baselineGreenRoofsHighCapital + baselineStreetPlantersHighCapital + baselineInfiltrationBasinsHighCapital + baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceLow: '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital + currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital + currentRainGardensLowCapital - baselineRainGardensLowCapital + currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital + currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital + currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital + currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              differenceHigh: '$' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital + currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital + currentRainGardensHighCapital - baselineRainGardensHighCapital + currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital + currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital + currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital + currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }];
            $scope.costsData = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];

            $scope.costsDataCapital = [[((currentDisconnectionLowCapital + currentDisconnectionHighCapital) / 2).toFixed(2), ((currentRainHarvestingLowCapital + currentRainHarvestingHighCapital) / 2).toFixed(2), ((currentRainGardensLowCapital + currentRainGardensHighCapital) / 2).toFixed(2), ((currentGreenRoofsLowCapital + currentGreenRoofsHighCapital) / 2).toFixed(2), ((currentStreetPlantersLowCapital + currentStreetPlantersHighCapital) / 2).toFixed(2), ((currentInfiltrationBasinsLowCapital + currentInfiltrationBasinsHighCapital) / 2).toFixed(2), ((currentPermeablePavementLowCapital + currentPermeablePavementHighCapital) / 2).toFixed(2)], [((baselineDisconnectionLowCapital + baselineDisconnectionHighCapital) / 2).toFixed(2), ((baselineRainHarvestingLowCapital + baselineRainHarvestingHighCapital) / 2).toFixed(2), ((baselineRainGardensLowCapital + baselineRainGardensHighCapital) / 2).toFixed(2), ((baselineGreenRoofsLowCapital + baselineGreenRoofsHighCapital) / 2).toFixed(2), ((baselineStreetPlantersLowCapital + baselineStreetPlantersHighCapital) / 2).toFixed(2), ((baselineInfiltrationBasinsLowCapital + baselineInfiltrationBasinsHighCapital) / 2).toFixed(2), ((baselinePermeablePavementLowCapital + baselinePermeablePavementHighCapital) / 2).toFixed(2)]];
        }
    }
  }

  $scope.changeCostView = function()
  {
    if ($('#costsViewLink').hasClass('graphical'))
    {
        $('#costsViewLink').addClass('tabular');
        $('#costsViewLink').removeClass('graphical');

        $('#costsViewLink').html('Tabular View');

        $('#costsTable').hide();
        $('#costsGraph').show();
    }
    else if ($('#costsViewLink').hasClass('tabular'))
    {
        $('#costsViewLink').addClass('graphical');
        $('#costsViewLink').removeClass('tabular');

        $('#costsViewLink').html('Graphical View');

        $('#costsTable').show();
        $('#costsGraph').hide();
    }
  }

  $scope.printPDF = function()
  {
    var doc = new jsPDF('p', 'pt', 'letter');
    var summaryResultsChart1Image = $('#summaryResultsChart1Image');
    var summaryResultsChart2Image = $('#summaryResultsChart2Image');
    var rainfallRunoffEventsChartImage = $('#rainfallRunoffEventsChartImage');
    var rainfallRunoffFrequencyChartImage = $('#rainfallRunoffFrequencyChartImage');
    var rainfallRetentionChartImage = $('#rainfallRetentionChartImage');
    var runoffContributionChartImage = $('#runoffContributionChartImage');
    var extremeEventDepthChartImage = $('#extremeEventDepthChartImage');
    var extremeEventPeakChartImage = $('#extremeEventPeakChartImage');
    var costsChartCapitalImage = $('#costsChartCapitalImage');
    var costsChartMaintenanceImage = $('#costsChartMaintenanceImage');
    var centeredText = function(text, y)
    {
        var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
        doc.text(textOffset, y, text);
    }
    var descriptionColumns;
    var descriptionRows;
    var summaryColumns;
    var summaryRows;
    var tableKeyColumns;
    var tableKeyRows;
    var costsColumns;
    var costsCapitalRows;
    var costsMaintenanceRows;

    if (sessionStorage.baselineActive == 'false')
    {
        descriptionColumns = ["Parameter", "Current Scenario"];
        descriptionRows = [
            ['Site Characteristics'],
            ['Site Area (acres)', sessionStorage.acres],
            ['Hydrologic Soil Group', sessionStorage.soilType],
            ['Hydraulic Conductivity (in/hr)', sessionStorage.soilDrainage],
            ['Surface Slope (%)', sessionStorage.topography],
            ['Precip. Data Source', sessionStorage.rainGageName],
            ['Evap. Data Source', sessionStorage.weatherStationName],
            ['Climate Change Scenario', sessionStorage.climateScenarioName],
            ['Land Cover'],
            ['% Forest', sessionStorage.forest],
            ['% Meadow', sessionStorage.meadow],
            ['% Lawn', sessionStorage.lawn],
            ['% Desert', sessionStorage.desert],
            ['% Impervious', sessionStorage.impervious],
            ['LID Controls'],
            ['% Disconnection', sessionStorage.disconnection],
            ['% Rain Harvesting', sessionStorage.rainHarvesting],
            ['% Rain Gardens', sessionStorage.rainGardens],
            ['% Green Roofs', sessionStorage.greenRoofs],
            ['% Street Planters', sessionStorage.streetPlanters],
            ['% Infiltration Basins', sessionStorage.infiltrationBasins],
            ['% Permeable Pavement', sessionStorage.permeablePavement],
            ['Analysis Options'],
            ['Years Analyzed', sessionStorage.yearsToAnalyze],
            ['Ignore Consecutive Wet Days', sessionStorage.ignoreDays.charAt(0).toUpperCase() + sessionStorage.ignoreDays.slice(1)],
            ['Wet Day Threshold (inches)', sessionStorage.eventThreshold]
            ];

        summaryColumns = ["Statisic", "Current Scenario"];
        summaryRows = [
            ['Average Annual Rainfall (inches)', summaryTableArray[0]],
            ['Average Annual Runoff (inches)', summaryTableArray[1]],
            ['Days per Year with Rainfall', summaryTableArray[2]],
            ['Days per Year with Runoff', summaryTableArray[3]],
            ['Percent of Wet Days Retained', summaryTableArray[4]],
            ['Smallest Rainfall w/ Runoff (inches)', summaryTableArray[5]],
            ['Largest Rainfall w/o Runoff (inches)', summaryTableArray[6]],
            ['Max Rainfall Retained (inches)', summaryTableArray[7]]
            ];

        costsCapitalRows = [
        ["D", sessionStorage.disconnection  + ' (C)', "NA", '$' + currentDisconnectionLowCapital.toFixed(2) + ' (Low) / $' +  currentDisconnectionHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentDisconnectionLowCapital.toFixed(2) + ' (Low) / $' +  currentDisconnectionHighCapital.toFixed(2) + ' (High)'],
        ["RH", sessionStorage.rainHarvesting  + ' (C)', "NA", '$' + currentRainHarvestingLowCapital.toFixed(2) + ' (Low) / $' +  currentRainHarvestingHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentRainHarvestingLowCapital.toFixed(2) + ' (Low) / $' +  currentRainHarvestingHighCapital.toFixed(2) + ' (High)'],
        ["RG", sessionStorage.rainGardens  + ' (C)', "NA", '$' + currentRainGardensLowCapital.toFixed(2) + ' (Low) / $' +  currentRainGardensHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentRainGardensLowCapital.toFixed(2) + ' (Low) / $' +  currentRainGardensHighCapital.toFixed(2) + ' (High)'],
        ["GR", sessionStorage.greenRoofs  + ' (C)', "NA", '$' + currentGreenRoofsLowCapital.toFixed(2) + ' (Low) / $' +  currentGreenRoofsHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentGreenRoofsLowCapital.toFixed(2) + ' (Low) / $' +  currentGreenRoofsHighCapital.toFixed(2) + ' (High)'],
        ["SP", sessionStorage.streetPlanters + ' (C)', "NA", '$' + currentStreetPlantersLowCapital.toFixed(2) + ' (Low) / $' +  currentStreetPlantersHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentStreetPlantersLowCapital.toFixed(2) + ' (Low) / $' +  currentStreetPlantersHighCapital.toFixed(2) + ' (High)'],
        ["IB", sessionStorage.infiltrationBasins + ' (C)', "NA", '$' + currentInfiltrationBasinsLowCapital.toFixed(2) + ' (Low) / $' +  currentInfiltrationBasinsHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentInfiltrationBasinsLowCapital.toFixed(2) + ' (Low) / $' +  currentInfiltrationBasinsHighCapital.toFixed(2) + ' (High)'],
        ["PP", sessionStorage.permeablePavement + ' (C)', "NA", '$' + currentPermeablePavementLowCapital.toFixed(2) + ' (Low) / $' +  currentPermeablePavementHighCapital.toFixed(2) + ' (High)', 'NA / NA', '$' + currentPermeablePavementLowCapital.toFixed(2) + ' (Low) / $' +  currentPermeablePavementHighCapital.toFixed(2) + ' (High)']];
        console.log(costsCapitalRows);
        costsMaintenanceRows = [
        ["D", sessionStorage.disconnection  + ' (C)', "NA", '$' + currentDisconnectionMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentDisconnectionMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentDisconnectionMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentDisconnectionMaintenanceHigh.toFixed(2) + ' (High)'],
        ["RH", sessionStorage.rainHarvesting  + ' (C)', "NA", '$' + currentRainHarvestingMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentRainHarvestingMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentRainHarvestingMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentRainHarvestingMaintenanceHigh.toFixed(2) + ' (High)'],
        ["RG", sessionStorage.rainGardens  + ' (C)', "NA", '$' + currentRainGardensMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentRainGardensMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentRainGardensMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentRainGardensMaintenanceHigh.toFixed(2) + ' (High)'],
        ["GR", sessionStorage.greenRoofs  + ' (C)', "NA", '$' + currentGreenRoofsMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentGreenRoofsMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentGreenRoofsMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentGreenRoofsMaintenanceHigh.toFixed(2) + ' (High)'],
        ["SP", sessionStorage.streetPlanters + ' (C)', "NA", '$' + currentStreetPlantersMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentStreetPlantersMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentStreetPlantersMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentStreetPlantersMaintenanceHigh.toFixed(2) + ' (High)'],
        ["IB", sessionStorage.infiltrationBasins + ' (C)', "NA", '$' + currentInfiltrationBasinsMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentInfiltrationBasinsMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentInfiltrationBasinsMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentInfiltrationBasinsMaintenanceHigh.toFixed(2) + ' (High)'],
        ["PP", sessionStorage.permeablePavement + ' (C)', "NA", '$' + currentPermeablePavementMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentPermeablePavementMaintenanceHigh.toFixed(2) + ' (High)', 'NA / NA', '$' + currentPermeablePavementMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentPermeablePavementMaintenanceHigh.toFixed(2) + ' (High)']];
    }
    if (sessionStorage.baselineActive == 'true')
    {
        descriptionColumns = ["Parameter", "Current Scenario", "Baseline Scenario"];
        descriptionRows = [
            ['Site Characteristics'],
            ['Site Area (acres)', sessionStorage.acres, baselineSiteArea],
            ['Hydrologic Soil Group', sessionStorage.soilType, baselineSoilType],
            ['Hydraulic Conductivity (in/hr)', sessionStorage.soilDrainage, baselineSoilDrainage],
            ['Surface Slope (%)', sessionStorage.topography, baselineTopography],
            ['Precip. Data Source', sessionStorage.rainGageName, baselineRainGage],
            ['Evap. Data Source', sessionStorage.weatherStationName, baselineWeatherStation],
            ['Climate Change Scenario', sessionStorage.climateScenarioName, baselineClimateScenario],
            ['Land Cover'],
            ['% Forest', sessionStorage.forest, baselineForest],
            ['% Meadow', sessionStorage.meadow, baselineMeadow],
            ['% Lawn', sessionStorage.lawn, baselineLawn],
            ['% Desert', sessionStorage.desert, baselineDesert],
            ['% Impervious', sessionStorage.impervious, baselineImpervious],
            ['LID Controls'],
            ['% Disconnection', sessionStorage.disconnection, baselineDisconnection],
            ['% Rain Harvesting', sessionStorage.rainHarvesting, baselineRainHarvesting],
            ['% Rain Gardens', sessionStorage.rainGardens, baselineRainGardens],
            ['% Green Roofs', sessionStorage.greenRoofs, baselineGreenRoofs],
            ['% Street Planters', sessionStorage.streetPlanters, baselineStreetPlanters],
            ['% Infiltration Basins', sessionStorage.infiltrationBasins, baselineInfiltrationBasins],
            ['% Permeable Pavement', sessionStorage.permeablePavement, baselinePermeablePavement],
            ['Analysis Options'],
            ['Years Analyzed', sessionStorage.yearsToAnalyze, baselineYearsToAnalyze],
            ['Ignore Consecutive Wet Days', sessionStorage.ignoreDays.charAt(0).toUpperCase() + sessionStorage.ignoreDays.slice(1), baselineIgnoreWetDays],
            ['Wet Day Threshold (inches)', sessionStorage.eventThreshold, baselineWetDayThreshold]
            ];

        summaryColumns = ["Statisic", "Current Scenario", "Baseline Scenario"];

        summaryRows = [
            ['Average Annual Rainfall (inches)', summaryTableArray[0], summaryTableArrayBaseline[0]],
            ['Average Annual Runoff (inches)', summaryTableArray[1], summaryTableArrayBaseline[1]],
            ['Days per Year with Rainfall', summaryTableArray[2], summaryTableArrayBaseline[2]],
            ['Days per Year with Runoff', summaryTableArray[3], summaryTableArrayBaseline[3]],
            ['Percent of Wet Days Retained', summaryTableArray[4], summaryTableArrayBaseline[4]],
            ['Smallest Rainfall w/ Runoff (inches)', summaryTableArray[5], summaryTableArrayBaseline[5]],
            ['Largest Rainfall w/o Runoff (inches)', summaryTableArray[6], summaryTableArrayBaseline[6]],
            ['Max Rainfall Retained (inches)', summaryTableArray[7], summaryTableArrayBaseline[7]]
            ];

        costsCapitalRows = [
        ["D", sessionStorage.disconnection  + ' (C) / ' + baselineDisconnection + ' (B)', "NA (C) / NA (B)", '$' +currentDisconnectionLowCapital.toFixed(2) + ' (Low) / $' +  currentDisconnectionHighCapital.toFixed(2) + ' (High)', '$' +baselineDisconnectionLowCapital.toFixed(2) + ' (Low) / $' +  baselineDisconnectionHighCapital.toFixed(2) + ' (High)', '$' + (currentDisconnectionLowCapital - baselineDisconnectionLowCapital).toFixed(2) + ' (Low) / $' + (currentDisconnectionHighCapital - baselineDisconnectionHighCapital).toFixed(2) + ' (High)'],
        ["RH", sessionStorage.rainHarvesting  + ' (C) / ' + baselineRainHarvesting + ' (B)', "NA (C) / NA (B)", '$' +currentRainHarvestingLowCapital.toFixed(2) + ' (Low) / $' +  currentRainHarvestingHighCapital.toFixed(2) + ' (High)', '$' +baselineRainHarvestingLowCapital.toFixed(2) + ' (Low) / $' +  baselineRainHarvestingHighCapital.toFixed(2) + ' (High)', '$' + (currentRainHarvestingLowCapital - baselineRainHarvestingLowCapital).toFixed(2) + ' (Low) / $' + (currentRainHarvestingHighCapital - baselineRainHarvestingHighCapital).toFixed(2) + ' (High)'],
        ["RG", sessionStorage.rainGardens + ' (C) / ' + baselineRainGardens + ' (B)', "NA (C) / NA (B)", '$' +currentRainGardensLowCapital.toFixed(2) + ' (Low) / $' +  currentRainGardensHighCapital.toFixed(2) + ' (High)', '$' +baselineRainGardensLowCapital.toFixed(2) + ' (Low) / $' +  baselineRainGardensHighCapital.toFixed(2) + ' (High)', '$' + (currentRainGardensLowCapital - baselineRainGardensLowCapital).toFixed(2) + ' (Low) / $' + (currentRainGardensHighCapital - baselineRainGardensHighCapital).toFixed(2) + ' (High)'],
        ["GR", sessionStorage.greenRoofs + ' (C) / ' + baselineGreenRoofs + ' (B)', "NA (C) / NA (B)", '$' +currentGreenRoofsLowCapital.toFixed(2) + ' (Low) / $' +  currentGreenRoofsHighCapital.toFixed(2) + ' (High)', '$' +baselineGreenRoofsLowCapital.toFixed(2) + ' (Low) / $' +  baselineGreenRoofsHighCapital.toFixed(2) + ' (High)', '$' + (currentGreenRoofsLowCapital - baselineGreenRoofsLowCapital).toFixed(2) + ' (Low) / $' + (currentGreenRoofsHighCapital - baselineGreenRoofsHighCapital).toFixed(2) + ' (High)'],
        ["SP", sessionStorage.streetPlanters + ' (C) / ' + baselineStreetPlanters + ' (B)', "NA (C) / NA (B)", '$' +currentStreetPlantersLowCapital.toFixed(2) + ' (Low) / $' +  currentStreetPlantersHighCapital.toFixed(2) + ' (High)', '$' +baselineStreetPlantersLowCapital.toFixed(2) + ' (Low) / $' +  baselineStreetPlantersHighCapital.toFixed(2) + ' (High)', '$' + (currentStreetPlantersLowCapital - baselineStreetPlantersLowCapital).toFixed(2) + ' (Low) / $' + (currentStreetPlantersHighCapital - baselineStreetPlantersHighCapital).toFixed(2) + ' (High)'],
        ["IB", sessionStorage.infiltrationBasins + ' (C) / ' + baselineInfiltrationBasins + ' (B)', "NA (C) / NA (B)", '$' +currentInfiltrationBasinsLowCapital.toFixed(2) + ' (Low) / $' +  currentInfiltrationBasinsHighCapital.toFixed(2) + ' (High)', '$' +baselineInfiltrationBasinsLowCapital.toFixed(2) + ' (Low) / $' +  baselineInfiltrationBasinsHighCapital.toFixed(2) + ' (High)', '$' + (currentInfiltrationBasinsLowCapital - baselineInfiltrationBasinsLowCapital).toFixed(2) + ' (Low) / $' + (currentInfiltrationBasinsHighCapital - baselineInfiltrationBasinsHighCapital).toFixed(2) + ' (High)'],
        ["PP", sessionStorage.permeablePavement + ' (C) / ' + baselinePermeablePavement + ' (B)', "NA (C) / NA (B)", '$' +currentPermeablePavementLowCapital.toFixed(2) + ' (Low) / $' +  currentPermeablePavementHighCapital.toFixed(2) + ' (High)', '$' +baselinePermeablePavementLowCapital.toFixed(2) + ' (Low) / $' +  baselinePermeablePavementHighCapital.toFixed(2) + ' (High)', '$' + (currentPermeablePavementLowCapital - baselinePermeablePavementLowCapital).toFixed(2) + ' (Low) / $' + (currentPermeablePavementHighCapital - baselinePermeablePavementHighCapital).toFixed(2) + ' (High)']];

        costsMaintenanceRows = [
        ["D", sessionStorage.disconnection  + ' (C) / ' + baselineDisconnection + ' (B)', "NA (C) / NA (B)", '$' +currentDisconnectionMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentDisconnectionMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselineDisconnectionMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselineDisconnectionMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentDisconnectionMaintenanceLow - baselineDisconnectionMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentDisconnectionMaintenanceHigh - baselineDisconnectionMaintenanceHigh).toFixed(2) + ' (High)'],
        ["RH", sessionStorage.rainHarvesting  + ' (C) / ' + baselineRainHarvesting + ' (B)', "NA (C) / NA (B)", '$' +currentRainHarvestingMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentRainHarvestingMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselineRainHarvestingMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselineRainHarvestingMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentRainHarvestingMaintenanceLow - baselineRainHarvestingMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentRainHarvestingMaintenanceHigh - baselineRainHarvestingMaintenanceHigh).toFixed(2) + ' (High)'],
        ["RG", sessionStorage.rainGardens + ' (C) / ' + baselineRainGardens + ' (B)', "NA (C) / NA (B)", '$' +currentRainGardensMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentRainGardensMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselineRainGardensMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselineRainGardensMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentRainGardensMaintenanceLow - baselineRainGardensMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentRainGardensMaintenanceHigh - baselineRainGardensMaintenanceHigh).toFixed(2) + ' (High)'],
        ["GR", sessionStorage.greenRoofs + ' (C) / ' + baselineGreenRoofs + ' (B)', "NA (C) / NA (B)", '$' +currentGreenRoofsMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentGreenRoofsMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselineGreenRoofsMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselineGreenRoofsMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentGreenRoofsMaintenanceLow - baselineGreenRoofsMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentGreenRoofsMaintenanceHigh - baselineGreenRoofsMaintenanceHigh).toFixed(2) + ' (High)'],
        ["SP", sessionStorage.streetPlanters + ' (C) / ' + baselineStreetPlanters + ' (B)', "NA (C) / NA (B)", '$' +currentStreetPlantersMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentStreetPlantersMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselineStreetPlantersMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselineStreetPlantersMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentStreetPlantersMaintenanceLow - baselineStreetPlantersMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentStreetPlantersMaintenanceHigh - baselineStreetPlantersMaintenanceHigh).toFixed(2) + ' (High)'],
        ["IB", sessionStorage.infiltrationBasins + ' (C) / ' + baselineInfiltrationBasins + ' (B)', "NA (C) / NA (B)", '$' +currentInfiltrationBasinsMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentInfiltrationBasinsMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselineInfiltrationBasinsMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselineInfiltrationBasinsMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentInfiltrationBasinsMaintenanceLow - baselineInfiltrationBasinsMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentInfiltrationBasinsMaintenanceHigh - baselineInfiltrationBasinsMaintenanceHigh).toFixed(2) + ' (High)'],
        ["PP", sessionStorage.permeablePavement + ' (C) / ' + baselinePermeablePavement + ' (B)', "NA (C) / NA (B)", '$' +currentPermeablePavementMaintenanceLow.toFixed(2) + ' (Low) / $' +  currentPermeablePavementMaintenanceHigh.toFixed(2) + ' (High)', '$' +baselinePermeablePavementMaintenanceLow.toFixed(2) + ' (Low) / $' +  baselinePermeablePavementMaintenanceHigh.toFixed(2) + ' (High)', '$' + (currentPermeablePavementMaintenanceLow - baselinePermeablePavementMaintenanceLow).toFixed(2) + ' (Low) / $' + (currentPermeablePavementMaintenanceHigh - baselinePermeablePavementMaintenanceHigh).toFixed(2) + ' (High)']];
    }

    costsColumns = ["", "Drainage Area %", "Has Pre-Treatment?", "Area Treated (C)", "Area Treated (B)", "Difference (C-B)"]
    tableKeyColumns = ["Key", "LID Control"];
    tableKeyRows = [
    ["D", "Disconnection"],
    ["RH", "Rain Harvesting"],
    ["RG", "Rain Gardens"],
    ["GR", "Green Roofs"],
    ["SP", "Street Planters"],
    ["IB", "Infiltration Basins"],
    ["PP", "Permeable Pavement"]];

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Site Description", 100);

    doc.autoTable(descriptionColumns, descriptionRows,
        {
            startY: 120,
            headerStyles:
            {
                fillColor: [25, 148, 147]
            }
        });

    doc.addPage();

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Site Summary", 100);

    if (sessionStorage.baselineActive == 'false')
    {
        doc.setFontSize(13);

        centeredText("Current Scenario", 170);

        doc.setFontSize(12);

        centeredText("Annual Rainfall: " + summaryTableArray[0] + " in.", 190);

        doc.addImage(summaryResultsChart1Image[0], 'png', 210, 200, 200, 200);

        doc.autoTable(summaryColumns, summaryRows, {
            startY: 450,
            headerStyles:
            {
                fillColor: [25, 148, 147]
            }
        });
    }
    if (sessionStorage.baselineActive == 'true')
    {
        doc.setFontSize(13);

        doc.text("Current Scenario", 95, 170);

        doc.text("Baseline Scenario", 400, 170);

        doc.setFontSize(12);

        doc.text("Annual Rainfall: " + summaryTableArray[0] + " in.", 85, 190);

        doc.text("Annual Rainfall: " + summaryTableArrayBaseline[0] + " in.", 390, 190);

        doc.addImage(summaryResultsChart1Image[0], 'png', 45, 200, 200, 200);
        doc.addImage(summaryResultsChart2Image[0], 'png', 355, 200, 200, 200);

        doc.autoTable(summaryColumns, summaryRows, {
            startY: 450,
            headerStyles:
            {
                fillColor: [25, 148, 147]
            }
        });
    }

    doc.addPage();

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Rainfall / Runoff Events", 100);

    doc.addImage(rainfallRunoffEventsChartImage[0], 'png', 25, 110, 550, 275);

    centeredText("Rainfall / Runoff Exceedance Frequency", 425);

    doc.addImage(rainfallRunoffFrequencyChartImage[0], 'png', 25, 435, 550, 275);

    doc.addPage();

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Rainfall Retention Frequency", 100);

    doc.addImage(rainfallRetentionChartImage[0], 'png', 25, 110, 550, 275);

    centeredText("Runoff Contribution by Rainfall Percentile", 425);

    doc.addImage(runoffContributionChartImage[0], 'png', 25, 435, 550, 275);

    doc.addPage();

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Extreme Event Rainfall / Runoff", 100);

    centeredText("Extreme Event Rainfall / Runoff Depth", 140);

    doc.addImage(extremeEventDepthChartImage[0], 'png', 25, 150, 550, 275);

    centeredText("Runoff Contribution by Rainfall Percentile", 465);

    doc.addImage(extremeEventPeakChartImage[0], 'png', 25, 475, 550, 275);

    doc.addPage();

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Cost Summary", 100);

    centeredText("Estimate of Probable Capital Costs (estimates in 2017 US.$)", 140);

    doc.autoTable(costsColumns, costsCapitalRows, {
        startY: 160,
        styles:
        {
            fontSize: 8
        },
        headerStyles:
         {
            fillColor: [25, 148, 147],
        }
    });

    doc.autoTable(tableKeyColumns, tableKeyRows, {
        startY: 325,
        styles:
        {
            fontSize: 8
        },
        headerStyles:
         {
            fillColor: [25, 148, 147],
        }
    });

     doc.addImage(costsChartCapitalImage[0], 'png', 25, 485, 550, 275);

    doc.addPage();

    doc.setFontSize(20);

    centeredText("National Stormwater Calculator Report", 40);

    doc.setFontSize(15);

    centeredText("Results", 60);

    centeredText("Cost Summary", 100);

    centeredText("Estimate of Annual Probable Maintenance Costs", 140);

    doc.autoTable(costsColumns, costsMaintenanceRows, {
        startY: 160,
        styles:
        {
            fontSize: 8
        },
        headerStyles:
         {
            fillColor: [25, 148, 147],
        }
    });

    doc.autoTable(tableKeyColumns, tableKeyRows, {
        startY: 325,
        styles:
        {
            fontSize: 8
        },
        headerStyles:
         {
            fillColor: [25, 148, 147],
        }
    });

    doc.addImage(costsChartMaintenanceImage[0], 'png', 25, 485, 550, 275);


    doc.save('SW-Calculator-Results.pdf');
  }

    $scope.changeChartView(sessionStorage.resultsPage);
});

app.controller('modalCtrl', function($scope)
{
  $scope.openCloseDirections = function()
  {
    if ($('.directionsIcon').hasClass('fa-chevron-right'))
    {
      $('.directionsIcon').removeClass('fa-chevron-right');
      $('.directionsIcon').addClass('fa-chevron-down');
    }
    else if ($('.directionsIcon').hasClass('fa-chevron-down'))
    {
      $('.directionsIcon').addClass('fa-chevron-right');
      $('.directionsIcon').removeClass('fa-chevron-down');
    }
  }
  $scope.openCloseDirections2 = function()
  {
    if ($('.directionsIcon2').hasClass('fa-chevron-right'))
    {
      $('.directionsIcon2').removeClass('fa-chevron-right');
      $('.directionsIcon2').addClass('fa-chevron-down');
    }
    else if ($('.directionsIcon2').hasClass('fa-chevron-down'))
    {
      $('.directionsIcon2').addClass('fa-chevron-right');
      $('.directionsIcon2').removeClass('fa-chevron-down');
    }
  }
});
