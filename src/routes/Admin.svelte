<Container>
    <h1>Admin Pagina</h1>

    <div on:click={AddShowingPage} class="c-buttonNav">Vertoning toevoegen</div>

    <svelte:component this={component} />

</Container>


<script>

    import AddShowing from "../routes/admin/AddShowing.svelte";

    import Container from "../components/layout/Container.svelte";
    
    import JwtTokenHelper from "../modules/JwtToken.js";

    import { onMount } from 'svelte';
    import page from 'page';

    let token;
    let component;
    
    onMount(async () => {    
        window.scrollTo({
            top: 0,
            left: 0,
        });    

        //kijken naar een jwttoken
        token = JwtTokenHelper.checkJwtToken();

        if(JwtTokenHelper.checkIfAdmin() ==false){
            window.location.href = "/home";

        }
    });

    //routing
    page('/admin/remove', () => (component = AddShowing));

    page.start();

    function AddShowingPage(){
        component = AddShowing;
    }

</script>


