<div class="c-promoBox">
    <div class="c-promoTextBox" id="textbox">
        <div class="c-promoTitle">Klaar voor de beste films?</div>
        <div class="c-promoText">Bestel nu je tickets en geniet van een luxe ervaring in onze cinema</div>
    </div>
    <img class="c-promoImage" src="./images/starwarspromo2.png" alt="promo afbeelding"/>
</div>

<Container>


    <h1>{filterOption}</h1>
        <div class="c-filterBar">
            <button class="c-buttonNav" on:click={allMovies}>Alle films</button>
            <button class="c-buttonNav" on:click={moviesToday}>Vandaag</button>

            <div class="c-dropdownGenre">
                <div class="c-buttonNav">Genre</div>
                <div class="c-dropdownGenre-content">
                    {#each genres as genre}
                        <Genre on:getGenre={moviesGenre} genre={genre}/>
                    {/each}
                </div>

            </div>

        </div>


    <div class="c-movieGrid">
        {#each movies as movie}
            <Movie movie={movie}/>
        {/each}

    </div>

</Container>

<script>
    import Movie from "../components/Movie.svelte";
    import Genre from "../components/Genre.svelte";

    import Container from "../components/layout/Container.svelte";

    import { onMount } from 'svelte';

    let movies =[];
    let genres =[];
    let filterOption= "Alle films";

	onMount(async () => {       
        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
        movies = await fetch(`https://localhost:44346/api/Movie`);
        movies = await movies.json();
        filterOption = "Alle films"

        genres= await fetch('https://localhost:44346/api/Movie/genres');
        genres = await genres.json();

    });
    
    async function allMovies (){
        movies = await fetch(`https://localhost:44346/api/Movie`);
        movies = await movies.json();
        filterOption = "Alle films"

    }

    async function moviesToday (){
        movies = await fetch(`https://localhost:44346/api/Movie/Movies/Today`);
        movies = await movies.json();
        filterOption = "Vandaag"

    }

    async function moviesGenre (event){
        console.log("geklikt op genre" + event.detail.genre)
        movies = await fetch(`https://localhost:44346/api/Movie/genres/${event.detail.genre}`)
        movies = await movies.json();
        filterOption = event.detail.genre;

    }


</script>

<style type="scss">

h1{
    text-align: center;
}


</style>