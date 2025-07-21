import localLayouts from '@/localData/layouts.js'

const getCoords = (layouts) => {
    const newCoords = { x: 0, y: 0}
    const max = Math.max(...layouts.map(item => item.y))
    const last = layouts[layouts.length - 1]

    if (last.x === 0) {
        newCoords.x = 6
        newCoords.y = max
    } 
    if (last.y === 6) {
        newCoords.x = 0
        newCoords.y = max + 8
    }
    return newCoords
}

export default {
    namespaced: true,
    state: () => ({
        layouts: localLayouts,
    }),
    mutations: {
        setLayout(store, item) {
            store.layouts.push(item)
        },
        removeItem(store, index) {
            store.layouts.splice(index, 1)
        }
    },
    actions: {
        addToDashboard(context, item) {
            const {x, y} = getCoords(context.state.layouts)
            item.x = x
            item.y = y
            context.commit('setLayout', item)
        },
        removeItem({commit}, index) {
            commit('removeItem', index)
        }
        // this.$router.push('/dashboard')
    },
    getters: {

    }
}