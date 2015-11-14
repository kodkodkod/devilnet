
module.exports = {
    sumDanger: function(arrDanger){
        var result = 0;
        for(var i = 0; i < arrDanger.length; i++ ){
            var danger = arrDanger[i];
            if( danger ){
                result += danger;

            }
        }
        result = result / arrDanger.length;
        //TODO MINUS
        result = result - 1;
        result = Math.abs(result);
        return result;
    },
    square: function  (x) {
        return x * x;
    },
    degreeToMeters: function(X, Y, x, y, cb){
        var equator = 40075696;
        var meridian = 20004276;
        var maxDegree = 360;
        var averageOfMaxDegree = 180;

        X = X * Math.cos(X) * equator / maxDegree;//meters
        Y = Y * meridian / averageOfMaxDegree;//meters
        x = x * Math.cos(x) * equator / maxDegree;//meters
        y = y * meridian / averageOfMaxDegree;//meters
        cb(null, X, Y, x, y);
    },
    isDanger: function(X, Y, x, y, B, BD, r, v, a, cb){
        var that = this;

        if( B < BD ){
            cb(null, 0)
        }
        else {
            that.calculator(X, Y, x, y, B, BD, r, v, a,
                function(err, data){
                    cb(err, data);
                }
            );
        }
    },
    isWind: function(v, R, r){
        if (v > 1) {
            R = r * v;
        } else {
            R = r;
        }
        return R;
    },
    calculator:function(X, Y, x, y, B, BD, r, v, a, cb){
        var that = this;
        var square = that.square;

        var R = 0
        var b = 0;
        var c = 0;
        var l = 0;
        var n = 0;
        var degree45 = 45;

        async.waterfall(
            [
                function(cb){
                    that.degreeToMeters(X, Y, x, y,
                        function(err, _X, _Y, _x, _y){
                            cb(err, _X, _Y, _x, _y);
                        }
                    );
                },
                function(_X, _Y, _x, _y, cb){
                    R = that.isWind(v, R, r);

                    n = R;
                    l = Math.sqrt(square(_x - _X) + square(_y - _Y));
                    c = Math.sqrt(square(_x - _X) + square(_y - _Y + R));
                    b = Math.acos((square(n) + square(l) - square(c)) / (2 * n * l));

                    var result = null;
                    if (Math.abs(a - b) < degree45) {
                        result = B / BD;
                    } else {
                        result = 0;
                    }
                    cb(null, result);
                }
            ],
            function(err, data){
                cb(err, data);
            }
        );
    }
}





// @var Number X
// coordinates of person

// @var Number Y
// coordinates of person

// @var Number x
// coordinates of danger

// @var Nu = require()mber y
// coordinates of danger
//var mathjs = require("mathjs");
//calculate: function(X, Y, x, y, B, BD ){
//    //X, Y to meters
//    X = X * Math.cos(X) * 40.075696 / 360;
//    Y = Y * 20004276 / 180;
//    x = x * Math.cos(x) * 40.075696 / 360;
//    y = y * 20004276 / 180;
//
//
//    // @var Number r
//    // radius
//    var r = 0;
//    // @var Number r
//    // teperature of air
//    var T = 0;
//    // @var Number a
//    // kut vitru
//    var a = 0;
//    // @var Number B
//    // obem vykydiv za dobu
//    //var B = 0;
//    // @var Number BD
//    // dopustymyy obyem za dobu
//    //var BD = 0;
//    // @var Number b
//    // kut mizh lyudynnoyu ta obektom
//    var b = 0;
//    // @var Number n
//    // normal`
//    var n = 0;
//    // @var Number l
//    // vidstan` mizh lyudynnoyu ta obektom
//    var l = 0;
//    // @var Number c
//    // vidstan` mizh kraynyoyu tochkoyu normali ta lyudynoyu
//    var c = 0;
//    // @var Number R
//    // radius nebezpeky
//    var R = 0;
//    // @var Number t
//    // temperaturnyy koef
//    var t = T/20;
//
//
//
//    if(v > 1){ R = r * v}
//    else{r = R};
//    n = R;
//    l = sqrt(Math.pow((x - X), 2) + Math.pow(y - Y, 2));
//    c = sqrt(Math.pow((x - X), 2) + Math.pow(y + R - Y, 2));
//    b = Math.acos((n * n + l * l - c * c) / (2 * n * l));
//    if( Math.abs(a - b) 0) {
//        n++;
//        w = 1/n;
//    }
//    for(var i = 0; i < n; i++) {
//        P += w;//*CountRi;//(треба зробити, щоб сюди підтягувались поля для кожного об"єкта свої);
//    }
//
//    return P;
//}
