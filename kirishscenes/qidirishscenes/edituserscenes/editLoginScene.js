const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base');
const editUserScene = require('../editUserScene');

const editLoginScene = new Scene('editLoginScene')

editLoginScene.enter(ctx => ctx.reply('🔒Yangi login kriting!', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editLoginScene_uz' }, { text: '🔚chiqish', callback_data: 'logOut_editLoginScene_uz' }]
        ]
    }
}))

editLoginScene.on('text', async ctx => {
    const login = ctx.message.text;
    const existingUser = await User.findOne({ login });

    if (existingUser) {
        ctx.reply('❗️Bu login allaqachon mavjud. Iltimos, boshqa login yarating:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `🔙orqaga`, callback_data: `back_editLoginScene_uz`}, { text: '🔚chiqish', callback_data: 'logOut_editLoginScene_uz' }]
                ]
            }
        });
    }

    ctx.session.login = login;
    await ctx.reply(`🔒Login: ${ctx.session.login}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `🔙orqaga`, callback_data: `back_editLoginScene_uz`}, { text: `🔚chiqish`, callback_data: `logOut_editLoginScene_uz`}],
                [{ text: `📥saqlash`, callback_data: `save_edit_uz`}]
            ]
        }
    });
});

editLoginScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userIndex = ctx.session.foundUser.index;
    const newLogin = ctx.session.login;

    const user = await User.findOneAndUpdate({ index: userIndex },{login: newLogin, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`🔒✅Login saqlandi: ${newLogin}`);
    return ctx.scene.enter('editUserScene');
});

editLoginScene.action('back_editLoginScene_uz', async ctx => {
    await ctx.deleteMessage()
    return ctx.scene.enter('editUserScene')
})

editLoginScene.action('logOut_editLoginScene_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
})


module.exports = editLoginScene