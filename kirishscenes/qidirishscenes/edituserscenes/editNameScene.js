const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editNameScene = new Scene('editNameScene')

editNameScene.enter(ctx => ctx.reply('🪪Toliq Ism Falimilyani kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editNameScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editNameScene_uz' }]
        ]
    }
}))

editNameScene.on('text', async ctx => {
    ctx.session.name = ctx.message.text
    const name = ctx.session.name
    await ctx.reply(`🪪I.F.SH: ${name}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `🔙orqaga`, callback_data: `back_editNameScene_uz`}, { text: `🔚chiqish`, callback_data: `stop_editNameScene_uz`}],
                [{ text: `📥saqlash`, callback_data: `save_edit_uz`}]
            ]
        }
    })
})

editNameScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userIndex = ctx.session.foundUser.index;
    const newName = ctx.session.name;

    const user = await User.findOneAndUpdate({ index: userIndex },{name: newName, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`🪪✅I.F.SH saqlandi: ${newName}`);
    return ctx.scene.enter('editUserScene');
});


editNameScene.action('back_editNameScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene');
});

editNameScene.action('stop_editNameScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});


module.exports = editNameScene