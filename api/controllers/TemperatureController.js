/**
 * TemperatureController
 *
 * @description :: Server-side logic for managing temperatures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    /**
     * `TemperatureController.getTemperature()`
     */
    getTemperature: function (req, res) {
        async.waterfall([
            function(cb) {
                WeatherService.getWeather(req.param.lat, req.param.lon, function(err, res, body){
                    cb(err, res, body);
                });
            },
            function(res, body, cb) {
                body = JSON.parse(body);
                if (res.statusCode !== 200 || body.cod !== 200){
                    cb("err, res.statusCode = " + res.statusCode);
                }
                cb(null, body);
            }
        ], function (err, result) {
            if(err){
                return res.notFound({
                    err: err
                });
            }
            return res.ok({
                ok: result
            });
        });
    },


    /**
     * `TemperatureController.quantify()`
     */
    quantify: function (req, res) {
        return res.json({
            todo: 'quantify() is not implemented yet!'
        });
    }
};

