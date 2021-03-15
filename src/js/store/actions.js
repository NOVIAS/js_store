export default {
    addItem(ctx, payload) {
        ctx.commit('addItem', payload);
    },
    clearItem(ctx, payload) {
        ctx.commit('clearItem', payload);
    }
}