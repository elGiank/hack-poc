const Hawk = require('hawk');

const credentialsFunc = (id) => {
    console.log('id de la funcion credentualsFunc:', id);
    const credentials = {
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256',
        user: 'Steve'
    };
    return credentials;
};

const scoreHandler = (req, res) => {
    console.log('entro al handler de hawk');
    // Authenticate incoming request

    Hawk.server.authenticate(req, credentialsFunc)
        .then((authData) => {
            console.log('Authenticate incoming request result then', authData);

            //Prepare response
            const payload = (`Hello ${credentials.user} ${artifacts.ext}`);
            const headers = { 'Content-Type': 'text/plain' };

            console.log('payload', payload);
            console.log('headers just created', headers);

            // Generate Server-Authorization response header
            const header = Hawk.server.header(credentials, artifacts, { payload, contentType: headers['Content-Type'] });
            headers['Server-Authorization'] = header;
            console.log('headers with server auth', headers);

            res.headers(headers).status(200).send(payload);

        })
        .catch((err) => {
            console.log('Authenticate incoming request result catch');
            console.log('err', err);

            res.status(401).send(err);
        });

};

module.exports = scoreHandler;