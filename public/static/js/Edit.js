import { env } from "./env.js";
import MenuElements from "./MenuElements.js";

export default class Edit {
  _(){
    this._$element = null;
    this._$menuElements = null;
    //teste de paginacao
    $.get("http://localhost:3000/menu?_page=1&_limit=3", (data) => console.log(data));
  }


  constructor($element){
    this._();
    this._$element = $element;
    this._$menuElements = new MenuElements();
    this._listar();
  }


  _listar(){
    $.get(env.APP_URL+"menu", (item) => this._criaUmItem(item));
  }

  _criaUmItem(itens) {
    itens.map(item => {
      this._$element.appendChild(this._$menuElements.uiFoodCard(item));
    });
  }
}

