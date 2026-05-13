export const sendToCRM = async (bookingData) => {
  const CRM_API_URL = 'https://api.arnika.ru/v1/booking';
  const API_KEY = 'YOUR_API_KEY';
  
  try {
    const response = await fetch(CRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({
        service: bookingData.service,
        master: bookingData.master,
        client_name: bookingData.name,
        client_phone: bookingData.phone,
        date: bookingData.date,
        time: bookingData.time,
        price: bookingData.price,
      }),
    });
    return { success: response.ok };
  } catch (error) {
    console.error('CRM error:', error);
    return { success: false, error };
  }
};