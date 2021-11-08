const axios = require('axios');

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
const credentials = {
    username: 'guest',
    password: 'guest',
};

async function connect() {
    const config = {
        headers: {
            'Accept': 'application/json'
        },
        auth: credentials,
    };
    //simple request to check if the service is online
    await axios.get(`${baseUrl}/org.opencrx.kernel.home1/provider/CRX/segment/Standard/userHome/guest/accessHistory`, config);
}



async function getAllCustomers() {
    const config = {
        headers: {
            'Accept': 'application/json'
        },
        auth: credentials,
    };
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    // console.log( contacts.data );

    // Iterate the array
    // - contacts,data.objects fetches the internal array that contains the customers
    const customers = contacts.data.objects;
    for (var i = 0; i < customers.length; i++){
        var obj = customers[i];
        for (var key in obj){
            var attrName = key;
            var attrValue = obj[key];
            if ( key === 'accountRating' ) console.log( key + ' of company ' + obj['name'] +': ' + obj[key] );
        }
    }

    return contacts.data.objects.filter(contact => contact['@type'] === 'org.opencrx.kernel.account1.LegalEntity');
}

async function getAllContacts() {
    const config = {
        headers: {
            'Accept': 'application/json'
        },
        auth: credentials,
    };
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    return contacts.data.objects;
}

const customers =  getAllCustomers();
console.log(  customers );

