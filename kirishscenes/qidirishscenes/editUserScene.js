const Scene = require('telegraf/scenes/base');
const User = require('../../models/User');

const editUserScene = new Scene('editUserScene');

editUserScene.enter(async (ctx) => {
    const user = ctx.session.user;
    const foundoldUser = ctx.session.foundUser;
    const foundUser = await User.findOne({ index: foundoldUser.index });
    if (!user) {
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

editUserScene.action('editlogin_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editLoginScene');
});

editUserScene.action('editpassword_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editPasswordScene');
});

editUserScene.action('editindex_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editIndexScene');
});

editUserScene.action('editname_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editNameScene');
});

editUserScene.action('editage_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editAgeScene');
});

editUserScene.action('editphoneNumber_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editPhoneNumberScene');
});

editUserScene.action('editrole_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editRoleScene');
});

editUserScene.action('editisAdmin_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editIsAdminScene');
});

editUserScene.action('back_editUserScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('indexFindScene');
});

editUserScene.leave()

module.exports = editUserScene;

