const uuid = require("uuid");
const path = require("path");
const sharp = require("sharp");

async function handleImage(image, folder, path_to) {
    let file;

    if(path_to) {
        file = await sharp(path_to);
    }
    else {
        file = await sharp(image.data);
    }

    const metadata = await file.metadata();

    const toWebpFormats = ['png', 'svg', 'gif', 'tiff', 'webp'];
    let fileName;

    if(metadata.isProgressive) {
        fileName = uuid.v4() + `.${metadata.format}`;
        await image.mv(path.resolve(__dirname, '..', 'static', folder, fileName));
    }

    console.log(metadata.format);

    if(!fileName && toWebpFormats.lastIndexOf(metadata.format) === -1) {
        fileName = uuid.v4() + '.jpg';
        await file.jpeg({
            progressive: true
        }).toFile(path.resolve(__dirname, '..', 'static', folder, fileName));
        console.log("Converted");
    }

    if(!fileName) {
        fileName = uuid.v4() + '.webp';
        await file.webp({
            progressive: true,
            lossless: false,
            alphaQuality: 70
        }).toFile(path.resolve(__dirname, '..', 'static', folder, fileName));
    }

    return fileName;
}

module.exports = handleImage;