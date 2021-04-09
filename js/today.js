const dateBox = document.querySelector(".date");
const dayBox = document.querySelector(".day");

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const dayWeekNames = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const getDateAndHours = () => {
  const date = new Date();
  const dayToday = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return { dayToday, month, year };
};

const includeNumberZero = (number) =>
  String(number).length === 1 ? `0${number}` : number;

const renderDayAndHours = () => {
  const date = new Date();
  const dayWeek = dayWeekNames[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const HTMLTemplate = `
    <p>${dayWeek}</p>
    <p>${includeNumberZero(hours)}:${includeNumberZero(minutes)}</p>
  `;

  dayBox.innerHTML = HTMLTemplate;
};

const renderDate = () => {
  const { dayToday, month, year } = getDateAndHours();

  const HTMLTemplate = `
    <div class="date">
      <span class="date-day">${dayToday}</span>
      <div class="month-year">
        <p>${month}</p>
        <p>${year}</p>
      </div>
    </div>
  `;

  dateBox.innerHTML = HTMLTemplate;

  renderDayAndHours();
};

renderDate();

setInterval(renderDayAndHours, 1000);
