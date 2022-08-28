let statusFormEdit = false
const checkboxReadComplete = document.querySelector("#inputBookIsComplete"), 
bookSubmitStatus = document.querySelector("#bookSubmit");
const inputBookTitle = document.querySelector("#inputBookTitle"), 
inputSectionHeader = document.querySelector("#input_section>h2"), 
inputBookAuthor = document.querySelector("#inputBookAuthor"), 
inputBookYear = document.querySelector("#inputBookYear"), 
incompleteBookshelfList = document.querySelector("#incompleteBookshelfList"), 
completeBookshelfList = document.querySelector("#completeBookshelfList");

localStorage.getItem('data') ? localStorage.getItem('data') : localStorage.setItem('data','[]')
renderBookShelf()

document.getElementById("inputBook").addEventListener("submit", function(event){
    event.preventDefault();
    if(!checkTitleDuplicate(inputBookTitle.value)){
        addBook(inputBookTitle.value, inputBookAuthor.value, inputBookYear.value)
        inputBookTitle.value = ''
        inputBookAuthor.value = ''
        inputBookYear.value = ''
    }else{
        alert("Data not save, title duplicate")
    }
});

checkboxReadComplete.addEventListener('change', function() {
    if (this.checked) {
        bookSubmitStatus.innerHTML = "Masukkan Buku ke rak <span>Selesai dibaca</span>"
    } else {
        bookSubmitStatus.innerHTML = "Masukkan Buku ke rak <span>Belum selesai dibaca</span>"
    }
});

function addBook(title, author, year){
    let books = JSON.parse(localStorage.getItem('data'))
    books.push(
        {
            id: 1+books.length,
            title: title,
            author: author,
            year: year,
            isComplete: checkboxReadComplete.checked,
        }
        )
        localStorage.setItem('data',JSON.stringify(books))
        renderBookShelf()
    }
    
    function deleteBook(idx){
        let books = JSON.parse(localStorage.getItem('data'))
        if (confirm(`apakah anda yakin akan menghapus buku ${books[idx].title} ?`)) {
            alert(`Buku ${books[idx].title} dihapus`)
            books.splice(idx,1)
            localStorage.setItem('data',JSON.stringify(books))
            renderBookShelf()
        } else {
            alert(`data buku ${books[idx].title} tidak dihapus`);
        }
        localStorage.setItem('data',JSON.stringify(books))
    }
    
    function moveBook(idx){
        let books = JSON.parse(localStorage.getItem('data'))
        if (confirm(`apakah anda yakin akan memindahkan buku ${books[idx].title} ke rak ${books[idx].isComplete ? "Belum selesai dibaca" : "Selesai dibaca" }?`)) {
            alert(`Buku ${books[idx].title} dipindahkan`)
            books[idx].isComplete = !books[idx].isComplete
            localStorage.setItem('data',JSON.stringify(books))
            renderBookShelf()
        } else {
            alert(`data buku ${books[idx].title} tidak dipindahkan`);
        }
        localStorage.setItem('data',JSON.stringify(books))
    }
    
    function editBook(idx){
        let books = JSON.parse(localStorage.getItem('data'))
        let tempTitle = prompt(`rubah title buku ${books[idx].title} :`,books[idx].title)
        let tempAuthor = prompt(`rubah author buku ${books[idx].author} :`,books[idx].author)
        let tempYear = prompt(`rubah tahun buku ${books[idx].year} :`,books[idx].year)
        books[idx].title = tempTitle
        books[idx].author = tempAuthor
        books[idx].year = tempYear
        localStorage.setItem('data',JSON.stringify(books))
        renderBookShelf()
    }
    
    function searchBook(searchText){
        let books = JSON.parse(localStorage.getItem('data'))
        incompleteBookshelfList.innerHTML = ''
        completeBookshelfList.innerHTML = ''
        for(let [idx, book] of books.entries()){
            searchText = searchText.toLowerCase()
            let title = book.title.toLowerCase()
            if(title.includes(searchText)){
                if(book.isComplete){
                    completeBookshelfList.innerHTML +=  ` 
                    <article class="book_item">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                    
                    <div class="action">
                    <button class="green" onclick="moveBook(${idx})">pindahkan ke rak belum selesai dibaca</button>
                    <button class="red" onclick="deleteBook(${idx})">Hapus buku</button>
                    <button class="yellow" onclick="editBook(${idx})">Edit buku</button>
                    </div>
                    </article>
                    `
                }else{
                    incompleteBookshelfList.innerHTML +=  ` 
                    <article class="book_item">
                    <h3>${book.title}</h3>
                    <p>Penulis: ${book.author}</p>
                    <p>Tahun: ${book.year}</p>
                    
                    <div class="action">
                    <button class="green" onclick="moveBook(${idx})">pindahkan ke rak selesai dibaca</button>
                    <button class="red" onclick="deleteBook(${idx})">Hapus buku</button>
                    <button class="yellow" onclick="editBook(${idx})">Edit buku</button>
                    </div>
                    </article>
                    `
                }
            }
        }
    }
    
    function checkTitleDuplicate(title){
        let books = JSON.parse(localStorage.getItem('data'))
        for(let book of books){
            if(book.title === title){
                return true
            }
        }
        return false
    }
    
    function renderBookShelf(){
        let books = JSON.parse(localStorage.getItem('data'))
        incompleteBookshelfList.innerHTML = ''
        completeBookshelfList.innerHTML = ''
        for(let [idx, book] of books.entries()){
            if(book.isComplete){
                completeBookshelfList.innerHTML +=  ` 
                <article class="book_item">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                
                <div class="action">
                <button class="green" onclick="moveBook(${idx})">pindahkan ke rak belum selesai dibaca</button>
                <button class="red" onclick="deleteBook(${idx})">Hapus buku</button>
                <button class="yellow" onclick="editBook(${idx})">Edit buku</button>
                </div>
                </article>
                `
            }else{
                incompleteBookshelfList.innerHTML +=  ` 
                <article class="book_item">
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                
                <div class="action">
                <button class="green" onclick="moveBook(${idx})">pindahkan ke rak selesai dibaca</button>
                <button class="red" onclick="deleteBook(${idx})">Hapus buku</button>
                <button class="yellow" onclick="editBook(${idx})">Edit buku</button>
                </div>
                </article>
                `
            }
        }
    }