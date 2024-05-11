const User = require('../../models/User')
const Scene = require('telegraf/scenes/base');
const indexSearchScene = require('./indexSearchScene');

const indexFindScene = new Scene('indexFindScene')

indexFindScene.enter(async ctx => {
    const userIndex = ctx.session.foundUser.index
    const foundUser = await User.findOne({ index: userIndex});
    const user = ctx.session.user
    console.log(ctx.session);

    if (user.isAdmin) {
        ctx.session.foundUser = foundUser
        if (foundUser.isAdmin || foundUser.role === "Manager" || foundUser.role === "Teacher" || foundUser.role === "Operator") {
            ctx.reply(`👤Foydalanuvchi topildi:\n🔒Login: ${foundUser.login}\n🔑Parol: ${foundUser.password}\n🆔ID: ${foundUser.index}\n🪪I.F.SH: ${foundUser.name}\n🗓Tug'ilgan yili: ${foundUser.age}\n☎️Telefon nomeri: ${foundUser.phoneNumber}\n💼Vazifasi: ${foundUser.role}\n🔰Admin: ${foundUser.isAdmin}\n👤Ro'yxatdan o'tkazdirgan shaxs: ${foundUser.createdBy}\n⏱Qachon a'zo bolingani: ${foundUser.dateCreated}\n👤O'zgartirilgan shaxs: ${foundUser.modifiedBy}\n⏱Qachon o'zgartirilgan: ${foundUser.dateModified}`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: `📊Reyting`, callback_data: `rating_uz`}, {text: `🔄O'zgartirish`, callback_data: `editData_uz`}],
                        [{text: `➖Foydalanuvchi ochirish`, callback_data: `userDelete_uz`}, {text: `🔙Orqaga`, callback_data: `back_indexSearchScene2_uz`}],
                        [{text: `🔚Chiqish`, callback_data: `logOutindex_uz`}]
                    ]
                }
            });
        } else {
        ctx.reply(`👤Foydalanuvchi topildi:\n🔒Login: ${foundUser.login}\n🔑Parol: ${foundUser.password}\n🆔ID: ${foundUser.index}\n🪪I.F.SH: ${foundUser.name}\n🗓Tug'ilgan yili: ${foundUser.age}\n☎️Telefon nomeri: ${foundUser.phoneNumber}\n💼Vazifasi: ${foundUser.role}\n🔰Admin: ${foundUser.isAdmin}\n👤Ro'yxatdan o'tkazdirgan shaxs: ${foundUser.createdBy}\n⏱Qachon a'zo bolingani: ${foundUser.dateCreated}\n👤O'zgartirilgan shaxs: ${foundUser.modifiedBy}\n⏱Qachon o'zgartirilgan: ${foundUser.dateModified}`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: `📊Reyting`, callback_data: `rating_uz`}, {text: `💵To'lovlar`, callback_data: `payments_uz`}],
                    [{text: `🗓Davomat`, callback_data: `attendance_uz`}, {text: `🔄O'zgartirish`, callback_data: `editData_uz`}],
                    [{text: `➖Foydalanuvchi o'chirish`, callback_data: `userDelete_uz`}, {text: `🔙Orqaga`, callback_data: `back_indexSearchScene2_uz`}],
                    [{text: `🔚Chiqish`, callback_data: `logOutindex_uz`}]
                ]
            }
        });
    }
    } else if (user.role === "Teacher" || user.role === "Manager" || user.role === "Operator") {
        if (foundUser.isAdmin || foundUser.role === "Manager" || foundUser.role === "Teacher" || foundUser.role === "Operator") {
            ctx.reply(`👤Foydalanuvchi topildi:\n🆔ID: ${foundUser.index}\n🪪I.F.SH: ${foundUser.name}\n🗓Tug'ilgan yili: ${foundUser.age}\n☎️Telefon nomeri: ${foundUser.phoneNumber}\n💼Vazifasi: ${foundUser.role}\n🔰Admin: ${foundUser.isAdmin}\n👤Ro'yxatdan o'tkazdirgan shaxs: ${foundUser.createdBy}\n⏱Qachon a'zo bolingani: ${foundUser.dateCreated}`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: `🔚Chiqish`, callback_data: `logOutindex_uz`}, {text: `🔙Orqaga`, callback_data: `back_indexSearchScene2_uz`}]
                    ]
                }
            });
        } else {
            ctx.reply(`👤Foydalanuvchi topildi:\n🆔ID: ${foundUser.index}\n🪪I.F.SH: ${foundUser.name}\n🗓Tug'ilgan yili: ${foundUser.age}\n☎️Telefon nomeri: ${foundUser.phoneNumber}\n💼Vazifasi: ${foundUser.role}\n🔰Admin: ${foundUser.isAdmin}\n👤Ro'yxatdan o'tkazdirgan shaxs: ${foundUser.createdBy}\n⏱Qachon a'zo bolingani: ${foundUser.dateCreated}`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: `📊Reyting`, callback_data: `rating_uz`}, {text: `🗓Davomat`, callback_data: `attendance_uz`}],
                        [{text: `🔙Orqaga`, callback_data: `back_indexSearchScene2_uz`}, {text: `🔚Chiqish`, callback_data: `logOutindex_uz`}]
                    ]
                }
            });
        }
    }
});

indexFindScene.action('userDelete_uz', async ctx => {
    await ctx.deleteMessage()
    await ctx.reply('❗️Siz bu foydalanuvchini oʻchirib tashlamoqchimisiz?', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: `Ha😢`, callback_data: `agree_uz`
                    },
                    {
                        text: `Yo'q☺️`, callback_data: `disagree_uz`
                    }
                ],
            ]
        }
    });
});

indexFindScene.action('back_indexSearchScene2_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('indexSearchScene');
});


indexFindScene.action(`payments_uz`, async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.enter('notesScene')
})

indexFindScene.action(`attendance_uz`, async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.enter('notes1Scene')
})

indexFindScene.action(`rating_uz`, async ctx => {
    await ctx.deleteMessage();
    await ctx.scene.enter('notes2Scene')
})


indexFindScene.action('logOutindex_uz', async ctx => {
    await ctx.reply(`Siz foydalanuvchini panelidan chiqtiz`)
    await ctx.deleteMessage();
    return ctx.scene.leave()
});

indexFindScene.action('editData_uz', async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter('editUserScene')
})

indexFindScene.action('agree_uz', async ctx => {
    const foundUser = ctx.session.foundUser
    await User.deleteOne({ index: foundUser.index });
    await ctx.reply('✅Foydalanuvchi muvaffaqiyatli o\'chirildi😔');
    await ctx.deleteMessage()
    return ctx.scene.enter(`indexSearchScene`)
})


indexFindScene.action('disagree_uz', async ctx => {
    await ctx.deleteMessage()
    return ctx.scene.enter(`indexSearchScene`)
})
indexFindScene.leave()


module.exports = indexFindScene