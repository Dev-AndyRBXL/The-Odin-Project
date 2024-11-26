function Book(title, author, pages, read) {
  this.title = title || "Unknown Title";
  this.author = author || "Unknown Author";
  this.pages = pages || 250;
  this.read = read || false;
}

Book.prototype.getTitle = function () {
  return this.title;
};

const myBook = new Book("Alice in Wonderland", "Lewis Carroll", 200, true);
console.log(myBook.getTitle());
