const Scene = require('telegraf/scenes/base')

const passwordAddScene = new Scene('passwordAddScene')

passwordAddScene.enter(ctx => ctx.reply('Yangi parol yarating:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'orqaga', callback_data: 'back_passwordAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

passwordAddScene.on('text', async ctx => {
    ctx.session.password = ctx.message.text
    await ctx.reply("Parolingiz saqlab qolindi")
    return ctx.scene.enter('indexAddScene')
})

passwordAddScene.action('back_passwordAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('loginAddScene');
});

passwordAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});


module.exports = passwordAddScene