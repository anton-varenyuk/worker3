
    const input = document.getElementById('first');

    if (window.Worker) {

        const htmlCanvas = document.getElementById("canvas");
        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;

        const offscreen = htmlCanvas.transferControlToOffscreen();

        let worker = new Worker('worker.js', {type: 'module'});
        worker.postMessage({ canvas: offscreen }, [offscreen]);

        input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                worker.postMessage({text: input.value});
                input.value = "";
            }
        }

        window.onclick = (e) => {
            worker.postMessage({x: e.x, y: e.y});
            console.log(e.x, e.y);
        }
    }


