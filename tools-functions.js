const whois = require('whois-json');
const crypto = require('crypto');

module.exports = {
    checkDomain: async (domain) => {
        var results = await whois(domain);

        if (!results.domainName) return 'No Results';

        return {
            domainName: results.domainName,
            registryId: results.registryDomainId,
            createdAt: results.creationDate,
            Expiration: results.registrarRegistrationExpirationDate,
            provider: results.reseller,
            providerURL: results.registrarUrl
        };
    },

    randomLetters: async (count) => {
        if (isNaN(count)) return 'No Results';
        if (count <= 0 || count > 20000) return 'No Results';
        return crypto.randomBytes(parseInt(count)).toString("hex");
    },
}