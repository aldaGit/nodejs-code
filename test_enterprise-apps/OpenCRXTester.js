const axios = require('axios');

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';

const credentials = {
    username: 'guest',
    password: 'guest',
};

const config = {
    headers: {
        'Accept': 'application/json'
    },
    auth: credentials,
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
    // Send a request to the server
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);

    // Iterate the array
    // - contacts.data.objects fetches the internal array that contains the customers
    const customers = contacts.data.objects;

    // Now, pick each customer objects and print out everything
    for (var i = 0; i < customers.length; i++){
        console.log( customers[i] );
    }
    return customers;
}

async function getAllCustomersWithProjection() {
    // Send a request to the server
    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);

    // Iterate the array
    // - contacts,data.objects fetches the internal array that contains the customers
    // Put an additional filter on it in order to receive only LegalEntities (i.e. customers!)
    const customers = contacts.data.objects.filter(contact => contact['@type'] === 'org.opencrx.kernel.account1.LegalEntity')
    for (var i = 0; i < customers.length; i++){
        var obj = customers[i];

        // Print out the name and the rating
        console.log( ' Name of company: ' + obj['name'] +'; Rating: ' + obj['accountRating'] );
    }

    // well, just return the filtered objects for further handling
    return customers;
}


const customers = getAllCustomersWithProjection();
// console.log ( customers );
