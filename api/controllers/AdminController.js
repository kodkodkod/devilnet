/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var CategoryController = require("../controllers/CategoryController")

module.exports = {
    /**
     * `AdminController.dashboard()`
     */
    dashboard: function (req, res) {

        //async.waterfall(
        //    [
        //        function(cb){
        //            GeoService.geojson(function(err, data){
        //                cb(err, data);
        //            });
        //        },
        //        function(data, cb){
        //            //data =[]
        //            //console.log(data);
        //            DBCreate(Zavod, data, function(err, _data){
        //                cb(err, _data);
        //            });
        //        }
        //    ],
        //    function(err, data){
        //        console.log(err, data);
        //    }
        //);






        var data = {};
        var template = "admin/dashboard";

        async.waterfall(
            [
                function(cb){
                    CategoryService.find(null, cb)
                },
                function(categories, cb){
                    cb(null, categories);
                }
            ],
            function (err, categories){
                if (err){
                    console.log(err)
                    return res.view(template);
                }
                else {
                    data.categories = categories;
                    return res.view(template, data);
                }
            })

    }
};

