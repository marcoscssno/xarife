const auth = {
    isAuthenticated()  {
        if (localStorage.getItem('token') === null) {
            return false
        }
        else {
            return true
        }
    }
}

export default auth