import MessageComponent from "../components/message.component";
const moment = require('moment');

export default class MessageService {
    constructor() {
        this.chatRef = document.getElementById('chat-box');
        this.inputRef = document.getElementById('message-input');

        this.watchInput();
    }

    renderMessage(text, time) {
        this.chatRef.appendChild(this.receiveMessage(text, time));
    }

    receiveMessage(text, time) {
        return new MessageComponent(text, time).template();
    }

    watchInput() {
        this.inputRef.addEventListener('keydown', (e) => {
            if ((e.code === 'Enter' || e.code === 'NumpadEnter') && this.inputRef.value !== '') {
                this.renderMessage(this.inputRef.value, moment().format('DD.MM, HH:mm'));
                this.inputRef.value = '';
                this.scrollChat();
            }
        })
    }

    scrollChat() {
        document.getElementById('chat-box-container').scroll(0, this.chatRef.offsetHeight);
    }
}
