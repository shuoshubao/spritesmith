const {writeFileSync} = require('fs');
const {basename} = require('path');
const glob = require('glob');
const Spritesmith = require('spritesmith');
const templater = require('spritesheet-templates');

const sprites = glob.sync('./imgs/*.png');
const spritesmith = new Spritesmith();

spritesmith.createImages(sprites, function handleImages(err, images) {
    const result = spritesmith.processImages(images, {
        padding: 5,
        algorithm: 'top-down'
    });

    const styleText = templater({
        sprites: Object.entries(result.coordinates).reduce((prev, [imgPath, {x, y, width, height}]) => {
            const name = basename(imgPath, '.png');
            prev.push({name, x, y, width, height});
            return prev;
        }, []),
        spritesheet: {
            image: 'https://i.ytimg.com/vi/Jsmeh7q9Qv4/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLA7WFgKDWD8Q8AU8MaxoTQZelD5KQ',
            ...result.properties

        }
    }, {format: 'scss'});
    // }, {format: 'css'});
    console.log(styleText);
    writeFileSync('./demo.scss', styleText);
});
