export default class List {
    searchButton = document.querySelector('#searchButton');
    listItens = document.querySelector('#listItens');
    stateItemList = [];
    page = 1;
    limit = 4;

    constructor() {
        document.querySelector('body').onload = () => this.loadItens();
        document.querySelector('#form').addEventListener('input', e => {
            e.preventDefault();
            let searchInput = document.querySelector('#search');
            this.searchItem(searchInput.value.toLowerCase());
        });
        document.querySelector('#btn-back').addEventListener('click', () => {
            this.handlePagination(false);
        });
        document.querySelector('#btn-next').addEventListener('click', () => {
            this.handlePagination(true);
        });
    }

    handlePagination(operation){
        operation ? this.page += 1 : this.page -= 1;

        this.loadItens();
    }
    handleBtnBackVisibility(){
        let buttonNext = document.querySelector('#btn-next');
        let buttonBack = document.querySelector('#btn-back');
        let blank = document.querySelector('#blank');

        if (this.page === 1){
            buttonBack.style.display = 'none';
            blank.style.display = 'flex';
        }else{
            buttonBack.style.display = 'flex';
            blank.style.display = 'none';
        }
    }

    loadItens(){
        this.handleBtnBackVisibility();
        $.get(`http://localhost:3000/menu/?_page=${this.page}&_limit=${this.limit}`, (itens) => this.createItens(itens));
    }

    createItens(itens){
        this.stateItemList = [];
        this.listItens.innerHTML = '';

        itens.map(item => {
            this.stateItemList.push(item);

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

            this.listItens.appendChild(li);
        })
    }

    searchItem(string){
        let desiredItem = [];
        this.stateItemList.find(item => {
            string === item.name.toLowerCase() && desiredItem.push(item)
        });

        if(desiredItem.length === 0){
            this.loadItens();
            return;
        }

        this.createItens(desiredItem);
    }
}


