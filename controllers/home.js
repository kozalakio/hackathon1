/*
 * GET /
 */
exports.index = function (req, res) {
    //res.render('home', {});
    if (req.user) {
        res.send("Welcome " + req.user.profile.displayName + "<br>" + "<a href='/logout'>logout</a>");
    } else {
        res.send("<a href='/login'> Login</a>" + "<br>" + "<a href='/signup'> Sign Up</a>");
    }
};