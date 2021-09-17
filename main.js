const books = document.querySelector('#book-list');
let booklist = [];
let bookHtml = '';
if (JSON.parse(localStorage.getItem('books')) == null) {
  const bookObj = { allbook: booklist };
  localStorage.setItem('books', JSON.stringify(bookObj));
} else {
  booklist = JSON.parse(localStorage.getItem('books')).allbook;
  booklist.forEach((item, index) => {
    bookHtml += `
      <p>${item.title}</p>
      <p>${item.author}</p>
      <button type="button" class="remove-btn" id="${index}">Remove</button>
      <hr>`;
  });
  books.innerHTML = bookHtml;
}

const bookForm = document.querySelector('#book-form');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');

bookForm.addEventListener('submit', () => {
  const newBook = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  const obj = JSON.parse(localStorage.getItem('books'));
  obj.allbook.push(newBook);
  booklist = obj.allbook;
  localStorage.setItem('books', JSON.stringify(obj));
});

const removeBtn = document.querySelectorAll('.remove-btn');

removeBtn.forEach((item) => item.addEventListener('click', () => {
  const idx = parseInt(item.id, 10);
  const obj = JSON.parse(localStorage.getItem('books'));
  booklist = obj.allbook;
  booklist = booklist.filter((ele, ind) => ind !== idx);
  obj.allbook = booklist;
  localStorage.setItem('books', JSON.stringify(obj));
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}));