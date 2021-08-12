const allowedSites = require('../config/corsAllowedDomains');
const cors = require('cors');

let myCros = cors();
if (allowedSites.length > 0) myCros = cors({ origin: allowedSites });

module.exports = myCros;
