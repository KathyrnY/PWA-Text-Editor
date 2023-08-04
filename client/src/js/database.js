import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
    try {
      const db = await openDB('jate', 1);
      const tx = db.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const request = store.put({ key: 'header', text: content });
      const result = await request;
      console.log('Data saved to DB!', result);
    } catch (error) {
      console.error('Error while saving data to DB:', error);
    }
  };

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result', result);

    return result ? result.text : null;
  } catch (error) {
    console.error('Error during the retrieval of data from DB', error);
    return null;
  }
};

initdb();
