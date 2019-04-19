export const setInLocal = (key, item) => {
    localStorage.setItem( key, JSON.stringify(item))
}