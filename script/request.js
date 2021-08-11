/**
 * @file request.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * This file contains functions about request 
 * 
 * createJsonBlob: creates a backup on JSON Blob
 * getDataFromBlob: get data from the last backup on JSON Blob
 * getData: get data from meteotorino API
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
  var weatherStation = {};
};

weatherStation.request = (function () {
  return {
    
    // declaration of variables
    settingsUpdateInterval: 30000,
    firstTime: true,
    errorMsg: document.querySelector("div.error"),

    /**
     * @description Function that save a backup of jsonToArchive on JSON Blob 
     * It adds to JSON a creation data string
     * @param {object} jsonToArchive - JSON object (from meteoTorino API) to save on JSON Blob
     */
    createJsonBlob: function(jsonToArchive) {
      // insert in Json the creation date
      var now = weatherStation.control.getDateFormatted(new Date());
      var strLastUpdate = "Data from JSON Blob in date: " + now;
      jsonToArchive.unshift(strLastUpdate);
      var jsonString = JSON.stringify(jsonToArchive);
      // request PUT
      var requestBlob = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      requestBlob.open("PUT", "https://jsonblob.com/api/jsonBlob/2ab99880-021f-11eb-9f82-2bc8c20024e4");
      requestBlob.setRequestHeader("Content-type", "application/json");
      requestBlob.send(jsonString);  
    },

    /**
     * @description Function that send a request to JSON Blob to GET the last backup of JSON from torinometeo API
     * @returns {boolean} online - false if request failed, true if the request was successful
     */
    getDataFromBlob: function() {
      var online = false;
      // request GET from Json Blob
      var requestGetBlob = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      requestGetBlob.open("GET", "https://jsonblob.com/api/jsonBlob/2ab99880-021f-11eb-9f82-2bc8c20024e4");
      requestGetBlob.setRequestHeader("Content-type", "application/json");
      requestGetBlob.onload = function () {
        if (requestGetBlob.status === 200) {
          online = true;
          var responseJson = JSON.parse(requestGetBlob.responseText);
          weatherStation.dom.setLastUpdate(responseJson[0]);
          weatherStation.dom.populateStations(responseJson);
          // error notification
          weatherStation.request.errorMsg.style.display = "block";
          weatherStation.request.errorMsg.innerHTML = '<img src="img/errors/backup.svg" alt=""/>';
        } else {
          console.log('GET DATA FROM BLOB. Request failed. Returned status of ' + requestGetBlob.status);
        }
      }
      requestGetBlob.send();
      console.clear();
      return online;
    },

    /**
     * @description Function that send a request to torinometeo API to GET a JSON with data in realtime
     * If the request was successuful, it creates a backup on JSON Blob
     * If the request failed, it send a request a JSON Blob
     * If there are errors (offline or API failed connection) it shows them on the screen
     * It calls itself, with a setTimeout(), back after the time choosed by user
     */
    getData: function() {
      // request GET from torinometeo API
      var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      request.open("GET", "https://www.torinometeo.org/api/v1/realtime/data/");
      request.setRequestHeader("Content-type", "application/json");
      request.onload = function () {
        if (request.status === 200) {
          weatherStation.request.errorMsg.style.display = "none";
          var responseJson = JSON.parse(request.responseText);
          weatherStation.request.createJsonBlob(responseJson);
          weatherStation.dom.setLastUpdate(weatherStation.control.getDateFormatted(new Date()));
          weatherStation.dom.populateStations(responseJson);
        } else {
          console.error("Request failed. Returned of " + request.status);
          //add here as well, in case it reaches the server, but the response is not 200
        }
      };
      request.onerror = function () {
        console.error("Network error");
        weatherStation.request.errorMsg.style.display = "none";
        weatherStation.dom.removeLoader();
        clearTimeout(currentTimeout);
        //in case the user cannot reach the server, use Blober, a backup
        var online = weatherStation.request.getDataFromBlob();
        if(online == false) {
          // error notification
          weatherStation.request.errorMsg.style.display = "block";
          weatherStation.request.errorMsg.innerHTML = '<img src="img/errors/offline.svg" alt=""/>'
          // disabled timer update
          weatherStation.dom.settingsUpdateIntervalSelect.disabled = true;
          weatherStation.dom.changePauseButton();
        }
      };
      request.send();
      console.clear();
      currentTimeout = setTimeout(weatherStation.request.getData, weatherStation.request.settingsUpdateInterval);
    }
  }
})();
