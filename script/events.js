/**
 * @file events.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * this file contains all event handlers
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
  var weatherStation = {};
}

weatherStation.events = (function () {
  return {
    // handler
    onSetupClick: function () {
      weatherStation.animation.dropDownMenu(weatherStation.dom.menuMobile, weatherStation.dom.detectionsSection);
    },
    onFilterChange: function () {
      weatherStation.filters.all(
        weatherStation.dom.searchInput,
        weatherStation.dom.countrySelect,
        weatherStation.dom.temperatureMin,
        weatherStation.dom.temperatureMax,
        weatherStation.dom.allDetectionDiv,
      );
      weatherStation.animation.feedbackTemperature();
    },
    onSortByNameClick: function(){
      weatherStation.sorting.byName();
      weatherStation.dom.nameSortButton.className = "menu-btn active";
      weatherStation.dom.temperatureSortButton.className = "menu-btn";
    },
    onSortByTemperatureClick: function(){
      weatherStation.sorting.byTemperature();
      weatherStation.dom.nameSortButton.className = "menu-btn";
      weatherStation.dom.temperatureSortButton.className = "menu-btn active";
    },
    onTimerUpdateChange: function () {
      var select = weatherStation.dom.settingsUpdateIntervalSelect;
      clearTimeout(currentTimeout);
      weatherStation.request.settingsUpdateInterval = parseInt(select.value) * 1000;
      if(document.getElementById("enable-disable-auto-update").src !== "img/icons/pause.svg") {
        weatherStation.request.getData();
      }
    },
    onEnableDisableClick: function () {
      var button = document.getElementById("enable-disable-auto-update");
      if ((button.src).indexOf("pause.svg") > -1) {
        clearTimeout(currentTimeout);
        document.getElementById("timer").disabled = true;
      } else {
        weatherStation.events.onTimerUpdateChange();
        document.getElementById("timer").disabled = false;
      };
      weatherStation.dom.changePauseButton();
      weatherStation.request.errorMsg.style.display = "none";
    },
    loadImages: function (detectionDiv) {
      var camImage = detectionDiv.querySelector("div.details-div > div.img-container > img");
      
      function useAlt(skipRemoveListener) {
        camImage.src = camImage.getAttribute('data-alt');

        if (skipRemoveListener !== true) {
          camImage.removeEventListener('error', useAlt);
        }
      }

      function tryLd(skipRemoveListener) {
        var ld = camImage.getAttribute('data-ld');

        if (ld == "null") {
          useAlt(true);
        } else {
          camImage.src = ld;
          camImage.addEventListener('error', useAlt);
        }

        if (skipRemoveListener !== true) {
          camImage.removeEventListener('error', tryLd);
        }
      }

      if (camImage.src == "") {
        var hd = camImage.getAttribute('data-hd');

        if (hd == "null") {
          tryLd(true);
        } else {
          camImage.src = hd;
          camImage.addEventListener('error', tryLd);
        }
      }
    },
    onDetectionInstantiated: function (detectionDiv) {
      detectionDiv.addEventListener("click", function () {
        weatherStation.animation.openAndCloseDetails(detectionDiv);
        weatherStation.events.loadImages(detectionDiv);
      });
    }
  };
})();
