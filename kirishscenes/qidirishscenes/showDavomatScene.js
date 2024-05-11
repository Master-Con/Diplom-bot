const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');

const showDavomatScene = new Scene('showDavomatScene')

showDavomatScene.enter(async ctx => {
    const user1 = ctx.session.user
    const user = await User.findOne({ login: user1.login })

    if (!user || !user.notes1 || user.notes1.length === 0) {
        return ctx.reply(`📌Hali biron marta dars qoldirmagan siz`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔚Chiqish', callback_data: 'back_showDavomatScene_uz' }, { text: '🔴Xatolik', callback_data: 'XatolikScene_uz' }]
                ]
            }
        });
    }

    let notes1Text = '';
    user.notes1.forEach((note1, index) => {
        notes1Text += `🗓Davomat ${index + 1}:\n${note1.text}\n👤Kim tomonidan kiritilgan: ${note1.createdBy}\n📆Kritilgan sana: ${note1.dateCreated}\n\n`;
    });

    return ctx.reply(notes1Text, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔚Chiqish', callback_data: 'back_showDavomatScene_uz' }, { text: '🔴Xatolik', callback_data: 'XatolikScene_uz' }]
            ]
        }
    });
})

showDavomatScene.action(`back_showDavomatScene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.leave()
})

showDavomatScene.action(`XatolikScene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`payreloadScene`)
})

module.exports = showDavomatScene