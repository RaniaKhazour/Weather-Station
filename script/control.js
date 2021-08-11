/**
 * @file control.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * This file contains functions about controls
 * 
 * findDivById: returns the div with the id passed
 * getDateFormatted: returns a date string in the right format
 * createTitleString: returns a title string in the right format
 * createLocationString: returns a location string in the right format
 * validateMaps: handles errors in maps
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
  var weatherStation = {};
};

weatherStation.control = (function () {
  return {
    /**
     * @description Function that returns the div with the same id of the object passed
     * @param {object} detectionsSection - the detection section element
     * @param {object} detectionObj - the detection object
     * @returns {object} divList[i] - the div with the right id
     */
    findDivbyId: function (detectionsSection, detectionObj) {

      var divList = detectionsSection.getElementsByClassName("detection-div");
      for (var i = 0; i < divList.length; i++) {

        var idDiv = parseInt(divList[i].id);
        if (idDiv == detectionObj.id) {

          return divList[i];
        }
      }
    },
    /**
     * @description Function that returns a date string in the right format
     * @param {object} date - the date object
     * @returns {string} dateString - the date in the right format
     */
    getDateFormatted: function (date) {
      var dateString = date + ""
      dateString = dateString.slice(0, dateString.indexOf('G'));
      return dateString;
    },
    /**
     * @description Function that returns a title string in the right format
     * @param {object} detectionObj - the detection object
     * @returns {string} result - title string in the right format
     */
    createTitleString: function(detectionObj) {

      var name = detectionObj.name;
      // add "rino" to "To " -> "Torino"
      if(name.slice(0,3) == "To ") {
        var start = name.slice(0,2);
        var end = name.slice(2);
        var result = start + "rino" + end;
      } else {
        var result = name;
      }
      return result;
    },
    /**
     * @description Function that returns a location string with city, province, region, nation
     * @param {object} detectionObj - the detection object
     * @returns {string} result - location string in the right format
     */
    createLocationString: function(detectionObj) {
      var result = detectionObj.city + " " + detectionObj.province + " " + detectionObj.region + " " + detectionObj.nationName;
      return result;
    },
    /**
     * @description Function that returns the correct last part of URL for Google Maps
     * @param {string} name - name of city
     * @returns {string} name - the correct last part of URL for Google Maps
     */
    validateMaps: function(name) {
      switch(name) {
        case "caravino-276-m":
          name = "Caravino";
          return name;
        case "castelferroal-181-m":
          name = "Castelferro";
          return name;
        case "fiano":
          name = "Fiano+TO";
          return name;
        case "gap":
          name = "Gap,+Francia";
          return name;
        case "lago-dei-sabbioni":
          name = "Lago+dei+Sabbioni";
          return name;
        case "nole-municipio-368-m":
          name = "Nole";
          return name;
        case "pella":
          name = "Pella+NO";
          return name;
        case "pila":
          name = "Pila+VC";
          return name;
        case "prayon":
          name = "Prayon+Orsières";
          return name;
        case "reano-aib":
          name = "Reano+TO";
          return name;
        case "santelisabetta":
          name = "Santa+Elisabetta+TO";
          return name;
        case "toria":
          name = "12078+Toria+CN/@44.1380087,7.7825898,15.11z/data=!4m13!1m7!3m6!1s0x12d280039b80fecd:"+
          "0x6c9115e50f06242!2s12078+Toria+CN!3b1!8m2!3d44.140591!4d7.7895566!3m4!1s0x12d280039b80fecd:0"+
          "x6c9115e50f06242!8m2!3d44.140591!4d7.7895566";
          return name;
        case "trovinasse":
          name = "Settimo+Vittone+TO";
          return name;
        case "val-di-remhes":
          name = "Rhemes-saint-georges+AO";
          return name;
        case "vignale-monferrato-al-273-m":
          name = "Vignale+Monferrato+AL";
          return name;
        
        default:
          return name;
        }
     }
  }
})();

