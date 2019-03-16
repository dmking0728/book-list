//book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//ui constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
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

//show alert
UI.prototype.showAlert = function(errorMessage, className) {
//create div
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

//delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    //need to target parent dom first one up the dom chain is the td second one is the tr and then we remove it. this is called traversing the DOM
    target.parentElement.parentElement.remove();
  }
}

//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}



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

  //show alert that it has been deleted
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
});