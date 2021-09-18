class BookList {
  constructor() {
    if (JSON.parse(localStorage.getItem('books')).length > 0) {
      this.collection = JSON.parse(localStorage.getItem('books'));
    } else {
      this.collection = [];
    }
    this.bookListContainer = document.querySelector('#book-list');
    this.addButtonElement = document.querySelector('#add-button');
    //  Nav Elements Selected
    this.listElementNavSelection = document.querySelector('#list-nav-text');
    this.addBookNavSelection = document.querySelector('#add-new-nav-text');
    this.contactElementNavSelection = document.querySelector('#contact-nav-text');
    //  Section Elements Selected to changes displays as per nav links
    this.listSection = document.querySelector('#list-section');
    this.addNewSection = document.querySelector('#add-new-section');
    this.contactSection = document.querySelector('#contact-section');
    this.addEventlisteners();
    this.listBooks();
    this.initDisplayFunction();
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
        if (index % 2 === 0) {
          this.bookListContainer.innerHTML += `
            <li class="single-book-container">
              <p>"${item.title}" by ${item.author} </p>
              <button type="button" class="remove-btn" id="${index}">Remove</button>
            </li>`;
        } else {
          this.bookListContainer.innerHTML += `
          <li class="single-book-container coloured-container">
            <p>"${item.title}" by ${item.author} </p>
            <button type="button" class="remove-btn" id="${index}">Remove</button>
          </li>`;
        }
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

    const listBookNavEventFunction = () => {
      this.listSection.style.display = 'block';
      this.addNewSection.style.display = 'none';
      this.contactSection.style.display = 'none';
    };

    const addNewBookNavEventFunction = () => {
      this.listSection.style.display = 'none';
      this.addNewSection.style.display = 'block';
      this.contactSection.style.display = 'none';
    };

    const contactSectionNavEventFunction = () => {
      this.listSection.style.display = 'none';
      this.addNewSection.style.display = 'none';
      this.contactSection.style.display = 'block';
    };

    this.addButtonElement.addEventListener('click', addBookEventFunction);
    this.bookListContainer.addEventListener('click', removeBookEventFunction);
    this.listElementNavSelection.addEventListener('click', listBookNavEventFunction);
    this.addBookNavSelection.addEventListener('click', addNewBookNavEventFunction);
    this.contactElementNavSelection.addEventListener('click', contactSectionNavEventFunction);
  }

  initDisplayFunction = () => {
    this.listSection.style.display = 'block';
    this.addNewSection.style.display = 'none';
    this.contactSection.style.display = 'none';
  }
}
// eslint-disable-next-line no-unused-vars
const library = new BookList();