const Scene = require('telegraf/scenes/base');
const User = require('../../../models/User');

const deleteNote1Scene = new Scene('deleteNote1Scene');

deleteNote1Scene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex })
    
    if (!user) {
        ctx.reply('❗️Iltimos, avval shaxsiy hisobingizga kiring.');
        return ctx.scene.leave();
    }
    let notes1Text = '';
    user.notes1.forEach((note1, index) => {
        notes1Text += `🗓Davomat ${index + 1}:\n📑${note1.text}\n👉Kim tomonidan kiritilgan: ${note1.createdBy}\n\n`
    })

    const notes1 = user.notes1.map((note1, index) => ({
        text: `${index + 1}`,
        callback_data: `delete_note_${index}`,
    }));
    
    // Добавляем кнопку "O'rqaga"
    notes1.push({ text: `🔙O'rqaga`, callback_data: `cancelDeleteNote_uz` });
    
    ctx.reply(`⬆️Oʻchirish uchun davomatni tanlang:\n${notes1Text}`, {
        reply_markup: {
            inline_keyboard: notes1.map(note1 => [note1])
        } 
    });
});

deleteNote1Scene.action(/delete_note_(\d+)/, async (ctx) => {
    const noteIndex = parseInt(ctx.match[1]);
    const userIndex = ctx.session.foundUser.index;
    let user = await User.findOne({ index: userIndex });
    await ctx.deleteMessage()

    if (!user || !user.notes1 || noteIndex < 0 || noteIndex >= user.notes1.length) {
        ctx.reply('❌⁉️Davomatni oʻchirishda xatolik yuz berdi.');
        return ctx.scene.leave();
    }

    // Удаление заметки из массива
    user.notes1.splice(noteIndex, 1);
    await user.save();

    // Обновление ctx.session.foundUser после изменений
    ctx.session.foundUser = user;

    ctx.reply('✅Davomat muvaffaqiyatli oʻchirildi.');
    return ctx.scene.enter('notes1Scene');
});

deleteNote1Scene.action('cancelDeleteNote_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('✖️⬅️Davomatni oʻchirish bekor qilindi.');
    return ctx.scene.enter('notes1Scene');
});

module.exports = deleteNote1Scene;