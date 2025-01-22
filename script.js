const STORAGE_KEY = 'simple-chat-messages';
const USERNAME_KEY = 'chat-username';
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const clearHistoryButton = document.getElementById('clear-history-button');
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const saveUsernameButton = document.getElementById('save-username-button');

let username = null;

// Load chat history
function loadMessages() {
    const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedMessages.forEach(({ text, isUser }) => addMessage(text, isUser));
}

// Save a message to localStorage
function saveMessage(text, isUser) {
    const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedMessages.push({ text, isUser });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessages));
}

// Add a message to the chat
function addMessage(text, isUser = true) {
    const message = document.createElement('div');
    message.className = isUser ? 'message user-message' : 'message system-message';
    message.textContent = text;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Dynamic system responses
function getSystemResponse(userMessage) {
    if (userMessage.toLowerCase().includes('hello')) return 'Hi there!';
    if (userMessage.toLowerCase().includes('how are you')) return 'I am just a chat system, but I am doing well!';
    return 'This is a default response.';
}

// Handle sending a message
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage(`${username}: ${messageText}`, true);
        saveMessage(`${username}: ${messageText}`, true);
        messageInput.value = '';

        const systemResponse = getSystemResponse(messageText);
        setTimeout(() => {
            addMessage(systemResponse, false);
            saveMessage(systemResponse, false);
        }, 1000);
    }
});

// Clear chat history
clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    messagesContainer.innerHTML = '';
});

// Handle username modal
saveUsernameButton.addEventListener('click', () => {
    const enteredUsername = usernameInput.value.trim();
    if (enteredUsername) {
        localStorage.setItem(USERNAME_KEY, enteredUsername);
        username = enteredUsername;
        usernameModal.style.display = 'none';
    }
});

// Initialize chat
function init() {
    username = localStorage.getItem(USERNAME_KEY);
    if (!username) {
        usernameModal.style.display = 'flex';
    } else {
        usernameModal.style.display = 'none';
    }
    loadMessages();
}
init();
