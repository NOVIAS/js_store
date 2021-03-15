import PubSub from "../lib/pubsub";

export default class Store {
    constructor(params) {
        let self = this;
        self.actions = {};
        self.mutations = {};
        self.state = {};
        // 判断 store 的状态
        self.status = 'resting';
        self.events = new PubSub();
        if (params.hasOwnProperty('actions')) self.actions = params.actions;
        if (params.hasOwnProperty('mutations')) self.mutations = params.mutations;
        self.state = new Proxy((params.state || {}), {
            get: function () {
            },
            set: function (state, key, value) {
                state[key] = value;
                console.log(`stateChange: ${key}:${value}`);
                // 通知所有
                self.events.publish('stateChange', self.state);
                if (self.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`);
                }
                self.status = 'resting'
                return true;
            }
        });
    }

    // 用于执行actions
    dispatch(actionKey, payload) {
        let self = this;
        if (typeof self.actions[actionKey] !== 'function') {
            console.error(`Action ${actionKey} does not exist`);
            return false;
        }
        console.groupCollapsed(`ACTION：${actionKey}`);
        self.status = 'action';
        self.actions[actionKey](self, payload);

        console.groupEnd();
        return true;
    }

    // 用于执行mutations
    commit(mutationKey, payload) {
        let self = this;
        if (typeof  self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation ${mutationKey} does not exist`);
            return false;
        }
        self.status = 'mutation';

        let newState = self.mutations[mutationKey](self.state, payload);
        // 将新 state 与 原有 state 进行合并
        self.state = Object.assign(self.state, newState);
        return true;
    }
}