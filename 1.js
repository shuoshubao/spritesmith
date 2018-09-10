const fs = require('fs');
const glob = require('glob');
const Spritesmith = require('spritesmith');

const sprites = glob.sync('./imgs/*.png');
const spritesmith = new Spritesmith();

spritesmith.createImages(sprites, function handleImages(err, images) {
    // images[0].width; // Width of image
    // images[0].height; // Height of image

    // Create our result
    // var result = spritesmith.processImages(images);
    // result.image; // Readable stream outputting image
    // result.coordinates; // Object mapping filename to {x, y, width, height} of image
    // result.properties; // Object with metadata about spritesheet {width, height}

    const result = spritesmith.processImages(images, {
        padding: 5,
        algorithm: 'top-down'
    });
    const readStream = result.image;
    const writeStream = fs.createWriteStream('./demo.png');
    readStream.on('data', chunk => {
        writeStream.write(chunk);
    });
    readStream.on('end', () => {
        writeStream.end();
    });
    console.log(result.coordinates);
});
