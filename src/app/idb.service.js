
export default class IDBService {

    constructor(dbName, storageName) {
        this.dbName = dbName;
        this.storageName = storageName;
        this.init();
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
        return indexedDB.open(this.dbName, 7);
    }


    init() {
        this.openRequest().onupgradeneeded = (e) => {
            let db = e.target.result;

            if (!db.objectStoreNames.contains(this.storageName)) {
                db.createObjectStore(this.storageName, {autoIncrement: true});
            }
        }
    }
}

