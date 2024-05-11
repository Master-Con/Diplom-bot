const User = require('../models/User')
const Scene = require('telegraf/scenes/base')

const indexAddScene = new Scene('indexAddScene')

indexAddScene.enter(ctx => ctx.reply('IDni kiriting:', {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'orqaga', callback_data: 'back_indexAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

indexAddScene.on('text', async ctx => {
    const index = ctx.message.text;
    const existingUser = await User.findOne({ index });

    if (!existingUser) {
        ctx.session.index = index;
        await ctx.reply("ID saqlab qolindi")
        return ctx.scene.enter('nameAddScene');        
    } else {
        ctx.reply('Bu ID allaqachon mavjud. Iltimos, boshqa ID yarating:');
    }
});

indexAddScene.action('back_indexAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('passwordAddScene');
});

indexAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = indexAddScene