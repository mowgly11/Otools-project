const { checkSSL } = require('../tools-functions');

module.exports = {
    name: "/ssl-checker",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/ssl.ejs")];

        res.render("ssl.ejs");
    },

    run2: async(req, res) => {
        const result = await checkSSL(req.body.ssl);

        if (result === "invalid") return res.send({ error: "Invalid Domain", result: "" });

        res.send({
            error: "",
            daysRemaining: result.daysRemaining,
            valid: result.valid,
            validFrom: result.validFrom,
            validTo: result.validTo,
            validFor: result.validFor,
        });
    }
}