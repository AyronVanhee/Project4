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

