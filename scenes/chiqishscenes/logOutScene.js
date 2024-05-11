const User = require('../../models/User')
const Scene = require('telegraf/scenes/base')

const logOutScene = new Scene('logOutScene')

logOutScene.enter(ctx => ctx.reply('Siz rostan ham chiqmoqchimisiz?', {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Ha', callback_data: 'confirm_exit_uz' }, { text: 'Yo‘q', callback_data: 'cancel_exit_uz' }]
        ]
    }
}));

logOutScene.action('confirm_exit_uz', async ctx => {
    await ctx.deleteMessage()

    delete ctx.session.user
    await ctx.reply('Chiqish muvaffaqiyatli bajarildi', {
        reply_markup: {
            remove_keyboard: true
        }
    });

    return ctx.scene.leave();
});

logOutScene.action('cancel_exit_uz', async ctx => {
    await ctx.deleteMessage(); // Удаляем сообщение, в котором была нажата кнопка
    await ctx.reply('Chiqish bekor qilindi');
    return ctx.scene.leave(); // Покидаем сцену подтверждения выхода
});

module.exports = logOutScene