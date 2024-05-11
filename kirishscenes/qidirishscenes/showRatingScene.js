const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');

const showRatingScene = new Scene('showRatingScene')

showRatingScene.enter(async ctx => {
    const user1 = ctx.session.user
    const user = await User.findOne({ login: user1.login })

    if (!user || !user.notes2 || user.notes2.length === 0) {
        return ctx.reply(`📌Sizga hali reyting qo'yilmagan`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔚Chiqish', callback_data: 'back_showRatingScene_uz' }, { text: '🔴Xatolik', callback_data: 'XatolikScene_uz' }]
                ]
            }
        });
    }

    let notes2Text = '';
    user.notes2.forEach((note2, index) => {
        notes2Text += `📊Reyting ${index + 1}:\n${note2.text}\n📆Kritilgan sana: ${note2.dateCreated}\n\n`;
    });

    return ctx.reply(notes2Text, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔚Chiqish', callback_data: 'back_showRatingScene_uz' }, { text: '🔴Xatolik', callback_data: 'XatolikScene_uz' }]
            ]
        }
    });
})

showRatingScene.action(`back_showRatingScene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.leave()
})

showRatingScene.action(`XatolikScene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`payreloadScene`)
})

module.exports = showRatingScene