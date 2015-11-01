const hashFile = require('hash-file');
const isProduction = process.env.NODE_ENV === 'production';

function getAssetHash(filePath) {
  if (!isProduction) return '';
  try {
    return hashFile.sync(filePath);
  }
  catch (e) {
    return '';
  }
}

const config = {
  assetsHashes: {
    appCss: getAssetHash('build/app.css'),
    appJs: getAssetHash('build/app.js')
  },
  isProduction: isProduction,
  googleAnalyticsId: 'UA-XXXXXXX-X',
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl']
};

module.exports = config;
