const User = require('../models/User')
const Scene = require('telegraf/scenes/base')

const allFaylScene = new Scene('allFaylScene')

allFaylScene.enter(ctx => ctx.reply(`Login: ${ctx.session.login}\nParol: ${ctx.session.password}\nID: ${ctx.session.index}\nI.F.SH: ${ctx.session.name}\nYoshi: ${ctx.session.age}\nTelefon nomeri: ${ctx.session.phoneNumber}\nVazifasi: ${ctx.session.role}\nAdmin: ${ctx.session.isAdmin}`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: `O'zgartirish`, callback_data: 'change' }, { text: 'Saqlash', callback_data: 'save' }],
            [{ text: 'orqaga', callback_data: 'back_allFayl_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

allFaylScene.action('back_allFayl_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('isAdminAddScene');
});

allFaylScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

allFaylScene.action('change', ctx => ctx.scene.enter('loginScene'));
allFaylScene.action('save', async (ctx) => {
    ctx.deleteMessage()
    try {
        const newUser = new User({
            login: ctx.session.login,
            password: ctx.session.password,
            index: ctx.session.index,
            name: ctx.session.name,
            age: ctx.session.age,
            phoneNumber: ctx.session.phoneNumber,
            role: ctx.session.role,
            isAdmin: ctx.session.isAdmin,
            // createdBy: ctx.session.user.name
        });
        await newUser.save();
        await ctx.reply("Ma'lumotlar muvaffaqiyatli saqlandi")
    } catch (error) {
        console.error('Ошибка при сохранении данных в базе данных:', error);
        ctx.reply('Saqlanishda hatolik yuzberdi');
        return ctx.scene.leave()
    }
})

allFaylScene.leave(ctx => ctx.reply("Operatsiya yakunlandi"))

module.exports = allFaylScene
