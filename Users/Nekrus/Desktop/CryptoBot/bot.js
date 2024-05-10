const { CryptoPay, Assets, PaidButtonNames } = require('@foile/crypto-pay-api');
const TelegramBot = require('node-telegram-bot-api');
const tokenbot = '6720047744:AAEbfVmsJHwI6vu5lde6co-uVgtDstXS0aQ';
const tokenpay = '13180:AAUblyBNWpRJdCeU2AasDrQW9DC5MBRrdym';

// Инициализация Telegram бота
const bot = new TelegramBot(tokenbot, { polling: true });

// Инициализация Crypto Pay API
const cryptoPay = new CryptoPay(tokenpay, {
    hostname: 'testnet-pay.crypt.bot',
    protocol: 'https',
    webhook: {
        serverHostname: 'localhost',
        serverPort: 4200,
        path: '/secret-path'
      },
});

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я твой криптовалютный бот. Чтобы сделать платеж, используй команду /pay.');
});

// Обработчик команды /pay
bot.onText(/\/pay/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Введите сумму в USDT:');
});

// Обработчик текстовых сообщений с суммой
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const amount = parseFloat(msg.text.replace(',', '.')); // Заменяем запятую на точку и преобразуем в число
    if (isNaN(amount)) {
        bot.sendMessage(chatId, 'Неверный формат суммы.');
        return;
    }
    // Создание счета-фактуры
    cryptoPay.createInvoice(Assets.USDT, amount, {
        currency_type: 'crypto',
        asset: 'USDT', // Указываем криптовалюту
        description: 'Payment for goods',
        paid_btn_name: PaidButtonNames.OPEN_CHANNEL,
        paid_btn_url: 'https://t.me/oakcrypton', // Изменяем URL кнопки
        allow_anonymous: false
    }).then((invoice) => {
        const invoiceUrl = invoice.bot_invoice_url;
        bot.sendMessage(chatId, `Чтобы оплатить, перейдите по ссылке: ${invoiceUrl}`, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Проверить Оплату',
                        callback_data: 'check_payment'
                    }]
                ]
            }
        });
    }).catch((error) => {
        console.error('Error creating invoice:', error);
        bot.sendMessage(chatId, 'Произошла ошибка при создании счета-фактуры.');
    });
});

// Обработчик нажатия на инлайн кнопку
bot.on('callback_query', (query) => {
    if (query.data === 'check_payment') {
        const chatId = query.message.chat.id;
        // Получаем идентификатор сообщения, для которого была нажата кнопка
        const messageId = query.message.message_id;
        // Получаем информацию о последнем отправленном сообщении в этом чате
        bot.sendMessage(chatId, 'Получение информации о статусе оплаты...').then(sentMessage => {
            // Создаем счет-фактуру
            cryptoPay.getInvoices().then((invoices) => {
                if (invoices && invoices.length > 0) {
                    // Проверяем статус только для последней созданной счет-фактуры
                    const lastInvoice = invoices[0];
                    const invoiceStatus = lastInvoice.status;
                    if (invoiceStatus === 'оплаченный') {
                        bot.editMessageText('Счет успешно оплачен!', {
                            chat_id: chatId,
                            message_id: sentMessage.message_id
                        });
                    } else {
                        bot.editMessageText('Счет еще не оплачен.', {
                            chat_id: chatId,
                            message_id: sentMessage.message_id
                        });
                    }
                } else {
                    bot.editMessageText('Счет еще не создан.', {
                        chat_id: chatId,
                        message_id: sentMessage.message_id
                    });
                }
            }).catch((error) => {
                console.error('Error getting invoices:', error);
                bot.editMessageText(`Произошла ошибка при получении информации о статусе оплаты: ${error.message}`, {
                    chat_id: chatId,
                    message_id: sentMessage.message_id
                });
            });
        });
    }
});

