const Hawk = require('hawk');

const credentialsFunc = (id) => {
    const credentials = {
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256',
        user: 'Steve'
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
            const payload = (`Hello ${auth.credentials.user} ${auth.artifacts.ext}`);
            const headers = { 'Content-Type': 'text/plain' };

            // Generate Server-Authorization response header
            const header = Hawk.server.header(auth.credentials, auth.artifacts, { payload, contentType: headers['Content-Type'] });
            console.log('headers with server auth', headers);

            res.set(headers).status(200).send(payload);

        })
        .catch((err) => {
            console.log('Authenticate incoming request result catch');
            console.log('err', err);

            res.status(401).send(err);
        });

};

module.exports = scoreHandler;