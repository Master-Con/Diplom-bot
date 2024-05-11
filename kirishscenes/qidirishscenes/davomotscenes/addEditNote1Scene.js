const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const addEditNote1Scene = new Scene('addEditNote1Scene');

addEditNote1Scene.on('text', async (ctx) => {
    const noteIndex = ctx.session.editingNote1Index;
    const userIndex = ctx.session.foundUser.index;
    ctx.session.note1Text = ctx.message.text
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes1 || user.notes1.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchi hali biron marta dars qoldirmagan`);
    }

    ctx.reply(`${ctx.session.note1Text}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙orqaga', callback_data: 'back_addEditNote1Scene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editNotes1_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveEditNote1_uz' }]
            ]
        }
    })


    
});

addEditNote1Scene.action('saveEditNote1_uz', async ctx => {
    await ctx.deleteMessage()
    const noteIndex = ctx.session.editingNote1Index;
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });
    

    if (!user || !user.notes1 || user.notes1.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchi hali biron marta dars qoldirmagan`);
    }
    console.log(noteIndex, user.notes);
    user.notes1[noteIndex].text = ctx.session.note1Text;
    user.notes1[noteIndex].modifiedBy = ctx.session.user.name
    user.notes1[noteIndex].dateModified = new Date();
    
    

    try {
        await user.save();
        delete ctx.session.editingNote1Index;
        delete ctx.session.note1Text; // Удалить текст заметки из сессии после сохранения
        await ctx.reply(`✅Davomat o‘zgartirildi`);
        return ctx.scene.enter('notes1Scene')
    } catch (err) {
        console.error(err);
        await ctx.reply('❌Xatolik yuz berdi, qayta urinib ko‘ring');
        return ctx.scene.enter('editNote1Scene')
    }
    
});

addEditNote1Scene.action('back_addEditNote1Scene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.enter('notes1Scene');
});

addEditNote1Scene.action('stop_editNotes1_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.leave();
});

addEditNote1Scene.leave();

module.exports = addEditNote1Scene;