module.exports = {
    sessionSecret: process.env.SESSION_SECRET || 'session secret key',
    db: process.env.MONGODB || 'mongodb://localhost/test'
};
