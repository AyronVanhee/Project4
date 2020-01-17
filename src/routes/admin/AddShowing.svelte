<h2>Vertoning toevoegen</h2>


<h3>Film:</h3>
{#if movies.length}
<select id="movie">
    {#each movies as movie}
        <option value="{movie.name}" >{movie.name}</option>
    {/each}
</select>
{/if}

<h3>Zaal nummer:</h3>
{#if rooms.length}
<select id="room">
    {#each rooms as room}
        <option value="{room.roomID}" >{room.roomID}</option>
    {/each}
</select>
{/if}

<h3>Datum:</h3>
<input id="datum" type="datetime-local">

<div>
<button class="c-homeButton" on:click={addShowing}> Film Vertoning toevoegen </button>
</div>

<script>
    import Movie from "../../components/Movie.svelte";

    import axios from "axios";
    import { onMount } from 'svelte';

    let movies =[];
    let rooms =[];
    let token;


    onMount(async () => {        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
        movies = await fetch(`https://localhost:44346/api/Movie`);
        movies = await movies.json();

        rooms = await fetch(`https://localhost:44346/api/Room`);
        rooms = await rooms.json();
    });

    async function addShowing(){
        token = window.localStorage.getItem("JwtToken");


        var movie = document.getElementById("movie");
        movie = movie.options[movie.selectedIndex].value;

        var room = document.getElementById("room");
        room = room.options[room.selectedIndex].value;
        
        var date= document.getElementById("datum");

        console.log("wat geselecteerd")
        console.log(movie);
        console.log(room);
        console.log(date.value);

        if(date.value == undefined || date.value == null){
            console.log("kanker")
        }


        const movieroom ={
            movie: movie,
            room: room,
            date:date.value
        }

        axios.defaults.headers.post['Authorization'] = 'Bearer ' + token;

        return axios.post('https://localhost:44346/api/MovieRoom/movieroom', movieroom)
            .then(res => {
                window.location.href = "/admin";
                });

    }
</script>

<style>

.c-homeButton{
    margin: 16px 0;
}

select{
    height: 30px;
    border:none;
    background-color: white;
    width: 250px;
}

h2{
    margin-top:16px;
}
</style>