const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const editRoleScene = new Scene('editRoleScene')

editRoleScene.enter(ctx => ctx.reply(`💼Vazifasini tanlang:`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: `O'quvchi`, callback_data: 'pupil_editRoleScene_uz' }, { text: `O'qituvchi`, callback_data: 'teacher_editRoleScene_uz' }],
            [{ text: `Manager`, callback_data: 'manager_editRoleScene_uz' }, { text: `Operator`, callback_data: 'operator_editRoleScene_uz' }],
            [{ text: '🔙orqaga', callback_data: 'back_editRoleScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editRoleScene_uz' }]
        ]
    }
}))

editRoleScene.action('pupil_editRoleScene_uz', async ctx => {
    ctx.session.role = `Student`;
    const userIndex = ctx.session.foundUser.index;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ index: userIndex },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`O'quvchi etib tayinlandi`);
    return ctx.scene.enter('editUserScene');
});

editRoleScene.action('teacher_editRoleScene_uz', async ctx => {
    ctx.session.role = `Teacher`;
    const userIndex = ctx.session.foundUser.index;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ index: userIndex },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`O'qituvchi etib tayinlandi`);
    return ctx.scene.enter('editUserScene');
});

editRoleScene.action('manager_editRoleScene_uz', async ctx => {
    ctx.session.role = `Manager`;
    const userIndex = ctx.session.foundUser.index;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ index: userIndex },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`Manager etib tayinlandi`);
    return ctx.scene.enter('editUserScene');
});

editRoleScene.action('operator_editRoleScene_uz', async ctx => {
    ctx.session.role = `Operator`;
    const userIndex = ctx.session.foundUser.index;
    const newRole = ctx.session.role
    const user = await User.findOneAndUpdate({ index: userIndex },{role: newRole, modifiedBy: ctx.session.user.name, dateModified: new Date()})
    await ctx.deleteMessage();
    await ctx.reply(`Operator etib tayinlandi`);
    return ctx.scene.enter('editUserScene');
});

editRoleScene.action('back_editRoleScene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene');
});

editRoleScene.action('stop_editRoleScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`🔄🔚Siz foydalanuvchini o'zgartirish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = editRoleScene