const express = require('express');
const app = express();
const {
    checkDomain,
    randomLetters,
} = require('./tools-functions');

const satelize = require('satelize');

app.set("trust proxy");
app.set("etag", false);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());

app.listen(80, () => console.log("http://localhost:80"));

/* Main Route */

app.get("/", (req, res) => {
    res.render("home.ejs");
});

/* Random Bytes Generator Routes */

app.get("/random-bytes", (req, res) => {
    res.render("random.ejs", { error: "", randoms: "" });
});

app.post("/random-bytes", async (req, res) => {
    const count = req.body.randoms;
    const result = await randomLetters(count);

    if (result === "No Results") return res.send({ error: "Invalid Number/Number is higher than 20000", randoms: "" });

    res.send({ randoms: result, error: "" });
});

/* Domain Checker Routes */

app.get("/domain-checker", (req, res) => {
    res.render("domain.ejs", {
        error: "",
        domainName: "",
        creationDate: "",
        expirationDate: "",
        provider: "",
        providerURL: "",
        registryId: ""
    });
});

app.post("/domain-checker", async (req, res) => {
    const domain = req.body.domain;
    const result = await checkDomain(domain);

    if (result === "No Results") return res.send({
        error: "No Results Found About This Domain.",
        domainName: "",
        creationDate: "",
        expirationDate: "",
        provider: "",
        providerURL: "",
        registryId: ""
    });

    res.send({
        error: "",
        domainName: result.domainName,
        creationDate: result.createdAt,
        expirationDate: result.Expiration,
        provider: result.provider,
        providerURL: result.providerURL,
        registryId: result.registryId
    });
});

/* Geo Location Routes */

app.get("/geolocation", async (req, res) => {
    try {
        satelize.satelize({ ip: req.ip }, (err, payload) => {
            if (err) return res.render("geolocation.ejs", {
                error: "An Error Just Happened." + err,
                ip: "",
                country: "",
                continent: "",
                latitude: "",
                longitude: "",
                googleMap: "#"
            });

            res.render("geolocation.ejs", {
                error: "",
                ip: "Your IP: " + req.ip,
                country: payload.country.en,
                continent: payload.continent.en,
                latitude: payload.latitude,
                longitude: payload.longitude,
                googleMap: `https://www.google.com/maps/@${payload.latitude},${payload.longitude},13z`
            });
        });
    } catch (e) {
        return res.render("geolocation.ejs", {
            error: "",
            ip: "Your IP: ipv6",
            country: "ipv6",
            continent: "ipv6",
            latitude: "ipv6",
            longitude: "ipv6",
            googleMap: "#"
        });
    }
});

app.post("/geolocation", (req, res) => {
    const ip = req.body.ip;
    try {
        satelize.satelize({
            ip: ip
        }, (err, payload) => {
            if (err) return res.send({
                error: "An Error Just Happened." + err,
                ip: "",
                country: "",
                continent: "",
                latitude: "",
                longitude: "",
                googleMap: "#"
            });

            res.send({
                error: "",
                ip: ip,
                country: payload.country.en,
                continent: payload.continent.en,
                latitude: payload.latitude,
                longitude: payload.longitude,
                googleMap: `https://www.google.com/maps/@${payload.latitude},${payload.longitude},13z`
            });
        });
    } catch (e) {
        return res.send({
            error: "",
            ip: "ipv6",
            country: "",
            continent: "",
            latitude: "",
            longitude: "",
            googleMap: "#"
        });
    }
});

/* Text Reverse Routes */

app.get("/text-reverse", (req, res) => {
    res.render("reverse.ejs", { error: "", result: "" });
});

app.post("/text-reverse", (req, res) => {
    const text = req.body.reverse;
    res.send({ error: "", result: text.split("").reverse().join("") });
});

/* Words Counter */

app.get("/words-counter", (req, res) => {
    res.render("wordscount.ejs", { error: "", result: "" });
});

app.post("/words-counter", (req, res) => {
    let text = req.body.words;
    text = text.split(" ").filter(i => String(i).trim()).length;
    res.send({ error: "", result: text });
});