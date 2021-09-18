class BookList {
  constructor() {
    if (JSON.parse(localStorage.getItem('books')).length > 0) {
      this.collection = JSON.parse(localStorage.getItem('books'));
    } else {
      this.collection = [];
    }
    this.bookListContainer = document.querySelector('#book-list');
    this.addButtonElement = document.querySelector('#add-button');
    this.addEventlisteners();
    this.listBooks();
  }

  addBooks(book) {
    this.collection = [...this.collection, book];
    localStorage.setItem('books', JSON.stringify(this.collection));
  }

  listBooks() {
    this.bookListContainer.innerHTML = '';
    if (this.collection.length < 1) {
      this.bookListContainer.innerHTML = '<p> No Books Inserted </p>';
    } else {
      this.collection.forEach((item, index) => {
        this.bookListContainer.innerHTML += `
          <p>${item.title}</p>
          <p>${item.author}</p>
          <button type="button" class="remove-btn" id="${index}">Remove</button>
          <hr>`;
      });
    }
  }

  addEventlisteners() {
    const addBookEventFunction = () => {
      const newBook = {
        title: document.querySelector('#book-title').value,
        author: document.querySelector('#book-author').value,
      };
      document.querySelector('#book-title').value = '';
      document.querySelector('#book-author').value = '';
      this.addBooks(newBook);
      this.listBooks();
    };

    const removeBookEventFunction = (event) => {
      if (event.target.classList.contains('remove-btn')) {
        const buttonId = parseInt(event.target.id, 10);
        this.collection = this.collection.filter((element, arrayIndex) => arrayIndex !== buttonId);
        localStorage.setItem('books', JSON.stringify(this.collection));
      }
      this.listBooks();
    };
    this.addButtonElement.addEventListener('click', addBookEventFunction);
    this.bookListContainer.addEventListener('click', removeBookEventFunction);
  }
}
// eslint-disable-next-line no-unused-vars
const library = new BookList();