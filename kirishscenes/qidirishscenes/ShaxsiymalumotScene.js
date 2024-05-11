const Scene = require('telegraf/scenes/base');
const User = require('../../models/User');

const ShaxsiymalumotScene = new Scene('ShaxsiymalumotScene');

ShaxsiymalumotScene.enter(async ctx => {
    const user = ctx.session.user;
    const foundUser = await User.findOne({ login: user.login })
    
    if (foundUser) {
        if (foundUser.isAdmin) {
        ctx.replyWithHTML(`🔒Login: <tg-spoiler>${foundUser.login}</tg-spoiler>\n🔑Parol: <tg-spoiler>${foundUser.password}</tg-spoiler>\n🆔ID: ${foundUser.index}\n🪪I.F.SH: ${foundUser.name}\n🗓Tug'ilgan yili: ${foundUser.age}\n☎️Telefon nomeri: <tg-spoiler>${foundUser.phoneNumber}</tg-spoiler>\n💼Vazifasi: ${foundUser.role}\n🔰Admin: ${foundUser.isAdmin}\n👤Ro'yxatdan o'tkazdirgan shaxs: ${foundUser.createdBy}\n⏱Qachon a'zo bolingani: ${foundUser.dateCreated}\n👤O'zgartirilgan shaxs: ${foundUser.modifiedBy}\n⏱Qachon o'zgartirilgan: ${foundUser.dateModified}`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔚Chiqish', callback_data: 'Clean_uz' }, { text: `♻️O'zgartirish`, callback_data: 'editData_uz' }],
                ]
            }
            
        });
    } else {
        ctx.replyWithHTML(`🔒Login: <tg-spoiler>${foundUser.login}</tg-spoiler>\n🔑Parol: <tg-spoiler>${foundUser.password}</tg-spoiler>\n🆔ID: ${foundUser.index}\n🪪I.F.SH: ${foundUser.name}\n🗓Tug'ilgan yili: ${foundUser.age}\n☎️Telefon nomeri: <tg-spoiler>${foundUser.phoneNumber}</tg-spoiler>\n💼Vazifasi: ${foundUser.role}\n🔰Admin: ${foundUser.isAdmin}\n👤Ro'yxatdan o'tkazdirgan shaxs: ${foundUser.createdBy}\n⏱Qachon a'zo bolingani: ${foundUser.dateCreated}\n👤O'zgartirilgan shaxs: ${foundUser.modifiedBy}\n⏱Qachon o'zgartirilgan: ${foundUser.dateModified}`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Yopish', callback_data: 'Clean_uz' }],
                ]
            }
            
        });
    }
    } else {
        ctx.reply('❗️Iltimos, avval tizimga kiring.');
    }
});

ShaxsiymalumotScene.action(`editData_uz`, async ctx => {
    await ctx.deleteMessage()
    return ctx.scene.enter(`editYourselfScene`)
})

ShaxsiymalumotScene.action(`Clean_uz`, async ctx => {
    await ctx.deleteMessage()
    return ctx.scene.leave()
})

module.exports = ShaxsiymalumotScene;