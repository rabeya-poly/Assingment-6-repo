const loadCategories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()
    displayCategories(data.categories);
    }
    
    
    const loadAllPets = async()=>{
        loadSpinner(true)
        const res =await fetch('https://openapi.programming-hero.com/api/peddy/pets')
        const data = await res.json()
        setTimeout(()=>{
            displayPets(data.pets)
            storedPetData = data.pets
            loadSpinner(false)
        },2000)
        
    }
    
    const loadPetByCategoryFind = async category=>{
        //remove
        removeActive()
        //spin add
        addActive(category)
        loadSpinner(true)
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        const data = await res.json()
    
    setTimeout(()=>{
        displayPets(data.data);
        storedPetData = data.data
        loadSpinner(false)
    },2000)
    }
    //
    const loadPetByDetails = async id=>{
        
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        const data = await res.json()
    
        displayPetDetails(data.petData)
    const displayPetDetails = data=>{
        console.log(data);
        my_modal_5.showModal()
    }
    }
    //
    
    const displayCategories = (data) => {
        const categoryContainer = document.getElementById('pet-categories')
         data.forEach(category =>{
           
            const div = document.createElement('div')
            div.innerHTML = `
            <button id="btn-${category.category}" onclick="loadPetByCategoryFind('${category.category}')" class="btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full">
            <img src ="${category.category_icon}" class="w-10" alt=""/>
            <p class="text-xl font-bold ">${category.category}</p>
            </button>
            `;
            categoryContainer.appendChild(div)
         })
    
    }  
    
    const displayPets = data =>{
        const petContainers = document.getElementById('all-pets')
    if(data.length === 0){
        petContainers.classList.remove('grid')
        petContainers.innerHTML=`
        <div class="bg-gray-100 p-20 rounded-xl text-center space-y-4"
        <img class="mx-auto" src="./images/error.webp">
        <p class="font-bold text-3xl">Not Available!!</p>
    
    
        </div>
        `
        return;
    }else{
        petContainers.classList.add('grid')
    }
        data.forEach(pet=>{
            
            const div = document.createElement('div')
            div.classList.add('flex','flex-col','gap-2','p-4','border','rounded-xl','font-bold')
       
       div.innerHTML = `
       <img src ="${pet.image}" class=" w-full rounded-xl object-cover" alt=""/>
       <h3 class="text-xl">${pet.pet_name}</h3>
        <p class="text-sm text-gray-700">Breed: ${pet.breed? pet.breed:'No Available'}</p>
        <p class="text-sm text-gray-700">Birth: ${pet.date_of_birth? pet.date_of_birth:'No Available'}</p>
        <p class="text-sm text-gray-700">Gender: ${pet.gender?pet.gender:'No Available'}</p>
        <p class="text-sm text-gray-700">Price: ${pet.price?'$'+pet.price:'No Available'}</p>
       <hr class="my-2"/>
       <div class="flex justify-between items-center px-2">
    <button onclick="like('${pet.image}')" class="btn bg-white text-teal-700 border rounded-lg py-1"><img class="w-6" src="https://cdn-icons-png.flaticon.com/128/9014/9014358.png"/></button>
    <button onclick="adoptModal(this)" class="btn bg-white text-teal-700 border rounded-lg py-1">Adopt</button>
    <button onclick="loadPetByDetails('${pet.petId}')" class="btn bg-white text-teal-700 border rounded-lg py-1">Details</button>
       </div>
        ` 
    petContainers.appendChild(div)
    })
    }
    //button adopt
    const adoptModal =event=>{
        let count = 3
         const countContainer = document.getElementById('countdown-container')
         countContainer.innerText = count;
         my_modal_4.showModal()
         const interval = setInterval(()=>{
     count--
     if(count !==0)countContainer.innerText = count
     if(count<1){
        clearInterval(interval)
        my_modal_4.close()
        event.textContent = 'Adopted'
        event.disabled = true
     }
         },1000)
    
        }
    
    loadCategories();
    loadAllPets();