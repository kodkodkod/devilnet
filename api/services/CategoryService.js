module.exports = {
    find: function(_id, cb){
        async.waterfall(
            [
                function(cb){
                    if (_id){
                        Category.find({
                            _id: _id
                        }).exec(cb);
                    }
                    else {
                        Category.find({}).exec(cb);
                    }
                },
                function(categories, cb){
                    cb(null, categories);
                }
            ],
            function (err, categories){
                cb(err, categories);
            });
    }
};