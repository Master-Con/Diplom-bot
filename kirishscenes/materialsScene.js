const Scene = require('telegraf/scenes/base');
const User = require('../models/User') 

const materialsScene = new Scene(`materialsScene`)

materialsScene.enter(async ctx => {
    const user = ctx.session.user.login;
    const foundUser = await User.findOne({ login: user })

    if (foundUser) {
        if (foundUser.isAdmin || foundUser.role === `Teacher` || foundUser.role === `Manager` || foundUser.role === `Operator`) {
            ctx.reply(`🤖Botga ma'lumot yuklamoqchimisiz yoki ma'lumot qidirmoqchimisiz?`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: `📥Yuklash`, callback_data: `addResource_uz`}, { text: `🔎Qidirish`, callback_data: `searchResource_uz`}],
                        [{ text: '🔚chiqish', callback_data: 'stop_addResource_uz' }]
                    ]
                }
            });
        } else if (foundUser.role === `Student`) {
            ctx.scene.enter(`findAudioScene`)
        }
    } else {
        ctx.reply(`❗️Iltimos, avval tizimga kiring.`)
    }  
})

materialsScene.action(`addResource_uz`, async ctx => {
    await ctx.deleteMessage()
    return ctx.scene.enter(`askAudioScene`)
})

materialsScene.action('stop_addResource_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.leave();
});

materialsScene.action('searchResource_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter(`findAudioScene`);
});


module.exports = materialsScene