/**
 * DangerController
 *
 * @description :: Server-side logic for managing dangers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     * `DangerController.get()`
     */
    get: function (req, res) {
        var lat = parseFloat(req.param("lat"));
        var lon = parseFloat(req.param("lon"));

        console.log(lat, lon);

        CommonHandlerService.handle(lat, lon, function(err,data){
            return res.json({
                data: data
            });
        })
    }
};

