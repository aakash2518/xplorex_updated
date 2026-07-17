const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error('Failed to get ' + response.statusCode));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

Promise.all([
  download('https://videos.pexels.com/video-files/3015511/3015511-uhd_2560_1440_24fps.mp4', 'public/assets/india-bg.mp4'),
  download('https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4', 'public/assets/intl-bg.mp4')
]).then(() => {
  console.log('Videos downloaded successfully');
}).catch(console.error);
