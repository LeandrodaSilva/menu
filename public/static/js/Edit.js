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

    this._$form.querySelector('#enviar').addEventListener('click',
      e => {
        e.preventDefault();
        this._saveFood();
      });
  }


  _listar(){
    $.get(env.APP_URL+"menu", (item) => this._criaUmItem(item));
  }

  _criaUmItem(itens) {
    itens.map(item => {
      this._$element.appendChild(this._$menuElements.uiFoodCardEdit(item, (buttomE, buttomD) => {
        buttomE.addEventListener('click', e => this._setFormData(e));
        buttomD.addEventListener('click', e => this._deleteFood(e));
      }));
    });
  }
  _setFormData(e){
    $.get(env.APP_URL+"menu?id="+ e.target.dataset.id, (item) => {
      this._$form.querySelector('#name').value = item[0].name;
      this._$form.querySelector('#description').value = item[0].description;
      this._$form.querySelector('#restaurantId').value = item[0].restaurantId;
      this._$form.querySelector('#price').value = item[0].price;
      this._$form.querySelector('#id').value = item[0].id;
      this._$form.querySelector('#image').setAttribute('src', item[0].imagePath);
    });
  }

  async _saveFood() {
    this._menu = new MenuObject(this._$form);
    this._menu.imagePath
        ? await toBase64(this._menu.imagePath).then(data => {
          this._menu.imagePath = data;
        })
        : this._menu.imagePath = this._$form.querySelector('#image').getAttribute('src') ;
    $.ajax({
      type: "PUT",
      url: env.APP_URL+'menu/'+this._$form.querySelector('#id').value,
      data: {
        id: this._$form.querySelector('#id').value,
        imagePath: this._menu.imagePath,
        name: this._menu.name,
        description: this._menu.description,
        price: this._menu.price,
        restaurantId: this._menu.restaurantId,
      },
      success: (data) => {
        Toast.fire({
          icon: 'success',
          title: 'A comida foi salva.'
        });
        this._updateCard(
          document.getElementById('card-menu-'+this._$form.querySelector('#id').value),
          this._menu
          );
        $('#close').click();
      },
      error: () => Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível salvar.',
        icon: 'error',
        confirmButtonText: 'OK'
      }),
      dataType: 'json'
    });
  }

  _deleteFood(e){
    Swal.fire({
      title: 'Atenção!',
      text: 'Você deseja mesmo deletar esse item?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then((r) => {
      if (r.value) {
        $.ajax({
          type: "DELETE",
          url: env.APP_URL+'menu/'+e.target.dataset.id,
          success: (data) => {
            Toast.fire({
              icon: 'success',
              title: 'A comida foi apagada.'
            });
            window.location.reload();
          },
          error: () => Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível apagar.',
            icon: 'error',
            confirmButtonText: 'OK'
          }),
          dataType: 'json'
        });
      }
    });
  }

  _updateCard($card, data){
    $card.querySelector('.card-img-top').setAttribute('src', data.imagePath);
    $card.querySelector('.card-tittle').textContent = data.name;
    $card.querySelector('p').textContent = data.description;
  }
}

