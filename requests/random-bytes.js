const { randomLetters } = require('../tools-functions');

module.exports = {
    name: "/random-bytes",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/random.ejs")];

        res.render("random.ejs");
    },

    run2: async (req, res) => {
        const count = req.body.randoms;
        const result = await randomLetters(count);

        if (result === "No Results") return res.send({ error: "Invalid Number/Number is higher than 20000", randoms: "" });

        res.send({ randoms: result, error: "" });
    }
}