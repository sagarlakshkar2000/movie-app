

let currentPage = 1;

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const moiveBox = document.querySelector("#movie-box")

const getMovies = async () => {
    let APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
    const response = await fetch(APIURL)
    const data = await response.json()
    showMovies(data)
}

getMovies();


const showMovies = (data) => {
    // moiveBox.innerHTML = "";
    data.results.map((result, index) => {
        const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
        
        const box = document.createElement("div")
        box.classList.add("col-lg-3", "col-md-6", "col-12", 'mb-5')
        box.innerHTML = `<div class="card">
                    <img src="${imagePath}" class="card-img-top" alt="${result.original_title}">
                    <div class="card-body text-start overflow-auto" >
                      <h5 class="card-title title fw-bold fs-5 text-dark">${result.original_title}</h5>
                      <span class="card-text fs-6"> release_date : ${result.release_date}</span>
                      <span class="card-text fs-6"> vote_average : ${result.vote_average}</span>
                      <p class="card-text text-justify"> Overview : ${result.overview}</p>
                    </div>
                 <div>`
        moiveBox.insertAdjacentElement('beforeend',box)

    })
}



// document.querySelector("#search").addEventListener(
//     "keyup",
//     function (event) {
//         if (event.target.value != "") {
//             getMovies(SEARCHAPI + event.target.value);
//         } else {
//             getMovies(APIURL);
//         }
//     }
// )


const apiCall = () =>{
    setTimeout(() =>{
        currentPage++;
        getMovies();
        console.log('apiUrl ',currentPage)
    },500)
};


window.addEventListener('scroll',()=>{
    const {scrollHeight , scrollTop , clientHeight} = document.documentElement;

    if(scrollTop+ clientHeight <= scrollHeight){
        apiCall();
    }
})




