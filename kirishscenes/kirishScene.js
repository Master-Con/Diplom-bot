const User = require('../models/User')
const Scene = require('telegraf/scenes/base');

const kirishScene = new Scene(`kirishScene`)

kirishScene.enter(async ctx => {
    ctx.reply(`Shaxsiy hisobingizga kiring yoki ro'yxatdan o'ting`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Kirish', callback_data: `log_in_uz` }, { text: `Ro'yxatdan o'tish`, callback_data: `sign_in_uz` }],
            ],
        }
    })
})

kirishScene.action('log_in_uz', async ctx => {
    await ctx.deleteMessage()
    ctx.scene.enter('loginScene')
})

kirishScene.action(`sign_in_uz`, (ctx) => {
    ctx.reply(`Ro‘yxatdan o‘tish uchun avvalo siz bizga telefon raqamingizni yuborishingiz kerak. Pastdagi "Telefon raqamini yuborish" tugmasini bosing va bizga telefon raqamingizni yuboring.`, {
        reply_markup: {
            keyboard: [
                [{ text: 'Telefon raqamini yuborish', request_contact: true }]
            ],
            resize_keyboard: true
        }
    });
})

module.exports = kirishScene
