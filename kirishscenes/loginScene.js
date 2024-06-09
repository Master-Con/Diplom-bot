const Scene = require('telegraf/scenes/base')

const loginScene = new Scene('loginScene')

loginScene.enter(ctx => ctx.reply('🔒Loginni kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: `🔙Orqaga`, callback_data: `back_loginScene_uz`}]
        ]
    }
}))

loginScene.on('text', async ctx => {
    ctx.session.login = ctx.message.text;
    return ctx.scene.enter('passwordScene');
});

loginScene.action(`back_loginScene_uz`, async ctx => {
    await ctx.deleteMessage();
    ctx.scene.leave()
})
module.exports = loginScene
