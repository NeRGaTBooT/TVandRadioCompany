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

