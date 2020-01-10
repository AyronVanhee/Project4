<Container>

    <h1>Tickets</h1>

    
    {#if reservations.length}
        <div class="c-movieGrid">
        {#each  reservations as movie}
                <Reservation reservation={movie}/>
        {/each}
        </div>
    {:else}
        <h2>Je hebt nog geen tickets gekocht.</h2>

    {/if}


</Container>

<script>

    import Container from "../components/layout/Container.svelte";
    import Reservation from "../components/ReservatedMovie.svelte";

    import JwtTokenHelper from '../modules/JwtToken.js';

    import axios from "axios";
    import { onMount } from 'svelte';

    let reservations=[];
    let token;


    onMount(async () => {  
	    token = window.localStorage.getItem("JwtToken");

        axios.defaults.headers.get['Authorization'] = 'Bearer ' + token;

        axios.get('https://localhost:44346/api/User/reservations' )
        .then(res => {
            reservations = res.data;
            console.log(reservations)

         });
    });
</script>

<style lang="scss">

h1{
    text-align: center;
}


.c-homeButton{
    font-weight: bold;  
    border: 1px  solid #4169e1;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 200ms;
    margin: 4px;
    background-color: #4169e1;
    color: white;
    display: block;

}

.c-homeButton:hover{
    color: #4169e1;
    background-color: transparent;
}

.c-loginBox{
    margin: 0 auto;
    width: 400px;
    background-color: white;
    color: #4169e1;
    padding: 16px;

}

.c-error{
    color: red;
    margin:16px 0;
}


</style>

