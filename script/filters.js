/**
 * @file filters.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * This file contains functions about filters
 * 
 * isNameCorrect: returns true if the string exist in the station name
 * isCountryCorrect: returns true if chosen country is the same of the station
 * isTemperatureCorrect: returns true if station temperature is in the chosen range
 * all: hides a DIV if it does not meet all conditions
 */

if(!weatherStation) {
  var weatherStation = {};
};

weatherStation.filters = (function(){
  return {
    /**
     * @description Function that returns true if the string in the search input exist in Station name
     * @param {object} searchInput - the search input element
     * @param {object} detectionDiv - the detection div element
     * @returns {boolean} true if string in the search input exist in Station name
     *                    false if string in the search input not exist in Station name
     */
    isNameCorrect: function(searchInput, detectionDiv){

      filter = searchInput.value.toUpperCase();
      var nameStation = detectionDiv.querySelector("h2.title-station").innerHTML;
      //check if the name of the station has a "(" or a number, and delete the following part
      if(nameStation.indexOf("(") > -1 ) {
        nameStation = nameStation.slice(0, nameStation.indexOf("("));
      } else {
        nameStation = nameStation.slice(0, nameStation.indexOf("2"));
      }
      //check if the name of the station is equal to the value of the filter or not
      if (nameStation.toUpperCase().indexOf(filter) > -1) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @description Function that returns true if chosen country (with the select) is the same of the station
     * @param {object} countrySelect - the country select element
     * @param {object} detectionDiv - the detection div element
     * @returns {boolean} true if string in the chosen country is the same of the station
     *                    false if string in the chosen country is not the same of the station
     */
    isCountryCorrect: function(countrySelect, detectionDiv){

      var flag = detectionDiv.querySelector("img.flag-icon").src;
      nation = flag.slice(48, 50).toUpperCase();
  
      if(countrySelect.value == "all") {
        return true;
      } else if(countrySelect.value == nation) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @description Function that returns true if station temperature is in the chosen range (with the inputs)
     * @param {object} temperatureMin - the minimal temperature input element
     * @param {object} temperatureMax - the maximum temperature input element
     * @param {object} detectionDiv - the detection div element
     * @returns {boolean} true if station temperature is in the chosen range
     *                    false if station temperature is not in the chosen range
     */
    isTemperatureCorrect: function(temperatureMin, temperatureMax, detectionDiv){

      var min = parseInt(temperatureMin.value) || -999;
      var max = parseInt(temperatureMax.value) || 999;
  
      var temp = parseFloat(detectionDiv.querySelector("h3.temperature-station").innerHTML);

      if(min == -999 || max == 999) {
        return true;
      }

      if(detectionDiv.querySelector("h3.temperature-station").innerText == "N.D.") {
        return false;
      }
 
      if(temp>=min && temp<=max) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @description Function that hides a DIV if it does not meet all conditions (name, country, temperature)
     * @param {object} searchInput - the search input element
     * @param {object} countrySelect - the country select element
     * @param {object} temperatureMin - the minimal temperature input element
     * @param {object} temperatureMax - the maximum temperature input element
     * @param {object} listOfDiv - array of detection div
     */
    all: function(searchInput, countrySelect, temperatureMin, temperatureMax, listOfDiv) {
      var match = false;
      var notFound = document.querySelector("div.no-result");

      for(var i=0; i<listOfDiv.length; i++) {
        div=listOfDiv[i];

        if(this.isNameCorrect(searchInput, div) && 
          this.isCountryCorrect(countrySelect, div) && 
          this.isTemperatureCorrect(temperatureMin, temperatureMax, div)) {
            match = true;
            div.style.display = "";
          
        } else {
            div.style.display = "none";
        }
      }
      //check if the filter matched with something or not
      if(match == false) {
        notFound.style.display = "block";
      } else {
        notFound.style.display = "none"
      }
    }
  }
})();