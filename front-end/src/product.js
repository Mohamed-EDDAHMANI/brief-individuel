async function getProducts() {
    const dataProduct = [];
    try {
        const res = await fetch('http://localhost:3000/get-products');
        if (!res.ok) {
            console.log('error connect network');
            return dataProduct;
        }
        const data = await res.json();
        data.map(item => dataProduct.push(item));
        localStorage.setItem('data' , JSON.stringify(dataProduct))
    } catch (error) {
        console.log('Error fetching data:', error);
    }
    return dataProduct;
}


async function getcategoriList() {
    const data = JSON.parse(localStorage.getItem('data'));
    let uniqueArrayCategoris = [];

    data.map(item => {
        const isInclude = uniqueArrayCategoris.includes(item.category)
        console.log(isInclude)
        if (!isInclude) {
            uniqueArrayCategoris.push(item.category)
        }
    })
    return uniqueArrayCategoris
}

function adjustImageURL(img) {
    const currentPath = window.location.pathname;
    let basePath = '';

    if (currentPath.includes('index.html')) {
        basePath = '../_assets/imgs/';
    } else if (currentPath.includes('productsFilter.html')) {
        basePath = '../../_assets/imgs/';
    } else {
        basePath = './img/'; 
    }

    return `${basePath}${img}`;
}



async function displayCategoris( categoriList, dataProduct ) {
    const categorisContainer = document.getElementById('categoris-home-container');
    categorisContainer.innerHTML = '' ;
    const currentPath = window.location.pathname;
    
    categoriList.map(item => {
        const devContainer = document.createElement('div')
        devContainer.style.marginTop = '30px'
        if (currentPath.includes('index.html')) {
            let HTMLContainer = `
        <h3 class="text-gray-600 text-2xl font-medium ">${item}</h3>
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 " id="cards-home-${item}"> </div>
        `
        devContainer.innerHTML += HTMLContainer
        } else if (currentPath.includes('productsFilter.html')) {
            let HTMLContainer = `
        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6" id="cards-home-container"> </div>
        `
        devContainer.innerHTML += HTMLContainer
        } else {
            basePath = './img/'; 
        }
        
        categorisContainer.appendChild(devContainer)
    })
    
    dataProduct.map(itemProduct => {
        let URLimage = adjustImageURL(itemProduct.img)

        let HTMLCard = `
            <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                <div class="flex items-end justify-end h-56 w-full bg-cover  bg-center" style="background-image: url('${URLimage}')">
                    <button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </button>
                </div>
                <div class="px-5 py-3">
                    <h3 class="text-gray-700 uppercase">${itemProduct.name}</h3>
                    <span class="text-gray-500 mt-2">$ ${itemProduct.price}</span>
                </div>
            </div>
            `
        if (currentPath.includes('index.html')){
            let cardsContainer = document.getElementById(`cards-home-${itemProduct.category}`)
            cardsContainer.innerHTML += HTMLCard
        } else if (currentPath.includes('productsFilter.html')){
            let cardsContainer = document.getElementById(`cards-home-container`)
            cardsContainer.innerHTML += HTMLCard
        }
    })
}

document.addEventListener('DOMContentLoaded', async function () {
    const arrayOfCategoris = await getcategoriList()
    const dataProduct = await getProducts()
    displayCategoris( arrayOfCategoris, dataProduct )
    const optionsCategoris = document.getElementById('optionsCategoris')
    const optionsPrice = document.getElementById('optionsPrice')
    
    arrayOfCategoris.forEach(item => {
        let HTML = `
        <option value="${item}">${item}</option>
        `
        optionsCategoris.innerHTML += HTML;
    });
    
    optionsCategoris.addEventListener('change', function() {
        const selectedCategory = this.value;
        showFilter(selectedCategory);
    });

    optionsPrice.addEventListener('change', function() {
        const selectedPrice = this.value;
        triPrice(selectedPrice);
    });
})

async function showFilter(categoris) {
    const dataProduct = await getProducts()
    const dataFiltred = dataProduct.filter(item => item.category === categoris)
    displayCategoris( [categoris], dataFiltred )
}

async function triPrice(selectedPrice) {
    let arrayOfCategoris = ['item'];
    const dataProduct = await getProducts()
    if(selectedPrice === 'Ascending'){
        dataProduct.sort((a, b) => a.price - b.price);
        displayCategoris( arrayOfCategoris, dataProduct )
    }else{
        dataProduct.sort((a, b) => b.price - a.price);
        displayCategoris( arrayOfCategoris, dataProduct )
    }
}



//toogel function
function toggelClick() {
    const toggel = document.getElementById('toggel')
    const navToggel = document.getElementById('navToggel')
    toggel.addEventListener('click' , () => {
        navToggel.style
    })

    
}