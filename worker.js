
    let canvas;
    let ctx;
    let words;

    onmessage = async function(e) {
        if (e.data) {
            if (!canvas) canvas = e.data.canvas;
            if (!ctx) ctx = canvas.getContext('2d');

            if (e.data.text) {
                await storeData('words', 'readwrite', e.data.text);
            }
            await getAndPrepare();
            renderCanvas();
        }
    }

    function prepareWords() {
        for (let i in words) {
            let text = words[i];
            words[i] = new Word(text, 0, 12 * i + 1);
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
        return new Promise(resolve => {
            getDBConnection().then(db => {
               resolve(db.transaction(storageName, mode))
            });
        });
    }

    async function storeData(storageName, mode, items) {
        try {
            const tx = await startTx(storageName, mode);
            tx.objectStore(storageName).put(items);
        } catch (e) {console.log(e)}
    }

    function getData(storageName, mode) {
        return new Promise((resolve) => {
            startTx(storageName, mode).then(tx => {
                tx.objectStore(storageName).getAll().onsuccess = (e) => {
                    resolve(e.target.result);
                }
            });
        });
    }

    function Word(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;

        this.draw = () => {
            ctx.fillStyle = "#ffffff";
            ctx.font = '12px monospace';
            ctx.textBaseline = 'hanging';
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    async function getAndPrepare() {
        try {
            debugger;
            const data = await getData('words', 'readonly')
            words = data.reverse();
            prepareWords();
        } catch (e) {console.log(e)}
    }

    function getDBConnection() {
        return new Promise((resolve) => {
            let request = openRequest();
            request.onsuccess = (e => {
                resolve (e.target.result);
            });
        })
    }

    function openRequest() {
        return indexedDB.open('words', 8);
    }

    openRequest().onupgradeneeded = function(event) {
        let db = event.target.result;

        if (!event.target.result.objectStoreNames.contains('words')) {
            let objectStore = db.createObjectStore('words', { autoIncrement: true });
        }
    };

