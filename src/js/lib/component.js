import Store from "../store/store";

export default class Component {
    constructor(props = {}) {
        let self = this;
        // 创建一个 render 方法
        self.render = self.render || function () {
            // 添加 stateChange 事件，以便每次可以执行 render
            if (props.store instanceof Store) props.store.events.subscribe('stateChange', () => self.render());
            if (props.hasOwnProperty('element')) self.element = props.element;
        }
    }
}