const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function openWildberriesLogin() {
    window.open('https://www.wildberries.ru/lk', '_blank');
}

function toggleActive(img) {
    img.classList.toggle('active');
}

document.getElementById("importButton").onclick = function() {
    window.open('kabinet.html', '_blank');
}

    document.getElementById("register").onclick = function() {
        document.getElementById("productTable").style.display = "table";
    }
    document.getElementById("back").onclick = function() {
        window.location.href='index.html';
    };

    function openUser() {
        window.open('kabinet.html', '_blank');
    }
    function openCreater() {
        window.open('creator.html', '_blank');
    }

    let balance = 5; // Начальный баланс

                const balanceElement = document.getElementById('balance');
                const messageElement = document.getElementById('message');
                const voteButton = document.getElementById('voteButton1');

                voteButton.addEventListener('click', () => {
                    if (balance > 0) {
                        balance--; // Уменьшаем баланс на 1
                        balanceElement.textContent = balance; // Обновляем отображение баланса
                        messageElement.textContent = "Вы успешно проголосовали!";
                    } else {
                        messageElement.textContent = "Недостаточно баллов для голосования.";S
                    }
                });
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