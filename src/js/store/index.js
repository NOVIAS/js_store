import actions from './actions.js';
import mutations from './mutaions.js';
import state from "./state.js";
import Store from "./store.js";

export default new Store({
    actions,
    mutations,
    state,
});