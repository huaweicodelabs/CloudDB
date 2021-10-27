import {
  AGConnectCloudDB,
  CloudDBZoneConfig,
  CloudDBZoneQuery
} from '@agconnect/database';
import {agConnectConfig} from './agconnect-services';
import {BookInfo} from './BookInfo';

let agcCloudDB;
let cloudDBZone;
let bookList = [];

export async function initCloudDB () {
  console.log('start create schema');
  try {
    AGConnectCloudDB.initialize(agConnectConfig);
    const schema = require('./BookInfo.json');
    agcCloudDB = AGConnectCloudDB.getInstance();
    agcCloudDB.createObjectType(schema);
    console.log('createObjectType success');

    const config = new CloudDBZoneConfig('QuickStartDemo');
    cloudDBZone = await agcCloudDB.openCloudDBZone(config);
    console.log('open zone success:');
    alert('initCloudDB success');
  } catch (e) {
    console.log('initCloudDB filed:' + e.message);
  }
}

export async function executeQueryAllBooks () {
  try {
    const query = CloudDBZoneQuery.where(BookInfo);
    cloudDBZone.executeQuery(query).then(snapshot => {
      const resultArray = snapshot.getSnapshotObjects();
      alert('queryAllBooks success, Total: ' + resultArray.length);
      for (let i = 0; i < resultArray.length; i++) {
        const bookInfo = resultArray[i];
        const bookName = bookInfo.bookName;
        console.log('query bookName:' + bookName);
      }
    });
  } catch (e) {
    console.log('query failed with reason:' + e.message);
  }
}

export async function executeUpsertBooks () {
  await creatBook();
  try {
    const cloudDBZoneResult = await cloudDBZone.executeUpsert(bookList);
    console.log('upsert ' + cloudDBZoneResult + ' record');
    alert('upsert 2 record success' );
  } catch (e) {
    console.log('upsert failed with reason:' + e.message);
  }
}
export async function creatBook () {
  const book1 = new BookInfo();
  book1.id = 101;
  book1.bookName = "testName1";
  book1.author = "testAuthor1";
  book1.price = parseFloat("50.99");
  book1.publisher = "testPublish1";

  const book2 = new BookInfo();
  book2.id = 102;
  book2.bookName = "testName2";
  book2.author = "testAuthor2";
  book2.price = parseFloat("60.99");
  book2.publisher = "testPublish2";
  bookList.push(book1);
  bookList.push(book2);
}

export async function executeDeleteBooks () {
  const book = new BookInfo();
  book.id = 102;
  try {
    const num = await cloudDBZone.executeDelete(book);
    console.log('delete ' + num + ' record');
    alert('delete ' + num + ' record');
  } catch (e) {
    console.log('delete failed with reason:' + e.message);
  }
}

