class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    let readStatus = this.read ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

let myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 304, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("1984", "George Orwell", 328, true),
  new Book("Blaze it", "Sir SmokeAlot", 420, true),
  new Book("True Royel", "Meghan Marquell", 10, false),
];

const addBookToLibrary = (title, author, pages, read) => {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary(myLibrary);
};

document.addEventListener("DOMContentLoaded", () => {
  const newBookBtn = document.getElementById("new-book-btn");
  const newBookForm = document.getElementById("new-booko-form");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");
  const titleError = document.getElementById("titleError");
  const authorError = document.getElementById("authorError");
  const pagesError = document.getElementById("pagesError");

  newBookBtn.addEventListener("click", () => {
    newBookForm.style.display = "block";
  });

  newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    if (!titleInput.validity.valid) {
      showTitleError();
      isValid = false;
    }

    if (!authorInput.validity.valid) {
      showAuthorError();
      isValid = false;
    }

    if (!pagesInput.validity.valid) {
      showPagesError();
      isValid = false;
    }

    if (isValid) {
      const title = titleInput.value;
      const author = authorInput.value;
      const pages = pagesInput.value;
      const read = document.getElementById("read").ariaChecked;
      addBookToLibrary(title, author, pages, read);
      newBookForm.style.display = "none";
      newBookForm.reset();
    }
  });

  function showTitleError() {
    if (titleInput.validity.valueMissing) {
      titleError.textContent = "You need to enter a title.";
    }
    titleError.className = "error active";
  }

  function showAuthorError() {
    if (authorInput.validity.valueMissing) {
      authorError.textContent = "You need to enter an author.";
    }
    authorError.className = "error active";
  }

  function showPagesError() {
    if (pagesInput.validity.valueMissing) {
      pagesError.textContent = "You need to enter the number of pages.";
    } else if (pagesInput.validity.rangeUnderflow) {
      pagesError.textContent = "The number of pages must be at least 1.";
    }
    pagesError.className = "error active";
  }
});

function displayLibrary(library) {
  let tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    let book = library[i];
    let row = document.createElement("tr");
    let titleCell = document.createElement("td");
    let authorCell = document.createElement("td");
    let pagesCell = document.createElement("td");
    let readCell = document.createElement("td");
    let toggleCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readCell.textContent = book.read ? "Yes" : "No";
    deleteCell.innerHTML =
      '<button class="delete-btn" data-index="' + i + '">Delete</button>';
    deleteCell
      .querySelector(".delete-btn")
      .addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        myLibrary.splice(index, 1);
        displayLibrary(myLibrary);
      });
    toggleCell.innerHTML =
      '<button class="toggle-btn" data-index="' + i + '">Toggle</button>';
    toggleCell
      .querySelector(".toggle-btn")
      .addEventListener("click", function () {
        let index = this.getAttribute("data-index");
        myLibrary[index].toggleReadStatus();
        displayLibrary(myLibrary);
      });

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(readCell);
    row.appendChild(toggleCell);
    row.appendChild(deleteCell);
    tableBody.appendChild(row);
  }
}
displayLibrary(myLibrary);
