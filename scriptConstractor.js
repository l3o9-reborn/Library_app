function Book(bookName, authorName, genre, year, image, isRead = false) {
    this.bookName=bookName;
    this.authorName=authorName;
    this.genre=genre;
    this.year=year;
    this.image=image|| "./images/defaultImage.jpg";
    this.isRead=isRead;
}



const Library={
    bookList:[],
    index:0,
    
// Function to toggle the read status of a book
 toggleReadStatus(index) {
    const book = this.bookList[index];
    const recentlyAdded = document.getElementById("recentlyAdded");
    const bookDiv = recentlyAdded.children[index];
    const toggleButton = bookDiv.querySelector(".toggle");
  
    // Toggle the readStatus and update button text and classes
    book.isRead = !book.isRead;
    toggleButton.innerText = book.isRead ? "READ" : "NOT READ";
    toggleButton.classList.toggle("read", book.isRead);
    toggleButton.classList.toggle("not-read", !book.isRead);
},
  


 showAddBookCard() {
    document.getElementById('addBookCard').style.display = 'block';
  },
  
  // Hide Add Book Card
 hideAddBookCard() {
document.getElementById('addBookCard').style.display = 'none';
},

//get form data and insert the data in the booklist

 getFormData(data){
    const formData= new FormData(data);
    const file=formData.get('image');
    const bookName = formData.get('bookName');
    const authorName = formData.get('authorName');
    const genre = formData.get('genre');
    const year = formData.get('year');
    const isRead = formData.get('readStatus').toUpperCase() === 'READ';
    console.log(isRead);

    
    console.log(formData);
    // formData.forEach((value, key)=>{
    //     if(key !=='image') 
    //         dataObj[key]=value;
    //     });

    if(file){
        const reader=new FileReader();
        reader.onload=(e)=>{
            const image=e.target.result;
            const book = new Book(bookName, authorName, genre, year, image, isRead);
            this.bookList.push(book);
            this.renderBooks();
            // this.bookList.push(dataObj);
            // this.renderBooks();
        };
        reader.readAsDataURL(file);
    }
    
    else{
        const book = new Book(bookName, authorName, genre, year, image, isRead);
        this.bookList.push(book);
        this.renderBooks();
    }
    

    console.log('pushed form data to the bookList array')
    console.log(this.bookList);
},
renderBooks() {
    // Get the container
    const recentlyAdded = document.getElementById("recentlyAdded");
  
    // Clear the container
    recentlyAdded.innerHTML = "";
  
    // Loop through the bookList array and create book items
    this.bookList.forEach((book, index) => {
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
        <button class="toggle ${book.isRead ? "read" : "not-read"}">${book.isRead ? "Read" : "Not Read"}</button>
      `;
  
      // Append the book div to the container
      recentlyAdded.appendChild(bookDiv);
  
      
      // Add functionality to the toggle button
      const toggleButton = bookDiv.querySelector(".toggle");
      toggleButton.addEventListener("click", () =>{
          this.toggleReadStatus(index);
      });
  
      // Add functionality to the delete button
      const deleteButton = bookDiv.querySelector(".delete");
      deleteButton.addEventListener("click", () => this.deleteBook(index));
    });
  },
  
  // Function to delete a book
    deleteBook(index) {
    // Remove the book from the array
    this.bookList.splice(index, 1);
  
    // Re-render the books
    this.renderBooks();
  },



init(){

    const addBookBtns=document.querySelectorAll('.addBookBtn');
    const closeCard=document.querySelector('.close-btn');
    const submitBtn=document.querySelector('.submit-btn');
    const formElement=document.querySelector('.book-form');
   
   
   addBookBtns.forEach((button)=>{
       button.addEventListener('click',()=>{
           this.showAddBookCard();
           console.log('add Button clicked');
       });
   });
   if(closeCard){
       closeCard.addEventListener('click',()=>{
        this.hideAddBookCard();
           console.log('hide button clicked');
       });
   };
   if(submitBtn){
       submitBtn.addEventListener('click',(e)=>{
           e.preventDefault();
           this.getFormData(formElement);
           formElement.reset();
           this.renderBooks();
       }); 
   }
   
}
 
}


const Carousel={
     index:0,

     showSlide() {
        const carouselImages = document.querySelector('.carousel-images');
        const totalSlides = document.querySelectorAll('.carousel-item').length;
      
        this.index = (this.index + 1) % totalSlides; // Loop back to the first slide after the last one
        carouselImages.style.transform = `translateX(-${this.index * 100}%)`;
      },
      
      // Auto-slide every 3 seconds
      init(){
        setInterval(()=>{this.showSlide()},3000);
        document.querySelector('.prev').addEventListener('click', () => this.moveSlide(-1));
        document.querySelector('.next').addEventListener('click', () => this.moveSlide(1));
      },

    
     moveSlide(step) {
      const slides = document.querySelectorAll('.carousel-item');
      const totalSlides = slides.length;
    
      this.index += step;
      if (this.index < 0) {
        this.index = totalSlides - 1;
      } else if (this.index >= totalSlides) {
        this.index = 0;
      }
    
      const carouselImages = document.querySelector('.carousel-images');
      carouselImages.style.transform = `translateX(-${this.index * 100}%)`;
    }

}



Library.init();
Carousel.init();
