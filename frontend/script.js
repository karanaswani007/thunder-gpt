class ThunderGPT {
    constructor() {
        this.chatHistory = [];
        this.currentChatId = null;
        this.chats = JSON.parse(localStorage.getItem('thunder-chats') || '{}');
        this.backendUrl = this.getBackendUrl();
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadTheme();
        this.loadChatHistory();
    }

    getBackendUrl() {
        // Auto-detect backend URL
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        // Production backend URL (update this to your Render service URL after deployment)
        return 'https://thunder-gpt-backend.onrender.com';
    }

    initializeElements() {
        this.messagesArea = document.getElementById('messagesArea');
        this.messageForm = document.getElementById('messageForm');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.querySelector('.send-btn');
        this.newChatBtn = document.querySelector('.new-chat-btn');
        this.settingsBtn = document.querySelector('.settings-btn');
        this.settingsModal = document.getElementById('settingsModal');
        this.themeSelect = document.getElementById('themeSelect');
        this.savSettings = document.getElementById('savSettings');
        this.closeModal = document.querySelector('.close-modal');
        this.chatList = document.getElementById('chatList');
    }

    attachEventListeners() {
        this.messageForm.addEventListener('submit', (e) => this.handleSendMessage(e));
        this.messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.messageInput.addEventListener('input', () => this.autoResizeTextarea());
        
        this.newChatBtn.addEventListener('click', () => this.startNewChat());
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeModal.addEventListener('click', () => this.closeSettings());
        this.savSettings.addEventListener('click', () => this.saveSettings());
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.closeSettings();
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.messageInput.value = btn.dataset.action;
                this.autoResizeTextarea();
                this.messageInput.focus();
            });
        });
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.messageForm.dispatchEvent(new Event('submit'));
        }
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 200) + 'px';
    }

    async handleSendMessage(e) {
        e.preventDefault();
        
        const message = this.messageInput.value.trim();
        if (!message) return;

        // Remove welcome message if it exists
        const welcomeMsg = this.messagesArea.querySelector('.welcome-message');
        if (welcomeMsg) welcomeMsg.remove();

        // Add user message
        this.addMessage(message, 'user');
        this.chatHistory.push({ role: 'user', content: message });
        
        // Clear input
        this.messageInput.value = '';
        this.autoResizeTextarea();

        // Add loading indicator
        const loadingDiv = this.createLoadingIndicator();
        this.messagesArea.appendChild(loadingDiv);
        this.scrollToBottom();

        try {
            const response = await this.getGeminiResponse(message);
            loadingDiv.remove();
            
            this.addMessage(response, 'ai');
            this.chatHistory.push({ role: 'assistant', content: response });
            this.saveCurrentChat();
        } catch (error) {
            loadingDiv.remove();
            this.showError('Error: ' + error.message);
        }

        this.scrollToBottom();
    }

    async getGeminiResponse(message) {
        const response = await fetch(this.backendUrl + '/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: this.chatHistory
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get response');
        }

        const data = await response.json();
        return data.response;
    }

    addMessage(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        this.messagesArea.appendChild(messageDiv);
    }

    createLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai';
        loadingDiv.innerHTML = `
            <div class="loading">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        `;
        return loadingDiv;
    }

    startNewChat() {
        this.currentChatId = Date.now().toString();
        this.chatHistory = [];
        this.messagesArea.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-content">
                    <h2>Welcome to Thunder GPT</h2>
                    <p>Start a conversation by asking me anything</p>
                    <div class="quick-actions">
                        <button class="action-btn" data-action="Explain quantum computing">
                            <i class="fas fa-atom"></i>
                            Explain quantum computing
                        </button>
                        <button class="action-btn" data-action="Write a poem about nature">
                            <i class="fas fa-feather"></i>
                            Write a poem about nature
                        </button>
                        <button class="action-btn" data-action="Help with JavaScript">
                            <i class="fas fa-code"></i>
                            Help with JavaScript
                        </button>
                        <button class="action-btn" data-action="Explain artificial intelligence">
                            <i class="fas fa-brain"></i>
                            Explain artificial intelligence
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.messageInput.value = btn.dataset.action;
                this.autoResizeTextarea();
                this.messageInput.focus();
            });
        });

        this.updateChatList();
        this.messageInput.focus();
    }

    saveCurrentChat() {
        if (this.currentChatId) {
            const title = this.chatHistory[0]?.content.substring(0, 30) || 'New Chat';
            this.chats[this.currentChatId] = {
                id: this.currentChatId,
                title: title,
                history: this.chatHistory,
                timestamp: Date.now()
            };
            localStorage.setItem('thunder-chats', JSON.stringify(this.chats));
            this.updateChatList();
        }
    }

    loadChatHistory() {
        this.updateChatList();
    }

    updateChatList() {
        this.chatList.innerHTML = '';
        Object.values(this.chats)
            .sort((a, b) => b.timestamp - a.timestamp)
            .forEach(chat => {
                const chatItem = document.createElement('div');
                chatItem.className = 'chat-item';
                if (chat.id === this.currentChatId) chatItem.classList.add('active');
                chatItem.textContent = chat.title;
                chatItem.addEventListener('click', () => this.loadChat(chat.id));
                this.chatList.appendChild(chatItem);
            });
    }

    loadChat(chatId) {
        const chat = this.chats[chatId];
        if (chat) {
            this.currentChatId = chatId;
            this.chatHistory = chat.history;
            this.renderChatMessages();
            this.updateChatList();
        }
    }

    renderChatMessages() {
        this.messagesArea.innerHTML = '';
        this.chatHistory.forEach(msg => {
            this.addMessage(msg.content, msg.role === 'user' ? 'user' : 'ai');
        });
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
        }, 0);
    }

    openSettings() {
        this.settingsModal.classList.remove('hidden');
        this.apiKeyInput.focus();
    }

    closeSettings() {
        this.settingsModal.classList.add('hidden');
    }

    saveSettings() {
        const theme = this.themeSelect.value;
        localStorage.setItem('thunder-theme', theme);
        this.applyTheme(theme);
        this.closeSettings();
        this.showNotification('Theme updated!');
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    loadTheme() {
        const theme = localStorage.getItem('thunder-theme') || 'dark';
        this.themeSelect.value = theme;
        this.applyTheme(theme);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 999;
            animation: slideInUp 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showError(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #ef4444;
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 999;
            animation: slideInUp 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThunderGPT();
});
