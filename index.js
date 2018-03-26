const fs = require('fs');
const path = require('path');
const cmd = require('child_process').exec;
const config = require('./config');

const app = require('express')();

require('https').createServer({
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.cert)
}, app).listen(config.PORT, () => {
    console.log(`--- server running on ${config.PORT} ---`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/restart', (req, res) => {
    cmd('systemctl restart shadowsocks-libev', (err, stdout, stderr) => {
        if (err) {
            res.status(200).send('fail');
        } else {
            res.status(200).send('success');
        }
    });
});

app.get('*', (req, res) => {
    res.redirect('/');
});
