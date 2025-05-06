const songsList = [
    {
        name: "Помним",
        artist: "Kunteynir",
        src: "assets/Pasha.mp3",
        cover: "assets/Pasha.jpg"
    },
    {
        name: "В качестве захватчика",
        artist: "партизанеоколо",
        src: "assets/Partizan.mp3",
        cover: "assets/Partizan.jpg"
    },
    {
        name: "Слёзы",
        artist: "BADGRUB",
        src: "assets/Sliozy.mp3",
        cover: "assets/Sliozy.jpg"
    }
];

const artistName = document.querySelector('.artist-name'); // Находит элемент с классом 'artist-name' и сохраняет его в переменной artistName
const musicName = document.querySelector('.song-name'); // Находит элемент с классом 'song-name' и сохраняет его в переменной musicName
const fillBar = document.querySelector('.fill-bar'); // Находит элемент с классом 'fill-bar' и сохраняет его в переменной fillBar
const time = document.querySelector('.time'); // Находит элемент с классом 'time' и сохраняет его в переменной time
const cover = document.getElementById('cover'); // Находит элемент с id 'cover' и сохраняет его в переменной cover
const playBtn = document.getElementById('play'); // Находит элемент с id 'play' и сохраняет его в переменной playBtn
const prevBtn = document.getElementById('prev'); // Находит элемент с id 'prev' и сохраняет его в переменной prevBtn
const nextBtn = document.getElementById('next'); // Находит элемент с id 'next' и сохраняет его в переменной nextBtn
const prog = document.querySelector('.progress-bar'); // Находит элемент с классом 'progress-bar' и сохраняет его в переменной prog

let song = new Audio(); // Создает новый объект Audio для воспроизведения музыки
let currentSong = 0; // Инициализирует переменную currentSong, которая будет хранить индекс текущей песни
let playing = false; // Инициализирует переменную playing, которая будет отслеживать состояние воспроизведения (играет или нет)

document.addEventListener('DOMContentLoaded', () => { // Добавляет обработчик события, который сработает после полной загрузки DOM
    loadSong(currentSong); // Загружает текущую песню по индексу currentSong
    song.addEventListener('timeupdate', updateProgress); // Добавляет обработчик события для обновления прогресса песни
    song.addEventListener('ended', nextSong); // Добавляет обработчик события, который сработает, когда песня закончится, для перехода к следующей песне
    prevBtn.addEventListener('click', prevSong); // Добавляет обработчик события для кнопки "предыдущая песня"
    nextBtn.addEventListener('click', nextSong); // Добавляет обработчик события для кнопки "следующая песня"
    playBtn.addEventListener('click', togglePlayPause); // Добавляет обработчик события для кнопки воспроизведения/паузы
    prog.addEventListener('click', seek); // Добавляет обработчик события для клика по прогресс-бару, чтобы перемотать песню
});

function loadSong(index) { // Функция для загрузки песни по индексу
    const { name, artist, src, cover: thumb } = songsList[index]; // Деструктуризация объекта песни из массива songsList по индексу
    artistName.innerText = artist; // Устанавливает текст элемента artistName на имя исполнителя
    musicName.innerText = name; // Устанавливает текст элемента musicName на название песни
    song.src = src; // Устанавливает источник аудио для объекта song
    cover.style.backgroundImage = `url(${thumb})`; // Устанавливает фоновое изображение для элемента cover на обложку песни
}

function updateProgress() { // Функция для обновления прогресса воспроизведения песни
    if (song.duration) { // Проверяет, есть ли длительность песни
        const pos = (song.currentTime / song.duration) * 100; // Вычисляет процентное соотношение текущего времени к общей длительности
        fillBar.style.width = `${pos}%`; // Устанавливает ширину заполненной части прогресс-бара в зависимости от текущего времени

        const duration = formatTime(song.duration); // Форматирует общую длительность песни в удобочитаемый формат
        const currentTime = formatTime(song.currentTime); // Форматирует текущее время воспроизведения в удобочитаемый формат
        time.innerText = `${currentTime} - ${duration}`; // Обновляет текст элемента time, показывая текущее время и общую длительность
    }
}

function formatTime(seconds) { // Функция для форматирования времени из секунд в "минуты:секунды"
    const minutes = Math.floor(seconds / 60); // Вычисляет количество полных минут
    const secs = Math.floor(seconds % 60); // Вычисляет количество оставшихся секунд
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Возвращает строку в формате "минуты:секунды", добавляя ноль перед секундами, если они меньше 10
}

function togglePlayPause() { // Функция для переключения между воспроизведением и паузой
    if (playing) { // Если песня в данный момент играет
        song.pause(); // Приостанавливает воспроизведение песни
    } else { // Если песня не играет
        song.play(); // Запускает воспроизведение песни
    }
    playing = !playing; // Переключает состояние переменной playing
    playBtn.classList.toggle('fa-pause', playing); // Меняет класс кнопки воспроизведения на 'fa-pause', если песня играет
    playBtn.classList.toggle('fa-play', !playing); // Меняет класс кнопки воспроизведения на 'fa-play', если песня не играет
    cover.classList.toggle('active', playing); // Добавляет или удаляет класс 'active' у элемента cover в зависимости от состояния воспроизведения
}

function nextSong() { // Функция для перехода к следующей песне
    currentSong = (currentSong + 1) % songsList.length; // Увеличивает индекс текущей песни, переходя к следующей, и возвращается к первой, если достигнут конец списка
    playMusic(); // Запускает воспроизведение следующей песни
}

function prevSong() { // Функция для перехода к предыдущей песне
    currentSong = (currentSong - 1 + songsList.length) % songsList.length; // Уменьшает индекс текущей песни, переходя к предыдущей, и возвращается к последней, если достигнут начало списка
    playMusic(); // Запускает воспроизведение предыдущей песни
}

function playMusic() { // Функция для воспроизведения текущей песни
    loadSong(currentSong); // Загружает песню по текущему индексу
    song.play(); // Запускает воспроизведение песни
    playing = true; // Устанавливает состояние воспроизведения на "играет"
    playBtn.classList.add('fa-pause'); // Добавляет класс 'fa-pause' к кнопке воспроизведения, чтобы отобразить иконку паузы
    playBtn.classList.remove('fa-play'); // Удаляет класс 'fa-play' у кнопки воспроизведения, чтобы скрыть иконку воспроизведения
    cover.classList.add('active'); // Добавляет класс 'active' к элементу cover, чтобы применить стили для активного состояния
}

function seek(e) { // Функция для перемотки песни по клику на прогресс-бар
    const pos = (e.offsetX / prog.clientWidth) * song.duration; // Вычисляет новое время воспроизведения на основе позиции клика по прогресс-бару
    song.currentTime = pos; // Устанавливает текущее время воспроизведения песни на вычисленное значение
}