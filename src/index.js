    import IDBService from "./app/idb.service";
    import "./app/style.css";
    const db = new IDBService('newDB', 'words');

    const input = document.getElementById('first');

    input.onkeydown = (e) => {
        if (e.key === 'Enter') {
            db.storeData(input.value);
            input.value = "";
        }
    }



    

    // if (window.Worker) {
    //     const htmlCanvas = document.getElementById("canvas");
    //     htmlCanvas.width = window.innerWidth;
    //     htmlCanvas.height = window.innerHeight;

    //     const offscreen = htmlCanvas.transferControlToOffscreen();

    //     const worker = new Worker('./app/worker.js', {type: 'module'});
    //     // const worker = new Worker(new URL('./app/worker.js', import.meta.url));
    //     worker.postMessage({ canvas: offscreen }, [offscreen]);
    // }


