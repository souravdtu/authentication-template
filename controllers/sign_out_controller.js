module.exports.out = function(req,res){
    req.session.destroy(function (err) {
        res.redirect('/');
        return;
    });
};