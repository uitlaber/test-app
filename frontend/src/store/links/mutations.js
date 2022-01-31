export function SET_LINKS(state, links) {
    state.links = links
}

export function SET_CURRENT_LINK(state, link) {
    state.currentLink = link
}

export function DELETE_LINK(state, id) {
    state.links = state.links.filter((e)=>e.id !== id )
}