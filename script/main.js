/**
 * @file main.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 *
 * main of program
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
  var weatherStation = {};
}

weatherStation.main = (function(){

  // timer id
  currentTimeout = null;
  //open/close menu
  weatherStation.dom.setup.addEventListener("click", weatherStation.events.onSetupClick);
  //filters
  weatherStation.dom.searchInput.addEventListener("keyup", weatherStation.events.onFilterChange);
  weatherStation.dom.countrySelect.addEventListener("change", weatherStation.events.onFilterChange);
  weatherStation.dom.temperatureMin.addEventListener("keyup", weatherStation.events.onFilterChange);
  weatherStation.dom.temperatureMax.addEventListener("keyup", weatherStation.events.onFilterChange);
  //sorting
  weatherStation.dom.nameSortButton.addEventListener("click", weatherStation.events.onSortByNameClick);
  weatherStation.dom.temperatureSortButton.addEventListener("click", weatherStation.events.onSortByTemperatureClick);
  //update
  weatherStation.dom.settingsUpdateIntervalSelect.addEventListener("change", weatherStation.events.onTimerUpdateChange);
  weatherStation.dom.settingsDisableAutoUpdate.addEventListener("click", weatherStation.events.onEnableDisableClick);
  //start program
  weatherStation.request.getData();

})();

