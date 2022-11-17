const express = require('express');
const app = express();
const fs = require('node:fs');

app.set("trust proxy");
app.set("etag", false);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

app.listen(80, () => console.log("http://localhost:80"));

const files = fs.readdirSync("./requests").filter(f => f.endsWith(".js"));

files.forEach(f => {
    const file = require(`./requests/${f}`);
    if (file && file.name) {
        app.get(file.name, file.run);

        if (file.run2) app.post(file.name, file.run2)
        console.log(`"[DASHBOARD]" - Loaded ${file.name}`);
    }
});