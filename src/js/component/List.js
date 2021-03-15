import Component from '../lib/component.js'
import store from '../store/index.js'

export default class List extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.js-items')
        })
    }

    // 用于渲染页面
    render() {
        let self = this;
        if (store.state.items.length === 0) {
            self.element.innerHTML = `<p class="no-items">You are done nothing yet</p>`
            return;
        }
        self.element.innerHTML = `
          <ul class="app__items">
            ${store.state.items.map(item => {
            return `
                <li>${item}<button aria-label="Delete this item"> X </button></li>
              `
        }).join('')}
          </ul>
        `;
        let app_item = self.element.querySelector('.app__items');
        app_item.addEventListener('click', (e) => {
            console.log(e.target)
            if ('button' === e.target) {
                store.dispatch('clearItem', {index});
            }
        })
    }
}
