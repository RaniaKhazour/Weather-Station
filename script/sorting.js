/**
 * @file sorting.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * This file contains functions about sorting
 * 
 * byName: sorts the divs by name
 * byTemperature: sorts the by temperature
 */

// Check if weatherStation object exist, if not it creates it
if(!weatherStation) {
  var weatherStation = {};
};

weatherStation.sorting = (function(){
  return {
    /**
     * @description Function that sort a list of div by name, if the list is already sorted
     * it changes the direction (ascending, descending).
     */
    byName: function() {

      var switching;
      var shouldSwitch;
      var dir;
      var switchCount = 0;
  
      switching = true;
      dir = "asc";
  
      while(switching) {
        switching = false;
        var b = document.getElementsByClassName("detection-div");
        for(var i=0; i<(b.length-1); i++) {
          shouldSwitch = false;
          var nameStation1 = b[i].querySelector("h2.title-station");
          var nameStation2 = b[i+1].querySelector("h2.title-station");
          if(dir == "asc") {
            // put name1 after name2
            if(nameStation1.innerHTML.toLowerCase() > nameStation2.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
            // put name2 after name1
          } else if(dir == "desc") {
            if(nameStation1.innerHTML.toLowerCase() < nameStation2.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if(shouldSwitch) {
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
          switchCount++;
        } else if (switchCount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    },
    /**
     * @description Function that sort a list of div by temperature, if the list is already sorted
     * it changes the direction (ascending, descending). 
     * If a div has a "N.D." temperature it puts it at the bottom.
     */
    byTemperature: function() {

      var switching;
      var shouldSwitch;
      var dir;
      var switchCount = 0;
  
      switching = true;
      dir = "asc";

      var b = document.getElementsByClassName("detection-div");

      while(switching) {
        switching = false;
        for(var i=0; i<(b.length-1); i++) {
          shouldSwitch = false;
          var temperature1 = b[i].querySelector("h3.temperature-station");
          var temperature2 = b[i+1].querySelector("h3.temperature-station");
          // if temperature is null put last
          if(temperature1.innerText == "N.D.") {
            b[i].parentNode.insertBefore(b[i], b[b.length]);
          }
          if(dir == "asc") {
            // put temperature1 after temperature2
            if(parseFloat(temperature1.innerText) > parseFloat(temperature2.innerText)) {
              shouldSwitch = true;
              break;
            }
          } else if(dir == "desc") {
            // put temperature2 after temperature1
            if(parseFloat(temperature1.innerText) < parseFloat(temperature2.innerText)) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if(shouldSwitch) {
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
          switchCount++;
        } else if (switchCount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
})();