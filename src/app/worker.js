import Db from './db';

    let canvas;
    let ctx;
    let words;

    const db = new Db('words');
    db.init();

    console.log(db);

    // onmessage = async function(e) {
    //     if (e.data) {
    //         if (!canvas) canvas = e.data.canvas;
    //         if (!ctx) ctx = canvas.getContext('2d');

    //         if (e.data.text) {
    //             await storeData('words', 'readwrite', e.data.text);
    //         }
    //         await getAndPrepare();
    //         renderCanvas();
    //     }
    // }

    // function prepareWords() {
    //     for (let i in words) {
    //         let text = words[i];
    //         words[i] = new Word(text, 0, 12 * i + 1);
    //     }
    // }

    // function renderCanvas() {
    //     if (ctx) {
    //         renderBackground();
    //         renderText();

    //     }
    // }

    // function renderBackground() {
    //     ctx.fillStyle = "#272830";
    //     ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // }

    // function renderText() {
    //     for (let i in words) {
    //         words[i].draw();
    //     }
    // }

    // function Word(text, x, y) {
    //     this.text = text;
    //     this.x = x;
    //     this.y = y;

    //     this.draw = () => {
    //         ctx.fillStyle = "#ffffff";
    //         ctx.font = '12px monospace';
    //         ctx.textBaseline = 'hanging';
    //         ctx.fillText(this.text, this.x, this.y);
    //     }
    // }

    // async function getAndPrepare() {
    //     try {
    //         const data = await getData('words', 'readonly')
    //         words = data.reverse();
    //         prepareWords();
    //     } catch (e) {console.log(e)}
    // }

