
export default class Db {
    constructor(storageName) {
        this.storageName = storageName
    }

    startTx(storageName, mode) {
        return new Promise(resolve => {
            this.getDBConnection().then(db => {
               resolve(db.transaction(storageName, mode))
            })
        })
    }
    
    async storeData(items) {
        try {
            const tx = await this.startTx(this.storageName, 'readwrite');
            tx.objectStore(this.storageName).put(items);
        } catch (e) {console.log(e)}
    }
    
    getData() {
        return new Promise((resolve) => {
            this.startTx(this.storageName, 'readonly').then(tx => {
                tx.objectStore(this.storageName).getAll().onsuccess = (e) => {
                    resolve(e.target.result);
                }
            })
        })
    }
    
    getDBConnection() {
        return new Promise((resolve) => {
            let request = this.openRequest();
            request.onsuccess = (e => {
                resolve (e.target.result);
            })
        })
    }
    
    openRequest() {
        return indexedDB.open('words', 8);
    }
    
    init() {
        this.openRequest().onupgradeneeded = function(event) {
            let db = event.target.result;
        
            if (!event.target.result.objectStoreNames.contains('words')) {
                let objectStore = db.createObjectStore('words', { autoIncrement: true });
            }
        }
    }
   
}

