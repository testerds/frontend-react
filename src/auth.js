export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('userTesterDS'));
    if(user) {
        return true;
    }else{
        return false;
    }
}
