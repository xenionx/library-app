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

    readButton.setAttribute("class", book.isRead === "Read" ? "is-read" : "not-read");
    readButton.textContent = book.isRead === "Read" ? "Read" : "Not Read";
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
        bookNumber--;
        console.table(myLibrary);
    });

    readButton.addEventListener('click', () => {
        if(readButton.getAttribute("class") === "is-read"){
            readButton.setAttribute("class", "not-read");
            readButton.textContent = "Not Read";
        }
        else{
            readButton.setAttribute("class", "is-read");
            readButton.textContent = "Read";
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
        let isRead = hasRead.checked ? "Read" : "Not Read";
        const bookName = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        isRead = "";
        addBookToLibrary(bookName);
        createCard(bookName.bookId);
        hasRead.checked ? hasRead.checked = false : null;
    }
})
addButton.addEventListener('click', () => {
    formDialog.showModal();

})
