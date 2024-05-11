const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base');

const editNote1Scene = new Scene('editNote1Scene');

editNote1Scene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes1 || user.notes1.length === 0) {
        return ctx.reply(`👤Bu foydalanuvchi hali biron marta dars qoldirmagan`);
    }

    let notes1Text = `⬆️🔄Davomatni tanlang o'zgartirish uchun:`;
    user.notes1.forEach((note1, index) => {
        notes1Text += `\n🗓Davomat ${index + 1}: ${note1.text}`;
    });

    return ctx.reply(notes1Text, {
        reply_markup: {
            inline_keyboard: [
                ...user.notes1.map((note1, index) => [{ text: `${index + 1}`, callback_data: `edit_note_${index}` }]),
                [{ text: `🔙O'rqaga`, callback_data: `back_to_notes1_uz` }]
            ]
        }
    });
});

editNote1Scene.action(/edit_note_(\d+)/, async (ctx) => {
    console.log(ctx.match);
    ctx.deleteMessage()
    const noteIndex = parseInt(ctx.match[1]);
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes1 || user.notes1.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchi uchun hali biron marta dars qoldirmagan`);
    }

    ctx.session.editingNote1Index = noteIndex;
    ctx.scene.enter('addEditNote1Scene')
    return ctx.reply(`🆕🔄O'zgartirish uchun yangi davomatni kiriting:`);
});



editNote1Scene.action('back_to_notes1_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('❎🔄Davomatni oʻzgartirish bekor qilindi.');
    return ctx.scene.enter('notes1Scene');
});

editNote1Scene.leave();

module.exports = editNote1Scene;