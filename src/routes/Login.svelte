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


        <button on:click={Login} type="submit" class="c-loginButton">Login</button>

        <a href="/registreer">Nog geen account? Registreer hier</a>
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

    function Login(){
        localStorage.removeItem("JwtToken")

        let email = document.getElementById("Email").value;
        let password = document.getElementById("Password").value;

        if(email != null && password != null){
            const authentication ={
                userName : email,
                passwordHash: password
            };
            return axios.post('https://localhost:44346/api/Auth/token', authentication).then(res => {

                    if(res.data.error == undefined){
                        error= undefined;
                        window.localStorage.setItem('JwtToken', res.data.token);
                        window.location.href = "/home";
                    }else{
                        error="Email of wachtwoord is verkeerd"
                    }

            })
        }
    }
    
</script>
