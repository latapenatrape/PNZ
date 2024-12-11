const fs = require('fs').promises;
const path = require('path');

// Путь к файлу для хранения chat_id
const CHAT_ID_FILE = path.join(__dirname, 'chat_id.json');

// Функция для отправки сообщения в Telegram
const axios = require('axios');
const TELEGRAM_BOT_TOKEN = '7863345567:AAFgYzP8xExNROwLzvS94_bg-WhZBmY4Zkk';

async function sendTelegramMessage(chatId, message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: chatId,
    text: message,
  });
}

// Функция для сохранения chat_id
async function saveChatId(chatId) {
  try {
    // Сохраняем chat_id в JSON-файл
    const data = { chatId };
    await fs.writeFile(CHAT_ID_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('chat_id успешно сохранён:', chatId);
  } catch (err) {
    console.error('Ошибка сохранения chat_id:', err.message);
  }
}

// Функция для получения chat_id
async function getChatId() {
  try {
    // Читаем содержимое файла
    const data = await fs.readFile(CHAT_ID_FILE, 'utf8');
    const { chatId } = JSON.parse(data);
    return chatId;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('Файл chat_id.json не найден.');
    } else {
      console.error('Ошибка чтения chat_id.json:', err.message);
    }
    return null;
  }
}

module.exports = {
  sendTelegramMessage,
  saveChatId,
  getChatId,
};