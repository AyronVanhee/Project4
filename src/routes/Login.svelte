<Container>

<div class="c-loginBox">
    <h1>Login</h1>
    <div class="c-loginInformation">

        <label for="Email" class="c-label">Email</label>
        <input id="Email" class="c-input" type="text" placeholder="ponyboy.curtis@howest.be">
        <label for="Password" class="c-label">Wachtwoord</label>
        <input id="Password" class="c-input" type="password" placeholder="Wachtwoord">

        {#if error != undefined}
            <div class="c-error">{error}</div>
        {/if}


        <button on:click={Login} type="submit" class="c-homeButton">Login</button>

        <a href="/registreer">Nog geen account? Registreer hier</a>
    </div>
</div>
</Container>

<script>

    import Container from "../components/layout/Container.svelte";

    import axios from "axios";

    let error;

    function Login(){
        localStorage.removeItem("JwtToken")

        let email = document.getElementById("Email").value;
        let password = document.getElementById("Password").value;
        console.log("email " + email + " wachtwoord " + password);

        if(email != null && password != null){
            const authentication ={
                userName : email,
                passwordHash: password
            };
            return axios.post('https://localhost:44346/api/Auth/token', authentication).then(res => {

                    const profile = res.data
                    const jwtToken = res.data.token
                    console.log(res)

                    if(profile.error == undefined){
                        error= undefined;
                        window.localStorage.setItem('JwtToken', jwtToken);
                        window.location.href = "/home";
                    }else{
                        error="Email of wachtwoord is verkeerd"
                    }

                    })
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

