
const addBookBtns=document.querySelectorAll('.addBookBtn');
const closeCard=document.querySelector('.close-btn');
const submitBtn=document.querySelector('.submit-btn');
const formElement=document.querySelector('.book-form');




let bookList=[
    // {
    //     'Book Name': 'To Kill a Mockingbird',
    //     'Author Name': 'Harper Lee',
    //     'Genre': 'Fiction, Historical',
    //     'Publishing Year': 1960,
    //     'Upload Book Cover': URL('./images/b1.jpg'),


    // }
]


let index = 0;


function showSlide() {
    const carouselImages = document.querySelector('.carousel-images');
    const totalSlides = document.querySelectorAll('.carousel-item').length;
  
    index = (index + 1) % totalSlides; // Loop back to the first slide after the last one
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
  }
  
  // Auto-slide every 3 seconds
setInterval(showSlide, 3000);

function moveSlide(step) {
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  index += step;
  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }

  const carouselImages = document.querySelector('.carousel-images');
  carouselImages.style.transform = `translateX(-${index * 100}%)`;
}



// Function to toggle the read status of a book
function toggleReadStatus(index) {
    const book = bookList[index];
    const recentlyAdded = document.getElementById("recentlyAdded");
    const bookDiv = recentlyAdded.children[index];
    const toggleButton = bookDiv.querySelector(".toggle");
  
    // Toggle the readStatus and update button text and classes
    if (book.readStatus === "read") {
      book.readStatus = "not read";
      toggleButton.innerText = "NOT READ";
      toggleButton.classList.add("not-read");
      toggleButton.classList.remove("read");
    } else {
      book.readStatus = "read";
      toggleButton.innerText = "READ";
      toggleButton.classList.add("read");
      toggleButton.classList.remove("not-read");
    }
  }
  


function showAddBookCard() {
    document.getElementById('addBookCard').style.display = 'block';
  }
  
  // Hide Add Book Card
function hideAddBookCard() {
document.getElementById('addBookCard').style.display = 'none';
}

//get form data and insert the data in the booklist

function getFormData(data){
    const formData= new FormData(data);
    const dataObj={};
    const file=formData.get('image');
    console.log(formData);
    formData.forEach((value, key)=>{
        if(key !=='image') 
        dataObj[key]=value;
        });

    if(file){
        const reader=new FileReader();
        reader.onload=(e)=>{
            dataObj.image=e.target.result;
            bookList.push(dataObj);
            renderBooks();
        };
        reader.readAsDataURL(file);
    }
    else{
        dataObj.image=defaultImage;
        bookList.push(dataObj);
        renderBooks();
    }
    

    console.log('pushed form data to the bookList array')
    console.log(bookList);
}

//


// Default image
const defaultImage = "./images/defaultImage.jpg";

// Function to render the books
function renderBooks() {
  // Get the container
  const recentlyAdded = document.getElementById("recentlyAdded");

  // Clear the container
  recentlyAdded.innerHTML = "";

  // Loop through the bookList array and create book items
  bookList.forEach((book, index) => {
    // Create the book div
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    // // Use default image if no image is provided
    // const imageSrc = book.image ? book.image: defaultImage;

    // Add content to the book div
    bookDiv.innerHTML = `
      <button class="delete" data-index="${index}">
        <img src="./icons/icons8-delete.svg" alt="Delete">
      </button>
      <img src="${book.image}" alt="${book.bookName}">
      <h2>${book.bookName}</h2>
      <h3>${book.authorName}</h3>
      <p>${book.genre}<span>${book.year}</span></p>
      <button class="toggle">${book.isRead ? "Read" : "Not Read"}</button>
    `;

    // Append the book div to the container
    recentlyAdded.appendChild(bookDiv);

    
    // Add functionality to the toggle button
    const toggleButton = bookDiv.querySelector(".toggle");
    toggleButton.addEventListener("click", () =>{
        toggleReadStatus(index);
    });

    // Add functionality to the delete button
    const deleteButton = bookDiv.querySelector(".delete");
    deleteButton.addEventListener("click", () => deleteBook(index));
  });
}

// Function to delete a book
function deleteBook(index) {
  // Remove the book from the array
  bookList.splice(index, 1);

  // Re-render the books
  renderBooks();
}

// Initial render




addBookBtns.forEach((button)=>{
    button.addEventListener('click',()=>{
        showAddBookCard();
        console.log('add Button clicked');
    });
});
if(closeCard){
    closeCard.addEventListener('click',()=>{
        hideAddBookCard();
        console.log('hide button clicked');
    });
}
if(submitBtn){
    submitBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        getFormData(formElement);
        formElement.reset();
        renderBooks();
    }); 
}
