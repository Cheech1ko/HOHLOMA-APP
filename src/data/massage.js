export const MASSAGE_MASTER = {
  id: '1',
  name: 'Алексей Авакумов',
  level: 'Ведущий массажист',
  experience: '12 лет',
  specialty: 'Классический, спортивный, антицеллюлитный массаж',
  education: 'Медицинское образование',
  photo: require('../../assets/images/masters/aleksej-massazhist.jpg'),
};

export const MASSAGE_PRICES = {
  back: [
    { name: 'Массаж спины', duration: '60 мин', price: 1500 },
    { name: 'Курс 10 сеансов', duration: 'экономия 3 000₽', price: 12000 },
  ],
  fullBody: [
    { name: 'Массаж всего тела', duration: '60-90 мин', price: 2200 },
    { name: 'Курс 10 сеансов', duration: 'экономия 3 000₽', price: 19000 },
  ],
};