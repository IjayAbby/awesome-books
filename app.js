// Book Class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(index) {
    const books = Store.getBooks();
    books.splice(index, 1);

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));

    // Display Date
    /* eslint-disable */
    const DateTime = luxon.DateTime;
    /* eslint-enable */
    const now = DateTime.now();
    const dateText = now.toLocaleString(DateTime.DATETIME_MED);
    const spanForText = document.querySelector('#luxonDate');
    spanForText.textContent = dateText;

    // Hide form section
    const divForm = document.querySelector('#div4form');
    divForm.classList.add('d-none');

    // Hide contact section
    const divContact = document.querySelector('#div4contact');
    divContact.classList.add('d-none');
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const item = document.createElement('li');

    item.innerHTML = `
      <p>"${book.title}" by ${book.author}</p>
      <a href="#" class="btn btn-outline-primary btn-sm bg-white">Remove</a>
    `;

    item.classList.add('d-flex');
    item.classList.add('justify-content-between');
    list.appendChild(item);
  }

  static deleteBook(el) {
    if (el.textContent === 'Remove') {
      el.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const div2 = document.querySelector('#div4list');
    container.insertBefore(div, div2);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validate
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  const ulList = document.querySelector('#book-list');
  const item2BeRemoved = e.target.parentElement;
  const nodes = Array.from(ulList.children);

  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(nodes.indexOf(item2BeRemoved));

  // Show success message
  UI.showAlert('Book Removed', 'success');
});

// Event: show list
document.querySelector('#listA').addEventListener('click', () => {
  const divList = document.querySelector('#div4list');
  const divForm = document.querySelector('#div4form');
  const divContact = document.querySelector('#div4contact');

  // Remove d-none from divList in case it has it
  const classesDivList = divList.className;
  divList.className = classesDivList.replaceAll('d-none', '');

  // Add d-none to divForm and divContact
  divForm.classList.add('d-none');
  divContact.classList.add('d-none');
});

// Event: show form
document.querySelector('#formA').addEventListener('click', () => {
  const divList = document.querySelector('#div4list');
  const divForm = document.querySelector('#div4form');
  const divContact = document.querySelector('#div4contact');

  // Remove d-none from divForm in case it has it
  const classesDivForm = divForm.className;
  const classesDivForm2array = classesDivForm.split(' ');
  classesDivForm2array.splice(2, 1);
  const newClassesDivForm = classesDivForm2array.join(' ');
  divForm.className = newClassesDivForm;

  // Add d-none to divList and divContact
  divList.classList.add('d-none');
  divContact.classList.add('d-none');
});

// Event: show Contact info

document.querySelector('#contactA').addEventListener('click', () => {
  const divList = document.querySelector('#div4list');
  const divForm = document.querySelector('#div4form');
  const divContact = document.querySelector('#div4contact');

  //  Remove d-none from divContact
  const classesDivContact = divContact.className;
  divContact.className = classesDivContact.replaceAll('d-none', '');

  // Add d-none to divList and divForm
  divList.classList.add('d-none');
  divForm.classList.add('d-none');
});
