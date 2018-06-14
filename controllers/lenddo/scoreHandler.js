const Hawk = require('hawk');

const credentialsFunc = (id) => {
    const credentials = {
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256',
    };
    return credentials;
};

const scoreHandler = (req, res) => {
    let request = {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        port: req.port,
        host: req.hostname
    };

    Hawk.server.authenticate(request, credentialsFunc)
        .then((auth) => {

            //Prepare response
            const payload = 'accepted';
            const headers = { 'Content-Type': 'text/plain' };

            // Generate Server-Authorization response header
            const header = Hawk.server.header(auth.credentials, auth.artifacts, { payload, contentType: headers['Content-Type'] });
            headers['Server-Authorization'] = header;

            res.set(headers).status(200).send(payload);

        })
        .catch((err) => {
            res.status(401).send(err);
        });

};

module.exports = scoreHandler;