const Scene = require('telegraf/scenes/base');
const Lesson = require('../models/Lesson');

const askAudioScene = new Scene('askAudioScene');

askAudioScene.enter(async (ctx) => {
    ctx.reply('🎵Audio faylini yuboring:');
});

askAudioScene.on('message', async (ctx) => {
    console.log(ctx.message.audio);
    ctx.session.audioFile = ctx.message.audio
    const audioFile = ctx.session.audioFile
    ctx.scene.enter('askNameScene');

});

module.exports = askAudioScene