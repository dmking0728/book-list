class Book {
  constructor(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  }
}


class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }



  showAlert(errorMessage, className) {
    const div = document.createElement('div');
    //add class name
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(errorMessage));
    //when using insertBefore you need to get the parent of where you are placing the item and then get the itme where you wnat to place it before. it is a 2 step process.
    //get parent
    const container = document.querySelector('.container'); 
    //get form
    const form = document.querySelector('#book-form');
    //insert alert- takes in 2 params - the item u are inserting and the itme that you are placing it before. 
    container.insertBefore(div, form);

    //timeout after 3 secs
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook (target) {
    if(target.className === 'delete') {
      //need to target parent dom first one up the dom chain is the td second one is the tr and then we remove it. this is called traversing the DOM
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  }
}

  //persist to local storage
  class Store {

    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }

    static displayBooks() {
      const books = Store.getBooks();

      books.forEach(function(book){
        const ui = new UI;

        //add book to ui
        ui.addBookToList(book);
      });
    }

    static addBook(book) {
      const books = Store.getBooks();

      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
      const books = Store.getBooks();

      books.forEach(function(book, index){
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  //DOM load event
  document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listeners for addbook- what do we want to do once user clciks submit? we need to get fields
document. getElementById('book-form').addEventListener('submit', function(e){
  //grab input field stuff
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
//instantitate a book (use a coinstructor fx to construct a new one)
  const book = new Book(title, author, isbn);

  //instantiate UI object
  const ui = new UI();
  //validate reads if x equals nothing or ....
  if(title === '' || author === '' || isbn === '') {
    //error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //add book to lsit
  ui.addBookToList(book);

  //add to local storage -dont have to instantiate this method becasue it is static meaning we only use it once
  Store.addBook(book);

  //alert success
  ui.showAlert('Book Added', 'success');
  //clear fields
  ui.clearFields();
  }
  
  e.preventDefault();
  
});


//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  //instantiate UI
  const ui = new UI();

  //call on prototype to perform its function
  ui.deleteBook(e.target);

  //remove from local storage - we target the isbn number
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //show alert that it has been deleted
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});