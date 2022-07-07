let library = [];

if(!localStorage.getItem('library')) {
    library = [];
    
  } else {
    library = JSON.parse(localStorage.library);
  }
  

var formTitle = document.getElementById('title');
var formAuthor = document.getElementById('author');
var formPageCount = document.getElementById('pageCount');
var formRead = document.getElementById('read');

formTitle.addEventListener('input', () => {
    formTitle.setCustomValidity('');
    formTitle.checkValidity();
  });

formTitle.addEventListener('invalid', () =>{
    if (formTitle.value === ''){
        formTitle.setCustomValidity('Plaese enter the name of the Book.')
    }
})


class Book{
    constructor (title, author, pageCount, read){
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
    }
    info(){
        return (this.title + " by " + this.author + ", " + this.pageCount + " pages. Have I read it? " + this.read);
    };
}

function openForm() {
    document.getElementById("addBook").style.display = "block";
}

function closeForm(){
    document.getElementById("addBook").style.display = "none";
}

function resetForm() {
    formTitle.value = "";
    formAuthor.value = "";
    formPageCount.value = "";
    formRead.checked = false;
}

function addBook() {
    let newBook = new Book(formTitle.value, formAuthor.value, formPageCount.value, formRead.checked);
    library.push(newBook);
    localStorage.library = JSON.stringify(library);
    //resetForm();
    //closeForm();
    createNewCard();
}

var booksRead = document.getElementById("total-read");

function totalRead(){
    let br = 0;
    for (let i=0; i<library.length; i++){
        if (library[i].read === true){
            br++
        }
    }
    booksRead.textContent = br
}

function createNewCard() {
    //resetForm();
    let grid = document.getElementById('bookGrid');
    totalRead();
    document.getElementById('total-books').textContent = library.length;
    if (library.length === 0){
    grid.textContent = "You're Library is empty.";
    } else {
        grid.textContent = ""
        for (let i=0; i<= library.length; i++){
            let card = document.createElement('div');
            card.className = "bookCard";
            let bookHead = document.createElement('h1');
            bookHead.className = 'cardTitle-label';
            bookHead.textContent = "Book Title :"
            let bookTitle = document.createElement('h2');
            bookTitle.className = "cardTitle"
            bookTitle.textContent = library[i].title;
            let authorHead = document.createElement("h3");
            authorHead.className = 'cardLabel';
            authorHead.textContent = "Author :"
            let bookAuthor = document.createElement("h3");
            bookAuthor.className = "cardData"
            bookAuthor.textContent = library[i].author;
            let pageHead = document.createElement("h3");
            pageHead.className = 'cardLabel';
            pageHead.textContent = "Page Count :"
            let bookPage = document.createElement("h3");
            bookPage.className = "cardData"
            bookPage.textContent = library[i].pageCount;
            let readHead = document.createElement('h3');
            readHead.className = "cardLabel";
            readHead.textContent = "Have you read this book? ";
            let bookRead = document.createElement('input');
            bookRead.type = "checkBox";
            bookRead.className = "readBox";
            /*var isChecked = document.getElementById("read");*/
            if (library[i].read === true){
                /*isChecked.checked = true;*/
                card.style.backgroundColor = "#c3c1c1";
                bookRead.checked = true;
            } else {
                card.style.backgroundColor = "aquamarine";
                bookRead.checked = false;
            }
            bookRead.addEventListener('change', function() {
                    if (this.checked) {
                        card.style.backgroundColor = "#c3c1c1";
                        card.style.transitionDuration = ".4s";
                        library[i].read = true;
                        totalRead();
                        localStorage.library = JSON.stringify(library);
                    } else {
                        card.style.backgroundColor = "aquamarine";
                        card.style.transitionDuration = ".4s";
                        library[i].read = false;
                        totalRead();
                        localStorage.library = JSON.stringify(library);
                    }
                });
            let remove = document.createElement('button');
            remove.className = "card-button";
            remove.textContent = "Remove";
            remove.onclick = function(){
                library.splice(i , 1);
                grid.textContent = "";
                createNewCard();
                localStorage.library = JSON.stringify(library);
            };
        card.appendChild(bookHead);
        card.appendChild(bookTitle);
        card.appendChild(authorHead);
        card.appendChild(bookAuthor);
        card.appendChild(pageHead);
        card.appendChild(bookPage);
        card.appendChild(readHead);
        card.appendChild(bookRead);
        card.appendChild(remove);
        grid.appendChild(card);
        closeForm();
    }
}
} 

createNewCard();
