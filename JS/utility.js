//save data
let storedPetData = []


//spinner
const loadSpinner= shows =>{
    const spinnerShows =   document.getElementById('loader-hidden')

    if(shows){
    spinnerShows.classList.remove('hidden')
document.getElementById('all-pets').innerHTML = ''
}
else{
    spinnerShows.classList.add('hidden')

}
}
//remove
const removeActive = ()=>{
    const allBtn = document.querySelectorAll('.category-btn')
for(btn of allBtn){
    btn.classList.remove('bg-emerald-100','rounded-full','border-teal-800','border-2')
}
btn.classList.add('rounded-xl')
}
//add
const addActive = (category)=>{
    const activeButton = document.getElementById(`btn-${category}`)
    activeButton.classList.remove('rounded-xl')
    activeButton.classList.add('bg-emerald-100','rounded-full','border-teal-800','border-2')
}

//like
const like = imgUrl =>{
    const imageContainer = document.getElementById('liked-pets')
const div = document.createElement('div')
div.innerHTML = `<img class="rounded-lg" src="${imgUrl}"/>`
imageContainer.appendChild(div)
}
//sort
const sort = () =>{
    loadSpinner(true)
    const sortedData = storedPetData.sort((a,b)=>b.price-a.price)
    setTimeout(()=>{
    displayPets(sortedData)
    loadSpinner(false)
},500)

}