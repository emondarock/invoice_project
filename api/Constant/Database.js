const mongoose = require('mongoose');
const elasticsearch = require('elasticsearch');
mongoose.Promise = global.Promise;
//Note: Production
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@dbh29.mlab.com:27297/bazari');
mongoose.connect('mongodb://localhost/invoicedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));
let testData = false
db.once('open', () => {
    testData = true
    console.log("Connected");
})