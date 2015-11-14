
async.waterfall(
    [
        function(cb){
            GeoService.geojson(function(err, data){
                cb(err, data);
            });
        },
        function(data, cb){
            //data =[]
            DBCreate(Musorka, data, function(err, _data){
                cb(err, _data);
            });
        }
    ],
    function(err, data){
        console.log(err, data);
    }
);
