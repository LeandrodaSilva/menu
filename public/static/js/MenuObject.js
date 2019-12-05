export default class MenuObject {
  imagePath = null;
  name = null;
  description = null;
  price = null;
  restaurantId = null;

  constructor($form = null) {
    this.imagePath = $form.querySelector('#imagePath').files[0];
    this.name = $form.querySelector('#name').value;
    this.description = $form.querySelector('#description').value;
    this.price = $form.querySelector('#price').value;
    this.restaurantId = $form.querySelector('#restaurantId').value;
  }
}
