const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editYourselfAgeScene = new Scene('editYourselfAgeScene')

editYourselfAgeScene.enter(ctx => ctx.reply(`🗓Tug'ilgan "yil/oy/kuni"ni kiriting:`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: '🔙orqaga', callback_data: 'back_editAgeScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editAgeScene_uz' }]
        ]
    }
}))

editYourselfAgeScene.on('text', async ctx => {
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

editYourselfAgeScene.action('save_edit_uz', async ctx => {
    await ctx.deleteMessage();
    const userLogin = ctx.session.user.login;
    const newAge = ctx.session.age;

    const user = await User.findOneAndUpdate({ login: userLogin },{age: newAge, modifiedBy: ctx.session.user.name, dateModified: new Date()});



    await ctx.reply(`📆✅Tug'ilgan yili saqlandi: ${newAge}`);
    return ctx.scene.enter('editYourselfScene');
});


editYourselfAgeScene.action('back_editAgeScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfScene');
});

editYourselfAgeScene.action('stop_editAgeScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editYourselfAgeScene