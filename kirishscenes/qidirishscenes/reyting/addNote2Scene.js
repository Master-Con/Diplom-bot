const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const addNote2Scene = new Scene('addNote2Scene');


addNote2Scene.enter((ctx) => ctx.reply(`📊Reytingni kiriting:`));

addNote2Scene.on('text', async ctx => {
    const foundUser = ctx.session.user
    ctx.session.note2Text = ctx.message.text
    ctx.reply(`${ctx.session.note2Text}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙Orqaga', callback_data: 'back_addNote2Scene_uz' }, { text: '🔚chiqish', callback_data: 'stop_addNote2Scene_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveNote2' }]
            ]
        }
    })
})

addNote2Scene.action('back_addNote2Scene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('notes2Scene');
});

addNote2Scene.action('stop_addNote2Scene_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('indexFindScene');
});

addNote2Scene.action('saveNote2', async (ctx) => {
    await ctx.deleteMessage()
    const text = ctx.session.note2Text; // Текст заметки, сохраненный в сессии
    const foundUser1 = ctx.session.foundUser;
    const foundUser = ctx.session.user
    // // Находим пользователя в базе данных по имени
    const user = await User.findOne({ index: foundUser1.index });
    if (!user) {
        ctx.reply('🤷🏻Foydalanuvchi topilmadi.');
        return;
    }

    // Добавляем новую заметку в массив notes
    user.notes2.push({ text, createdBy: foundUser.name });

    // Сохраняем изменения в базе данных
    try {
        await user.save();
        ctx.reply(`✅Reyting muvaffaqiyatli saqlandi`);
        ctx.scene.enter(`notes2Scene`)
    } catch (err) {
        console.error(err);
        ctx.reply('❌Reytingni saqlashda xatolik yuz berdi.');
        ctx.scene.enter(`addNote2Scene`)
    }

    // Очищаем текст заметки из сессии
    delete ctx.session.note2Text;
});

module.exports = addNote2Scene