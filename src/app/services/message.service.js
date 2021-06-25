import MessageComponent from "../components/message.component";

export default class MessageService {
    constructor() {
        this.containerRef = document.getElementById('chat-box-container');
        this.chatRef = document.getElementById('chat-box');
        this.inputRef = document.getElementById('message-input');
        this.text = '';
        this.message = null;

        this.watchInput();
        this.scrollChat();
    }

    renderMessage() {
        this.chatRef.appendChild(this.message);
    }

    receiveMessage() {
        this.message = new MessageComponent(this.text).send();
    }

    watchInput() {
        this.inputRef.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' && this.inputRef.value !== '') {
                this.text = this.inputRef.value;
                this.receiveMessage();
                this.renderMessage();
                this.inputRef.value = '';
                this.scrollChat();
            }
        })
    }

    scrollChat() {
        this.containerRef.scroll(0, this.chatRef.offsetHeight)
    }
}
