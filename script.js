const addButton = document.querySelector('.add');
const formDialog = document.querySelector('.form-dialog');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const hasRead = document.querySelector('#has-read');
const submitButton = document.querySelector('.submit');
const cardContainer = document.querySelector('.cards-container');
const myLibrary = [];
let bookNumber = 0;


function Book(name, author, pages, isRead){
    this.name = name;
    this.author = author;
    this.pages = pages;
}


function addBookToLibrary(bookName){
    myLibrary.push(bookName);
}

function createCard(){
    const newCard = document.createElement("div");
    const displayTitle = document.createElement('p');
    const displayAuthor = document.createElement('p');
    const displayPages = document.createElement('p');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    myLibrary.forEach((book)=>{
        book.bookId = bookNumber;
        displayTitle.textContent = book.name;
        displayAuthor.textContent = book.author;
        displayPages.textContent = book.pages;
        readButton.textContent = "Read";
        readButton.setAttribute("data-book-number", book.bookId);
        removeButton.textContent = "Remove";
        removeButton.setAttribute("data-book-number", book.bookId)
        removeButton.classList.add("remove-btn");
        newCard.setAttribute("data-book-number", book.bookId);
        
        newCard.appendChild(displayTitle);
        newCard.appendChild(displayAuthor);
        newCard.appendChild(displayPages);
        newCard.appendChild(readButton);
        newCard.appendChild(removeButton);
        cardContainer.appendChild(newCard);

        removeButton.addEventListener('click', ()=>{
            const bookIdToRemove = parseInt(removeButton.getAttribute("data-book-number"));
            const indexToRemove = myLibrary.findIndex(book => book.bookId === bookIdToRemove);

            if (indexToRemove !== -1) {
                 myLibrary.splice(indexToRemove, 1);
                 cardContainer.removeChild(newCard);
            }
        
        })
    })
    bookNumber++;
}



addButton.addEventListener('click', () => {
    formDialog.showModal();
})


submitButton.addEventListener('click', () => {
    let isRead = hasRead.checked ? "Read" : "Not Read";
    const bookName = new Book(bookTitle.value, bookAuthor.value, bookPages.value, isRead);
    addBookToLibrary(bookName);
    createCard();

})

