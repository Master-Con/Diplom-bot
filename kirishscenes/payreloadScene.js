const User = require('../models/User')
const Scene = require('telegraf/scenes/base');

const payreloadScene = new Scene(`payreloadScene`)

payreloadScene.enter(async ctx => {
    ctx.reply(`📝⁉️Xatolikni yoki muammoni yozma ravishda tushuntirib bering`)
})

payreloadScene.on(`text`, ctx => {
    const user = ctx.session.user
    const userIndex = User.findOne({ index: user.index})
    const errortext = ctx.message.text;
    ctx.telegram.sendMessage(-1002098790619, `✉️${errortext}\n👤Foydalanuvchining IDsi: ${user.index}`)
    ctx.reply(`📩Sizning xabariz qabul qilindi tez orada siz bilan bog'lanishadi`)
    ctx.scene.leave()
})

module.exports = payreloadScene