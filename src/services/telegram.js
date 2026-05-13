const BOT_TOKEN = '8656931216:AAEy3jp2vQogufw-ObAQkW3HhbIvlUpH7GU';
const CHAT_ID = '1889799383'

export const sendBookingToTelegram = async (bookingData) => {
  const message = `🆕 НОВАЯ ЗАПИСЬ В HOCHLOMA

👤 Имя: ${bookingData.name}
📱 Телефон: ${bookingData.phone}
✂️ Услуга: ${bookingData.service}
👨‍🎨 Мастер: ${bookingData.master}
📅 Дата: ${bookingData.date}
⏰ Время: ${bookingData.time}
💰 Сумма: ${bookingData.price}₽`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    console.log('Telegram response:', result);
    return { success: result.ok };
  } catch (error) {
    console.error('Telegram error:', error);
    return { success: false, error: error.message };
  }
};