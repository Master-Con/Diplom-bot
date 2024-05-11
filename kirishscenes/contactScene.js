const User = require('../models/User')
const Scene = require('telegraf/scenes/base')

const contactScene = new Scene('contactScene')

contactScene.on('contact', async (ctx) => {
    const phoneNumber = ctx.message.contact.phone_number;
    const firstName = ctx.message.contact.first_name
    const channelID = -1002085081325;
    try {
        await bot.telegram.sendContact(channelID, phoneNumber, firstName, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '✅', callback_data: 'blocking' }],
                ]
            }
        });
        await ctx.telegram.editMessageReplyMarkup(ctx.chat.id, ctx.callbackQuery.message.message_id, null);
        await ctx.reply('Telefon raqamingiz qabul qilindi, kuting operatorlarimiz tez orada siz bilan aloqaga chiqishadi');
        setTimeout(() => {
            ctx.reply(`Barcha ma'lumotlarni operatorga topshirganingizdan so'ng, admin sizni ro'yxatdan o'tkazadi va sizga login va parol yuboradi. Shaxsiy hisobingizga kirish uchun sizga ushbu login va parol kerak bo'ladi. Kirish tugmasini bosganingizda ularni kiritasiz, avval /start yozing yoki /startni bosing keyin tilni tanlang va Kirish tugmasini bosing`,);
        }, 10000);
    } catch (error) {
        console.error('Ошибка отправки сообщения на канал:', error);
        ctx.reply('Kanalga yuborishda xatolik yuz berdi');
    }
});

contactScene.action(`blocking`, ctx => {
    ctx.editMessageReplyMarkup({
        inline_keyboard: [
            [{ text: `bloked by ${ctx.callbackQuery.from.first_name}`, callback_data: 'blocked' }],
        ]
    })
})

contactScene.leave()

module.exports = contactScene