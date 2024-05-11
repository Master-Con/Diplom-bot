const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');

const notes2Scene = new Scene('notes2Scene');

notes2Scene.enter(async (ctx) => {
    const userIndex = ctx.session.foundUser.index;
    const user = await User.findOne({ index: userIndex });

    if (!user || !user.notes2 || user.notes2.length === 0) {
        return ctx.reply(`👤Bu foydalanuvchiga hali reyting qo'yilmagan`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `📊Reyting kritish`, callback_data: 'add_notes2Scene_uz' }, { text: '🔙Orqaga', callback_data: 'back_notes1Scene_uz' }]
                ]
            }
        });
    }

    let notes2Text = '';
    user.notes2.forEach((note2, index) => {
        notes2Text += `📊Reyting ${index + 1}:\n${note2.text}\n👤Kim tomonidan kiritilgan: ${note2.createdBy}\n📅Kritilgan sana: ${note2.dateCreated}\n👤Kim tomonidan o'zgartirilgan: ${note2.modifiedBy}\n📅O'zgartirilgan sanasi: ${note2.dateModified}\n\n`;
    });

    return ctx.reply(notes2Text, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `📊Reyting kritish`, callback_data: 'add_notes2Scene_uz' }, { text: `♻️O'zgartirish`, callback_data: 'edit_notes2Scene_uz' }],
                [{ text: `➖O'chirish`, callback_data: 'clean_note2_uz' }, { text: '🔙Orqaga', callback_data: 'back_notes2Scene_uz' }]
            ]
        }
    });
});

notes2Scene.action(`clean_note2_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`deleteNote2Scene`)
})

notes2Scene.action(`back_notes2Scene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`indexFindScene`)
})

notes2Scene.action(`add_notes2Scene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter(`addNote2Scene`)
})

notes2Scene.action(`edit_notes2Scene_uz`, async ctx => {
    await ctx.deleteMessage()
    await ctx.scene.enter('editNote2Scene')
})

notes2Scene.leave()

module.exports = notes2Scene