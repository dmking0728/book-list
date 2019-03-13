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

//Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}



//event listeners - what do we want to do once user clciks submit? we need to get fields
document. getElementById('book-form').addEventListener('submit', function(e){
  //grab input field stuff
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
//instantitate a book (use a coinstructor fx to construct a new one)
  const book = new Book(title, author, isbn);

  //instantiate UI object
  const ui = new UI();

  //add book to lsit
  ui.addBookToList(book);
  ui.clearFields();
  e.preventDefault();
  
});
