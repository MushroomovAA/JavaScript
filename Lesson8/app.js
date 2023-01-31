'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});



// -------------------------------------------дз начало



// скрытие/открытие списка корзины  при нажатии на корзину
document.querySelector('.cartIconWrap').addEventListener('click', event => {
    document.querySelector('.basket').classList.toggle('hidden');
});

// принажаитии на тэг button в классе featuredItems лдобвалем класс addToCart
const btns = document.querySelector('.featuredItems').querySelectorAll('button');
for(const btn of btns){
    btn.classList.add('addToCart');
};

//прописываем id для каждого класса featuredItem в классе featuredItems
const itemIdEls = document.querySelector('.featuredItems')
.querySelectorAll('.featuredItem');
let i = 1;
for(const itemId of itemIdEls){
    itemId.setAttribute('id', i);
    ++i;
};

// Создаем класс Products 
class Products {
    constructor(names, prices, counts) {
      this.names = names;
      this.prices = prices;
      this.counts = counts;
    }

getProductMarkup() { 
    return `
    <div class="basketRow productsInBox">
        <div>${this.names}</div> 
        <div>${this.counts}</div>
        <div>$${this.prices}</div>
        <div>$${this.prices * this.counts}</div>
    </div>
    `;
  }
};


const listBasket = {};

function addToListBasket(idEl, nameEl, priceEl, listEl){
    if (idEl in listEl){
        const count = listEl[idEl].count + 1;
        listEl[idEl] = {name: nameEl, price: priceEl, count: count};
     } else {
    listEl[idEl] = {name: nameEl, price: priceEl, count: 1};
    return listEl;
    }   
}

document.querySelector('.featuredItems')
.addEventListener('click', function(event) {
    if (event.target.className !== 'addToCart'){
        return;
    }else{
        const parentClass = event.target.parentElement.parentElement.parentElement; //??? как проще?
        const idItem = parentClass.getAttribute('id');
        const nameItem = parentClass.querySelector('.featuredName').innerText;
        let priceItem = parentClass.querySelector('.featuredPrice').innerText;
        
        priceItem = priceItem.replace('$','');
        priceItem = Number(priceItem);

        addToListBasket(idItem, nameItem, priceItem, listBasket);
        let i = 1;
        let total = 0;
        let countItems = 0;
        document.querySelector('.myItem').innerHTML = '';
        for (i of Object.keys(listBasket)) {
            total = total + (listBasket[i].price * listBasket[i].count);
            countItems = countItems + listBasket[i].count;
            const s = new Products(listBasket[i].name, listBasket[i].price, 
                listBasket[i].count);
            ++i;
            document.querySelector('.myItem').insertAdjacentHTML("beforeend", 
            s.getProductMarkup());
            document.querySelector('.basketTotalValue').innerText = total;
            document.querySelector('.cartIconWrap').querySelector('span')
            .textContent = countItems;
        }
    } 
} );

// если скините ваш код решения этой задачи для изучения буду благодарен

