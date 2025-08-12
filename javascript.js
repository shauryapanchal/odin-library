let addIcon = document.querySelector('.book-card-image');
let submitButton = document.querySelector('.add-book-button');
let mainDashboard = document.querySelector('.main-dashboard');
let formScreen = document.querySelector('.form-screen');
let formClose = document.querySelector('.close-form');
let removeBookButton = document.querySelectorAll('.book-remove');
let form = document.querySelector('#form-input');

let addBookCard = document.querySelector('.book-card-add');
// Add event listeners to the add icon and form close button

addIcon.addEventListener('click', () => {
    formScreen.style.display = 'flex';
});

formClose.addEventListener('click', () => {
    formScreen.style.display = 'none';
});


addIcon.addEventListener('mouseenter', () => {
    addIcon.style.transition = 'all 0.3s ease-in-out';
    addIcon.style.scale = '1.5';
});

addIcon.addEventListener('mouseleave', () => {
    addIcon.style.transition = 'all 0.3s ease-in-out';
    addIcon.style.scale = '1';
});

addIcon.addEventListener('mousedown', () => {
    addIcon.style.color = 'white';
});

addIcon.addEventListener('mouseup', () => {
    addIcon.style.color = 'grey';
});

const totalPages = document.querySelector('#total-pages');
const completedPages = document.querySelector('#completed-pages');

totalPages.addEventListener('input', validateForm);
completedPages.addEventListener('input', validateForm);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validateForm()){
        formScreen.style.display = 'none';
        const title = document.querySelector('#book-title').value;
        const author = document.querySelector('#book-author').value;
        const total = document.querySelector('#total-pages').value;
        const completed = document.querySelector('#completed-pages').value;
        const uid = crypto.randomUUID(); // Unique ID based on current timestamp
        const newBook = new Book(title, author, total, completed, uid);
        myLibrary.push(newBook);
        addBookToLibrary();
        form.reset();
    }
    validateForm();
});
// Function to validate the form inputs

function validateForm() {
    if(totalPages.value && completedPages.value && (parseInt(completedPages.value) > parseInt(totalPages.value))) {
        totalPages.setCustomValidity("Completed pages cannot exceed total pages.");
        return false;
    }
    else {
        totalPages.setCustomValidity("");
        return true;
    }
}



const myLibrary = [];

function Book(title, author, total, completed, uid) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.totalPages = total;
  this.completed = completed;
  this.uid = uid;
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
  let latestBook = myLibrary.at(-1);
  let bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  let title = document.createElement('p');
  title.innerText = latestBook.title;
  title.classList.add('title');
  let authorBox = document.createElement('div');
  authorBox.classList.add('author');
  if(parseInt(latestBook.completed) === parseInt(latestBook.totalPages)) {
    authorBox.classList.add('complete-check');
  }
  let author = document.createElement('p');
  author.innerText = `- ${latestBook.author}`;
  let bookRemove = document.createElement('img');
  bookRemove.src = 'images/bin-cancel-close-delete-garbage-remove-svgrepo-com.svg';
  bookRemove.classList.add('book-remove');
  bookRemove.addEventListener('click', () => {
    bookCard.remove();
    // Remove from myLibrary array
    const index = myLibrary.findIndex(book => book.uid === latestBook.uid);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
  });
  let bookStatus = document.createElement('div');
  bookStatus.classList.add('book-status');
  let increasePages = document.createElement('p');
  increasePages.classList.add('symbol');
  increasePages.innerText = '+';
  increasePages.addEventListener('click', () => {
    if (latestBook.completed < latestBook.totalPages) {
      latestBook.completed++;
      pageStatus.innerText = `${latestBook.completed} / ${latestBook.totalPages}`;
        if (parseInt(latestBook.completed) === parseInt(latestBook.totalPages)) {
            authorBox.classList.add('complete-check');
        }
    }
  });
  let decreasePages = document.createElement('p');
  decreasePages.classList.add('symbol');
  decreasePages.innerText = '-';
  decreasePages.addEventListener('click', () => {
    if (latestBook.completed > 0) {
      latestBook.completed--;
      pageStatus.innerText = `${latestBook.completed} / ${latestBook.totalPages}`;
      authorBox.classList.remove('complete-check');
    }
  });
  let pageStatus = document.createElement('p');
  pageStatus.innerText = `${latestBook.completed} / ${latestBook.totalPages}`;
  pageStatus.classList.add('page-status');
  bookCard.appendChild(title);
  bookCard.appendChild(authorBox);
  authorBox.appendChild(author);
  authorBox.appendChild(bookRemove);
  bookCard.appendChild(bookStatus);
  bookStatus.appendChild(decreasePages);
  bookStatus.appendChild(pageStatus);
  bookStatus.appendChild(increasePages);
  mainDashboard.insertBefore(bookCard, addBookCard);
}