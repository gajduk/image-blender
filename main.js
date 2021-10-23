'use strict'
let { writeFile } = require('fs').promises;
let { join } = require('path');
let axios = require('axios');
let blend = require('@mapbox/blend');
let argv = require('minimist')(process.argv.slice(2));

const baseUrl = 'https://cataas.com/cat/says/';
const fileOut = join(process.cwd(), `/cat-card.jpg`);

const {
    greeting = 'Hello',
    who = 'You',
    width = 400,
    height = 500,
    color = 'Pink',
    size = 100,
} = argv;

fetchAndBlendImages();

async function fetchAndBlendImages() {
    try {
        let images = await fetchImages(getImageRequests());
        let blendedImage = await blendImagesHorizontally(images, width);
        await writeFile(fileOut, blendedImage, 'binary');
        console.log("The file was saved!");
    } catch ( err ) {
        console.log(err);
    }
}

function getImageRequests(words, width, height, color, size) {
    return words.map(word => ({
        url: `${baseUrl}${word}?width=${width}&height=${height}&color${color}&s=${size}`,
        method: 'get',
        responseType: 'arraybuffer'
    }));
}

async function fetchImages(imageRequests) {
    let imageResponses = await Promise.all(imageRequests.map(axios.request));
    console.log('Received responses with status: ' + imageResponses.map(response => response.status));
    return imageResponses.map(response => response.data);
}

function blendImagesHorizontally(imageArray, width) {
    return new Promise((resolve, reject) => {
        blend(imageArray.map((image, idx) => ({
                buffer: image,
                x: idx*width,
                y: 0,
            })), {
                width: width * imageArray.length,
                height: height,
                format: 'jpeg',
            }, (err, data) => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(data); 
                }
            });
        });
}