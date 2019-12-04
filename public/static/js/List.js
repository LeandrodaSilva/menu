import { env } from "./env";

export default class List {
    constructor($page) {

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
}