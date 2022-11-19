module.exports = {
    name: "/words-counter",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/wordscount.ejs")];

        res.render("wordscount.ejs");
    },

    run2: async (req, res) => {
        let text = req.body.words;
        text = text.split(" ").filter(i => String(i).trim()).length;
        res.send({ error: "", result: text });
    }
}