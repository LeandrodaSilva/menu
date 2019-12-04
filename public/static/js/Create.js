import { env } from "./env.js";
import MenuObject from "./MenuObject.js";
import { toBase64 } from "./utils.js";

export class CreateTemplate {

}


export default class Create {
  /**
   *
   * @type {HTMLFontElement}
   * @private
   */
  _$form = null;
  /**
   *
   * @type {MenuObject}
   * @private
   */
  _menu = null;

  constructor($form) {
    this._$form = $form;


    this._startEvents();
  }

  _startEvents(){
    let $btnSubmit = this._$form.querySelector('#enviar');
    $btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this._saveFood();
    });
  }

  async _saveFood() {
    this._menu = new MenuObject(this._$form);
    await toBase64(this._menu.imagePath).then(data => {
      this._menu.imagePath = data;
    });
    $.post( env.APP_URL+'menu', {
      imagePath: this._menu.imagePath,
      name: this._menu.name,
      description: this._menu.description,
      price: this._menu.price,
      restaurantId: this._menu.restaurantId,
    })
    .done(function() {
      alert('foi');
    })
    .fail(function() {
      alert( "error" );
    });
  }
}
