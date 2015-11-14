var request = require("request");
//http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10&lang=ua
module.exports = {
    config: {
        APPID: "09364d4bc99ea2779572d0c0889032ac",
        domain: "http://api.openweathermap.org",
        prefix: "/data/2.5/weather?APPID=" + this.APPID,
        lang: "ua"
    },
    getWeather: function(lat, lon, cb) {
        var that = this;
        request.get(
            that.config.domain +
            that.config.prefix +
            "&lat=" + lat +
            "&lon=" + lon +
            "&lang=" + that.config.lang,
            function(err, res, body){
                cb(err, res, body);
            }
        )
    }
};