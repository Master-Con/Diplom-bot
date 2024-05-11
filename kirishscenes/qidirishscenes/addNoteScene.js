const User = require('../../models/User')
const Scene = require('telegraf/scenes/base')

const addNoteScene = new Scene('addNoteScene');


addNoteScene.enter((ctx) => ctx.reply(`💵To'lovni kiriting:`));

addNoteScene.on('text', async ctx => {
    const foundUser = ctx.session.user
    ctx.session.noteText = ctx.message.text
    ctx.reply(`${ctx.session.noteText}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙Orqaga', callback_data: 'back_allFayl_uz' }, { text: '🔚chiqish', callback_data: 'stop_addUser_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveNote' }]
            ]
        }
    })
})

addNoteScene.action('back_allFayl_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('notesScene');
});

addNoteScene.action('stop_addUser_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('indexSearchScene');
});

addNoteScene.action('saveNote', async (ctx) => {
    await ctx.deleteMessage();
    const text = ctx.session.noteText; // Текст заметки, сохраненный в сессии
    const foundUser1 = ctx.session.foundUser;
    const foundUser = ctx.session.user
    // // Находим пользователя в базе данных по имени
    const user = await User.findOne({ index: foundUser1.index });
    if (!user) {
        ctx.reply('🤷🏻Foydalanuvchi topilmadi.');
        return;
    }

    // Добавляем новую заметку в массив notes
    user.notes.push({ text, createdBy: foundUser.name });

    // Сохраняем изменения в базе данных
    try {
        await user.save();
        ctx.reply(`✅To'lov muvaffaqiyatli saqlandi`);
        ctx.scene.enter(`notesScene`)
    } catch (err) {
        console.error(err);
        ctx.reply('❌Toʻlovni saqlashda xatolik yuz berdi.');
        ctx.scene.enter(`addNoteScene`)
    }

    // Очищаем текст заметки из сессии
    delete ctx.session.noteText;
});

module.exports = addNoteScene