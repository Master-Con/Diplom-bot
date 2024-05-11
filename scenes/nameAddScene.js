const Scene = require('telegraf/scenes/base')

const nameAddScene = new Scene('nameAddScene')

nameAddScene.enter(ctx => ctx.reply('Toliq Ism Falimilyani kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'orqaga', callback_data: 'back_nameAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

nameAddScene.on('text', async ctx => {
    ctx.session.name = ctx.message.text
    await ctx.reply("Ism Familiya saqlab qolindi")
    return ctx.scene.enter('ageAddScene')
})

nameAddScene.action('back_nameAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('indexAddScene');
});

nameAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});


module.exports = nameAddScene