const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editIndexScene = new Scene('editIndexScene')

editIndexScene.enter(ctx => ctx.reply('🪪IDni kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editIndexScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editIndexScene_uz' }]
        ]
    }
}))

editIndexScene.on('text', async ctx => {
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

editIndexScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userIndex = ctx.session.foundUser.index;
    const newIndex = ctx.session.index;

    const user = await User.findOneAndUpdate({ index: userIndex },{index: newIndex, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`🪪✅ID saqlandi: ${newIndex}`);
    return ctx.scene.enter('editUserScene');
});

editIndexScene.action('back_editIndexScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene');
});

editIndexScene.action('stop_editIndexScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editIndexScene