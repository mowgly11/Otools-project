$(document).ready(() => {
    $("#post-form-domain").on("submit", (event) => {
        event.preventDefault();
        const value = $("#domain").val();

        $.ajax({
            url: "/domain-checker",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                domain: value
            }),
            success: (res) => {
                $("#error-flash-domain").html(`${res.error}`);
                if (res.error == "") {
                    $("#res1").html(`domainName: ${res.domainName}`);
                    $("#res2").html(`creationDate: ${res.creationDate}`);
                    $("#res3").html(`expirationDate: ${res.expirationDate}`);
                    $("#res4").html(`provider: ${res.provider}`);
                    $("#res5").html(`providerURL: ${res.providerURL}`);
                    $("#res6").html(`registryId: ${res.registryId}`);
                }
            }
        });
    });
    $("#post-form-bytes").on("submit", (event) => {
        event.preventDefault();
        const value = $("#randoms").val();

        $.ajax({
            url: "/random-bytes",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                randoms: value
            }),
            success: (res) => {
                $("#error-flash-bytes").html(`${res.error}`);
                $("#result-area").html(`${res.randoms}`);
            }
        });
    });
    $("#post-form-ip").on("submit", (event) => {
        event.preventDefault();
        const value = $("#ip").val();

        $.ajax({
            url: "/geolocation",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                ip: value
            }),
            success: (res) => {
                $("#error-flash-ip").html(`${res.error}`);
                $("#res1-ip").html(`IP: ${res.ip}`);
                $("#res2-ip").html(`Country: ${res.country}`);
                $("#res3-ip").html(`Continent: ${res.continent}`);
                $("#res4-ip").html(`latitude: ${res.latitude}`);
                $("#res5-ip").html(`longitude: ${res.longitude}`);
                $("#res6-ip").attr("href", res.googleMap);
            }
        });
    });
    $("#post-form-reverse").on("submit", (event) => {
        event.preventDefault();
        const value = $("#reverse").val();

        $.ajax({
            url: "/text-reverse",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                reverse: value
            }),
            success: (res) => {
                $("#error-flash-ip").html(`${res.error}`);
                $("#result-area").html(`${res.result}`);
            }
        });
    });
    $("#post-form-words").on("submit", (event) => {
        event.preventDefault();
        const value = $("#words").val();

        $.ajax({
            url: "/words-counter",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                words: value
            }),
            success: (res) => {
                $("#error-flash-words").html(`${res.error}`);
                $("#result-area").html(`${res.result} words`);
            }
        });
    });
});