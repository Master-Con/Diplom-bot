const Scene = require('telegraf/scenes/base');
const User = require('../../../models/User');

const deleteNote2Scene = new Scene('deleteNote2Scene');

deleteNote2Scene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex })
    
    if (!user) {
        ctx.reply('❗️Iltimos, avval shaxsiy hisobingizga kiring.');
        return ctx.scene.leave();
    }
    let notes2Text = '';
    user.notes2.forEach((note2, index) => {
        notes2Text += `📊Reyting ${index + 1}:\n${note2.text}\nKim tomonidan kiritilgan: ${note2.createdBy}\n\n`
    })

    const notes2 = user.notes2.map((note2, index) => ({
        text: `${index + 1}`,
        callback_data: `delete_note_${index}`,
    }));
    
    // Добавляем кнопку "O'rqaga"
    notes2.push({ text: `🔙O'rqaga`, callback_data: `cancelDeleteNote_uz` });
    
    ctx.reply(`⬆️Oʻchirish uchun reytingni tanlang:\n${notes2Text}`, {
        reply_markup: {
            inline_keyboard: notes2.map(note2 => [note2])
        } 
    });
});

deleteNote2Scene.action(/delete_note_(\d+)/, async (ctx) => {
    const noteIndex = parseInt(ctx.match[1]);
    const userIndex = ctx.session.foundUser.index;
    let user = await User.findOne({ index: userIndex });
    await ctx.deleteMessage()

    if (!user || !user.notes2 || noteIndex < 0 || noteIndex >= user.notes2.length) {
        ctx.reply('❌⁉️Reytingni oʻchirishda xatolik yuz berdi.');
        return ctx.scene.leave();
    }

    // Удаление заметки из массива
    user.notes2.splice(noteIndex, 1);
    await user.save();

    // Обновление ctx.session.foundUser после изменений
    ctx.session.foundUser = user;

    ctx.reply('✅Reyting muvaffaqiyatli oʻchirildi.');
    return ctx.scene.enter('notes2Scene');
});

deleteNote2Scene.action('cancelDeleteNote_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('✖️⬅️Reytingni oʻchirish bekor qilindi.');
    return ctx.scene.enter('notes2Scene');
});

module.exports = deleteNote2Scene;