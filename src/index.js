    import IDBService from "./app/services/idb.service";
    import "./app/styles/style.css";
    import MessageService from "./app/services/message.service";

    const db = new IDBService('newDB', 'werds');
    const messageService = new MessageService();

    // if (window.Worker) {
    //     const htmlCanvas = document.getElementById("canvas");
    //     htmlCanvas.width = window.innerWidth;
    //     htmlCanvas.height = window.innerHeight;

    //     const offscreen = htmlCanvas.transferControlToOffscreen();

    //     const worker = new Worker('./app/worker.js', {type: 'module'});
    //     // const worker = new Worker(new URL('./app/worker.js', import.meta.url));
    //     worker.postMessage({ canvas: offscreen }, [offscreen]);
    // }


