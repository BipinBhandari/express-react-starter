import {createSelector} from "reselect"

const userDomain = state => (state.auth || {})

export const selectToken = createSelector(userDomain, userState => userState.token)
export const selectUser = createSelector(userDomain, userState => userState.user)

