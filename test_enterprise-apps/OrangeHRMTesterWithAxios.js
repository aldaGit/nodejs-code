const axios = require('axios');
const qs = require('querystring');

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
let accessToken = null;

async function connect() {

    const body = qs.stringify({
        client_id: 'api_oauth_id',
        client_secret: 'oauth_secret',
        grant_type: 'password',
        username: 'demouser',
        password: '*Safb02da42Demo$'
    });

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        }
    };


    const res = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (res.data.error) {
        throw Error(res.data.error);
    }
    accessToken = res.data['access_token'];
    console.log(accessToken);

    setTimeout(connect, (res.data['expires_in'] * 1000) - 5000); // -5000ms to ensure to always have a valid token
}

connect();

/**
 * @param queryconfig Object keys correspond to https://orangehrm.github.io/orangehrm-api-doc/#api-Employee-SearchEmployee
 */
async function searchEmployee(queryconfig) {
    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        }
    };
    const res = await axios.get(`${baseUrl}/api/v1/employee/search?${qs.stringify(queryconfig)}`, config);
    return res.data.data;
}

async function updateBonusPayment(hrmId, amount) {
    const body = qs.stringify({
        value: amount,
        fieldId: 10
    });
    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    const res = await axios.put(`${baseUrl}/api/v1/employee/${hrmId}/custom-field`, body, config);
    return res.data;
}

module.exports = {
    connect,
    searchEmployee,
    updateBonusPayment
};
