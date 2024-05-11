const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');

const showTulovScene = new Scene('showTulovScene')

showTulovScene.enter(async ctx => {
    const user1 = ctx.session.user.login
    const user = await User.findOne({ login: user1 })

    if (!user || !user.notes || user.notes.length === 0) {
        return ctx.reply(`📌Siz oy uchun hali to‘lov qilmagansiz`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔚Chiqish', callback_data: 'back_showTulovScene_uz' }, { text: '🔴Xatolik', callback_data: 'XatolikScene_uz' }],
                    [{ text: `💸To'lov qilish`, callback_data: `payload_uz`}]
                ]
            }
        });
    }

    let notesText = '';
    user.notes.forEach((note, index) => {
        notesText += `💵To'lov ${index + 1}:\n${note.text}\n📆Kritilgan sana: ${note.dateCreated}\n\n`;
    });

    return ctx.reply(notesText, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔚Chiqish', callback_data: 'back_showTulovScene_uz' }, { text: '🔴Xatolik', callback_data: 'XatolikScene_uz' }],
                [{ text: `💸To'lov qilish`, callback_data: `payload_uz`}]
            ]
        }
    });
})

showTulovScene.action(`payload_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`payLoadScene`)
})

showTulovScene.action(`back_showTulovScene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.leave()
})

showTulovScene.action(`XatolikScene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`payreloadScene`)
})

module.exports = showTulovScene