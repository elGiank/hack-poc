const Request = require('request');
const Hawk = require('hawk');


// Client credentials
const credentials = {
    id: 'dh37fgj492je',
    key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
    algorithm: 'sha256'
};

// Request options
const requestOptions = {
    uri: 'https://hawk-dev-gk.azurewebsites.net/lenddo/lenddo',
    method: 'GET',
    headers: {}
};

const testHandler = (res) => {

    // Generate Authorization request header
    const { header } = Hawk.client.header('https://hawk-dev-gk.azurewebsites.net/lenddo', 'GET', {
        credentials: credentials,
        ext: 'and welcome!'
    });
    requestOptions.headers.Authorization = header;

    // Send authenticated request
    Request(requestOptions, function (error, response, body) {
        // Authenticate the server's response
        Hawk.client.authenticate(response, credentials, header.artifacts, { payload: body });

        res.status(200).send({error, response, body});
    });

};

module.exports = testHandler;