const User = require('../models/User')
const Scene = require('telegraf/scenes/base')

const passwordScene = new Scene('passwordScene')

passwordScene.enter(ctx => ctx.reply('🔑Parolni kiriting:'))

const adminKeyboard = {
    keyboard: [
        [{ text: `🪪Shaxsiy ma'lumot` }, { text: `📥Foydalanuvchi qo'shish` }],
        [{ text: `👥Foydalanuvchilar` }, { text: `🚪🔚Shaxsiy hisobdan chiqish` }]
    ],
    resize_keyboard: true
};

const teacherKeyboard = {
    keyboard: [
        [{ text: '🔎Foydalanuvchi qidirish' }, { text: `🪪Shaxsiy ma'lumot` }],
        [{ text: `📖O'quv materiallari` }, { text: `🚪🔚Shaxsiy hisobdan chiqish` }]
    ],
    resize_keyboard: true
};

const pupilKeyboard = {
    keyboard: [
        [{ text: `🪪Shaxsiy ma'lumot` }, { text: `💵To'lovlar` }],
        [{ text: '📊Reyting' }, { text: '🗓Davomat' }],
        [{ text: `📖O'quv materiallari` }, { text: `🚪🔚Shaxsiy hisobdan chiqish` }]
    ],
    resize_keyboard: true
};

const defaultKeyboard = {
    keyboard: [
        [{ text: `Shaxsiy ma'lumot` }, { text: 'Button 2' }],
        [{ text: 'Button 3' }, { text: 'Button 4' }]
    ],
    resize_keyboard: true
};

passwordScene.on('text', async ctx => {
    const login = ctx.session.login;
    const password = ctx.message.text;

    const foundUser = await User.findOne({ login, password });

    if (foundUser) {
        ctx.session.user = foundUser;
        const keyboard = foundUser.isAdmin ? adminKeyboard :
        (foundUser.role === `Teacher` || foundUser.role === `Manager` || foundUser.role === `Operator`) ? teacherKeyboard :
        (foundUser.role === `Student`) ? pupilKeyboard : defaultKeyboard;
        ctx.reply(`😊Shaxsiy hisobingizga xush kelibsiz, ${foundUser.name}!`, {
            reply_markup: keyboard
        });
        ctx.scene.leave();
    } else {
        ctx.reply(`❌Noto'g'ri login yoki parol. Qayta urinib ko'ring.`);
        return ctx.scene.enter('loginScene');
    }
})



module.exports = passwordScene