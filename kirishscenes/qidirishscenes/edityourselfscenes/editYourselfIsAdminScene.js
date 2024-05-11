const User = require('../../../models/User');
const Scene = require('telegraf/scenes/base')

const editYourselfIsAdminScene = new Scene('editYourselfIsAdminScene')

editYourselfIsAdminScene.enter(ctx => {
    ctx.reply('🔰Tanlang Admin yoki odiy user', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '⚜️Admin', callback_data: 'editIsAdminScene_admin' }, { text: '👤user', callback_data: 'editIsAdminScene_user' }],
                [{ text: '🔙orqaga', callback_data: 'back_editIsAdminScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editIsAdminScene_uz' }]
            ]
        }
    });
});

editYourselfIsAdminScene.action('editIsAdminScene_admin', async ctx => {
    ctx.session.isAdmin = 'true';
    const userLogin = ctx.session.user.login;
    const newIsAdmin = ctx.session.isAdmin
    const user = await User.findOneAndUpdate({ login: userLogin },{isAdmin: newIsAdmin, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply('⚜️Admin etib tayinlandi');
    return ctx.scene.enter('editYourselfScene');
});

editYourselfIsAdminScene.action('editIsAdminScene_user', async ctx => {
    ctx.session.isAdmin = 'false';
    const userLogin = ctx.session.user.login;
    const newIsAdmin = ctx.session.isAdmin
    const user = await User.findOneAndUpdate({ login: userLogin },{isAdmin: newIsAdmin, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`👤oddiy foydalanuvchi etib tayinlandi`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfIsAdminScene.action('back_editIsAdminScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfScene');
});

editYourselfIsAdminScene.action('stop_editIsAdminScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editYourselfIsAdminScene

