
export const GetLocalStorage = (title) => localStorage.getItem(title)

export const setLocalStorage = (title,value) => {
    try {
        localStorage.setItem(title,JSON.stringify(value));     
        return {status:"ok"}   
    } catch (err) {
        return err
    }
}