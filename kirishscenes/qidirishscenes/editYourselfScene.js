const Scene = require('telegraf/scenes/base');
const User = require('../../models/User');

const editYourselfScene = new Scene('editYourselfScene');

editYourselfScene.enter(async (ctx) => {
    const userLogin = ctx.session.user.login;
    const foundUser = await User.findOne({ login: userLogin });
    if (!foundUser) {
        ctx.reply('Пожалуйста, войдите в свой аккаунт сначала.');
        return ctx.scene.leave();
    }

    ctx.reply(`Kategoriyadan birini o'zgartirish uchun tanlang:\n1. 🔒Login: ${foundUser.login}\n2. 🔑Parol: ${foundUser.password}\n3. 🪪ID: ${foundUser.index}\n4. 🪪I.F.SH: ${foundUser.name}\n5. 🗓Tug'ilgan yili: ${foundUser.age}\n6. ☎️Telefon nomeri: ${foundUser.phoneNumber}\n7. 💼Vazifasi: ${foundUser.role}\n8. 🔰Admin: ${foundUser.isAdmin}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `1`, callback_data: `editlogin_uz`}, { text: `2`, callback_data: `editpassword_uz`}, { text: `3`, callback_data: `editindex_uz`}, { text: `4`, callback_data: `editname_uz`}],
                [{ text: `5`, callback_data: `editage_uz`}, { text: `6`, callback_data: `editphoneNumber_uz`}, { text: `7`, callback_data: `editrole_uz`}, { text: `8`, callback_data: `editisAdmin_uz`}],
                [{ text: `orqaga`, callback_data: `back_editUserScene_uz`}]
            ]
        }
    });
});

editYourselfScene.action('editlogin_uz', async ctx => {
    await ctx.deleteMessage();
    ctx.reply(`📢❗️DIQQAT: agar siz loginingizni o'zgartirsangiz, shaxsiy hisobingizga qayta kirishingiz kerak bo'ladi`)
    return ctx.scene.enter('editYourselfLoginScene');
});

editYourselfScene.action('editpassword_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfPasswordScene');
});

editYourselfScene.action('editindex_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfIndexScene');
});

editYourselfScene.action('editname_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfNameScene');
});

editYourselfScene.action('editage_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfAgeScene');
});

editYourselfScene.action('editphoneNumber_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfPhoneNumberScene');
});

editYourselfScene.action('editrole_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfRoleScene');
});

editYourselfScene.action('editisAdmin_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfIsAdminScene');
});

editYourselfScene.action('back_editUserScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('ShaxsiymalumotScene');
});

editYourselfScene.leave()

module.exports = editYourselfScene;