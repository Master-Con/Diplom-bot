const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base');
const editUserScene = require('../editUserScene');

const editYourselfLoginScene = new Scene('editYourselfLoginScene')

editYourselfLoginScene.enter(ctx => ctx.reply('🔒Yangi login kriting!', {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editLoginScene_uz' }, { text: '🔚chiqish', callback_data: 'logOut_editLoginScene_uz' }]
        ]
    }
}))

editYourselfLoginScene.on('text', async ctx => {
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

editYourselfLoginScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage()
    const userLogin = ctx.session.user.login;
    const newLogin = ctx.session.login;

    const user = await User.findOneAndUpdate({ login: userLogin },{login: newLogin, modifiedBy: ctx.session.user.name, dateModified: new Date()});


    delete ctx.session.user
    await ctx.reply(`🔒✅Login saqlandi: ${newLogin}`, {
        reply_markup: {
            remove_keyboard: true
        }
    });
    return ctx.scene.leave();
});

editYourselfLoginScene.action('back_editLoginScene_uz', async ctx => {
    await ctx.deleteMessage()
    return ctx.scene.enter('editYourselfScene')
})

editYourselfLoginScene.action('logOut_editLoginScene_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
})


module.exports = editYourselfLoginScene