/**
 * @file models.js
 * @author Rania Khazour, Adrian Ioan Munteanu, Francesco Rossi
 * This file contains a Detection constructor function
 */

// Check if weatherStation object exist, if not it creates it
if (!weatherStation) {
    var weatherStation = {};
};

weatherStation.models = (function () {
	return {

		/**
		 * @description Costructor function for each station
		 * @param {object} detection - a single detection
		 */
		Detection: function (detection) {
			this.id = detection.station.id;
			this.onlyName = detection.station.slug;
			this.name = detection.station.name;
			this.city = detection.station.city;
			this.province = detection.station.province.name;
			this.region = detection.station.region.name;
			this.nationName = detection.station.nation.name;
			this.nation = detection.station.nation.alpha2_code;
			this.webcamHD = detection.station.webcam;
			this.webcamLD = detection.station.webcam_url;
			this.image = detection.station.image_url;
			this.temperature = detection.temperature;
			this.humidity = detection.relative_humidity;
			this.wind = detection.wind_strength;
			this.weatherIcon = detection.weather_icon.icon;
		}
	}
})();