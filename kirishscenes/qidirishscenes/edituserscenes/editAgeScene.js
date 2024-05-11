const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editAgeScene = new Scene('editAgeScene')

editAgeScene.enter(ctx => ctx.reply(`🗓Tug'ilgan "yil/oy/kuni"ni kiriting:`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editAgeScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editAgeScene_uz' }]
        ]
    }
}))

editAgeScene.on('text', async ctx => {
    ctx.session.age = ctx.message.text
    const age = ctx.session.age
    await ctx.reply(`🗓Tug'ilgan yili: ${age}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `🔙orqaga`, callback_data: `back_editAgeScene_uz`}, { text: `🔚chiqish`, callback_data: `stop_editAgeScene_uz`}],
                [{ text: `📥saqlash`, callback_data: `save_edit_uz`}]
            ]
        }
    })
})

editAgeScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userIndex = ctx.session.foundUser.index;
    const newAge = ctx.session.age;

    const user = await User.findOneAndUpdate({ index: userIndex },{age: newAge, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`📆✅Tug'ilgan yili saqlandi: ${newAge}`);
    return ctx.scene.enter('editUserScene');
});


editAgeScene.action('back_editAgeScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene');
});

editAgeScene.action('stop_editAgeScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editAgeScene