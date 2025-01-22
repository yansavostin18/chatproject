document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const usernameModal = document.getElementById('username-modal');
    const usernameInput = document.getElementById('username-input');
    const saveUsernameButton = document.getElementById('save-username-button');

    let username = null;
    const socket = new WebSocket('wss://your-app-name.herokuapp.com'); // Укажи ссылку на твой сервер на Heroku

    // Отправка сообщения через WebSocket
    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const message = JSON.stringify({ username, text: messageText });
            socket.send(message); // Отправляем сообщение на сервер
            messageInput.value = '';
        }
    });

    // Обработка сообщений от других пользователей
    socket.addEventListener('message', (event) => {
        const { username: author, text } = JSON.parse(event.data);
        addMessage(`${author}: ${text}`, author === username);
    });

    // Добавление сообщения в чат
    function addMessage(text, isUser) {
        const message = document.createElement('div');
        message.className = isUser ? 'message user-message' : 'message other-message';
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
    }

    // Сохранение имени пользователя
    saveUsernameButton.addEventListener('click', () => {
        const enteredUsername = usernameInput.value.trim();
        if (enteredUsername) {
            username = enteredUsername;
            usernameModal.style.display = 'none';
        }
    });

    // Инициализация чата
    function init() {
        usernameModal.style.display = 'flex';
    }

    init();
});
