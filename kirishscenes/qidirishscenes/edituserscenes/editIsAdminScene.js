const User = require('../../../models/User');
const Scene = require('telegraf/scenes/base')

const editIsAdminScene = new Scene('editIsAdminScene')

editIsAdminScene.enter(ctx => {
    ctx.reply('🔰Tanlang Admin yoki odiy user', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '⚜️Admin', callback_data: 'editIsAdminScene_admin' }, { text: '👤user', callback_data: 'editIsAdminScene_user' }],
                [{ text: '🔙orqaga', callback_data: 'back_editIsAdminScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editIsAdminScene_uz' }]
            ]
        }
    });
});

editIsAdminScene.action('editIsAdminScene_admin', async ctx => {
    ctx.session.isAdmin = 'true';
    const userIndex = ctx.session.foundUser.index;
    const newIsAdmin = ctx.session.isAdmin
    const user = await User.findOneAndUpdate({ index: userIndex },{isAdmin: newIsAdmin, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply('⚜️Admin etib tayinlandi');
    return ctx.scene.enter('editUserScene');
});

editIsAdminScene.action('editIsAdminScene_user', async ctx => {
    ctx.session.isAdmin = 'false';
    const userIndex = ctx.session.foundUser.index;
    const newIsAdmin = ctx.session.isAdmin
    const user = await User.findOneAndUpdate({ index: userIndex },{isAdmin: newIsAdmin, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`👤oddiy foydalanuvchi etib tayinlandi`);
    return ctx.scene.enter('editUserScene');
});

editIsAdminScene.action('back_editIsAdminScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene');
});

editIsAdminScene.action('stop_editIsAdminScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editIsAdminScene

