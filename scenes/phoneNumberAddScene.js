const Scene = require('telegraf/scenes/base')

const phoneNumberAddScene = new Scene('phoneNumberAddScene')

phoneNumberAddScene.enter(ctx => ctx.reply('Telefon raqamni kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'orqaga', callback_data: 'back_phoneNumberAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

phoneNumberAddScene.on('text', async ctx => {
    ctx.session.phoneNumber = ctx.message.text
    await ctx.reply("Telefon raqam saqlab qolindi")
    return ctx.scene.enter('roleAddScene')
})

phoneNumberAddScene.action('back_phoneNumberAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('ageAddScene');
});

phoneNumberAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = phoneNumberAddScene