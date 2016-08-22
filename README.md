# url to exec

do NOT use this module in PRODUCTION. It should NOT be accessible over internet(insecure)!

# Requirements

- node.js

# Installation

```bash
$ [sudo] npm install -g url-to-exec
```

Although it is really not advised to install with sudo. I would advise to install via [nvm](https://github.com/creationix/nvm)

# Usage

Starting server:

```bash
url-to-exec --port=<port> --host=<host>
```

if no `port` and `host` it will default bind to http://127.0.0.1:1234

For this example we assume `$ which whoami | wc -m` will return number greater than `0`.

When you have not specified a port and host and you do `$ curl "http://localhost:1234?cmd=whoami"` it will return your username => `alfredwesterveld\n`
