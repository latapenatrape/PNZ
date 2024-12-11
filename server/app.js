const express = require('express');
const bodyParser = require('body-parser');
const { sendTelegramMessage, getChatId } = require('./config');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
  const { name, phone, message } = req.body;

  try {
    // Получение chat_id из сохранённого файла
    const chatId = await getChatId();
    if (!chatId) {
      return res.status(400).send('Бот не настроен: никто не отправил /start.');
    }

    // Отправка сообщения в Telegram
    await sendTelegramMessage(chatId, `📩 Новая заявка:\n🔸 Имя: ${name}\n📞 Телефон: ${phone}\n✉️ Сообщение: ${message}`);
    res.status(200).send('OK');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));