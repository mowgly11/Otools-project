const satelize = require('satelize');

module.exports = {
    name: "/geolocation",
    run: (req, res) => {
        delete require.cache[require.resolve("../views/geolocation.ejs")];

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
    },

    run2: (req, res) => {
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
    }
}