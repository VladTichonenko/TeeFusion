// const container = document.getElementById('container');
//  const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login');

// registerBtn.addEventListener('click', () => {
//     container.classList.add("active");
// });

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// function openWildberriesLogin() {
//     window.open('https://www.wildberries.ru/lk', '_blank');
// }

// function toggleActive(img) {
//     img.classList.toggle('active');
// }

document.getElementById("importButton").onclick = function() {
    window.location.href='kabinet.html';
}

    // document.getElementById("register").onclick = function() {
    //     document.getElementById("productTable").style.display = "table";
    //}
    document.getElementById("back").onclick = function() {
        window.location.href='index.html';
    };

    function openUser() {
        window.open('kabinet.html', '_blank');
    }

//     let balance = 5; // Начальный баланс

//                 const balanceElement = document.getElementById('balance');
//                 const messageElement = document.getElementById('message');
//                 const voteButton = document.getElementById('voteButton1');

//                 voteButton.addEventListener('click', () => {
//                     if (balance > 0) {
//                         balance--; // Уменьшаем баланс на 1
//                         balanceElement.textContent = balance; // Обновляем отображение баланса
//                         messageElement.textContent = "Вы успешно проголосовали!";
//                     } else {
//                         messageElement.textContent = "Недостаточно баллов для голосования.";S
//                     }
//                 });
function openNFT() {
    window.location.href='about.html';
                }

                function openGlav() {
                    window.location.href='index.html';
                }
                function openGolos() {
                    window.location.href='test.html';
                }
                function openSto() {
                    window.location.href='testik.html';
                }
                function Nazad() {
                    window.location.href='index.html';
                }
                function openCabinet() {
                    window.location.href='kabinet.html';
                }
// =========МОЯ ЧАСТЬ ПОТОМ ИСПРАВИТЬ ВСЁ ===============

//============== KABINET.HTML ==================

document.addEventListener('DOMContentLoaded', function() {
    const urlParts = window.location.pathname.split('/'); // Разделяем путь URL
    const userId = urlParts[urlParts.length - 1]; // Предполагается, что user_id — последний элемент в пути
    const container = document.getElementById('container');
    const messageElement = document.getElementById('message');

    // Функция для получения данных пользователя из базы данных 
    async function fetchUserData(userId) {
        try {
            const response = await fetch(`/user/${userId}`); // URL вашего API с динамическим ID 
            if (!response.ok) {
                throw new Error('Ошибка при получении данных пользователя');
            }
            const data = await response.json();
            document.getElementById('username').textContent = data.username;
            document.getElementById('balance').textContent = data.balance;
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
        }
    }

    // Вызов функции с ID пользователя 
    fetchUserData(userId); // Замените 1 на нужный ID пользователя

    // Общая переменная для баланса 
    let balance = 0; // Инициализируем баланс 
    const balanceElement = document.getElementById('balance');

    // Обработчик голосования для первой майки 
    document.getElementById("voteButton1").addEventListener('click', () => { 
        handleVote(1); // Передаем id фото 
    });

    // Обработчик голосования для второй майки 
    document.getElementById("voteButton2").addEventListener('click', () => { 
        handleVote(2); // Передаем id фото 
    });

    // Функция обработки голосования 
    async function handleVote(photoId) { 
        if (balance > 0) { 
            try { 
                const response = await fetch('/votes', { 
                    method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json' 
                    }, 
                    body: JSON.stringify({ 
                        userId: userId, // Используем реальный userId 
                        clothingPhotoId: photoId, 
                        competitionId: 1, // Замените на реальный competitionId 
                        points: 1 
                    }) 
                });

                if (response.ok) { 
                    const result = await response.json(); 
                    balance--; // Уменьшаем баланс на 1 
                    balanceElement.textContent = balance; // Обновляем отображение баланса 
                    messageElement.textContent = `Вы успешно проголосовали за майку ${photoId}!`; 
                } else { 
                    const error = await response.json(); 
                    messageElement.textContent = error.error || "Ошибка при голосовании."; 
                } 
            } catch (error) { 
                console.error('Ошибка при голосовании:', error); 
                messageElement.textContent = "Ошибка при голосовании."; 
            } 
        } else { 
            messageElement.textContent = "Недостаточно баллов для голосования."; 
        } 
    }

    
    
})

function openNFT() { 
        window.location.href='about.html'; 
    } 

    function openGlav() { 
        window.location.href='index.html'; 
    } 

    function openSto() { 
        window.location.href='testik.html'; 
    }

//========INDEX.HTML============

const registerBtn = document.getElementById('register');

function openCreater() {
    window.open('creator.html', '_blank');
}


const container = document.getElementById('container');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


//=========TEST.HTML=========

document.addEventListener('DOMContentLoaded', () => { 
    let timeLeft = 30; 
    let votes = [0, 0]; // Голоса для двух опций 

    const timerElement = document.getElementById('time'); 
    const scaleElement = document.getElementById('scale'); 
    const resultElement = document.getElementById('result'); 

    const userId = 1; // Замените на реальный ID текущего пользователя 
    const competitionId = 1; // Замените на реальный идентификатор текущего соревнования 

    // Функция для голосования
    async function vote(option) { 
        const clothingPhotoId = option; // ID фото (1 или 2)

        try { 
            const response = await fetch('/votes', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json', 
                }, 
                body: JSON.stringify({ 
                    userId: userId, 
                    competitionId: competitionId, 
                    clothingPhotoId: clothingPhotoId, 
                    points: 1, // Количество баллов 
                }), 
            }); 

            if (response.ok) { 
                votes[option - 1]++; // Увеличиваем голос за выбранную опцию
                const voteCount = await response.json(); 
                document.getElementById(`count${option}`).innerText = voteCount.points; 
                updateScale(); 
            } else { 
                alert('Ошибка при голосовании!'); 
            } 
        } catch (error) { 
            console.error('Ошибка при голосовании:', error); 
        } 
    } 

    // Функция для обновления шкалы голосов
    function updateScale() { 
        const totalVotes = votes[0] + votes[1]; 
        if (totalVotes > 0) { 
            const percent1 = (votes[0] / totalVotes) * 100; 
            const percent2 = (votes[1] / totalVotes) * 100; 
            scaleElement.innerHTML = `<div style="width: ${percent1}%; height: 100%; background-color: #c45d5d;"></div> 
                                       <div style="width: ${percent2}%; height: 100%; background-color: #9977f1;"></div>`; 
        } else { 
            scaleElement.innerHTML = ''; 
        } 
    } 

    // Таймер для голосования
    const timer = setInterval(() => { 
        timeLeft--; 
        timerElement.innerText = timeLeft; 

        if (timeLeft <= 0) { 
            clearInterval(timer); 
            closeCompetition(); // Завершаем соревнование 
        } 
    }, 1000); 

    // Завершение голосования и получение результатов
    async function closeCompetition() { 
        try { 
            const response = await fetch(`/close-competition/${competitionId}`, { // Закрываем соревнование 
                method: 'POST', 
            }); 

            if (response.ok) { 
                const resultData = await response.json(); 
                showResult(resultData); // Отображаем результаты 
            } else { 
                alert('Ошибка при завершении соревнования!'); 
            } 
        } catch (error) { 
            console.error('Ошибка при завершении соревнования:', error); 
        } 
    } 

    // Отображение результатов
    function showResult(resultData) { 
        const { winner, score1, score2 } = resultData; 
        const resultMessage = `Победитель: ${winner === 1 ? 'Фото 1' : 'Фото 2'} с результатом ${score1} : ${score2}`; 
        resultElement.innerText = resultMessage; 
        resultElement.classList.remove('hidden'); 
        document.getElementById('button1').classList.add('hidden'); 
        document.getElementById('button2').classList.add('hidden'); 
    } 

    // Функция возврата на предыдущую страницу
    function Nazad() { 
        window.location.href = 'kabinet.html'; 
    } 
});

function openTest() { 
    window.location.href='test.html'; 
} 