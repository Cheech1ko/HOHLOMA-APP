export const TATTOO_MASTERS = [
  {
    id: '1',
    name: 'Даниил Грачёв',
    level: 'Ведущий мастер',
    style: 'Реализм, графика',
    experience: '8 лет',
    specialty: 'Участник международных конвенций',
    price: { small: 7000, session: 17000, coverup: 17000 },
    photo: require('../../assets/images/masters/daniil-grachev-tatu-master.jpg'),
  },
  {
    id: '2',
    name: 'Анастасия Шиндина',
    level: 'Ведущий мастер',
    style: 'Женские тату, линии, орнаменты, акварель',
    experience: '5 лет',
    specialty: 'Мастер женских тату',
    price: { small: 4000, session: 9000, coverup: null },
    photo: require('../../assets/images/masters/anastasija-shindina-tatu-master.jpg'),
  },
  {
    id: '3',
    name: 'Юрий Манохин',
    level: 'Ведущий мастер',
    style: 'Биомеханика, треш-полька, перекрытия',
    experience: '10 лет',
    specialty: 'Мастер крупных работ',
    price: { small: 8000, session: 19000, coverup: 19000 },
    photo: require('../../assets/images/masters/jurij-manohin-tatu-master.jpg'),
  },
];

export const TATTOO_FEATURES = [
  'Стерильность',
  'Индивидуальные эскизы',
  'Безопасные красители',
  'Опытные мастера',
];


export const TATTOO_PRICES = [
  { name: 'Небольшая татуировка до 5 см', price: '4 000₽' },
  { name: '1 сеанс (3 часа работы)', price: '9 000₽' },
  { name: 'Перекрытие старых тату/шрамов', price: '17 000₽' },
  { name: 'Разработка индивидуального эскиза', price: '2 000₽' },
];

export const WEEKEND_SURCHARGE = 200;