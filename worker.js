
    let canvas;
    let ctx;
    let words = [];
    let request = indexedDB.open('words', 8);
    let db;

    request.onupgradeneeded = function(event) {
        let db = event.target.result;

        if (!event.target.result.objectStoreNames.contains('words')) {
            let objectStore = db.createObjectStore('words', { autoIncrement: true });
        }
    };

    request.onsuccess = (e => {
        db = e.target.result;
        getAndRender();
    });

    onmessage = function(e) {
        console.log(e);
        if (e.data) {
            if (!canvas) canvas = e.data.canvas;
            if (!ctx) ctx = canvas.getContext('2d');


            if (e.data.text) {
                storeData('words', 'readwrite', e.data.text);
            }
        }
        renderCanvas();
    }

    async function getData(storageName, mode) {
        return new Promise((resolve, reject) => {
            let tx = startTx(storageName, mode);
            let store = tx.objectStore(storageName);
            let getReq = store.getAll();
            getReq.onsuccess = (e) => {
                resolve(e.target.result);
            }
        });
    }

    function prepareWords() {
        for (let i in words) {
            let text = words[i];
            words[i] = new Word(text, 0, 12 * i);
        }
    }

    function renderCanvas() {
        if (ctx) {
            renderBackground();
            renderText();
        }
    }

    function renderBackground() {
        ctx.fillStyle = "#272830";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function renderText() {
        for (let i in words) {
            words[i].draw();
        }
    }

    function startTx(storageName, mode) {
        return db.transaction(storageName, mode);
    }

    async function storeData(storageName, mode, items) {
        let tx = await startTx(storageName, mode);
        let store = tx.objectStore(storageName);
        store.put(items);
    }

    function Word(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;

        this.draw = () => {
            this.y += 12;
            ctx.fillStyle = "#ffffff";
            ctx.font = '12px monospace';
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    function getAndRender() {
        getData('words', 'readonly').then(data => {
            words = data.reverse();
            prepareWords();
            renderCanvas();
        });
    }
