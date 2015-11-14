/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



    ///**
    // * `CategoryController.create()`
    // */
    //create: function (req, res) {
    //  return res.json({
    //    todo: 'create() is not implemented yet!'
    //  });
    //},
    //
    //
    /**
     * `CategoryController.find()`
     */
    find: function (req, res) {
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
                return res.json({
                    categories: err ? err : categories
                });
            })
    },
    //
    //
    ///**
    // * `CategoryController.update()`
    // */
    //update: function (req, res) {
    //  return res.json({
    //    todo: 'update() is not implemented yet!'
    //  });
    //},
    //
    //
    ///**
    // * `CategoryController.delete()`
    // */
    //delete: function (req, res) {
    //  return res.json({
    //    todo: 'delete() is not implemented yet!'
    //  });
    //}
};

