const withPlugins = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const css = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');
const images = require('next-images');

module.exports = withPlugins([
    [withSourceMaps],
    [css],
    [sass, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
    }],
    [images],
]);