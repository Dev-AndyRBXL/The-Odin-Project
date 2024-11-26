const myLibrary = [];
const contentWrapper = document.querySelector(".main-content-wrapper");
const addBookBtn = document.getElementById("addBookBtn");

function Book(title, author, pages, read, img) {
  this.title = title || "Unknown Title";
  this.author = author || "Unknown Author";
  this.pages = pages || 250;
  this.read = read || false;
  this.img =
    img ||
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
        />
      </svg>`;
}

function addBookToLibrary(title, author, pages, read, img, display) {
  const newBook = new Book(title, author, pages, read, img);
  myLibrary.push(newBook);
  if (display) {
    displayBook(newBook);
  }
}

function removeBookFromLibrary(bookTitle) {
  const index = myLibrary.findIndex((book) => book.title === bookTitle);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    document.querySelector(`.book-card[data-title="${bookTitle}"]`).remove();
  }
}

const toggleReadStatus = (book, bookElement) => {
  book.read = !book.read;
  const readBtn = bookElement.querySelector(".read");

  if (!book.read) {
    readBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
      </svg>
    `;
  } else {
    readBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>
    `;
  }
};

const displayBook = (book) => {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book-card");
  bookElement.setAttribute("data-title", book.title);

  const existingBook = contentWrapper.querySelector(
    `[data-title="${book.title}"]`
  );

  if (existingBook) {
    existingBook.remove();
  }

  contentWrapper.appendChild(bookElement);

  const bookCover = book.img;
  if (bookCover && bookCover !== "default") {
    bookElement.innerHTML = `
    <div class="book-cover">
      <img src="${bookCover}" alt="${book.title} cover" />
    </div>
    <div class="book-info">
      <h3 class="book-info-title">${book.title}</h3>
      <p class="book-info-author">${book.author}</p>
      <div class="book-actions">
        <button class="read">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
          </svg>
        </button>
        <button class="removeBookBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  } else {
    bookElement.innerHTML = `
    <div class="book-cover no-image">
              <input
                style="background-color: transparent"
                type="file"
                name="image"
                id="image"
              />
              <label
                style="background-color: transparent; border: none"
                for="image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                  />
                </svg>
              </label>
            </div>
    <div class="book-info">
      <h3 class="book-info-title">${book.title}</h3>
      <p class="book-info-author">${book.author}</p>
      <div class="book-actions">
        <button class="read">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
          </svg>
        </button>
        <button class="removeBookBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  }

  toggleReadStatus(book, bookElement);

  const fileInput = bookElement.querySelector("#image");
  if (fileInput) {
    fileInput.addEventListener("change", (event) =>
      uploadBookCover(event, bookElement, book)
    );
  }

  const readBtn = bookElement.querySelector(".read");
  readBtn.addEventListener("click", () => toggleReadStatus(book, bookElement));

  const removeBtn = bookElement.querySelector(".removeBookBtn");
  removeBtn.addEventListener("click", () => bookElement.remove());
};

// Default books
addBookToLibrary(
  "Alice in Wonderland",
  "Lewis Carroll",
  250,
  false,
  "default",
  true
);
addBookToLibrary("Atomic Habits", "James Clear", 275, true, "default", true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, false, "default", true);

const buttons = document.querySelectorAll("button");
buttons.forEach(element => {
  element.addEventListener("click", () => {
    const popSound = document.getElementById("popSound");
    popSound.play();
  })
});
