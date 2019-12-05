import { env } from "./env.js";
import MenuObject from "./MenuObject.js";
import { toBase64 } from "./utils.js";
import { Toast } from "./Toast.js";

export class CreateForm {
  imagePath = null;
  name = null;
  description = null;
  price = null;
  restaurantId = null;
  btnEnviar = null;

  constructor($form = null) {
    this.imagePath = $form.querySelector('#imagePath');
    this.name = $form.querySelector('#name');
    this.description = $form.querySelector('#description');
    this.price = $form.querySelector('#price');
    this.restaurantId = $form.querySelector('#restaurantId');
    this.btnEnviar = $form.querySelector('#enviar');
  }
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

  /**
   *
   * @type {CreateForm}
   * @private
   */
  _formObj = null;

  constructor($form) {
    this._$form = $form;
    this._formObj = new CreateForm($form);
    this._startEvents();
  }

  _startEvents(){
    let $btnSubmit = this._$form.querySelector('#enviar');
    $btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      this._saveFood();
    });
    this._$form.addEventListener('input', () => {
      this._formObj.imagePath.checkValidity()
      && this._formObj.name.checkValidity()
      && this._formObj.description.checkValidity()
      && this._formObj.restaurantId.checkValidity()
      && this._formObj.price.checkValidity()
      ? this._formObj.btnEnviar.removeAttribute('disabled')
      : this._formObj.btnEnviar.setAttribute('disabled', 'true');
    });
  }

  async _saveFood() {
    this._menu = new MenuObject(this._$form);
    this._menu.imagePath
    ? await toBase64(this._menu.imagePath).then(data => {
      this._menu.imagePath = data;
    })
    : null ;
    $.ajax({
      type: "POST",
      url: env.APP_URL+'menu',
      async: true,
      data: {
        imagePath: this._menu.imagePath,
        name: this._menu.name,
        description: this._menu.description,
        price: this._menu.price,
        restaurantId: this._menu.restaurantId,
      },
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
