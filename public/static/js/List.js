// import { env } from "./env";

// export default class List {
//     constructor($page) {}

//     _listar(){
//         console.log('teste');
//     }
//     _listar(){
//         let $inputSearch = this._$header.querySelector('#input-search');
//         let inputValue = $inputSearch.value;
//         let dados = null;

//         if (inputValue !== '') {
//             $.get(env.APP_URL+"menu/"+inputValue, (item) => this._criaUmItem(item));
//         } else {
//             // Swal.fire('Não inseriu um valor');
//             $.get(env.APP_URL+"menu/", (itens) => this._criaVariosItens(itens));
//         }
//     };
// }

let searchButton = document.querySelector('#searchButton');
let listItens = document.querySelector('#listItens');
var stateItemList = [];
var page = 1;
var limit = 4;

document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault();
    let searchInput = document.querySelector('#search');    

    searchItem(searchInput.value);
})

document.querySelector('#btn-back').addEventListener('click', () => {
    handlePagination(false);
})

document.querySelector('#btn-next').addEventListener('click', () => {
    handlePagination(true);
})

function handlePagination(operation){
    operation ? page += 1 : page -= 1;

    loadItens();
}

function handleBtnBackVisibility(){
    let buttonNext = document.querySelector('#btn-next');
    let buttonBack = document.querySelector('#btn-back');
    let blank = document.querySelector('#blank');

    if (page === 1){
        buttonBack.style.display = 'none';
        blank.style.display = 'flex';
    }else{
        buttonBack.style.display = 'flex';
        blank.style.display = 'none';
    }
}

function loadItens(){
    handleBtnBackVisibility();
    
    $.get(`http://localhost:3000/menu/?_page=${page}&_limit=${4}`, (itens) => createItens(itens));
}

function createItens(itens){
    stateItemList = [];
    listItens.innerHTML = '';

    itens.map(item => { 
        stateItemList.push(item);

        // Create a li
        let li = document.createElement('li');
        li.className = 'item';

        // Create tittle
        let tittle = document.createElement('h4');
        tittle.className = 'tittle';
        let tittleContent = document.createTextNode(item.name);
        tittle.appendChild(tittleContent);

        // Create itemImage
        let itemImage = document.createElement('img');
        itemImage.className = 'itemImage';
        itemImage.setAttribute('src', item.imagePath);

        // Create description
        let description = document.createElement('p');
        description.className = 'description';
        let descriptionContent = document.createTextNode(item.description);
        description.appendChild(descriptionContent);

        // Create price
        let price = document.createElement('span');
        price.className = 'price';
        let priceContent = document.createTextNode(`R$: ${item.price}0`);
        price.appendChild(priceContent);   

        // Create a div
        let div = document.createElement('div');
        div.className = 'footer';

        div.appendChild(description);
        div.appendChild(price);
    
        li.appendChild(itemImage);
        li.appendChild(tittle);
        li.appendChild(div);

        listItens.appendChild(li);
    })
}

function searchItem(string){
    let desiredItem = [];
    stateItemList.find(item => {
        string === item.name && desiredItem.push(item)
    });

    if(desiredItem.length === 0){
        loadItens();
        return;
    }

    createItens(desiredItem);
}


