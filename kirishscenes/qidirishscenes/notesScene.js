const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');

const notesScene = new Scene('notesScene');

notesScene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes || user.notes.length === 0) {
        return ctx.reply(`👤Bu foydalanuvchi oy uchun hali to‘lov qilmagan`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `💵To'lov qo'shish`, callback_data: 'add_note_uz' }, { text: '🔙Orqaga', callback_data: 'back_note_uz' }]
                ]
            }
        });
    }

    let notesText = '';
    user.notes.forEach((note, index) => {
        notesText += `💵To'lov ${index + 1}:\n${note.text}\n👤Kim tomonidan kiritilgan: ${note.createdBy}\n📅Kritilgan sana: ${note.dateCreated}\n👤Kim tomonidan o'zgartirilgan: ${note.modifiedBy}\n📅O'zgartirilgan sanasi: ${note.dateModified}\n\n`;
    });

    return ctx.reply(notesText, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `💵To'lov qo'shish`, callback_data: 'add_note_uz' }, { text: `♻️O'zgartirish`, callback_data: 'edit_note_uz' }],
                [{ text: `➖O'chirish`, callback_data: 'clean_note_uz' }, { text: '🔙Orqaga', callback_data: 'back_note_uz' }]
            ]
        }
    });
});

notesScene.action(`clean_note_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`deleteNoteScene`)
})

notesScene.action(`back_note_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`indexFindScene`)
})

notesScene.action(`add_note_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`addNoteScene`)
})

notesScene.action(`edit_note_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter('editNoteScene')
})

notesScene.leave()

module.exports = notesScene