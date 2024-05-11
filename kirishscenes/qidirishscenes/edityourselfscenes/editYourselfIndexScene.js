const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editYourselfIndexScene = new Scene('editYourselfIndexScene')

editYourselfIndexScene.enter(ctx => ctx.reply('🪪IDni kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editIndexScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editIndexScene_uz' }]
        ]
    }
}))

editYourselfIndexScene.on('text', async ctx => {
    const index = ctx.message.text;
    const existingUser = await User.findOne({ index });

    if (!existingUser) {
        ctx.session.index = index;
        await ctx.reply(`🪪ID: ${index}`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `🔙orqaga`, callback_data: `back_editIndexScene_uz`}, { text: `🔚chiqish`, callback_data: `stop_editIndexScene_uz`}],
                    [{ text: `📥saqlash`, callback_data: `save_edit_uz`}]
                ]
            }
        })      
    } else {
        ctx.reply('❗️Bu ID allaqachon mavjud. Iltimos, boshqa ID yarating:');
    }
});

editYourselfIndexScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userLogin = ctx.session.user.login;
    const newIndex = ctx.session.index;

    const user = await User.findOneAndUpdate({ login: userLogin },{index: newIndex, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`🪪✅ID saqlandi: ${newIndex}`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfIndexScene.action('back_editIndexScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfScene');
});

editYourselfIndexScene.action('stop_editIndexScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editYourselfIndexScene