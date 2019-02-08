export const isAuthenticatedTeacher = () => {
    const user = JSON.parse(localStorage.getItem('userTesterDS'));
    if(user) {
        if(user.isTeacher){
            return true;
        }
        else{
            return false;
        }
    }else{
        return false;
    }
}