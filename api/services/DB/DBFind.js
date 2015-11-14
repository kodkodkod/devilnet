module.exports = function(myModel, _id, cb){
    async.waterfall(
        [
            function(cb){
                if (_id){
                    myModel.find({
                        _id: _id
                    }).exec(cb);
                }
                else {
                    myModel.find({}).exec(cb);
                }
            },
            function(data, cb){
                cb(null, data);
            }
        ],
        function (err, data){
            cb(err, data);
        });
}