mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports = {
    setup: () => {
        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGODBURL || "mongodb://admin:admin123@ds145183.mlab.com:45183/awesome_invoice");
            const db = mongoose.connection;
            db.on("error", reject);
            db.once("open", resolve);
        })
    }
}