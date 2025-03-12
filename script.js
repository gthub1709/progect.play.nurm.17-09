const gameData = {
    games: [
        {
            name: "Майнкрафт",
            hint: "Самая популярная игра в мире, где можно строить из кубиков и выживать. Есть режим креатив и выживание."
        },
        {
            name: "ФИФА",
            hint: "Самый популярный футбольный симулятор. Можно играть за реальные команды и проводить чемпионаты мира."
        },
        {
            name: "Бравл Старс",
            hint: "Мобильная игра от создателей Clash of Clans. Сражения 3 на 3, разные герои с уникальными способностями."
        },
        {
            name: "КС",
            hint: "Самый популярный шутер в мире. Террористы против спецназа, нужно ставить или разминировать бомбу."
        },
        {
            name: "Роблокс",
            hint: "Платформа с множеством мини-игр, где можно создавать свои миры. Популярна у детей и подростков."
        },
        {
            name: "ГТА",
            hint: "Открытый мир где можно делать что угодно: угонять машины, выполнять миссии, исследовать город."
        },
        {
            name: "Тетрис",
            hint: "Классическая игра-головоломка где нужно складывать падающие фигурки в линии. Создана советским программистом."
        },
        {
            name: "Пакман",
            hint: "Жёлтый круг ест точки в лабиринте и убегает от призраков. Одна из самых первых популярных аркадных игр."
        },
        {
            name: "Марио",
            hint: "Знаменитый водопроводчик в красной кепке и синем комбинезоне. Прыгает по платформам и собирает монетки."
        },
        {
            name: "Змейка",
            hint: "Простая игра где нужно собирать еду и расти, не врезаясь в стены и в себя. Была на всех кнопочных телефонах."
        },
        {
            name: "Дота",
            hint: "Популярная МОВА игра. Пять на пять игроков, нужно разрушить вражескую базу, много разных героев."
        },
        {
            name: "Фортнайт",
            hint: "Популярная королевская битва со строительством. 100 игроков прыгают с летающего автобуса."
        },
        {
            name: "Амонг Ас",
            hint: "Космическая игра про предателя среди членов экипажа. Нужно найти импостора или саботировать корабль."
        },
        {
            name: "Клэш Рояль",
            hint: "Мобильная стратегия где нужно разрушить башни противника. Колоды карт и арена один на один."
        },
        {
            name: "Соник",
            hint: "Синий ёжик который быстро бегает и собирает золотые кольца. Главный талисман компании Sega."
        },
        {
            name: "Танчики",
            hint: "Игра про танки где нужно защищать свою базу с орлом. Можно играть вдвоём на одном экране."
        },
        {
            name: "Ворлд оф Танкс",
            hint: "Онлайн игра про танковые сражения. Можно выбирать разные танки и участвовать в командных боях."
        },
        {
            name: "Покемоны",
            hint: "Нужно ловить и тренировать существ с разными способностями. Есть аниме про тренера Эша."
        },
        {
            name: "Зельда",
            hint: "Приключения героя по имени Линк. Нужно спасать принцессу и исследовать фэнтезийный мир."
        },
        {
            name: "Ангри Бердс",
            hint: "Злые птицы которых нужно запускать из рогатки по свинкам. Популярная мобильная игра."
        }
    ]
};

let currentMode = 'games';
let currentIndex = 0;
let currentScore = 0;
let bestScore = {
    games: 0
};

// Загружаем лучший счёт из localStorage
if (localStorage.getItem('bestScores')) {
    bestScore = JSON.parse(localStorage.getItem('bestScores'));
}

function updateGame() {
    const data = gameData.games[currentIndex];
    document.getElementById('hint').textContent = `Подсказка: ${data.hint}`;
    document.getElementById('user-input').value = '';
    document.getElementById('user-input').placeholder = 'Введите название игры';
}

function showMessage(text, isCorrect) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.style.color = isCorrect ? '#4CAF50' : '#ff4444';
    message.style.display = 'block';
    
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

function updateScoreDisplay() {
    document.getElementById('currentScore').textContent = `Текущий счёт: ${currentScore}`;
    document.getElementById('bestScore').textContent = `Лучший счёт: ${bestScore.games}`;
}

function checkAnswer() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    const correctAnswer = gameData.games[currentIndex].name.toLowerCase();
    
    if (userInput === correctAnswer) {
        currentScore++;
        showMessage('Правильно!', true);
    } else {
        showMessage(`Неправильно! Это была игра ${gameData.games[currentIndex].name}`, false);
    }
    
    currentIndex++;
    
    if (currentScore > bestScore.games) {
        bestScore.games = currentScore;
        localStorage.setItem('bestScores', JSON.stringify(bestScore));
    }
    
    updateScoreDisplay();
    
    if (currentIndex >= gameData.games.length) {
        setTimeout(() => {
            showMessage(`Игра окончена! Ваш счёт: ${currentScore}`, true);
            currentIndex = 0;
            currentScore = 0;
            updateScoreDisplay();
        }, 2000);
    }
    
    updateGame();
}

// Инициализация игры
window.onload = () => {
    updateGame();
    updateScoreDisplay();

    // Добавляем обработчик нажатия Enter
    document.getElementById('user-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
};
