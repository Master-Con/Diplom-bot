const User = require('../../models/User')
const Scene = require('telegraf/scenes/base')

const addEditNoteScene = new Scene('addEditNoteScene');

addEditNoteScene.on('text', async (ctx) => {
    const noteIndex = ctx.session.editingNoteIndex;
    const userIndex = ctx.session.foundUser.index;
    ctx.session.noteText = ctx.message.text
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes || user.notes.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchi hali to‘lov qilmagan`);
    }

    ctx.reply(`${ctx.session.noteText}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙orqaga', callback_data: 'back_addEditNoteScene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editNotes_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveEditNote_uz' }]
            ]
        }
    })


    
});

addEditNoteScene.action('saveEditNote_uz', async ctx => {
    const noteIndex = ctx.session.editingNoteIndex;
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });
    await ctx.deleteMessage()

    if (!user || !user.notes || user.notes.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchi hali to‘lov qilmagan`);
    }
    console.log(noteIndex, user.notes);
    user.notes[noteIndex].text = ctx.session.noteText;
    user.notes[noteIndex].modifiedBy = ctx.session.user.name
    user.notes[noteIndex].dateModified = new Date();
    



    try {
        await user.save();
        delete ctx.session.editingNoteIndex;
        delete ctx.session.noteText; // Удалить текст заметки из сессии после сохранения
        await ctx.reply(`✅To'lov o‘zgartirildi`);
        return ctx.scene.enter('notesScene')
    } catch (err) {
        console.error(err);
        await ctx.reply('❌Xatolik yuz berdi, qayta urinib ko‘ring');
        return ctx.scene.enter('editNoteScene')
    }
});

addEditNoteScene.action('back_addEditNoteScene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.enter('notesScene');
});

addEditNoteScene.action('stop_editNotes_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.leave();
});

addEditNoteScene.leave();

module.exports = addEditNoteScene;