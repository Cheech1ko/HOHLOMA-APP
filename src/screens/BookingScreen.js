import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

// Импорт данных
import { BARBERS, BARBER_PRICES } from '../data/barbers';
import { TATTOO_MASTERS, TATTOO_PRICES } from '../data/tattooMasters';
import { PIERCING_MASTERS, PIERCING_PRICES } from '../data/piercing';
import { MASSAGE_MASTER, MASSAGE_PRICES } from '../data/massage';


const saveToHistory = async (booking) => {
  try {
    const existing = await AsyncStorage.getItem('bookingHistory');
    const history = existing ? JSON.parse(existing) : [];
    history.unshift(booking);
    await AsyncStorage.setItem('bookingHistory', JSON.stringify(history.slice(0, 20)));
  } catch (error) {
    console.error('Ошибка сохранения:', error);
  }
};

// ===== ВСЕ УСЛУГИ =====
const ALL_SERVICES = [
  ...BARBER_PRICES.map(item => ({
    id: `barber_${item.name}`,
    name: item.name,
    category: 'Барбершоп',
    categoryIcon: 'cut',
    prices: item.prices,
    hasLevels: true,
  })),
  ...TATTOO_PRICES.map(item => ({
    id: `tattoo_${item.name}`,
    name: item.name,
    category: 'Тату',
    categoryIcon: 'brush',
    priceStr: item.price,
    hasLevels: false,
  })),
  ...PIERCING_PRICES.map(item => ({
    id: `piercing_${item.name}`,
    name: item.name,
    category: 'Пирсинг',
    categoryIcon: 'body',
    priceStr: item.price,
    hasLevels: false,
  })),
  ...MASSAGE_PRICES.map(item => ({
    id: `massage_${item.name}`,
    name: item.name,
    category: 'Массаж',
    categoryIcon: 'fitness',
    basePrice: item.price,
    hasLevels: false,
  })),
];

// ===== МАСТЕРА ПО КАТЕГОРИЯМ =====
const MASTERS_BY_CATEGORY = {
  'Барбершоп': BARBERS,
  'Тату': TATTOO_MASTERS,
  'Пирсинг': PIERCING_MASTERS,
  'Массаж': [MASSAGE_MASTER],
};

const ALL_MASTERS_FLAT = Object.entries(MASTERS_BY_CATEGORY).flatMap(([category, masters]) =>
  masters.map(m => ({ ...m, category }))
);

const getServicePrice = (service, masterLevel) => {
  if (!service) return 0;
  if (service.hasLevels && service.prices) {
    if (masterLevel === 'TOP' && service.prices.TOP) return service.prices.TOP;
    if (masterLevel === 'PROF' && service.prices.PROF) return service.prices.PROF;
    if (service.prices.BARBER) return service.prices.BARBER;
    const firstPrice = Object.values(service.prices)[0];
    return firstPrice || 0;
  }

if (service.category === 'Тату' && service.priceStr) {
    const cleanStr = service.priceStr.replace(/\s/g, '');
    const numbers = cleanStr.match(/\d+/g);
    if (numbers) {
      return parseInt(numbers[0], 10);
    }
  }
  
  // Для пирсинга
  if (service.category === 'Пирсинг' && service.priceStr) {
    const cleanStr = service.priceStr.replace(/\s/g, '');
    const numbers = cleanStr.match(/\d+/g);
    if (numbers) {
      return parseInt(numbers[0], 10);
    }
  }
  
  if (typeof service.basePrice === 'number') {
    return service.basePrice;
  }
  
  return 0;
};

// Праздничные дни
const HOLIDAYS = [
  '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05', '2026-01-06', '2026-01-07', '2026-01-08',
  '2026-02-23', '2026-03-08', '2026-05-01', '2026-05-09', '2026-06-12', '2026-11-04',
];

const isWeekendOrHoliday = (date) => {
  if (!date) return false;
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  if (HOLIDAYS.includes(dateStr)) return true;
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function BookingScreen({ navigation, route }) {
  const presetMasterName = route.params?.master || null;
  const presetServiceName = route.params?.service || null;
  
  const [step, setStep] = useState(1);
  const [bookingMode, setBookingMode] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  
  // Генерация календаря
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    let firstDayWeekday = firstDayOfMonth.getDay();
    let offset = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < offset; i++) {
      days.push({ date: null, day: null, isCurrentMonth: false });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = new Date(year, month, d);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isWeekend = isWeekendOrHoliday(currentDate);
      
      const isPastDate = currentDate < today;

      days.push({
        date: currentDate,
        day: d,
        isCurrentMonth: true,
        isWeekend: isWeekend || HOLIDAYS.includes(dateStr),
        isHoliday: HOLIDAYS.includes(dateStr),
        isPastDate: isPastDate, 
      });
    }
    
    setCalendarDays(days);
  }, [currentMonth]);
  
  const changeMonth = (delta) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentMonth(newDate);
  };
  
  const handleDateSelect = (dayItem) => {
    if (dayItem.date) {
      setSelectedDate(dayItem.date);
    }
  };
  
  const getTotalPrice = () => {
    if (!selectedService) return 0;
    let basePrice = 0;
    if (selectedMaster) {
      basePrice = getServicePrice(selectedService, selectedMaster.level);
    } else {
      basePrice = getServicePrice(selectedService, 'BARBER');
    }
    const isHoliday = selectedDate ? isWeekendOrHoliday(selectedDate) : false;
    return basePrice + (isHoliday ? 200 : 0);
  };
  
  // Инициализация из route.params
  useEffect(() => {
    if (presetMasterName && !selectedMaster) {
      const foundMaster = ALL_MASTERS_FLAT.find(m => m.name === presetMasterName);
      if (foundMaster) {
        setSelectedMaster(foundMaster);
        setBookingMode('masterFirst');
        setStep('selectServiceForMaster');
      }
    }
    if (presetServiceName && !selectedService) {
      const foundService = ALL_SERVICES.find(s => s.name === presetServiceName);
      if (foundService) {
        setSelectedService(foundService);
        setBookingMode('serviceFirst');
        setStep(3);
      }
    }
  }, [presetMasterName, presetServiceName]);
  
  const getMastersForService = () => {
    if (!selectedService) return [];
    return MASTERS_BY_CATEGORY[selectedService.category] || [];
  };
  
  const getServicesForMaster = () => {
    if (!selectedMaster) return [];
    return ALL_SERVICES.filter(s => s.category === selectedMaster.category);
  };
  
  const handleRandomMaster = () => {
    const randomIndex = Math.floor(Math.random() * ALL_MASTERS_FLAT.length);
    const randomMaster = ALL_MASTERS_FLAT[randomIndex];
    setSelectedMaster(randomMaster);
    setBookingMode('masterFirst');
    setStep('selectServiceForMaster');
  };
  
const handleSubmit = async () => {
  const dateStr = selectedDate ? selectedDate.toLocaleDateString('ru-RU') : 'не указана';
  const isHoliday = selectedDate ? isWeekendOrHoliday(selectedDate) : false;
  
  let userName = 'Гость';
  let userPhone = 'Не указан';
  try {
    const savedName = await AsyncStorage.getItem('userName');
    const savedPhone = await AsyncStorage.getItem('userPhone');
    if (savedName) userName = savedName;
    if (savedPhone) userPhone = savedPhone;
  } catch (e) {
    console.error('Ошибка получения пользователя:', e);
  }
  
  const newBooking = {
    id: Date.now().toString(),
    service: selectedService?.name,
    master: selectedMaster?.name,
    date: dateStr,
    time: selectedTime,
    price: getTotalPrice(),
    isHoliday: isHoliday,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  
  try {
    const existing = await AsyncStorage.getItem('bookingHistory');
    const history = existing ? JSON.parse(existing) : [];
    history.unshift(newBooking);
    await AsyncStorage.setItem('bookingHistory', JSON.stringify(history.slice(0, 20)));
  } catch (e) {
    console.error('Ошибка сохранения:', e);
  }
  
  Alert.alert(
    ' Запись создана!',
    `${selectedService?.name}\nМастер: ${selectedMaster?.name}\nДата: ${dateStr}\nВремя: ${selectedTime}\nСумма: ${getTotalPrice()}₽\n\nСтатус: Ожидает подтверждения`,
    [{ text: 'Отлично', onPress: () => resetBooking() }]
  );
};
  
  const resetBooking = () => {
    setStep(1);
    setBookingMode(null);
    setSelectedService(null);
    setSelectedMaster(null);
    setSelectedDate(null);
    setSelectedTime('');
  };
  
  // ШАГ 1
  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Как хотите записаться?</Text>
      <Text style={styles.stepSubtitle}>Выберите удобный способ</Text>
      
      <TouchableOpacity style={styles.choiceCard} onPress={() => { setBookingMode('serviceFirst'); setStep(2); }} activeOpacity={0.8}>
        <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.choiceCardGradient}>
          <View style={styles.choiceIconContainer}>
            <Ionicons name="apps" size={32} color={Colors.accent} />
          </View>
          <View style={styles.choiceTextContainer}>
            <Text style={styles.choiceTitle}>Выбрать услугу</Text>
            <Text style={styles.choiceDesc}>Сначала выберите услугу, затем мастера</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.textMuted} />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.choiceCard} onPress={() => { setBookingMode('masterFirst'); setStep(2); }} activeOpacity={0.8}>
        <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.choiceCardGradient}>
          <View style={styles.choiceIconContainer}>
            <Ionicons name="people" size={32} color={Colors.accent} />
          </View>
          <View style={styles.choiceTextContainer}>
            <Text style={styles.choiceTitle}>Выбрать мастера</Text>
            <Text style={styles.choiceDesc}>Сначала выберите мастера, затем услугу</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.textMuted} />
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.randomCard} onPress={handleRandomMaster} activeOpacity={0.8}>
        <LinearGradient colors={[Colors.accent, Colors.accentDark]} style={styles.randomCardGradient}>
          <Ionicons name="shuffle" size={28} color={Colors.background} />
          <Text style={styles.randomTitle}>Случайный мастер</Text>
          <Text style={styles.randomDesc}>Доверьте выбор нам</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
  
  // ШАГ 2А: выбор услуги
  const renderServiceSelection = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <TouchableOpacity onPress={resetBooking} style={styles.backButtonSmall}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.stepTitle}>Выберите услугу</Text>
      </View>
      
      <FlatList
        data={ALL_SERVICES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceCard} onPress={() => { setSelectedService(item); setStep(3); }} activeOpacity={0.8}>
            <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.serviceCardGradient}>
              <View style={styles.serviceIconContainer}>
                <Ionicons name={item.categoryIcon} size={28} color={Colors.accent} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.serviceCategory}>{item.category}</Text>
                <Text style={styles.servicePrice}>
                  от {item.hasLevels ? Object.values(item.prices).sort((a,b)=>a-b)[0] : (item.basePrice || item.priceStr)}₽
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </LinearGradient>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
  
  // ШАГ 3: выбор мастера для услуги
  const renderMasterForService = () => {
    const masters = getMastersForService();
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.backButtonSmall}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.stepTitle}>Выберите мастера</Text>
          <Text style={styles.stepSubtitleSmall}>для услуги: {selectedService?.name}</Text>
        </View>
        
        <FlatList
          data={masters}
          keyExtractor={(item) => item.id + item.name}
          renderItem={({ item }) => {
            const price = getServicePrice(selectedService, item.level);
            return (
              <TouchableOpacity style={styles.masterCardBooking} onPress={() => { setSelectedMaster(item); setStep(4); }} activeOpacity={0.8}>
                <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.masterCardGradient}>
                  <View style={styles.masterAvatarContainer}>
                    {item.photo ? (
                      <Image source={item.photo} style={styles.masterAvatar} />
                    ) : (
                      <View style={styles.masterAvatarPlaceholder}>
                        <Text style={styles.masterAvatarText}>{item.name.charAt(0)}</Text>
                      </View>
                    )}
                    <View style={[styles.masterLevelBadge, { backgroundColor: Colors.accent }]}>
                      <Text style={styles.masterLevelText}>{item.level || 'Мастер'}</Text>
                    </View>
                  </View>
                  <View style={styles.masterInfoBooking}>
                    <Text style={styles.masterNameBooking}>{item.name}</Text>
                    <Text style={styles.masterSpecialty}>{item.specialty}</Text>
                    <Text style={styles.masterPrice}>Стоимость: {price}₽</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  // ШАГ 2Б: выбор мастера сначала
  const renderMasterSelection = () => {
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <TouchableOpacity onPress={resetBooking} style={styles.backButtonSmall}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.stepTitle}>Выберите мастера</Text>
        </View>
        
        <FlatList
          data={ALL_MASTERS_FLAT}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.masterCardBooking} onPress={() => { setSelectedMaster(item); setStep('selectServiceForMaster'); }} activeOpacity={0.8}>
              <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.masterCardGradient}>
                <View style={styles.masterAvatarContainer}>
                  {item.photo ? (
                    <Image source={item.photo} style={styles.masterAvatar} />
                  ) : (
                    <View style={styles.masterAvatarPlaceholder}>
                      <Text style={styles.masterAvatarText}>{item.name.charAt(0)}</Text>
                    </View>
                  )}
                  <View style={[styles.masterLevelBadge, { backgroundColor: Colors.accent }]}>
                    <Text style={styles.masterLevelText}>{item.level || 'Мастер'}</Text>
                  </View>
                </View>
                <View style={styles.masterInfoBooking}>
                  <Text style={styles.masterNameBooking}>{item.name}</Text>
                  <Text style={styles.masterSpecialty}>{item.specialty}</Text>
                  <Text style={styles.masterCategory}>{item.category}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
              </LinearGradient>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  // ШАГ 3Б: выбор услуги для мастера
  const renderServiceForMaster = () => {
    const services = getServicesForMaster();
    if (!services || services.length === 0) {
      return (
        <View style={styles.stepContainer}>
          <View style={styles.stepHeader}>
            <TouchableOpacity onPress={() => setStep(2)} style={styles.backButtonSmall}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.stepTitle}>Выберите услугу</Text>
          </View>
          <Text style={styles.emptyText}>У этого мастера пока нет доступных услуг</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <TouchableOpacity onPress={() => setStep(2)} style={styles.backButtonSmall}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.stepTitle}>Выберите услугу</Text>
          <Text style={styles.stepSubtitleSmall}>мастера: {selectedMaster?.name}</Text>
        </View>
        
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const price = getServicePrice(item, selectedMaster?.level);
            return (
              <TouchableOpacity style={styles.serviceCard} onPress={() => { setSelectedService(item); setStep(4); }} activeOpacity={0.8}>
                <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.serviceCardGradient}>
                  <View style={styles.serviceIconContainer}>
                    <Ionicons name={item.categoryIcon} size={28} color={Colors.accent} />
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <Text style={styles.servicePrice}>{price}₽</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  
  // ШАГ 4: выбор даты и времени
  const renderDateTimeSelection = () => {
    const isHoliday = selectedDate ? isWeekendOrHoliday(selectedDate) : false;
    const selectedDateStr = selectedDate ? selectedDate.toLocaleDateString('ru-RU') : null;
    
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <TouchableOpacity onPress={() => {
            if (bookingMode === 'serviceFirst') setStep(3);
            else setStep('selectServiceForMaster');
          }} style={styles.backButtonSmall}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.stepTitle}>Выберите дату и время</Text>
        </View>
        
        <View style={styles.selectionCard}>
          <Text style={styles.selectionLabel}>Вы выбрали:</Text>
          <Text style={styles.selectionValue}>
            {selectedService?.name}
            {selectedMaster ? ` • ${selectedMaster.name}` : ''}
          </Text>
        </View>
        
        {/* Календарь */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthArrow}>
              <Ionicons name="chevron-back" size={24} color={Colors.accent} />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthArrow}>
              <Ionicons name="chevron-forward" size={24} color={Colors.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekdaysRow}>
            {WEEKDAYS.map(day => (
              <Text key={day} style={styles.weekdayText}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {calendarDays.map((item, index) => {
              const isSelected = item.date && selectedDate && selectedDate.toDateString() === item.date.toDateString();
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    item.isCurrentMonth && item.isWeekend && styles.weekendDay,
                    isSelected && styles.selectedDay,
                    !item.isCurrentMonth && styles.otherMonthDay,
                    item.isPastDate && styles.pastDay, 
                  ]}
                  onPress={() => item.isCurrentMonth && item.date && !item.isPastDate && handleDateSelect(item)}
                  disabled={!item.isCurrentMonth || item.isPastDate}
                >
                  <Text style={[
                    styles.calendarDayText,
                    item.isCurrentMonth && item.isWeekend && styles.weekendDayText,
                    isSelected && styles.selectedDayText,
                    !item.isCurrentMonth && styles.otherMonthDayText,
                    item.isPastDate && styles.pastDayText, 
                  ]}>
                    {item.day || ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.holidayLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: Colors.accent, opacity: 0.3 }]} />
            <Text style={styles.legendText}>Выходной/праздник (+200₽)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: Colors.accent }]} />
            <Text style={styles.legendText}>Выбранная дата</Text>
          </View>
        </View>
        
        {selectedDate && (
          <View style={styles.selectedDateCard}>
            <Text style={styles.selectedDateText}>📅 {selectedDateStr}</Text>
            {isHoliday && <Text style={styles.holidayNote}>🎉 Праздничный/выходной день (+200₽)</Text>}
          </View>
        )}
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Время</Text>
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, selectedTime === time && styles.timeSlotSelected]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextSelected]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => setStep(5)} 
          activeOpacity={0.8}
          disabled={!selectedDate || !selectedTime}
        >
          <LinearGradient colors={[Colors.accent, Colors.accentDark]} style={styles.continueButtonGradient}>
            <Text style={styles.continueButtonText}>Продолжить →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  
  // ШАГ 5: итог
  const renderSummary = () => {
    const isHoliday = selectedDate ? isWeekendOrHoliday(selectedDate) : false;
    const basePrice = getTotalPrice() - (isHoliday ? 200 : 0);
    const dateStr = selectedDate ? selectedDate.toLocaleDateString('ru-RU') : 'не указана';
    
    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepHeader}>
          <TouchableOpacity onPress={() => setStep(4)} style={styles.backButtonSmall}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.stepTitle}>Подтверждение записи</Text>
        </View>
        
        <LinearGradient colors={[Colors.surface, Colors.surfaceLight]} style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Детали записи</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Ionicons name="cut" size={20} color={Colors.accent} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Услуга</Text>
              <Text style={styles.summaryValue}>{selectedService?.name}</Text>
            </View>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Ionicons name="person" size={20} color={Colors.accent} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Мастер</Text>
              <Text style={styles.summaryValue}>{selectedMaster?.name}</Text>
              <Text style={styles.summarySubValue}>{selectedMaster?.level || 'Мастер'}</Text>
            </View>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={styles.summaryIcon}>
              <Ionicons name="calendar" size={20} color={Colors.accent} />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Дата и время</Text>
              <Text style={styles.summaryValue}>{dateStr} • {selectedTime || 'не указано'}</Text>
              {isHoliday && <Text style={styles.holidayBadge}>🎉 Праздничный/выходной день (+200₽)</Text>}
            </View>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceBreakLabel}>Стоимость услуги</Text>
              <Text style={styles.priceBreakValue}>{basePrice}₽</Text>
            </View>
            {isHoliday && (
              <View style={styles.priceRow}>
                <Text style={styles.priceBreakLabel}>Наценка (праздник/выходной)</Text>
                <Text style={styles.surchargeValue}>+200₽</Text>
              </View>
            )}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Итого к оплате</Text>
              <Text style={styles.totalPrice}>{getTotalPrice()}₽</Text>
            </View>
          </View>
        </LinearGradient>
        
        <TouchableOpacity style={styles.submitFinalButton} onPress={handleSubmit} activeOpacity={0.8}>
          <LinearGradient colors={[Colors.accent, Colors.accentDark]} style={styles.submitFinalButtonGradient}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.background} />
            <Text style={styles.submitFinalButtonText}>Подтвердить запись</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderContent = () => {
    if (step === 1) return renderStep1();
    if (step === 2 && bookingMode === 'serviceFirst') return renderServiceSelection();
    if (step === 2 && bookingMode === 'masterFirst') return renderMasterSelection();
    if (step === 3 && bookingMode === 'serviceFirst') return renderMasterForService();
    if (step === 'selectServiceForMaster') return renderServiceForMaster();
    if (step === 4) return renderDateTimeSelection();
    if (step === 5) return renderSummary();
    return null;
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Запись онлайн</Text>
        <Text style={styles.subtitle}>
          {step === 1 && 'Выберите способ записи'}
          {step === 2 && bookingMode === 'serviceFirst' && 'Выберите услугу'}
          {step === 2 && bookingMode === 'masterFirst' && 'Выберите мастера'}
          {step === 3 && bookingMode === 'serviceFirst' && 'Выберите мастера'}
          {step === 'selectServiceForMaster' && 'Выберите услугу'}
          {step === 4 && 'Выберите дату и время'}
          {step === 5 && 'Подтвердите запись'}
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: Spacing.xl, paddingBottom: Spacing.md, paddingHorizontal: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border, position: 'relative' },
  backButton: { position: 'absolute', left: Spacing.md, top: Spacing.xl, zIndex: 1, padding: Spacing.sm },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.accent, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 12, color: Colors.textSecondary, textAlign: 'center' },
  scrollView: { flex: 1 },
  stepContainer: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.lg, flexWrap: 'wrap' },
  stepTitle: { fontSize: 22, fontWeight: 'bold', color: Colors.text, flex: 1, textAlign: 'center' },
  stepSubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xl },
  stepSubtitleSmall: { fontSize: 12, color: Colors.accent, textAlign: 'center', width: '100%', marginTop: 4 },
  backButtonSmall: { padding: Spacing.sm },
  emptyText: { textAlign: 'center', color: Colors.textMuted, padding: Spacing.xl },
  
  choiceCard: { marginBottom: Spacing.md, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  choiceCardGradient: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  choiceIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  choiceTextContainer: { flex: 1 },
  choiceTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 2 },
  choiceDesc: { fontSize: 12, color: Colors.textSecondary },
  
  randomCard: { marginTop: Spacing.md, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  randomCardGradient: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, justifyContent: 'center', gap: 12 },
  randomTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.background },
  randomDesc: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  
  serviceCard: { marginBottom: Spacing.md, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  serviceCardGradient: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  serviceIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 2 },
  serviceCategory: { fontSize: 11, color: Colors.accent, marginBottom: 2 },
  servicePrice: { fontSize: 14, fontWeight: '600', color: Colors.accent },
  
  masterCardBooking: { marginBottom: Spacing.md, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  masterCardGradient: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  masterAvatarContainer: { position: 'relative', marginRight: Spacing.md },
  masterAvatar: { width: 56, height: 70, borderRadius: 15 },
  masterAvatarPlaceholder: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.surfaceLight, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.accent },
  masterAvatarText: { fontSize: 22, fontWeight: 'bold', color: Colors.accent },
  masterLevelBadge: { position: 'absolute', bottom: -4, right: -4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: BorderRadius.round },
  masterLevelText: { fontSize: 8, fontWeight: 'bold', color: Colors.background },
  masterInfoBooking: { flex: 1 },
  masterNameBooking: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 2 },
  masterSpecialty: { fontSize: 12, color: Colors.textSecondary, marginBottom: 2 },
  masterCategory: { fontSize: 11, color: Colors.accent, marginBottom: 2 },
  masterPrice: { fontSize: 13, fontWeight: 'bold', color: Colors.accent },
  
  selectionCard: { backgroundColor: Colors.surfaceLight, padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.accent },
  selectionLabel: { fontSize: 12, color: Colors.textMuted, marginBottom: 4 },
  selectionValue: { fontSize: 14, fontWeight: '600', color: Colors.text },
  
calendarContainer: { 
  backgroundColor: Colors.surface, 
  borderRadius: BorderRadius.lg, 
  padding: Spacing.md, 
  marginBottom: Spacing.md, 
  borderWidth: 1, 
  borderColor: Colors.border 
},
calendarHeader: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginBottom: Spacing.md 
},
monthArrow: { 
  padding: Spacing.sm 
},
monthTitle: { 
  fontSize: 18, 
  fontWeight: 'bold', 
  color: Colors.accent 
},
weekdaysRow: { 
  flexDirection: 'row', 
  marginBottom: Spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: Colors.border,
  paddingBottom: Spacing.sm
},
weekdayText: { 
  flex: 1, 
  textAlign: 'center', 
  fontSize: 14, 
  color: Colors.accent, 
  fontWeight: 'bold' 
},
calendarGrid: { 
  flexDirection: 'row', 
  flexWrap: 'wrap' 
},
calendarDay: { 
  width: '14.28%',  // 100% / 7 дней
  aspectRatio: 1, 
  justifyContent: 'center', 
  alignItems: 'center', 
  borderRadius: BorderRadius.round,
  marginVertical: 2,
},
weekendDay: { 
  backgroundColor: Colors.accent + '20' 
},
selectedDay: { 
  backgroundColor: Colors.accent 
},
otherMonthDay: { 
  opacity: 0.3 
},
calendarDayText: { 
  fontSize: 16, 
  fontWeight: '500',
  color: Colors.text 
},
weekendDayText: { 
  color: Colors.accent 
},
selectedDayText: { 
  color: Colors.background, 
  fontWeight: 'bold' 
},
otherMonthDayText: { 
  color: Colors.textMuted 
},
pastDay: {
  backgroundColor: Colors.surfaceLight,
  opacity: 0.5,
},
pastDayText: {
  color: Colors.textMuted,
  textDecorationLine: 'line-through',
},
  
  holidayLegend: 
  { flexDirection: 'row',
    justifyContent: 'center', 
    gap: Spacing.md, 
    marginBottom: Spacing.md, 
    flexWrap: 'wrap' 
  },
  legendItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  },
  legendColor: { 
    width: 16, 
    height: 16, 
    borderRadius: 
    BorderRadius.sm 
  },
  legendText: { 
    fontSize: 10, 
    color: Colors.textMuted 
  },
  selectedDateCard: { 
    backgroundColor: Colors.surfaceLight, 
    padding: Spacing.sm, 
    borderRadius: BorderRadius.md, 
    marginBottom: Spacing.md, 
    alignItems: 'center' 
  },
  selectedDateText: { fontSize: 14, color: Colors.text },
  holidayNote: { fontSize: 11, color: Colors.accent, marginTop: 4 },
  
  inputGroup: { marginBottom: Spacing.md },
  label: { fontSize: 14, fontWeight: '500', color: Colors.text, marginBottom: Spacing.xs },
  
  timeSlotsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeSlot: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.round, borderWidth: 1, borderColor: Colors.border },
  timeSlotSelected: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  timeSlotText: { fontSize: 14, color: Colors.textSecondary },
  timeSlotTextSelected: { color: Colors.background, fontWeight: 'bold' },
  
  continueButton: { marginTop: Spacing.lg, borderRadius: BorderRadius.round, overflow: 'hidden' },
  continueButtonGradient: { alignItems: 'center', paddingVertical: Spacing.md },
  continueButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.background },
  
  summaryCard: { borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.border },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.accent, marginBottom: Spacing.md, textAlign: 'center' },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  summaryIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(212, 175, 55, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: Spacing.md },
  summaryContent: { flex: 1 },
  summaryLabel: { fontSize: 11, color: Colors.textMuted, marginBottom: 2 },
  summaryValue: { fontSize: 14, fontWeight: '500', color: Colors.text },
  summarySubValue: { fontSize: 11, color: Colors.accent, marginTop: 2 },
  holidayBadge: { fontSize: 10, color: Colors.accent, marginTop: 4 },
  summaryDivider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  
  priceBreakdown: { marginTop: Spacing.sm },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  priceBreakLabel: { fontSize: 13, color: Colors.textSecondary },
  priceBreakValue: { fontSize: 13, color: Colors.text },
  surchargeValue: { fontSize: 13, color: Colors.accent },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: Colors.accent },
  
  submitFinalButton: { borderRadius: BorderRadius.round, overflow: 'hidden', marginTop: Spacing.sm },
  submitFinalButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.md, gap: 8 },
  submitFinalButtonText: { fontSize: 16, fontWeight: 'bold', color: Colors.background },
});