const request = require('request');

const options = {
    url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken',
    method: 'POST',
    form : {
        client_id : 'api_oauth_id',
        client_secret : 'oauth_secret',
        grant_type : 'password',
        username : 'demouser',
        password : '*Safb02da42Demo$'
    },
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    let accessToken;

    console.log(json.token_type);
    console.log(json.access_token);

    accessToken = json.access_token;

    // request.post(...)

    const options2 = {
        url: 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search',
        method: 'GET',

            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
            }
        };

    request.get(options2 , function(err, res, body) {
            let json2 = JSON.parse(body);
            console.log(json2);
        });




});
