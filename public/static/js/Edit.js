import { env } from "./env.js";
import MenuElements from "./MenuElements.js";
import MenuObject from "./MenuObject.js";
import {toBase64} from "./utils.js";
import {Toast} from "./Toast.js";

export default class Edit {
  _(){
    this._$element = null;
    this._$menuElements = null;
    this._$form = null;
  }


  constructor($element, $form){
    this._();
    this._$element = $element;
    this._$menuElements = new MenuElements();
    this._$form = $form;
    this._listar();
  }


  _listar(){
    $.get(env.APP_URL+"menu", (item) => this._criaUmItem(item));
  }

  _criaUmItem(itens) {
    itens.map(item => {
      this._$element.appendChild(this._$menuElements.uiFoodCardEdit(item, (buttom, food) => {
        this._$form.querySelector('#enviar').addEventListener('click', (food) => {
          this._$form.querySelector('#name').value = food.name;
          this._$form.querySelector('#description').value = food.description;
          this._$form.querySelector('#price').value = food.price;
          this._$form.querySelector('#restaurantId').value = food.restaurantId;
          this._saveFood(food);
        });
      }));
    });
  }

  async _saveFood(food) {
    this._menu = new MenuObject(this._$form);
    this._menu.imagePath
        ? await toBase64(this._menu.imagePath).then(data => {
          this._menu.imagePath = data;
        })
        : null ;
    $.ajax({
      type: "PUT",
      url: env.APP_URL+'menu',
      async: true,
      data: "id="+food.id+"&name="+food.name,
      success: () => Toast.fire({
        icon: 'success',
        title: 'A comida foi salva.'
      }),
      error: () => Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível salvar.',
        icon: 'error',
        confirmButtonText: 'OK'
      }),
      dataType: 'json'
    });
  }
}

