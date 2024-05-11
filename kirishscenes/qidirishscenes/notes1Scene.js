const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');

const notes1Scene = new Scene('notes1Scene');

notes1Scene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes1 || user.notes1.length === 0) {
        return ctx.reply(`👤Bu foydalanuvchi hali biron marta dars qoldirmagan`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `🗓Davomat kritish`, callback_data: 'add_notes1Scene_uz' }, { text: '🔙Orqaga', callback_data: 'back_notes1Scene_uz' }]
                ]
            }
        });
    }

    let notes1Text = '';
    user.notes1.forEach((note1, index) => {
        notes1Text += `🗓Davomat ${index + 1}:\n${note1.text}\n👤Kim tomonidan kiritilgan: ${note1.createdBy}\n📅Kritilgan sana: ${note1.dateCreated}\n👤Kim tomonidan o'zgartirilgan: ${note1.modifiedBy}\n📅O'zgartirilgan sanasi: ${note1.dateModified}\n\n`;
    });

    return ctx.reply(notes1Text, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `🗓Davomat olish`, callback_data: 'add_notes1Scene_uz' }, { text: `♻️O'zgartirish`, callback_data: 'edit_notes1Scene_uz' }],
                [{ text: `➖O'chirish`, callback_data: 'clean_note1_uz' }, { text: '🔙Orqaga', callback_data: 'back_notes1Scene_uz' }]
            ]
        }
    });
});

notes1Scene.action(`clean_note1_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`deleteNote1Scene`)
})

notes1Scene.action(`back_notes1Scene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`indexFindScene`)
})

notes1Scene.action(`add_notes1Scene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`addNote1Scene`)
})

notes1Scene.action(`edit_notes1Scene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter('editNote1Scene')
})

notes1Scene.leave()

module.exports = notes1Scene