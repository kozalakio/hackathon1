module.exports = {
    sessionSecret: process.env.SESSION_SECRET || 'session secret key',
    db: process.env.MONGODB || 'mongodb://localhost/test',
    twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY || 'twitter consumer key',
    twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'twitter consumer secret'
};
