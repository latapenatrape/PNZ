const TelegramBot = require('node-telegram-bot-api');
const { saveChatId } = require('./config');

const TELEGRAM_BOT_TOKEN = '7863345567:AAFgYzP8xExNROwLzvS94_bg-WhZBmY4Zkk';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    await saveChatId(chatId); // Сохраняем chat_id в файл
    bot.sendMessage(chatId, 'Вы зарегистрированы. Теперь вы будете получать заявки.');
  } catch (err) {
    console.error('Ошибка обработки команды /start:', err.message);
    bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
  }
});