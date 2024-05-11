const Scene = require('telegraf/scenes/base');
const Lesson = require('../models/Lesson');


const askNameScene = new Scene('askNameScene');

askNameScene.enter(async (ctx) => {
    ctx.reply('🎵Audio nomini kiriting:');
});

askNameScene.on('text', async (ctx) => {
    ctx.session.title = ctx.message.text; 
    const title = ctx.session.title;
    const file = ctx.session.audioFile;

    ctx.telegram.sendAudio(ctx.chat.id, file.file_id, {
        caption: title,
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙Orqaga', callback_data: 'back_addResourceScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_addResourceScene_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveResource' }]
            ]
        }
    });
});

askNameScene.action(`saveResource`, async ctx => {
    await ctx.deleteMessage()
    const title = ctx.session.title
    const file = ctx.session.audioFile;

    const lessonExists = await Lesson.findOne({ title }).exec();
    if (lessonExists) {
        ctx.telegram.sendAudio(ctx.chat.id, file.file_id, { caption: `${title} Bu ma'lumot allaqachon mavjud.` });
        ctx.scene.enter(`materialsScene`);
        return;
    }

    const newLesson = new Lesson({ title, fileUrl: file.file_id });
    await newLesson.save();
    await ctx.reply(`muvaffaqiyatli saqlandi.`);
    
    ctx.scene.enter(`materialsScene`);
})

askNameScene.action('back_addResourceScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter(`askAudioScene`);
});

askNameScene.action('stop_addNote1Scene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter(`materialsScene`);
});

module.exports = askNameScene
