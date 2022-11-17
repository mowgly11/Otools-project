module.exports = {
    name: "/text-reverse",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/reverse.ejs")];

        res.render("reverse.ejs", { error: "", result: "" });
    },

    run2: async (req, res) => {
        const text = req.body.reverse;
        res.send({ error: "", result: text.split("").reverse().join("") });
    }
}