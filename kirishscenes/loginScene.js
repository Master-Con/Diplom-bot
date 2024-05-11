const Scene = require('telegraf/scenes/base')

const loginScene = new Scene('loginScene')

loginScene.enter(ctx => ctx.reply('🔒Loginni kiriting:'))

loginScene.on('text', async ctx => {
    ctx.session.login = ctx.message.text;
    return ctx.scene.enter('passwordScene');
});

module.exports = loginScene