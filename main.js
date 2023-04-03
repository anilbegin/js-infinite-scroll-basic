const container = document.getElementById('container')
const loading = document.querySelector('.loading')

getPost()
getPost()
getPost()

async function getPost() {
    const API_URL = `https://jsonplaceholder.typicode.com/posts/${generateNumber()}` 
    const postResponse = await fetch(API_URL)
    const postData = await postResponse.json()

    const userResponse = await fetch('https://randomuser.me/api')
    const userData = await userResponse.json()
    
    const data = {post: postData, user: userData.results[0]} 

    //console.log(data)
    addDataToDom(data)

}

function generateNumber() {
  return Math.floor(Math.random() * 100) + 1
}

function addDataToDom(data) {
 const postElement = document.createElement('div')
 postElement.classList.add('blog-post')
 postElement.innerHTML = `
    <h2>${data.post.title}</h2>
    <p class='text'>${data.post.body}</p>
    <div class='user-info'>
      <img src="${data.user.picture.large}" alt="${data.user.name.first}" />
      <span>${data.user.name.first} ${data.user.name.last}</span>
    </div>
  `

  container.appendChild(postElement)

  loading.classList.remove('show')
}



window.addEventListener('scroll', () => {
  // scrollTop - relates to the position of the page currently, with respect to the topmost content in the document.
  /*
    An element's scrollTop value is a measurement of the distance from the element's top to its topmost visible content.
    When an element's content does not generate a vertical scrollbar, then its scrollTop value is 0
  */
  /* 
    scrollHeight - current total height of the page (as the content in the page increases as we keep scrolling down,
    the height will increase proportionaly)
    - the minimum height the element would require in order to fit all the content in the viewport without using a
    vertical scrollbar
  */
// clientHeight - the height of the document currently visible to the user at that instant
// scrollHeight & clientHeight will be Equal if the content of a page/document exactly fits within the size of the screen
// ***scroll values from Browser incorrectly being produced, solution in comments inside css/style.css
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    let scrollTopx = window.pageYOffset  // Unknown BUG: scrollTop returns 0, hence using alternative

    if(scrollTopx + clientHeight >= scrollHeight + 16) {
      //console.log('reached the bottom')
      // show loading animation
      showLoading()
    }
})

function showLoading() {
  loading.classList.add('show')

  // load more data
    let timeout =  setTimeout(getPost, 1000)

  // hide more loadin animation
  //  loading.classList.remove('show')  // this is called inside addDataToDom()
}

