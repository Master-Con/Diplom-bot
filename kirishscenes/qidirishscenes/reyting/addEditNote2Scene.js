const User = require('../../../models/User')
const Scene = require('telegraf/scenes/base')

const addEditNote2Scene = new Scene('addEditNote2Scene');

addEditNote2Scene.on('text', async (ctx) => {
    const noteIndex = ctx.session.editingNote2Index;
    const userIndex = ctx.session.foundUser.index;
    ctx.session.note2Text = ctx.message.text
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes2 || user.notes2.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchiga hali reyting qo'yilmagan`);
    }

    ctx.reply(`${ctx.session.note2Text}`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔙orqaga', callback_data: 'back_addEditNote2Scene_uz' }, { text: '🔚chiqish', callback_data: 'stop_editNotes2_uz' }],
                [{ text: '📥Saqlash', callback_data: 'saveEditNote2_uz' }]
            ]
        }
    })


    
});

addEditNote2Scene.action('saveEditNote2_uz', async ctx => {
    await ctx.deleteMessage()
    const noteIndex = ctx.session.editingNote2Index;
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });
    

    if (!user || !user.notes2 || user.notes2.length <= noteIndex) {
        return ctx.reply(`👤Bu foydalanuvchiga hali reyting qo'yilmagan`);
    }
    console.log(noteIndex, user.notes2);
    user.notes2[noteIndex].text = ctx.session.note2Text;
    user.notes2[noteIndex].modifiedBy = ctx.session.user.name
    user.notes2[noteIndex].dateModified = new Date();
    

    try {
        await user.save();
        delete ctx.session.editingNote2Index;
        delete ctx.session.note2Text; // Удалить текст заметки из сессии после сохранения
        await ctx.reply(`✅Reyting o‘zgartirildi`);
        return ctx.scene.enter('notes2Scene')
    } catch (err) {
        console.error(err);
        await ctx.reply('❌Xatolik yuz berdi, qayta urinib ko‘ring');
        return ctx.scene.enter('editNote2Scene')
    }
    
});

addEditNote2Scene.action('back_addEditNote2Scene_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.enter('notes2Scene');
});

addEditNote2Scene.action('stop_editNotes2_uz', async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.leave();
});

addEditNote2Scene.leave();

module.exports = addEditNote2Scene;