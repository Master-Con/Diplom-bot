const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');



const editNoteScene = new Scene('editNoteScene');

editNoteScene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes || user.notes.length === 0) {
        return ctx.reply(`👤Bu foydalanuvchi hali to‘lov qilmagan`);
    }

    let notesText = `⬆️🔄To'lovni tanlang o'zgartirish uchun:`;
    user.notes.forEach((note, index) => {
        notesText += `\n💵To'lov ${index + 1}: ${note.text}`;
    });

    return ctx.reply(notesText, {
        reply_markup: {
            inline_keyboard: [
                ...user.notes.map((note, index) => [{ text: `${index + 1}`, callback_data: `edit_note_${index}` }]),
                [{ text: `🔙O'rqaga`, callback_data: `back_to_notes_uz` }]
            ]
        }
    });
});

editNoteScene.action(/edit_note_(\d+)/, async (ctx) => {
    console.log(ctx.match);
    await ctx.deleteMessage()
    const noteIndex = parseInt(ctx.match[1]);
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes || user.notes.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchi uchun hali to‘lov qilmagan`);
    }

    ctx.session.editingNoteIndex = noteIndex;
    ctx.scene.enter('addEditNoteScene')
    return ctx.reply(`🆕🔄O'zgartirish uchun yangi to'lovni kiriting:`);
});



editNoteScene.action('back_to_notes_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('❎🔄Toʻlovni oʻzgartirish bekor qilindi.');
    return ctx.scene.enter('notesScene');
});

editNoteScene.leave();

module.exports = editNoteScene;