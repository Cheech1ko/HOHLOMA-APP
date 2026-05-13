export const PIERCING_MASTERS = [
  {
    id: '1',
    name: 'Виктория Томс',
    level: 'Топ-пирсер',
    experience: '7 лет',
    medical: true,
    specialty: 'Любые виды пирсинга, микродермалы',
    price: 2500,
    photo: require('../../assets/images/masters/viktorija-pirser-master.jpg'),
  },
  {
    id: '2',
    name: 'Алексей Бобров',
    level: 'Младший пирсер',
    experience: '2 года',
    medical: false,
    specialty: 'Проколы мочек, хрящей, пупка',
    price: 2000,
    photo: require('../../assets/images/masters/aleksej-mladshij-pirser.jpg'),
  },
];

export const PIERCING_PRICES = [
  { name: 'Один/два прокола у топ-мастера Виктории', price: '2 500₽' },
  { name: 'Один/два прокола у мастера Алексея', price: '2 000₽' },
  { name: 'Пирсинг сосков (два прокола)', price: '4 000₽' },
  { name: 'Генитальный пирсинг (только женский)', price: '4 000₽' },
  { name: 'Установка одного/двух микродермалов', price: '3 500₽' },
  { name: 'Чистка/удаление микродермала', price: '500₽' },
  { name: 'Восстановление прокола без иглы', price: '1 000₽' },
  { name: 'Осмотр/консультация по нашим проколам', price: '200₽' },
  { name: 'Осмотр/консультация по чужим проколам', price: '500₽' },
  { name: 'Заменить/снять/надеть украшение', price: '400₽' },
];

export const JEWELRY_PRICES = [
  { name: 'Базовые титановые украшения', desc: 'простой шарик', price: '1 200₽/шт' },
  { name: 'Титановые украшения с камнями', desc: 'кристаллы, опалы', price: 'от 3 000₽ до 15 000₽' },
  { name: 'Золотые украшения', desc: 'высшая проба', price: 'от 8 700₽ до 40 000₽' },
];