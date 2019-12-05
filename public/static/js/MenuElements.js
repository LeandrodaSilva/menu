export default class MenuElements{
  uiFood(name) {
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

  /**
   *
   * @param food
   * @returns {HTMLDivElement}
   */
  uiFoodCard(food) {
    let $cardDiv = document.createElement('div');
    $cardDiv.classList.add('card');
    $cardDiv.style = 'width: 18rem;';

    let $cardImg = document.createElement('img');
    $cardImg.classList.add('card-img-top');
    $cardImg.setAttribute('src', food.imagePath);
    $cardImg.setAttribute('alt', food.name);

    let $cardBody = document.createElement('div');
    $cardBody.classList.add('card-body');

    let $cardText = document.createElement('p');
    $cardText.textContent = food.description;

    let $div = document.createElement('div');
    $div.classList.add('col');

    $cardBody.appendChild($cardText);
    $cardDiv.appendChild($cardImg);
    $cardDiv.appendChild($cardBody);

    $div.appendChild($cardDiv);

    return $div;
  }

  /**
   *
   * @param food
   * @param cb
   * @returns {HTMLDivElement}
   */
  uiFoodCardEdit(food, cb) {
    let $cardDiv = document.createElement('div');
    $cardDiv.classList.add('card');
    $cardDiv.style = 'width: 18rem;';

    let $cardImg = document.createElement('img');
    $cardImg.classList.add('card-img-top');
    $cardImg.setAttribute('src', food.imagePath);
    $cardImg.setAttribute('alt', food.name);
    $cardImg.setAttribute('data-id', food.id);

    let $btnEdit = document.createElement('buttom');
    $btnEdit.textContent = 'Editar';
    $btnEdit.classList.add('btn', 'btn-primary');
    $btnEdit.setAttribute('data-toggle', 'modal');
    $btnEdit.setAttribute('data-target', '#modalEdit');
    $btnEdit.setAttribute('data-id', food.id);

    let $btnDelete = document.createElement('buttom');
    $btnDelete.textContent = 'Excluir';
    $btnDelete.classList.add('btn', 'btn-danger');
    $btnDelete.setAttribute('data-id', food.id);

    let $cardBody = document.createElement('div');
    $cardBody.classList.add('card-body');

    let $cardText = document.createElement('p');
    $cardText.textContent = food.description;

    let $cardTittle = document.createElement('h5');
    $cardTittle.textContent = food.name;
    $cardTittle.classList.add('card-tittle');

    let $div = document.createElement('div');
    $div.classList.add('col');
    $div.id = 'card-menu-'+food.id;


    $cardBody.appendChild($cardTittle);
    $cardBody.appendChild($cardText);
    $cardBody.appendChild($btnEdit);
    $cardBody.appendChild($btnDelete);
    $cardDiv.appendChild($cardImg);
    $cardDiv.appendChild($cardBody);

    $div.appendChild($cardDiv);
    cb($btnEdit, $btnDelete);
    return $div;
  }
}
