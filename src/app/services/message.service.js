import MessageComponent from "../components/message.component";
import IDBService from "./idb.service";
const moment = require('moment');

export default class MessageService {
    constructor() {
        this.db = new IDBService('messages', 'messages');
        this.chatRef = document.getElementById('chat-box');
        this.inputRef = document.getElementById('message-input');

        this.renderMessages();
        this.watchInput();
    }

    renderMessage(message, time) {
        this.chatRef.appendChild(new MessageComponent(message, time).template());
    }

    watchInput() {
        this.inputRef.addEventListener('keydown', (e) => {
            let enterPressed = (e.code === 'Enter' || e.code === 'NumpadEnter');
            let valueEmpty = (this.inputRef.value === '' || this.inputRef.value.trim() === '' );
            let message = { text: this.inputRef.value, time: moment().format('DD.MM, HH:mm') }

            if ( enterPressed && !valueEmpty ) {
                this.renderMessage(message.text, message.time);
                this.saveMessage(message.text, message.time);
                this.inputRef.value = '';
                this.scrollChat();
            } else if (enterPressed && valueEmpty) {
                this.inputRef.value = '';
            }
        })
    }

    scrollChat() {
        document.getElementById('chat-box-container').scroll(0, this.chatRef.offsetHeight);
    }

    renderMessages() {
        this.db.getData().then(data => {
            for (let i in data) {
                this.renderMessage(data[i].message, data[i].time);
            }
            this.scrollChat();
        })
    }

    saveMessage(message, time) {
        this.db.storeData({message: message, time: time});
    }
}
