/*
 * GET /profile
 */
exports.index = function (req, res) {
    if (req.session.user) {
        res.send('Profile page of '+ req.session.user.username +'<br>'+' click to <a href="/logout">logout</a>');
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
};