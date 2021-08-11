/**
 * @file dom.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * This file contains functions about request 
 * 
 * createTitleDiv: creates a div element with same id of detections
 * createDetailsDiv: creates a div element with same id of detections
 * createDetectionDiv: creates a div element that contains a titleDiv and a detailsDiv
 * updateTitleDiv: modify the innerHTML of the titleDiv, with new data
 * updateDetailsDiv: modify the innerHTML of the detailsDiv, with new data
 * updateData: modify the innerHTML of all titleDiv and all detailsDiv, with new data
 * populateStation: for each detection object create and update a detection div
 * changeColor: change the CSS class of the temperature element based on the number
 * validTemperature: return the temperature string ("10°C")
 * removeLoader: removes the loading GIF
 * setLastUpdate: modify the last update
 * changePauseButton: swap play with pause
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
  var weatherStation = {};
};


weatherStation.dom = (function () {

  return {
    //elements declaration
    detectionsSection: document.getElementById("detections-section"),
    setup: document.getElementById("setup"),
    menuMobile: document.getElementById("menu-mobile"),
    allDetectionDiv: document.getElementsByClassName("detection-div"),
    searchInput: document.getElementById("station-name"),
    countrySelect: document.getElementById("country"),
    temperatureMin: document.getElementById("temperature-min"),
    temperatureMax: document.getElementById("temperature-max"),
    nameSortButton: document.getElementById("sort-by-name"),
    temperatureSortButton: document.getElementById("sort-by-temperature"),
    settingsUpdateIntervalSelect: document.getElementById("timer"),
    settingsDisableAutoUpdate: document.getElementById("enable-disable-auto-update"),

    /**
     * @description Function that creates a div element with same id of the detection object
     * @param {object} detectionObj - the detection object
     * @param {object} where - where append the div
     * @returns {object} titleDiv - the titleDiv element
     */
    createTitleDiv: function (detectionObj, where) {
      var titleDiv = document.createElement("div");
      titleDiv.setAttribute("id", detectionObj.id + "title-div");
      titleDiv.className = "title-div";
      where.appendChild(titleDiv);
      return titleDiv;
    },
    /**
     * @description Function that creates a div element with same id of the detection object
     * @param {object} detectionObj - the detection object
     * @param {object} where - where append the div
     * @returns {object} detailsDiv - the detailsDiv element
     */
    createDetailsDiv: function (detectionObj, where) {
      var detailsDiv = document.createElement("div");
      detailsDiv.setAttribute("id", detectionObj.id + "details");
      detailsDiv.className = "details-div grid-details";
      where.appendChild(detailsDiv);
      return detailsDiv;
    },
    /**
     * @description Function that creates a div element that contains a titleDiv and a detailsDiv
     * @param {object} detectionObj - the detection object
     * @param {object} where - where append the div
     * @returns {object} detectionDiv - the detectionDiv element
     */
    createDetectionDiv: function (detectionObj, where) {
      var detectionDiv = document.createElement("div");
      detectionDiv.setAttribute("id", detectionObj.id + "detection");
      detectionDiv.className = "detection-div";
      var titleDiv = this.createTitleDiv(detectionObj, this.detectionsSection);
      detectionDiv.appendChild(titleDiv);
      var detailsDiv = this.createDetailsDiv(detectionObj, this.detectionsSection);
      detectionDiv.appendChild(detailsDiv);
      where.appendChild(detectionDiv);
      return detectionDiv;
    },
    /**
     * @description Function that modify the innerHTML of the titleDiv, with the new data of detectionObj
     * In title div there are nation flag, station name, temperature and a weather icon
     * @param {object} titleDiv - the title div element
     * @param {object} detectionObj - the detection object
     */
    updateTitleDiv: function (titleDiv, detectionObj) {
      titleDiv.innerHTML =
        // flag svg 
        '<div class="align-center"><img src="https://hatscripts.github.io/circle-flags/flags/' +
        detectionObj.nation.toLowerCase() + '.svg" alt="'+detectionObj.nation+'" class="flag-icon jump">' +
        // station title
        '<h2 class="title-station">' + weatherStation.control.createTitleString(detectionObj) + '</h2></div>' +
        // temperature
        '<div class="align-center"><h3 class="temperature-station ' +
        this.changeColor(detectionObj.temperature) + '">' + this.valideTemperature(detectionObj.temperature) + '</h3>' +
        // weather icon
        '<div class="align-center"><img src="' + detectionObj.weatherIcon + '" alt="Weather icon"></div>';
    },
    /**
     * @description Function that modify the innerHTML of the detailsDiv, with the new data of detectionObj
     * In details div there are webcam image, location, humidity, wind and a google maps button
     * @param {object} detailsDiv - the details div element
     * @param {object} detectionObj - the detection object
     */
    updateDetailsDiv: function (detailsDiv, detectionObj) {
      var detectionDiv = weatherStation.control.findDivbyId(this.detectionsSection, detectionObj)
      detailsDiv.innerHTML =
        // station image
        '<div class="img-container">' +
        '<img class="img-station" data-hd="' + detectionObj.webcamHD + 
        '" data-ld="' + detectionObj.webcamLD + 
        '" data-alt="' + detectionObj.image + '" alt="" /><br></div>' +
        // location
        '<div class="location-container row"><h5>LOCATION</h5>' +
        '<p class="ml-3">  ' + weatherStation.control.createLocationString(detectionObj) + '</p></div>' +
        // humidity
        '<h5 class="humidity-label">HUMIDITY</h5>' +
        '<div class="humidity-container row align-center">' +
        '<img id="humidity-icon" class="weather-icon" src="img/icons/humidity.svg" alt="humidity">' +
        '<p>' + detectionObj.humidity + ' %</p></div>' +
        // wind
        '<h5 class="wind-label">WIND</h5>' +
        '<div class="wind-container row align-center">' +
        '<img id="wind-icon" class="weather-icon" src="img/icons/wind.svg" alt="wind">' +
        '<p>' + detectionObj.wind + ' km/h</p><br></div>' +
        // google maps button
        '<div class="maps-container align-center"><a href="' + 
        'https://www.google.com/maps/place/' + weatherStation.control.validateMaps(detectionObj.onlyName)+
        '" target="_blank"><button class="maps-button"> Go to Maps </button></a></div>';
        
      if (detailsDiv.style.display === 'grid') {
        weatherStation.events.loadImages(detectionDiv, detectionObj)
      }
    },
    /**
     * @description Function that updates all titleDiv and all detailsDiv with new data
     * @param {object} detectionsSection - the detections section element
     * @param {object} detectionsArray - array of detection objects
     */
    updateData: function (detectionsSection, detectionsArray) {

      detectionsArray.forEach(function (detectionObj) {
        if(typeof detectionObj == "object") {
          var detectionDiv = weatherStation.control.findDivbyId(detectionsSection, detectionObj);
          var titleDiv = detectionDiv.querySelector("div.title-div");
          weatherStation.dom.updateTitleDiv(titleDiv, detectionObj);
          var detailsDiv = detectionDiv.querySelector("div.details-div");
          weatherStation.dom.updateDetailsDiv(detailsDiv, detectionObj);
        }
      });
    },
    /**
     * @description Function that for each detection object create and update a detection div
     * @param {object} detections - json object
     */
    populateStations: function (detections) {
      // reset detectionArray
      var detectionsArray = [];
      // creation of detection object
      detections.forEach(function (detectionObj) {
        if(typeof detectionObj == "object") {
          var detection = new weatherStation.models.Detection(detectionObj);
          detectionsArray.push(detection);
        }
      });
      // div generation, if is the first time
      if (weatherStation.request.firstTime == true) {
        weatherStation.request.firstTime = false;
        //remove the loader
        weatherStation.dom.removeLoader();
        // for each object create a div
        detectionsArray.forEach(function (single) {

          if(typeof single == "object"){
          var detectionDiv = weatherStation.dom.createDetectionDiv(single, weatherStation.dom.detectionsSection);
          // for each div add listener open/close 
          weatherStation.events.onDetectionInstantiated(detectionDiv, single)
          }
        });
      } 
      // data update
      weatherStation.dom.updateData(this.detectionsSection, detectionsArray);
    },
    /**
     * @description Function that takes as parameter the temperature and change the color of the string
     * @param {string} temp - the temperature of the station
     */
    changeColor: function (temp) {
      //invalide temperature
      if (temp == null) {
        return 'gray';
      }
      //valide temperature
      var numTemp = parseInt(temp);
      if (numTemp < 10) {
        return 'blue';
      } else if (numTemp < 15) {
        return 'light-blue';
      } else if (numTemp < 20) {
        return 'orange';
      } else if (numTemp < 25) {
        return 'dark-orange';
      } else {
        return 'red';
      }
    },
    /**
     * @description Function that validate the temperature (if it is null, it will display N.D.)
     * @param {string} temp - the temperature of the station
     */
    valideTemperature: function (temp) {
      if(temp == null) {
        temp = "N.D.";
        return temp;
      } else {
        return temp + "°C";
      }
    },
    /**
     * @description Function that removes the loader
     */
    removeLoader: function () {
      var loader = document.querySelector(".loader");
      loader.className += " hidden";
    },
    /**
     * @description Function that modify the last update
     * @param {string} time - the last update string
     */
    setLastUpdate: function (time) {
      document.getElementById("lastUpdate").innerHTML = time;
    },
    /**
     * @description Function that swap play with pause icons
     */
    changePauseButton: function () {
      var button = document.getElementById("enable-disable-auto-update");
      if ((button.src).indexOf("pause.svg") > -1) {
        button.src = "img/icons/play.svg";
      } else {
        button.src = "img/icons/pause.svg";
      }
    }
  }
})();