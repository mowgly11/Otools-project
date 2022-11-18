export function keywords() {
    return new Promise((res, rej) => {
        res([
            "random",
            "bytes",
            "domain",
            "reverse",
            "ip",
            "text",
            "location",
            "counter",
            "words",
        ]);
    })
}

export function searchResults(keyword) {
    let results = ["Domain Checker", "Geolocation", "Random Bytes", "Text Reverse", "Words Counter"];
    return new Promise((res, rej) => {
        for (let i = 0; i <= results.length; i++) {
            if (results[i].toLowerCase().includes(keyword)) return res(results[i]);
        }
    });
}