const User = require('../models/User')
const Scene = require('telegraf/scenes/base');


const payLoadScene = new Scene('payLoadScene')

payLoadScene.enter(async ctx => {
    ctx.reply(`To'lov uchun kartalar:\n💳UZCARD: 9800123412341234\n💳HUMO: 4690123412341234\n!Eslatma tolovni qibolgach "To'ladim" tugmasini bosing`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: `To'ladim`, callback_data: `to'ladim_uz`}]
            ]
        }
    })
})

payLoadScene.action(`to'ladim_uz`, async ctx => {
    ctx.deleteMessage()
    ctx.reply(`Biz tasdiqlashimiz uchun to'lovni chekini yoki to'lovni skrinshotini yuboring`)
})

payLoadScene.on(`message`, async (ctx) => {
    const message = ctx.message
    const userIndex = ctx.session.user.index;


    if (message.document && (message.document.mime_type === `application/pdf` || message.document.mime_type === `image/jpeg` || message.document.mime_type === `image/png`)) {
        await ctx.telegram.sendDocument(-1002065143959, message.document.file_id, { 
            caption: userIndex,
        })
        ctx.reply(`To'lov ma'lumotiz qabul qilindi tez orada javob beramiz`)
        ctx.scene.leave()
    } else if (message.photo && message.photo.length > 0) {
        const photo = message.photo[0];
        await ctx.telegram.sendPhoto(-1002065143959, photo.file_id, {
            caption: userIndex,
        })
        ctx.reply(`To'lov ma'lumotiz qabul qilindi tez orada javob beramiz`)
        ctx.scene.leave() 
    } else {
        ctx.reply(`❗️Iltimos, to'lovni chekini yoki to'lovni skrinshotini yuboring`)
    }
})


module.exports = payLoadScene