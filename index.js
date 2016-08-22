'use strict';

const Promise       = require('bluebird');
const execFile      = Promise.promisify(require('child_process').execFile, { multiArgs: true });
const querystring   = require('querystring');
const url           = require('url');
const http          = require('http');

const { PORT, HOST} = require('minimist')(process.argv.slice(2));;

function main() {
    http.createServer((req, resp) => {
        const cmd = querystring.parse(url.parse(req.url).query).cmd;

        if (cmd) {
            execFile(cmd).spread((stdout, stderr) => {
                if (stdout) {
                    const obj = JSON.stringify({stdout: stdout});
                    console.log(stdout);
                    resp.write(obj)
                }
                if (stderr) {
                    const obj = JSON.stringify({stderr: stderr});
                    console.error(stderr);
                    resp.write(obj);
                }
                resp.end();
            }).catch(error => {
                console.log(`error ${error}`);
                resp.end(JSON.stringify({error: error}));
            });
        } else {
            resp.end("please specify ?cmd")
        }
    }).listen(PORT || 1234, HOST || '0.0.0.0');
}

if (require.main === module) {
    main();
} else {
    module.exports = main;
}
