//数据库定义数据类
class BookInfo {
    constructor(id, bookName, author, price, publisher, publishTime, shadowFlag) {
        this.id = id;
        this.bookName = bookName;
        this.author = author;
        this.price = price;
        this.publisher = publisher;
        this.publishTime = publishTime;
        this.shadowFlag = shadowFlag;
    }
}

BookInfo.className = 'BookInfo';

export { BookInfo }