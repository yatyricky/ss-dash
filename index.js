const fs = require('fs');

const config = {
    PORT: 443,
    key: 'key.pem',
    cert: 'cert.pem'
};

const app = require('express')();

require('https').createServer({
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.cert)
}, app).listen(config.PORT, () => {
    console.log(`--- server running on ${config.PORT} ---`);
});

app.get('/', (req, res) => {
    res.send('asd');
});