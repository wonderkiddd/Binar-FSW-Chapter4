// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: "public_I0fhFMmPPZ1wdW/nSsiTohfWecY=",
    privateKey: "private_guNf5l+hqG9BkBK3KiLUINAYflQ=",
    urlEndpoint: "https://ik.imagekit.io/tinpet"
});

module.exports = imagekit;