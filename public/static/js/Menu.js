import { env } from "./env.js";

export class MenuElements{
  uiFood(name){
    let $inputName = document.createElement('input');
    $inputName.type = 'text';
    $inputName.classList.add('form-control');
    $inputName.readOnly = true;
    $inputName.value = name;

    let $nameSpan = document.createElement('span');
    $nameSpan.classList.add('input-group-text');
    $nameSpan.id = 'basic-addon1';
    $nameSpan.textContent = 'Nome';

    let $spanDiv = document.createElement('div');
    $spanDiv.classList.add('input-group-prepend');
    $spanDiv.appendChild($nameSpan);

    let $externalDiv = document.createElement('div');
    $externalDiv.classList.add('input-group', 'mb-3');
    $externalDiv.appendChild($spanDiv);
    $externalDiv.appendChild($inputName);

    return $externalDiv;
  }
}


export default class Menu {
  _(){
    this._$element = null;
    this._$header = null;
    this._$menuElements = null;
  }


  constructor($element, $header){
    this._();
    this._$element = $element;
    this._$header = $header;
    this._$menuElements = new MenuElements();

    let $btnSearch = $header.querySelector('#btn-search');

    $btnSearch.addEventListener('click', (event) =>{
      event.preventDefault();
      this._listar();
    });

    let $inputSearch = $header.querySelector('#input-search');

    $inputSearch.addEventListener('keyup', (e) => {
      e.preventDefault();
      // console.log($inputSearch.value);
      this._buscar($inputSearch.value);
    });
  }


  _buscar(nome){
    $.get(env.APP_URL + "menu/?name="+nome, function (data) {
      console.log(data)
    })
  }

  _listar(){
    let $inputSearch = this._$header.querySelector('#input-search');
    let inputValue = $inputSearch.value;
    let dados = null;

    if (inputValue !== '') {
      $.get(env.APP_URL+"menu/"+inputValue, (item) => this._criaUmItem(item));
    } else {
      // Swal.fire('Não inseriu um valor');
      $.get(env.APP_URL+"menu/", (itens) => this._criaVariosItens(itens));
    }
  };

  _criaUmItem(item) {
    this._$element.appendChild(this._$menuElements.uiFood(item.name));
  }

  _criaVariosItens(dados) {
    dados.forEach((dado) => {
      console.log(dado.name);
      let $food = this._$menuElements.uiFood(dado.name);
      this._$element.append($food);
    });
  }
}
