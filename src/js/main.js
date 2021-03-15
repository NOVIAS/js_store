import store from  './store/index.js';
import Count from "./component/Count";
import List from './component/List.js';
import Status from "./component/Status";

const formElement = document.querySelector('.js-form');
const inputElement = document.querySelector('#new-item-field');

const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();

countInstance.render();
listInstance.render();
statusInstance.render();

formElement.addEventListener('submit', e => {
    e.preventDefault();
    let value = inputElement.value.trim();
    if (value.length) {
        store.dispatch('addItem', value);
        inputElement.value = '';
        inputElement.focus();
    }
})