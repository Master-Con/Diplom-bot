const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editPhoneNumberScene = new Scene('editPhoneNumberScene')

editPhoneNumberScene.enter(ctx => ctx.reply('☎️Yangi telefon raqamni kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editPhoneNumberScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editPhoneNumberScene_uz' }]
        ]
    }
}))

editPhoneNumberScene.on('text', async ctx => {
    ctx.session.phoneNumber = ctx.message.text
    const phoneNumber = ctx.session.phoneNumber
    await ctx.reply(`☎️Telefon nomeri: ${phoneNumber}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `🔙orqaga`, callback_data: `back_editPhoneNumberScene_uz`}, { text: `🔚chiqish`, callback_data: `stop_editPhoneNumberScene_uz`}],
                [{ text: `📥saqlash`, callback_data: `save_edit_uz`}]
            ]
        }
    })
})

editPhoneNumberScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userIndex = ctx.session.foundUser.index;
    const newPhoneNumber = ctx.session.phoneNumber;

    const user = await User.findOneAndUpdate({ index: userIndex },{phoneNumber: newPhoneNumber, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`☎️✅Telefon nomer saqlandi: ${newPhoneNumber}`);
    return ctx.scene.enter('editUserScene');
});


editPhoneNumberScene.action('back_editPhoneNumberScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene');
});

editPhoneNumberScene.action('stop_editPhoneNumberScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editPhoneNumberScene