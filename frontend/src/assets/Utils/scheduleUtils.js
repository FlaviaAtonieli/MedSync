export const generateWeekDays = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }

  return days;
};

export const generateTimeSlots = () => {
  const slots = [];
  const slotDuration = 80;

  let periods = [
    { startHour: 8, startMinute: 0, endHour: 12, endMinute: 0 },
    { startHour: 13, startMinute: 20, endHour: 17, endMinute: 20 }
  ];

  periods.forEach(period => {
    let current = new Date();
    current.setHours(period.startHour, period.startMinute, 0, 0);
    const end = new Date();
    end.setHours(period.endHour, period.endMinute, 0, 0);

    while (current < end) {
      const hours = current.getHours().toString().padStart(2, '0');
      const minutes = current.getMinutes().toString().padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
      current.setMinutes(current.getMinutes() + slotDuration);
    }
  });

  return slots;
};