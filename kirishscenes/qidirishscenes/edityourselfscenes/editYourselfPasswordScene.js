const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editYourselfPasswordScene = new Scene('editYourselfPasswordScene')

editYourselfPasswordScene.enter(ctx => ctx.reply('🔑Yangi parol yarating:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editPasswordScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editPasswordScene_uz' }]
        ]
    }
}))

editYourselfPasswordScene.on('text', async ctx => {
    ctx.session.password = ctx.message.text
    const parol = ctx.session.password
    await ctx.reply(`🔑Parol: ${parol}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `🔙orqaga`, callback_data: `back_editPasswordScene_uz`}, { text: `🔚chiqish`, callback_data: `logOut_editPasswordScene_uz`}],
                [{ text: `📥saqlash`, callback_data: `save_edit_uz`}]
            ]
        }
    })
})

editYourselfPasswordScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userLogin = ctx.session.user.login;
    const newParol = ctx.session.password;

    const user = await User.findOneAndUpdate({ login: userLogin },{password: newParol, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`🔑✅Parol saqlandi: ${newParol}`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfPasswordScene.action('back_editPasswordScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfScene');
});

editYourselfPasswordScene.action('stop_editPasswordScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});


module.exports = editYourselfPasswordScene