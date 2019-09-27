export const getGUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}
// export const getUser = ()=>{
//     return JSON.parse(window.localStorage.getItem('userInfo')||window.sessionStorage.getItem('userInfo'));
// }