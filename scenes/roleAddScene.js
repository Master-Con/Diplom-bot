const Scene = require('telegraf/scenes/base')

const roleAddScene = new Scene('roleAddScene')

roleAddScene.enter(ctx => ctx.reply(`Vazifasini tanlang:`, {
    reply_markup: {
        inline_keyboard: [
            [{ text: `O'quvchi`, callback_data: 'pupil_roleAdd_uz' }, { text: `O'qituvchi`, callback_data: 'teacher_addUser_uz' }],
            [{ text: `Manager`, callback_data: 'manager_roleAdd_uz' }, { text: `Operator`, callback_data: 'operator_addUser_uz' }],
            [{ text: 'orqaga', callback_data: 'back_roleAdd_uz' }, { text: 'chiqish', callback_data: 'stop_addUser_uz' }]
        ]
    }
}))

roleAddScene.on('text', async ctx => {
    ctx.session.role = ctx.message.text
    await ctx.reply("Vazifa saqlab qolindi")
    return ctx.scene.enter('isAdminAddScene')
})

roleAddScene.action('pupil_roleAdd_uz', async ctx => {
    ctx.session.role = `Student`;
    await ctx.deleteMessage();
    await ctx.reply(`O'quvchi etib tayinlandi`);
    return ctx.scene.enter('isAdminAddScene');
});

roleAddScene.action('teacher_addUser_uz', async ctx => {
    ctx.session.role = `Teacher`;
    await ctx.deleteMessage();
    await ctx.reply(`O'qituvchi etib tayinlandi`);
    return ctx.scene.enter('isAdminAddScene');
});

roleAddScene.action('manager_roleAdd_uz', async ctx => {
    ctx.session.role = `Manager`;
    await ctx.deleteMessage();
    await ctx.reply(`Manager etib tayinlandi`);
    return ctx.scene.enter('isAdminAddScene');
});

roleAddScene.action('operator_addUser_uz', async ctx => {
    ctx.session.role = `Operator`;
    await ctx.deleteMessage();
    await ctx.reply(`Operator etib tayinlandi`);
    return ctx.scene.enter('isAdminAddScene');
});

roleAddScene.action('back_roleAdd_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('phoneNumberAddScene');
});

roleAddScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.reply(`Siz foydalanuvchi qo'shish funktsiyasidan chiqtiz`);
    return ctx.scene.leave()
});

module.exports = roleAddScene