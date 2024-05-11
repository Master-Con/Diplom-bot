const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const addNote1Scene = new Scene('addNote1Scene');


addNote1Scene.enter((ctx) => ctx.reply(`🗓Davomatni kiriting:`));

addNote1Scene.on('text', async ctx => {
    const foundUser = ctx.session.user
    ctx.session.note1Text = ctx.message.text
    ctx.reply(`${ctx.session.note1Text}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙Orqaga', callback_data: 'back_addNote1Scene_uz' }, { text: '🔚chiqish', callback_data: 'stop_addNote1Scene_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveNote1' }]
            ]
        }
    })
})

addNote1Scene.action('back_addNote1Scene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('notes1Scene');
});

addNote1Scene.action('stop_addNote1Scene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('indexSearchScene');
});

addNote1Scene.action('saveNote1', async (ctx) => {
    await ctx.deleteMessage()
    const text = ctx.session.note1Text; // Текст заметки, сохраненный в сессии
    const foundUser1 = ctx.session.foundUser;
    const foundUser = ctx.session.user
    // // Находим пользователя в базе данных по имени
    const user = await User.findOne({ index: foundUser1.index });
    if (!user) {
        ctx.reply('🤷🏻Foydalanuvchi topilmadi.');
        return;
    }

    // Добавляем новую заметку в массив notes
    user.notes1.push({ text, createdBy: foundUser.name });

    // Сохраняем изменения в базе данных
    try {
        await user.save();
        ctx.reply(`✅Davomat muvaffaqiyatli saqlandi`);
        ctx.scene.enter(`notes1Scene`)
    } catch (err) {
        console.error(err);
        ctx.reply('❌Davomatni saqlashda xatolik yuz berdi.');
        ctx.scene.enter(`addNote1Scene`)
    }

    // Очищаем текст заметки из сессии
    delete ctx.session.note1Text;
});

module.exports = addNote1Scene