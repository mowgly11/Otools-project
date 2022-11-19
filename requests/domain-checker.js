const { checkDomain } = require('../tools-functions');

module.exports = {
    name: "/domain-checker",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/domain.ejs")];

        res.render("domain.ejs");
    },

    run2: async (req, res) => {
        const domain = req.body.domain;
        const result = await checkDomain(domain);

        if (result === "No Results") return res.send({ error: "No Results Found About This Domain." });

        res.send({
            error: "", 
            domainName: result.domainName,
            creationDate: result.createdAt,
            expirationDate: result.Expiration,
            provider: result.provider,
            providerURL: result.providerURL,
            registryId: result.registryId
        });
    }
}