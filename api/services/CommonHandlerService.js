var async = require("async");
var DBFind = require("./DB/DBFind");

module.exports = {
//  X, Y, x, y, B, BD, r, v, a
    handle: function(lat, lon,  cb){
        var that = this;
        var X = lat;//user X
        var Y = lon;//user Y

        var v = null;//wind speed
        var a = null;//wind angle

        var dangers = [];

        async.waterfall(
            [
                function(cb) {
                    that.parseWeather(lat, lon, function(err, _v, _a){
                        cb(err, _v, _a);
                    });
                },
                function(_v, _a, cb) {
                    v = _v;
                    a = _a;
                    cb(null, v, a);
                },
                function(v, a, cb){
                    async.waterfall(
                        [
                            function(cb){
                                DBFind(Zavod, null, function (err, zavods){
                                    cb(err, zavods);
                                });
                            },
                            function(zavods, cb){
                                for(var i = 0; i < zavods.length; i++){
                                    var x = zavods[i].geometry.coordinates[0];//danger x
                                    var y = zavods[i].geometry.coordinates[1];//danger y
                                    var B = zavods[i].B;
                                    var BD = zavods[i].BD;
                                    var r =  zavods[i].radius;
                                    var danger = {
                                        X: X,//user lat
                                        Y: Y,//user lon
                                        x: x,//danger lat
                                        y: y,//danger lon
                                        B: B,//B coefficient of danger
                                        BD: BD,//BB normal coefficient of danger
                                        r: r,//radius
                                        v: v,//wind speed
                                        a: a//wind degree
                                    };
                                    dangers.push(danger);
                                }
                                cb(null, dangers)
                            }
                        ],
                        function(err, dangers){
                            cb(err, dangers);
                        }
                    )
                },
                function(dangers, cb){
                    async.waterfall(
                        [
                            function(cb){
                                DBFind(Musorka, null, function (err, musoki){
                                    cb(err, musoki);
                                });
                            },
                            function(musoki, cb){
                                for(var i = 0; i < musoki.length; i++){
                                    var x = musoki[i].geometry.coordinates[0];//danger x
                                    var y = musoki[i].geometry.coordinates[1];//danger y
                                    var B = musoki[i].B;
                                    var BD = musoki[i].BD;
                                    var r =  musoki[i].radius;
                                    var danger = {
                                        X: X,//user lat
                                        Y: Y,//user lon
                                        x: x,//danger lat
                                        y: y,//danger lon
                                        B: B,//B coefficient of danger
                                        BD: BD,//BB normal coefficient of danger
                                        r: r,//radius
                                        v: v,//wind speed
                                        a: a//wind degree
                                    };
                                    dangers.push(danger);
                                }
                                cb(null, dangers);
                            }
                        ],
                        function(err, dangers){
                            cb(err, dangers);
                        }
                    );
                },
                function(dangers, cb){
                    async.waterfall(
                        [
                            function(cb){
                                var arrOfDangerResult = [];
                                var arrayCounter = 0;
                                async.map( dangers, function( I ){
                                    MathService.isDanger(I.X, I.Y, I.x, I.y, I.B, I.BD, I.r, I.v, I.a,
                                        function(err, data){
                                            arrayCounter++;
                                            if(!err){
                                                if (data){
                                                    arrOfDangerResult.push(data);
                                                }
                                                if(dangers.length - 1 === arrayCounter){
                                                    cb(null, arrOfDangerResult);
                                                }
                                            }
                                        }
                                    );
                                });
                            },
                            function(arrOfDangerResult, cb) {
                                var finalDestination = MathService.sumDanger(arrOfDangerResult);
                                cb(null, finalDestination);
                            }
                        ],
                        function(err, finalDestination){
                            cb(err, finalDestination);
                        }
                    );
                }
            ],
            function(err, finalDestination){
                cb(err, finalDestination);
            }
        )
    },
    collectDangers: function(){
        //musorka
        //zavod
    },
    parseWeather: function(lat, lon, cb){
        WeatherService.getWeather(lat, lon, function(err, data){
            //TODO MINUS
            //достань дані з погодного сервіса

            cb(err, 12, 23);
        });
    }

};

