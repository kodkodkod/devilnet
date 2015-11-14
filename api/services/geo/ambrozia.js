var radius = 25;
var kmlUrl = 'maps/data/ambrozia.kml';
module.exports = function(cb){
    var tj = require('togeojson');
    var fs = require('fs');
    var jsdom = require('jsdom').jsdom;

    async.waterfall(
        [
            function(cb){
                fs.readFile(kmlUrl, 'utf8', cb);
            },
            function(file, cb){
                var kml = jsdom(file);
                cb(null, kml);
            },
            function(kml, cb){
                var converted = tj.kml(kml);
                var converted_with_styles = tj.kml(kml, { styles: true });
                cb(null, converted_with_styles);
            },
            function(result, cb){
                var arr = [];
                result.features.forEach(function(item, index){
                    item.radius = radius;
                    item.geometry.coordinates = item.geometry.coordinates[0];

                    for (var i = 0; i < item.geometry.coordinates.length; i++){
                        item.geometry.coordinates[i].pop();
                    }
                    arr.push(item);
                    if (result.features.length - 1 == index){
                        cb(null, arr);

                    }
                });
            }
        ],
        function(err, data){
            cb(err, data);
        }
    )
}
