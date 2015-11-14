module.exports = function(myModel, data, cb){
    async.waterfall(
        [
            function(cb){
                var msg = "data start";
                //console.log(msg);
                //console.log(myModel);
                //console.log(data);
                if (data){
                    myModel.create(data).exec(cb);
                }
                else {
                    var msg = "data empty to create ";
                    console.log(msg);
                    cb(msg, data);
                }
            },
            function(data, cb){
                var msg = "data created";
                console.log(msg);
                cb(null, data);
            }
        ],
        function (err, data){
            console.error(err);
            cb(err, data);
        });
}