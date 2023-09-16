
const addButton = document.querySelector('.add');
const formDialog = document.querySelector('.form-dialog');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const hasRead = document.querySelector('#has-read');
const submitButton = document.querySelector('.submit');
const cardContainer = document.querySelector('.cards-container');
const form = document.querySelector('.book-form');
const myLibrary = [];
const bookContainer = [];
let bookNumber = 0;

function Book(name, author, pages, isRead){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function(){
    this.isRead = !this.isRead;
}

function addBookToLibrary(bookName){
    bookName.bookId = bookNumber
    myLibrary.push(bookName);
    bookNumber++;

}

function createCard(bookId) {
    const newCard = document.createElement("div");
    const displayTitle = document.createElement('p');
    const displayAuthor = document.createElement('p');
    const displayPages = document.createElement('p');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');
    const book = myLibrary.find(book => book.bookId === bookId);

    
    displayTitle.textContent = book.name;
    displayAuthor.textContent = book.author;
    displayPages.textContent = book.pages;

    if(book.isRead){
        readButton.textContent = "Read";
        readButton.classList.toggle("is-read");
    }else{
        readButton.textContent = "Not Read";
        readButton.classList.toggle("not-read");
    }
    
    readButton.setAttribute("data-book-number", book.bookId);
    removeButton.textContent = "Remove";
    removeButton.setAttribute("data-book-number", book.bookId);
    removeButton.classList.add("remove-btn");
    newCard.setAttribute("data-book-number", book.bookId);
    
    newCard.appendChild(displayTitle);
    newCard.appendChild(displayAuthor);
    newCard.appendChild(displayPages);
    newCard.appendChild(readButton);
    newCard.appendChild(removeButton);
    cardContainer.appendChild(newCard);
    
    removeButton.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        cardContainer.removeChild(newCard);
        for (let i = 0; i < myLibrary.length; i++) {
            myLibrary[i].bookId = i;
        }
        bookNumber = myLibrary.length;
    });

    readButton.addEventListener('click', () => {
        const bookId = readButton.getAttribute('data-book-number');
        const book = myLibrary.find(book => book.bookId == bookId);

        if(book){
            book.toggleReadStatus();
            if(book.isRead){
                readButton.textContent = "Read";
                readButton.classList.toggle("is-read");
            }else{
                readButton.textContent = "Not Read";
                readButton.classList.toggle("not-read");
            }
        }
    
})
 
}

submitButton.addEventListener('click', () => {
    if(!form.checkValidity()){
        event.preventDefault();
    }
    else{
        event.preventDefault();
        formDialog.close();
        let isRead = hasRead.checked;
        const bookName = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        hasRead.checked ? hasRead.checked = false : null;
        isRead = false;
        addBookToLibrary(bookName);
        createCard(bookName.bookId);

    }
})
addButton.addEventListener('click', () => {
    formDialog.showModal();

})
