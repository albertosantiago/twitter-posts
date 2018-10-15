const fs = require('fs');
const m3u8stream = require('m3u8stream')

m3u8stream('https://video.twimg.com/ext_tw_video/874704151149674496/pu/pl/178x320/ZSBKRt_3T6Uo8B_4.m3u8')
    .pipe(fs.createWriteStream('videofile.mp4'));
