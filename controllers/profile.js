/*
 * GET /profile
 */
exports.index = function (req, res) {
    if (req.user) {
        console.log(req.user);
        res.send('Profile page of '+ req.user.profile.displayName +'<br>'+' click to <a href="/logout">logout</a>');
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
};