/**
 * @file animation.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * this file contains functions about animations
 * 
 * dropDownMenu: open/close collapsible menu
 * openAndCloseDetails: open/close collapsible detection div 
 * feedbackTemperature: notify if there is an error in a temperature data input
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
    var weatherStation = {};
};

weatherStation.animation = (function () {
    return {
        /**
         * @description Function that makes menu div appear or disappear
         * @param {object} navbar - the navbar element
         * @param {object} menu - the menu element
         */
        dropDownMenu: function (menu, section) {

            var menuHeight = menu.clientHeight;

            if (menu.style.top === "121px") {
                menu.style.top = "-300px";
                section.style.top = "0px";
            } else {
                menu.style.top = "121px";
                section.style.top = menuHeight + "px";
            }
        },
        /**
         * @description Function that makes details div appear or disappear
         * @param {object} detectionDiv - the detection div element
         */
        openAndCloseDetails: function (detectionDiv) {

            var titleDiv = detectionDiv.querySelector("div.title-div");
            var detailsDiv = detectionDiv.querySelector("div.details-div");
            var nameOfClass;

            // check if is Internet Explorer
            if(typeof ActiveXObject === "undefined") {
                nameOfClass = "grid";
            } else {
                nameOfClass = "-ms-grid";
            }

            if (detailsDiv.style.display === nameOfClass) {
                detailsDiv.style.display = "none";
                titleDiv.style.borderRadius = "10px";
            } else {
                detailsDiv.style.display = nameOfClass;
                titleDiv.style.borderRadius = "10px 10px 0 0";
            }
        },
        /**
         * @description Function that notify if there is an error in a temperature data input
         */
        feedbackTemperature: function() {
            var tempLabel = document.getElementById("temperature-label");
            var tempMin = document.getElementById("temperature-min");
            var tempMax = document.getElementById("temperature-max");

            var min = parseFloat(tempMin.value);
            var max = parseFloat(tempMax.value);

            if(min > max) {
                tempLabel.innerText = "Temperature (MIN must be less than MAX)";
                tempLabel.className = "temperature-label label-error-temperature";
                tempMin.className = "error-temperature";
                tempMax.className = "error-temperature";
            } else {
                tempLabel.innerText = "Temperature";
                tempLabel.className = "temperature-label";
                tempMin.className = "";
                tempMax.className = "";
            }
        }
    }
})();