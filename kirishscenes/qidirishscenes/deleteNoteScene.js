const Scene = require('telegraf/scenes/base');
const User = require('../../models/User');

const deleteNoteScene = new Scene('deleteNoteScene');

deleteNoteScene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex })
    
    
    if (!user) {
        ctx.reply('❗️Iltimos, avval shaxsiy hisobingizga kiring.');
        return ctx.scene.leave();
    }
    let notesText = '';
    user.notes.forEach((note, index) => {
        notesText += `💵To'lov ${index + 1}:\n📑${note.text}\n👉Kim tomonidan kiritilgan: ${note.createdBy}\n\n`
    })

    const notes = user.notes.map((note, index) => ({
        text: `${index + 1}`,
        callback_data: `delete_note_${index}`,
    }));
    
    // Добавляем кнопку "O'rqaga"
    notes.push({ text: `🔙O'rqaga`, callback_data: `cancelDeleteNote_uz` });
    
    ctx.reply(`⬆️Oʻchirish uchun toʻlovni tanlang:\n${notesText}`, {
        reply_markup: {
            inline_keyboard: notes.map(note => [note])
        } 
    });
});

deleteNoteScene.action(/delete_note_(\d+)/, async (ctx) => {
    const noteIndex = parseInt(ctx.match[1]);
    const userIndex = ctx.session.foundUser.index;
    let user = await User.findOne({ index: userIndex });
    await ctx.deleteMessage()

    if (!user || !user.notes || noteIndex < 0 || noteIndex >= user.notes.length) {
        ctx.reply('❌⁉️Toʻlovni oʻchirishda xatolik yuz berdi.');
        return ctx.scene.leave();
    }

    // Удаление заметки из массива
    user.notes.splice(noteIndex, 1);
    await user.save();

    // Обновление ctx.session.foundUser после изменений
    ctx.session.foundUser = user;

    ctx.reply('✅Toʻlov muvaffaqiyatli oʻchirildi.');
    return ctx.scene.enter('notesScene');
});

deleteNoteScene.action('cancelDeleteNote_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('✖️⬅️Toʻlovni oʻchirish bekor qilindi.');
    return ctx.scene.enter('notesScene');
});

module.exports = deleteNoteScene;