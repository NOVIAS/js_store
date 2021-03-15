// 基于发布、订阅模式
export default class PubSub {
    constructor() {
        this.events = {}
    }

    subscribe(event, callback) {
        let self = this;
        // 如果事件不存在，创建事件集合
        if (!self.events.hasOwnProperty(event)) {
            self.events[event] = []
        }
        // 将事件加入到对应的事件集合
        return self.events[event].push(callback)
    }

    publish(event, data = {}) {
        let self = this;
        if (!self.events.hasOwnProperty(event)) return []
        // 循环遍历事件，然后将事件集合返回
        return self.events[event].map(callback => callback(data));
    }
}