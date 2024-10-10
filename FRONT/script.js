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
    window.open("kabinet.html", "_blank");}

    document.getElementById("register").onclick = function() {
        document.getElementById("productTable").style.display = "table";
    }
    document.getElementById("back").onclick = function() {
        window.open("index.html");
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
                    window.open('about.html', '_blank');
                }

                function openGlav() {
                    window.open('index.html', '_blank');
                }
                function openGolos() {
                    window.open('test.html', '_blank');
                }
                function openSto() {
                    window.open('testik.html', '_blank');
                }