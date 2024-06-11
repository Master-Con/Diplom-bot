require('dotenv').config()
const { Telegraf, session } = require('telegraf')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const mongoose = require('mongoose');
const User = require('./models/User')
mongoose.connect('mongodb+srv://winter:<MbDvSaLO76HN6utj>@cluster0.ymfagca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/lowara');


const bot = new Telegraf(process.env.Token);

const {
    kirishScene,
    payreloadScene,

    showTulovScene,
    showRatingScene,
    showDavomatScene,
    payLoadScene,

    findAudioScene,
    materialsScene,
    askAudioScene,
    askNameScene,

    editYourselfPasswordScene,
    editYourselfIndexScene,
    editYourselfNameScene,
    editYourselfAgeScene,
    editYourselfPhoneNumberScene,
    editYourselfRoleScene,
    editYourselfIsAdminScene,
    editYourselfLoginScene,

    notes2Scene,
    addEditNote2Scene,
    addNote2Scene,
    deleteNote2Scene,
    editNote2Scene,

    notes1Scene,
    addEditNote1Scene,
    addNote1Scene,
    deleteNote1Scene,
    editNote1Scene,

    editPasswordScene,
    editIndexScene,
    editNameScene,
    editAgeScene,
    editPhoneNumberScene,
    editRoleScene,
    editIsAdminScene,
    editLoginScene,

    logOutScene,

    ShaxsiymalumotScene,
    editYourselfScene,
    indexFindScene,
    editUserScene,
    addEditNoteScene,
    deleteNoteScene,
    editNoteScene,
    notesScene,
    addNoteScene,
    indexSearchScene,
    
    loginScene,
    passwordScene,

    loginAddScene,
    passwordAddScene,
    indexAddScene,
    nameAddScene,
    ageAddScene,
    phoneNumberAddScene,
    roleAddScene,
    isAdminAddScene,
    allFaylScene
} = require('./scenes');

const stage = new Stage([
    kirishScene,
    payreloadScene,

    showTulovScene,
    showRatingScene,
    showDavomatScene,
    payLoadScene,
    
    findAudioScene,
    materialsScene,
    askAudioScene,
    askNameScene,

    editYourselfPasswordScene,
    editYourselfIndexScene,
    editYourselfNameScene,
    editYourselfAgeScene,
    editYourselfPhoneNumberScene,
    editYourselfRoleScene,
    editYourselfIsAdminScene,
    editYourselfLoginScene,

    notes2Scene,
    addEditNote2Scene,
    addNote2Scene,
    deleteNote2Scene,
    editNote2Scene,

    notes1Scene,
    addEditNote1Scene,
    addNote1Scene,
    deleteNote1Scene,
    editNote1Scene,

    editPasswordScene,
    editIndexScene,
    editNameScene,
    editAgeScene,
    editPhoneNumberScene,
    editRoleScene,
    editIsAdminScene,
    editLoginScene,
    
    logOutScene,

    ShaxsiymalumotScene,
    editYourselfScene,
    indexFindScene,
    editUserScene,
    addEditNoteScene,
    deleteNoteScene,
    editNoteScene,
    notesScene,
    addNoteScene,
    indexSearchScene,

    loginScene,
    passwordScene,

    loginAddScene,
    passwordAddScene,
    indexAddScene,
    nameAddScene,
    ageAddScene,
    phoneNumberAddScene,
    roleAddScene,
    isAdminAddScene,
    allFaylScene
])

bot.use(session())
bot.use(stage.middleware())

const fs = require('fs');

bot.start(async (ctx) => {
    await ctx.replyWithPhoto({
        source: fs.createReadStream('./1.jpg')
      }, {
        caption: 'Assalomu aleykum'
      });
    await ctx.reply(`Shaxsiy hisobingizga kiring yoki ro'yxatdan o'ting`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Kirish', callback_data: `log_in_uz` }, { text: `Ro'yxatdan o'tish`, callback_data: `sign_in_uz` }],
                ],
            }
        })
})

bot.action('log_in_uz', async ctx => {
    await ctx.deleteMessage()
    ctx.scene.enter('loginScene')
})

bot.action(`sign_in_uz`, (ctx) => {
    ctx.reply(`Ro‘yxatdan o‘tish uchun avvalo siz bizga telefon raqamingizni yuborishingiz kerak. Pastdagi "Telefon raqamini yuborish" tugmasini bosing va bizga telefon raqamingizni yuboring.`, {
        reply_markup: {
            keyboard: [
                [{ text: 'Telefon raqamini yuborish', request_contact: true }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears(`Avtor`, ctx => {
    ctx.reply(`Dastur mualifi 655-20 guruh talabasi Muminov Rahmatulloh Rasuljon o'g'li`)
})

bot.hears(`07122001zw`, ctx => {
    ctx.scene.enter(`loginAddScene`)
})

bot.on('contact', async (ctx) => {
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
        
        ctx.reply('Telefon raqamingiz qabul qilindi, kuting operatorlarimiz tez orada siz bilan aloqaga chiqishadi', {
            reply_markup: {
                remove_keyboard: true
            }
        });
        setTimeout(() => {
            ctx.reply(`Barcha ma'lumotlarni operatorga topshirganingizdan so'ng, admin sizni ro'yxatdan o'tkazadi va sizga login va parol yuboradi. Shaxsiy hisobingizga kirish uchun sizga ushbu login va parol kerak bo'ladi. Kirish tugmasini bosganingizda ularni kiritasiz, avval botga /start yozing yoki /start ni bosing keyin tilni tanlang va Kirish tugmasini bosing`,);
        }, 10000);
    } catch (error) {
        console.error('Ошибка отправки сообщения на канал:', error);
        ctx.reply('Kanalga yuborishda xatolik yuz berdi');
    }
});

bot.telegram.sendP

bot.action(`blocking`, ctx => {
    ctx.editMessageReplyMarkup({
        inline_keyboard: [
            [{ text: `bloked by ${ctx.callbackQuery.from.first_name}`, callback_data: 'blocked' }],
        ]
    })
})

bot.hears(`📖O'quv materiallari`, async ctx => {
    await ctx.scene.enter(`materialsScene`)
})


bot.hears(`🪪Shaxsiy ma'lumot`, async ctx => {
    await ctx.scene.enter(`ShaxsiymalumotScene`)
});

bot.hears(`💵To'lovlar`, async ctx => {
    await ctx.scene.enter(`showTulovScene`)
});

bot.hears(`📊Reyting`, async ctx => {
    await ctx.scene.enter(`showRatingScene`)
});

bot.hears(`🗓Davomat`, async ctx => {
    await ctx.scene.enter(`showDavomatScene`)
});

bot.hears('👥Foydalanuvchilar', async (ctx) => {
    try {
        const totalUsers = await User.countDocuments();
        const oquvchilarCount = await User.countDocuments({ role: "Student" });
        const oqituvchilarCount = await User.countDocuments({ role: "Teacher" });
        const operatorlarCount = await User.countDocuments({ role: "Operator" });
        const managerlarCount = await User.countDocuments({ role: "Manager" });
        const adminlarCount = await User.countDocuments({ isAdmin: true });

        const message = `Umumiy foydalanuvchilar soni: ${totalUsers}\nO'quvchilar soni: ${oquvchilarCount}\nO'qituvchilar soni: ${oqituvchilarCount}\nOperatorlar soni: ${operatorlarCount}\nManagerlar soni: ${managerlarCount}\nAdminlar soni: ${adminlarCount}`;

        await ctx.reply(message, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `🔎Foydalanuvchi qidirish`, callback_data: `indexSearch_uz`}],
                    [{ text: `🔙Orqaga`, callback_data: `back_indexSearchGlavaScene_uz`}]
                ]
            }
        });
    } catch (error) {
        console.error('Error getting user statistics:', error);
        await ctx.reply('Ma\'lumotlar olishda xatolik yuz berdi.');
    }
});

bot.hears(`📥Foydalanuvchi qo'shish`, ctx => {
    if (ctx.session.user && ctx.session.user.isAdmin) {
        ctx.scene.enter('loginAddScene');
    } else {
        ctx.reply('Sizda bu amalni bajarish uchun ruxsat yo‘q.');
    }
});



bot.hears(`🔎Foydalanuvchi qidirish`, ctx => {
    if (ctx.session.user && (ctx.session.user.role === `Teacher` || ctx.session.user.role === `Manager` || ctx.session.user.role === `Operator` || ctx.session.user.isAdmin)) {
        ctx.scene.enter('indexSearchScene');
    } else {
        ctx.reply('Sizda bu amalni bajarish uchun ruxsat yo‘q.');
    }
});

bot.hears(`🚪🔚Shaxsiy hisobdan chiqish`, ctx => ctx.scene.enter('logOutScene'))

bot.action(`back_indexSearchGlavaScene_uz`, async ctx => {
    await ctx.deleteMessage();
})

bot.action(`indexSearch_uz`, async ctx => {
    await ctx.deleteMessage();
    return ctx.scene.enter(`indexSearchScene`)})




bot.launch().then(() => {
    console.log('Бот запущен');
}).catch((err) => {
    console.error('Ошибка запуска бота:', err);
});


