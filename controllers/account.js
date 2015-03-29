/**
 * Created by tuncaulubilge on 21/03/15.
 */
var crypto = require('crypto');
var User = require('../models/user.js');

// GET /signup
exports.signupPage = function (req, res) {
    if (req.user) {
        res.redirect("/");
    } else {
        res.render("signup", {
            _csrf: res.locals._csrf
        });
    }
};

// GET /loginPage
exports.loginPage = function (req, res) {
    //res.send('<a href="/auth/facebook">Login with Facebook</a>' + '<br>' + '<a href="/auth/twitter">Login with Twitter</a>');
    if (req.user) {
        res.redirect("/");
    } else {
        res.render("login", {
            _csrf: res.locals._csrf
        });
    }
};

// POST /login
exports.login = function (req, res) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {
            req.session.regenerate(function () {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + 
                                        user.username + 
                                        ' click to <a href="/logout">logout</a>. ' + 
                                        ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('/profile');
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            res.redirect('/login');
        }
    });
};

// POST /logout
exports.logout = function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.redirect('/');
    });
};

// POST /signup
exports.signup = function (req, res) {
    var password = req.body.password;
    var username = req.body.username;

    hash(password, function (err, salt, hash) {
        if (err) throw err;
        var user = new User({
            username: username,
            salt: salt,
            hash: hash
        }).save(function (err, newUser) {
                if (err) throw err;
                authenticate(newUser.username, password, function (err, user) {
                    if (user) {
                        req.session.regenerate(function () {
                            req.session.user = user;
                            req.logIn(user);
                            req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
                            res.redirect('/');
                        });
                    }
                });
            });
    });
};

// Facebook Connect
exports.facebookConnect = function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({
        'facebook.id': profile.id
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                provider: 'facebook',
                facebook: {id: profile.id, token: accessToken, json: profile._json},
                profile: {
                    firstName: profile._json.first_name,
                    lastName: profile._json.last_name,
                    displayName: profile.displayName,
                    gender: profile.gender ? profile.gender : 'unknown'
                }
            });
            user.save(function (err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
};

// Twitter Connect
exports.twitterConnect = function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, user);
};

exports.requiredAuthentication = function (req, res, next) {
    if (req.session && req.session.user && !req.user) {
        req.user = req.session.user;
    }

    if (req.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
};

exports.userExist = function (req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist";
            res.redirect("/signup");
        }
    });
};

function authenticate(name, pass, fn) {
    User.findOne({
            username: name
        },

        function (err, user) {
            if (user) {
                if (err) return fn(new Error('cannot find user'));
                hash(pass, user.salt, function (err, hash) {
                    if (err) return fn(err);
                    if (hash == user.hash) return fn(null, user);
                    fn(new Error('invalid password'));
                });
            } else {
                return fn(new Error('cannot find user'));
            }
        });
}

function hash(pwd, salt, fn) {
    var len = 128;
    var iterations = 12000;

    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, fn);
    } else {
        fn = salt;
        crypto.randomBytes(len, function (err, salt) {
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
                if (err) return fn(err);
                fn(null, salt, hash);
            });
        });
    }
}