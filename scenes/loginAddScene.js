const User = require('../models/User')
const Scene = require('telegraf/scenes/base')

const loginAddScene = new Scene('loginAddScene')

loginAddScene.enter(ctx => ctx.reply('Login yarating:'))

loginAddScene.on('text', async ctx => {
    const login = ctx.message.text;
    const existingUser = await User.findOne({ login });

    if (existingUser) {
        ctx.reply('Bu login allaqachon mavjud. Iltimos, boshqa login yarating:');
        return;
    }

    ctx.session.login = login;
    await ctx.reply("Login saqlab qolindi");
    return ctx.scene.enter('passwordAddScene');
});

module.exports = loginAddScene