const Scene = require('telegraf/scenes/base');
const Lesson = require('../models/Lesson');
const User = require('../models/User') 

const findAudioScene = new Scene(`findAudioScene`)

findAudioScene.enter(async (ctx) => {
    ctx.reply('🎵Audio nomini kiriting:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙Orqaga', callback_data: 'back_findAudioScene_uz' }]
            ]
        }
    });
});

findAudioScene.on('text', async (ctx) => {
    ctx.session.findtitle = ctx.message.text;
    const title = ctx.session.findtitle
    const user = ctx.session.user
    const foundUser = await User.findOne({ login: user.login})

    const lesson = await Lesson.findOne({ title }).exec();
    
    if (lesson) {
        if (foundUser.isAdmin || foundUser.role === `Teacher` || foundUser.role === `Manager` || foundUser.role === `Operator`) {
            ctx.telegram.sendAudio(ctx.chat.id, lesson.fileUrl, {
                caption: lesson.title,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '🔙Orqaga', callback_data: 'back_findAudioScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_findAudioScene_uz' }],
                        [{ text: `➖O'chirish`, callback_data: 'deleteAudioScene_uz' }]
                    ]
                }
            })
        } else if (foundUser.role === `Student`) {
            ctx.telegram.sendAudio(ctx.chat.id, lesson.fileUrl, {
                caption: lesson.title,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '🔙Orqaga', callback_data: 'back_findAudioScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_findAudioScene_uz' }]
                    ]
                }
            })
        }
    } else {
        ctx.reply('⁉️Ma\'lumot topilmadi', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔚chiqish', callback_data: 'stop_findAudioScene_uz' }]
                ]
            }
        });
    }
});

findAudioScene.action('stop_findAudioScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.leave();
});

findAudioScene.action('back_findAudioScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.leave();
});

findAudioScene.action('deleteAudioScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply('⁉️Haqiqatdan ham bu ma\'lumotni o\'chirmoqchimisiz?', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Ha✅', callback_data: `confirmDeleteLesson_uz` }, { text: 'Yo\'q❌', callback_data: 'cancelDeleteLesson_uz' }]
            ]
        }
    });
});

findAudioScene.action('cancelDeleteLesson_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`❎O\'chirish bekor qilindi`)
    return ctx.scene.enter(`materialsScene`);
});

findAudioScene.action('confirmDeleteLesson_uz', async ctx => {
    await ctx.deleteMessage();
    const title = ctx.session.findtitle

    const lesson = await Lesson.findOneAndDelete({ title }).exec();
    await ctx.reply(`✅Ma\'lumot o\'chirildi`)
    return ctx.scene.enter(`materialsScene`);
});

module.exports = findAudioScene