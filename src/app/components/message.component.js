export default class MessageComponent {
    constructor(text, time) {
        this.text = text;
        this.time = time;
    }

    template() {
        return document.createRange().createContextualFragment(
            `<div class="message">
                <span class="message-time">${this.time}</span>
                <div class="message-text">${this.text}</div>
            </div>`
        )
    }
}
