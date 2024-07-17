const studentsPerPage = 9

function showPage(list, page) {
   // create two variables that will represent the index for the first and last student on the page
   const startIndex = page * studentsPerPage - studentsPerPage
   const endIndex = page * studentsPerPage - 1

   // select the element with a class of `student-list` and assign it to a variable
   const studentList = document.querySelector('.student-list')
   // set the innerHTML property of the variable you just created to an empty string
   studentList.innerHTML = ''

   // loop over the length of the `list` parameter
   // inside the loop create a conditional to display the proper students
   // inside the conditional:
   // create the elements needed to display the student information
   // insert the above elements
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i <= endIndex) {
         const html = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>
         `
         studentList.insertAdjacentHTML("beforeend", html)
      }
      
   }


}

function addPagination(list) {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / studentsPerPage)
 
   // select the element with a class of `link-list` and assign it to a variable
   const linkList = document.querySelector('.link-list')
 
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = ''
 
   // loop over the number of pages needed
     // create the elements needed to display the pagination button
     // insert the above elements
   for(let i = 1; i <= numOfPages; i++) {
      const button = `
      <li>
         <button type="button">${i}</button>
      </li>
      `
      linkList.insertAdjacentHTML("beforeend", button)
   }
 
   // give the first pagination button a class of "active"
   document.querySelector('button').classList.add('active')
 
   // create an event listener on the `link-list` element
     // if the click target is a button:
       // remove the "active" class from the previous button
       // add the active class to the clicked button
       // call the showPage function passing the `list` parameter and page to display as arguments
   linkList.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON') {
         document.querySelector('.active').classList.remove('active')
         e.target.classList.add('active')
         showPage(list, e.target.textContent)
      }
   })
 }

addPagination(data)
showPage(data, 1)

// Code for search functionality

const searchButton = document.getElementById('search')
searchButton.addEventListener('keyup', (e) => {
   const filteredArray = []
   for(let i = 0; i < data.length; i++) {
      const name = `${data[i].name.first} ${data[i].name.last}`
      const bool = name.toLowerCase().includes(e.target.value.toLowerCase())
      if(bool) {
         filteredArray.push(data[i])
      }
   }
   if(filteredArray.length > 0) {
      addPagination(filteredArray)
      showPage(filteredArray, 1)
   } else {
      document.querySelector('.student-list').innerHTML = `<h3>No results were found</h3>`
      document.querySelector('.link-list').innerHTML = ''
   }
})
