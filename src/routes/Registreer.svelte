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
        let password = document.getElementById("Password").value.trim();

        const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        if(email != null && password != null){

            if(emailCheck.test(email)){

                const authentication ={
                    userName : email,
                    email: email,
                    passwordHash: password
                };

                const passwordCheck=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
           
                if(password.match(passwordCheck) && password.length>7){

                    return axios.post('https://localhost:44346/api/User', authentication).then(res => {
                        console.log(res)
                        if(res.data.error == "User already exists"){
                                error= "Het emailadres is al in gebruik";
                        }else{
                                error=undefined;
                                return axios.post('https://localhost:44346/api/Auth/token', authentication).then(res => {
                                    
                                    if(res.data.error == undefined){
                                        error= undefined;
                                        window.localStorage.setItem('JwtToken', res.data.token);
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


