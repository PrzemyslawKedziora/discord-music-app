const axios = require("axios");

const getVideoData = async (youtubeUrl) => {
  try {
    // Getting video ID from url
    const videoId = youtubeUrl.split('v=')[1];

    // Requesting YouTube API to the the information and thumbnail
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`);
    const thumbnailUrl = response.data.items[0].snippet.thumbnails.high.url;
    const songName = response.data.items[0].snippet.title;

    // Pobieramy miniaturkę jako base64
    // const thumbnailResponse = await axios.get(thumbnailUrl, { responseType: 'arraybuffer' });
    // const thumbnailBase64 = Buffer.from(thumbnailResponse.data, 'binary').toString('base64');

    return {
      thumbnail: thumbnailUrl,
      name: songName,
    };
  } catch (error) {
    console.error('Error while getting video thumbnail & title:', error.message);
    throw new Error('Error while getting video thumbnail & title');
  }
};

module.exports = getVideoData;