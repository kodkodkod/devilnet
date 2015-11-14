/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    ///**
    // * `ProductController.create()`
    // */
    //create: function (req, res) {
    //    return res.json({
    //        todo: 'create() is not implemented yet!'
    //    });
    //},


    /**
     * `ProductController.read()`
     */
    read: function (req, res) {
        var template = 'products';
        async.waterfall(
            [
                function(cb){
                    Product.find({}).exec(cb)
                },
                function(products, cb){
                    cb(null, products);
                },
            ],
            function(err, products){
                console.log(products);
                return res.view(template, {products:products});

            }
        )

    },

    /**
     * `ProductController.readItem()`
     */
    readItem: function (req, res) {
        var template = 'product';
        var id = req.params.id;

        async.waterfall(
            [
                function(cb){
                    Product.findOne({"id":id}).exec(function(err, data){
                        console.log(err);
                        console.log(data);
                        cb(err, data);
                    })
                },
                function(product, cb){
                    cb(null, product);
                }
            ],
            function(err, product){
                console.log(product);
                return res.view(template, {product:product});
            }
        );
    },


    /**
     * `ProductController.update()`
     */
    update: function (req, res) {
        return res.json({
            todo: 'update() is not implemented yet!'
        });
    },


    /**
     * `ProductController.delete()`
     */
    delete: function (req, res) {
        return res.json({
            todo: 'delete() is not implemented yet!'
        });
    }
};

