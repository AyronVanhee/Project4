<Container>

<div class="c-loginBox">
    <h1>Registreer</h1>
    <div class="c-loginInformation">

        <label for="Email" class="c-label">Email</label>
        <input id="Email" class="c-input" type="text" placeholder="ponyboy.curtis@howest.be">
        <label for="Password" class="c-label">Wachtwoord</label>
        <input id="Password" class="c-input" type="password" placeholder="Wachtwoord">

        {#if error != undefined}
            <div class="c-error">{error}</div>
        {/if}


        <button on:click={Registreer} type="submit" class="c-homeButton">Registreer</button>

        <a href="/login">Al een account? Log hier in</a>
    </div>
</div>
</Container>

<script>

    import Container from "../components/layout/Container.svelte";

    import axios from "axios";

    let error;

    function Registreer(){
        localStorage.removeItem("JwtToken")

        let email = document.getElementById("Email").value;
        let password = document.getElementById("Password").value;
        console.log("email " + email + " wachtwoord " + password);

        var emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        
        if(email != null && password != null){

            if(emailCheck.test(email)){

                const authentication ={
                    userName : email,
                    email: email,
                    passwordHash: password
                };

                var lowerCaseLetters = /[a-z]/g;
                var upperCaseLetters = /[A-Z]/g;
                var numbers = /[0-9]/g;
                var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

                
                if(password.match(decimal) && password.length>7){

                    return axios.post('https://localhost:44346/api/User', authentication).then(res => {
                        console.log(res)
                        if(res.data.error == "User already exists"){
                                error= "Het emailadres is al in gebruik";
                        }else{
                                error=undefined;
                                return axios.post('https://localhost:44346/api/Auth/token', authentication).then(res => {
                                    
                                    const profile = res.data
                                    const jwtToken = res.data.token
                                    console.log(res)

                                    if(profile.error == undefined){
                                        error= undefined;
                                        window.localStorage.setItem('JwtToken', jwtToken);
                                        window.location.href = "/home";

                                    }
                                
                                });
                            }
                    });
                

                }else{
                    error="Het wachtwoord moet minstens 1 hoofletter hebben, 1 kleine letter, 1 nummer en minstens 8 characters lang zijn"
                }

            }else{
                error="Geen correct emailadres"
            }

        }else{
            error="Gelieve de lege velden in te vullen"
        }
    }
</script>

<style lang="scss">

h1{
    text-align: center;
    background-color: #4169e1;
    width: 500px;
    color: white;
    padding: 16px 0;
    margin: 0;
    border-radius: 4px 4px 0 0;
}


.c-homeButton{
    font-weight: bold;  
    border: 1px  solid #4169e1;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 200ms;
    margin: 8px 0;
    background-color: #4169e1;
    color: white;
    display: block;
    width: 100%;

}

.c-homeButton:hover{
    color: #4169e1;
    background-color: transparent;
}

.c-loginBox{
    border: 1px solid white;
    margin: 0 auto;
    width: 500px;
    background-color: white;
    color: #4169e1;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
    margin-top: 48px;

}

.c-loginInformation{
    padding: 16px;
}

.c-error{
    color: red;
    margin-bottom: 16px;
}

.c-label{
    font-size: 20px;
    margin-bottom: 16px;
}

.c-input{
    width:calc(100% - 16px);
    padding: 8px;
    border: 1px solid #4169e1;
    border-radius: 4px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);

}


</style>

