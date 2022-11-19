const md5 = require('md5');

module.exports = {
    name: "/md5-hash",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/md5.ejs")];

        res.render("md5.ejs", { error: "", result: "" });
    },

    run2: async (req, res) => {
        const string = req.body.md5;
        const result = md5(string);

        res.send({ error: "", result: result });
    }
}