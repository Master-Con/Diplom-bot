const Scene = require('telegraf/scenes/base')

const isAdminAddScene = new Scene('isAdminAddScene')

isAdminAddScene.enter(ctx => {
    ctx.reply('Tanlang Admin yoki odiy foydalanuvchi', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Admin', callback_data: 'role_admin' }, { text: 'user', callback_data: 'role_user' }],
                [{ text: 'orqaga', callback_data: 'back_isAdminAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
            ]
        }
    });
});

isAdminAddScene.action('role_admin', async ctx => {
    ctx.session.isAdmin = 'true';
    await ctx.deleteMessage();
    await ctx.reply('Admin etib tayinlandi');
    return ctx.scene.enter('allFaylScene');
});

isAdminAddScene.action('role_user', async ctx => {
    ctx.session.isAdmin = 'false';
    await ctx.deleteMessage();
    await ctx.reply(`oddiy foydalanuvchi etib tayinlandi`);
    return ctx.scene.enter('allFaylScene');
});

isAdminAddScene.action('back_isAdminAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('roleAddScene');
});

isAdminAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = isAdminAddScene

