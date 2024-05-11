const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editYourselfRoleScene = new Scene('editYourselfRoleScene')

editYourselfRoleScene.enter(ctx => ctx.reply(`🧩Vazifasini tanlang:`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: `O'quvchi`, callback_data: 'pupil_editRoleScene_uz' }, { text: `O'qituvchi`, callback_data: 'teacher_editRoleScene_uz' }],
            [{ text: `Manager`, callback_data: 'manager_editRoleScene_uz' }, { text: `Operator`, callback_data: 'operator_editRoleScene_uz' }],
            [{ text: '🔙orqaga', callback_data: 'back_editRoleScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editRoleScene_uz' }]
        ]
    }
}))

editYourselfRoleScene.action('pupil_editRoleScene_uz', async ctx => {
    ctx.session.role = `Student`;
    const userLogin = ctx.session.user.login;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ login: userLogin },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`O'quvchi etib tayinlandi`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfRoleScene.action('teacher_editRoleScene_uz', async ctx => {
    ctx.session.role = `Teacher`;
    const userLogin = ctx.session.user.login;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ login: userLogin },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`O'qituvchi etib tayinlandi`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfRoleScene.action('manager_editRoleScene_uz', async ctx => {
    ctx.session.role = `Manager`;
    const userLogin = ctx.session.user.login;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ login: userLogin },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`Manager etib tayinlandi`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfRoleScene.action('operator_editRoleScene_uz', async ctx => {
    ctx.session.role = `Operator`;
    const userLogin = ctx.session.user.login;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ login: userLogin },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`Operator etib tayinlandi`);
    return ctx.scene.enter('editYourselfScene');
});

editYourselfRoleScene.action('back_editRoleScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editYourselfScene');
});

editYourselfRoleScene.action('stop_editRoleScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editYourselfRoleScene