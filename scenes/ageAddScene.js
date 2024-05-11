const Scene = require('telegraf/scenes/base')

const ageAddScene = new Scene('ageAddScene')

ageAddScene.enter(ctx => ctx.reply(`🗓Tug'ilgan yilini kiriting:`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'orqaga', callback_data: 'back_ageAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

ageAddScene.on('text', async ctx => {
    ctx.session.age = ctx.message.text
    await ctx.reply("Yosh saqlab qolindi")
    return ctx.scene.enter('phoneNumberAddScene')
})

ageAddScene.action('back_ageAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('nameAddScene');
});

ageAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = ageAddScene