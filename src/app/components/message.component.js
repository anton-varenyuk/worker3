export default class MessageComponent {
    constructor(text) {
        this.text = text;
    }

    send() {
        return document.createRange().createContextualFragment(`<div class="message">${this.text}</div>`);
    }
}
