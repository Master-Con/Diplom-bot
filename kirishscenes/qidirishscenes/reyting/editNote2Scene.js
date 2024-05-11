const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base');

const editNote2Scene = new Scene('editNote2Scene');

editNote2Scene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes2 || user.notes2.length === 0) {
        return ctx.reply(`👤Bu foydalanuvchiga hali reyting qo'yilmagan`);
    }

    let notes2Text = `⬆️🔄Reytingni tanlang o'zgartirish uchun:`;
    user.notes2.forEach((note2, index) => {
        notes2Text += `\nReyting ${index + 1}: ${note2.text}`;
    });

    return ctx.reply(notes2Text, {
        reply_markup: {
            inline_keyboard: [
                ...user.notes2.map((note2, index) => [{ text: `${index + 1}`, callback_data: `edit_note_${index}` }]),
                [{ text: `🔙O'rqaga`, callback_data: `back_to_notes1_uz` }]
            ]
        }
    });
});

editNote2Scene.action(/edit_note_(\d+)/, async (ctx) => {
    console.log(ctx.match);
    ctx.deleteMessage()
    const noteIndex = parseInt(ctx.match[1]);
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes2 || user.notes2.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchiga hali reyting qo'yilmagan`);
    }

    ctx.session.editingNote2Index = noteIndex;
    ctx.scene.enter('addEditNote2Scene')
    return ctx.reply(`🆕🔄O'zgartirish uchun yangi reytingni kiriting:`);
});



editNote2Scene.action('back_to_notes1_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('❎🔄Davomatni oʻzgartirish bekor qilindi.');
    return ctx.scene.enter('notes2Scene');
});

editNote2Scene.leave();

module.exports = editNote2Scene;