<Container>

<div class="c-logoBox">
    <img class="c-logoImage" src="./images/favicon.png" alt="promo afbeelding"/>
</div>

<div class="c-loginBox">
    <div class="c-loginInformation">

        <label for="Email" class="c-label">Email</label>
        <input id="Email" class="c-input" type="text" placeholder="ponyboy.curtis@howest.be">
        <label for="Password" class="c-label">Wachtwoord</label>
        <input id="Password" class="c-input" type="password" placeholder="Wachtwoord">

        {#if error != undefined}
            <div class="c-error">{error}</div>
        {/if}


        <button on:click={Registreer} type="submit" class="c-loginButton">Registreer</button>

        <a href="/login">Al een account? Log hier in</a>
    </div>
</div>
</Container>

<script>

    import Container from "../components/layout/Container.svelte";

    import axios from "axios";

    let error;

    window.scrollTo({
            top: 0,
            left: 0,
        });

    function Registreer(){
        localStorage.removeItem("JwtToken")

        let email = document.getElementById("Email").value.trim();
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

.c-logoBox{
    background-color: white;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0 auto;
    border-radius: 16px;
    margin-top: 32px;
}

.c-logoImage{
    width: 100px;
    height: auto;
    margin:16px;
}

@media only screen and (max-width: 550px) {
    .c-loginBox{
        margin-top: 0;
        width: 250px;

}

.c-logoBox{
    background-color: white;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    border-radius: 16px;
    margin-top: 8px;
    margin-bottom: 16px;
}

.c-logoImage{
    width: 50px;
    height: auto;
    margin:16px;
}
}

</style>

