// Ключ для хранения сообщений
const STORAGE_KEY = 'simple-chat-messages';

// Загрузка сообщений из localStorage
function loadMessages() {
    const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedMessages.forEach(({ text, isUser }) => addMessage(text, isUser));
}

// Сохранение сообщений в localStorage
function saveMessage(text, isUser) {
    const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedMessages.push({ text, isUser });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessages));
}

// Переписанный обработчик отправки
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();

    if (messageText) {
        addMessage(messageText); // Добавляем сообщение от пользователя
        saveMessage(messageText, true); // Сохраняем сообщение
        messageInput.value = ''; // Очищаем поле ввода

        // Пример ответа системы
        setTimeout(() => {
            const systemResponse = 'This is a system response.';
            addMessage(systemResponse, false);
            saveMessage(systemResponse, false); // Сохраняем системное сообщение
        }, 1000);
    }
});

// Инициализация
loadMessages();
