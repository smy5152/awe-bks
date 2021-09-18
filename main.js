class BookList {
  constructor() {
    if(JSON.parse(localStorage.getItem('books')).length > 0){
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
    console.log(this.collection);
  }

  removeBook() {

  }

  listBooks() {
    this.bookListContainer.innerHTML = ''
      if(this.collection.length < 1) {
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
      // books.innerHTML = bookHtml;
    }

  addEventlisteners() {
    const addBookEventFunction = () => {
      const newBook = {
        title: document.querySelector('#book-title').value,
        author: document.querySelector('#book-author').value,
      };
      document.querySelector('#book-title').value = '';
      document.querySelector('#book-author').value = '';
      console.log(newBook);
      this.addBooks(newBook);
      this.listBooks();
    }   

    const removeBookEventFunction = (event) => {
      if(event.target.classList.contains('remove-btn')){
        const buttonId = parseInt(event.target.id, 10);
        // const obj = JSON.parse(localStorage.getItem('books'));
        this.collection = this.collection.filter((element, arrayIndex) => arrayIndex !== buttonId);
        localStorage.setItem('books', JSON.stringify(this.collection));
      }
      this.listBooks();
    }
    this.addButtonElement.addEventListener('click', addBookEventFunction);
    this.bookListContainer.addEventListener('click', removeBookEventFunction);
  }

}

// const books = document.querySelector('#book-list');
// let booklist = [];
// let bookHtml = '';

// bookForm.addEventListener('submit', () => {
//   const newBook = {
//     title: bookTitle.value,
//     author: bookAuthor.value,
//   };
//   const obj = JSON.parse(localStorage.getItem('books'));
//   obj.allbook.push(newBook);
//   booklist = obj.allbook;
//   localStorage.setItem('books', JSON.stringify(obj));
// });

// const removeBtn = document.querySelectorAll('.remove-btn');

// removeBtn.forEach((item) => item.addEventListener('click', () => {
  // const idx = parseInt(item.id, 10);
  // const obj = JSON.parse(localStorage.getItem('books'));
  // booklist = obj.allbook;
  // booklist = booklist.filter((ele, ind) => ind !== idx);
//   obj.allbook = booklist;
//   localStorage.setItem('books', JSON.stringify(obj));
//   // eslint-disable-next-line no-restricted-globals
//   location.reload();
// }));

const library = new BookList();