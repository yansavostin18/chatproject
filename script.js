// Получение элементов из DOM
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Функция для добавления сообщения в окно чата
function addMessage(text, isUser = true) {
    const message = document.createElement('div');
    message.className = isUser ? 'message user-message' : 'message system-message';
    message.textContent = text;
    messagesContainer.appendChild(message);

    // Прокрутка вниз после добавления сообщения
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Обработчик кнопки отправки
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();

    if (messageText) {
        addMessage(messageText); // Добавляем сообщение от пользователя
        messageInput.value = ''; // Очищаем поле ввода

        // Пример ответа системы (можно заменить на свою логику)
        setTimeout(() => {
            addMessage('This is a system response.', false);
        }, 1000);
    }
});

// Отправка сообщения нажатием Enter
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
