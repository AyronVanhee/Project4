export default{

    parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
},

    logout(){
        localStorage.removeItem('JwtToken');
        window.location.href = "/home";

    },

    checkJwtToken(){
        let token = window.localStorage.getItem("JwtToken");

        if(token != undefined){
            token = this.parseJwt(token);
           
            if (Date.now() >= token.exp * 1000) {
                window.localStorage.removeItem('JwtToken')
                return undefined;

            }else{
                return token
                
            }
        }else{
            return undefined;
        }
    },
    
    checkIfAdmin(){
        let token = window.localStorage.getItem("JwtToken");

        if(token != undefined){
      
            token = this.parseJwt(token);

                if(token.Rollen == "Admin"){
                    return true;
                    
                }else{
                    return false;
                }
            
        }else{
            return false;
        }

    }
}