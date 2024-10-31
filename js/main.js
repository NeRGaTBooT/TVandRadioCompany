// Кастомные аудио
const audios = document.getElementsByClassName('custom-audio');

for (let element of audios) {
    let audio = element.querySelector('audio');
    let playBtn = element.querySelector('#play');
    let pauseBtn = element.querySelector('#pause');
    let seekBar = element.querySelector('#seek-bar');
    let currentTime = element.querySelector('#current-time');
    let duration = element.querySelector('#duration');

    audio.addEventListener('loadedmetadata', function() {
        seekBar.max = audio.duration;
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60);
        duration.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    playBtn.addEventListener('click', () => {
        let playing = document.querySelector('.custom-audio > .audio-btn.pause:not(.hide)');
        if (playing) {
            playing.classList.add('hide');
            let playBtn = playing.parentElement.querySelector('#play');
            playBtn.classList.remove('hide');
        }

        pauseBtn.classList.remove('hide');
        playBtn.classList.add('hide');
        audio.play();
    });

    pauseBtn.addEventListener('click', () => {
        pauseBtn.classList.add('hide');
        playBtn.classList.remove('hide');
        audio.pause();
    });

    audio.addEventListener('timeupdate', function() {
        seekBar.value = audio.currentTime;
        let minutes = Math.floor(audio.currentTime / 60);
        let seconds = Math.floor(audio.currentTime % 60);
        currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    seekBar.addEventListener('input', function() {
        audio.currentTime = seekBar.value;
    });
}


// Бургер-меню
const burger = document.getElementById('burger');
const navMain = document.querySelector('.nav_main');
const burgerIcon = document.getElementById('burger-icon');

burger.addEventListener('click', () => {
    if (navMain.classList.contains('active')) {
        navMain.classList.remove('active');
        setTimeout(() => {
            navMain.style.display = 'none'; // Установка display: none после анимации
        }, 300); // Длительность анимации
        burgerIcon.src = 'img/ico/menu.svg'; // Путь к изображению меню
    } else {
        navMain.style.display = 'block'; // Установка display: block при открытии
        setTimeout(() => {
            navMain.classList.add('active'); // Добавление класса active после отображения
        }, 10); // Небольшая задержка для корректной анимации
        burgerIcon.src = 'img/ico/x.svg'; // Путь к изображению крестика
    }
});

// Модальное окно
var modal = document.getElementById("modal_news");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];
var body = document.querySelector("body");

// Клик по ссылке "Прислать новость"
btn.onclick = function() {
    if (window.innerWidth <= 1140) { // Проверка ширины окна, чтобы закрыть меню только на мобильных устройствах
        navMain.classList.remove('active'); // Закрыть меню
        navMain.style.display = 'none'; // Установить display: none
        burgerIcon.src = 'img/ico/menu.svg'; // Вернуть иконку меню в исходное состояние
    }
    modal.style.display = "block";
    body.style.overflow = "hidden"; // Запретить скролл основного содержимого
}

// Клик на закрыть кнопку
span.onclick = function() {
    modal.style.display = "none";
    body.style.overflow = "auto"; // Разрешить скролл основного содержимого
}

// Клик вне модального окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflow = "auto"; // Разрешить скролл основного содержимого
    }
}

// ТАБЫ
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс к нажатой кнопке
        button.classList.add('active');

        // Скрываем все содержимое
        document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
        
        // Показываем соответствующее содержимое
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// поиск
const content = [
    { title: "Глобальное потепление: учёные бьют тревогу", url: "news_block.html" },
    { title: "Крупная сделка: компания X поглощает компанию Y", url: "news_block.html" },
    { title: "Технологические инновации: Анонс нового смартфона", url: "news_block.html" },
    { title: "Культура на подъеме: Выставка современного искусства открылась в центре", url: "news_block.html" },
    { title: "Наука: Новый вид динозавра обнаружен в Южной Америке", url: "news_block.html" },
    { title: "Путешествия: Туризм восстанавливается после пандемии", url: "news_block.html" },
    { title: "Мода: Уличный стиль становится главным трендом сезона", url: "news_block.html" },
    { title: "Спорт: Команда страны вышла в финал чемпионата мира", url: "news_block.html" }
];

// Открытие и закрытие панели поиска
document.getElementById('searchToggle').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    const searchBox = document.getElementById('searchBox');
    const navMain = document.getElementById('navMain');
    const logo = document.querySelector('.logo');
    const closeIcon = document.getElementById('closeSearch');

    if (getComputedStyle(searchBox).display === 'block') {
        // Закрываем поиск
        searchBox.style.display = 'none';
        navMain.style.display = 'flex'; // Показываем основное меню
        logo.style.display = 'block'; // Показываем логотип
        closeIcon.style.display = 'none'; // Скрываем крестик
        document.getElementById('searchInput').value = ''; // Очищаем инпут
    } else {
        // Открываем поиск
        navMain.style.display = 'none'; // Скрываем основное меню
        logo.style.display = 'none'; // Скрываем логотип
        searchBox.style.display = 'block'; // Показываем строку поиска
        closeIcon.style.display = 'block'; // Показываем крестик
        document.getElementById('searchInput').focus(); // Устанавливаем фокус на инпут
    }
});

// Обработчик для ввода текста в поле поиска
document.getElementById('searchInput').addEventListener('input', function() {
    const inputValue = this.value.toLowerCase();
    const resultsBox = document.getElementById('results');
    resultsBox.innerHTML = ''; // Очищаем предыдущие результаты

    if (inputValue) {
        const filteredResults = content.filter(item => item.title.toLowerCase().includes(inputValue));

        if (filteredResults.length > 0) {
            resultsBox.style.display = 'block'; // Показываем результаты
            filteredResults.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.textContent = result.title;

                // Обработчик клика на элементе результата
                resultItem.addEventListener('click', function() {
                    window.location.href = result.url; // Переход на соответствующую страницу
                });

                resultsBox.appendChild(resultItem);
            });
        } else {
            resultsBox.style.display = 'none'; // Скрываем, если нет совпадений
        }
    } else {
        resultsBox.style.display = 'none'; // Скрываем, если поле пустое
    }
});

// Закрытие поиска при клике на крестик
document.getElementById('closeSearch').addEventListener('click', function() {
    const resultsBox = document.getElementById('results');
    resultsBox.style.display = 'none'; // Скрываем результаты
    document.getElementById('searchInput').value = ''; // Очищаем поле ввода
    document.getElementById('searchBox').style.display = 'none'; // Скрываем строку поиска
    document.getElementById('navMain').style.display = 'flex'; // Показываем основное меню
    document.querySelector('.logo').style.display = 'block'; // Показываем логотип
    this.style.display = 'none'; // Скрываем крестик
});

// Закрытие поиска при клике вне header
document.addEventListener('click', function(event) {
    const header = document.querySelector('.header');
    const searchBox = document.getElementById('searchBox');
    const resultsBox = document.getElementById('results');
    
    // Проверяем, произошел ли клик вне header и поля поиска
    if (!header.contains(event.target) && searchBox.style.display === 'block') {
        // Закрываем поиск
        searchBox.style.display = 'none';
        resultsBox.style.display = 'none'; // Скрываем результаты
        document.getElementById('searchInput').value = ''; // Очищаем поле ввода
        document.getElementById('navMain').style.display = 'flex'; // Показываем основное меню
        document.querySelector('.logo').style.display = 'block'; // Показываем логотип
        document.getElementById('closeSearch').style.display = 'none'; // Скрываем крестик
    }
});




// смена темы

// Устанавливаем начальную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme'; // По умолчанию светлая тема
    document.body.className = savedTheme; // Устанавливаем сохраненную тему
});

// Слушатель для переключения темы
document.getElementById('themeToggle').addEventListener('click', function() {
    const currentTheme = document.body.className;
    
    // Переключаем тему
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme'); // Сохраняем темную тему
    } else {
        document.body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme'); // Сохраняем светлую тему
    }
});