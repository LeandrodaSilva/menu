import { env } from "./env.js";
import MenuElements from "./MenuElements.js";


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

