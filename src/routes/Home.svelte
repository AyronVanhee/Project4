<div class="c-promoBox">
    <div class="c-promoTextBox" id="textbox">
        <div class="c-promoTitle">Klaar voor de beste films?</div>
        <div class="c-promoText">Bestel nu je tickets en geniet van een luxe ervaring in onze cinema</div>
    </div>
    <img class="c-promoImage" src="./images/starwarspromo.png" alt="promo afbeelding"/>
</div>

<div class="o-container">

    <h1>{filterOption}</h1>



    <div class="c-filterBar">
        <button class="c-buttonNav c-buttonNav-first" on:click={allMovies}>Alle films</button>
        <button class="c-buttonNav" on:click={moviesToday}>Vandaag</button>

        <div class="c-dropdownGenre">
            <button class="c-buttonNav">Genre</button>
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

</div>

<script>
    import Movie from "../components/Movie.svelte";
    import Genre from "../components/Genre.svelte";


    import { onMount } from 'svelte';

    let movies =[];
    let genres =[];
    let filterOption= "Alle films";

	onMount(async () => {        
	   movies = await fetch(`https://localhost:44346/api/Movie`);
       movies = await movies.json();
       console.log(movies);
       filterOption = "Alle films"

        genres= await fetch('https://localhost:44346/api/Movie/genres');
        genres = await genres.json();
        console.log(genres);

       

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

<style lang="scss">

@import '../assets/style/components/home.scss';
/*
.o-container{
    max-width: 1400px;
    margin: 0 auto;
    padding:16px;

}

.c-movieGrid{

    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    align-content: center;
}

.c-filterBar{
    display: flex;
    margin: 16px 0;
}

.c-dropdownGenre {
}

.c-dropdownGenre-content {
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  cursor: pointer;
  background-color: royalblue;
}

.c-dropdownGenre:hover .c-dropdownGenre-content {display: block;}



.c-buttonNav{
    background-color: #cf1111;
    color:white;
    padding:8px 16px;
    margin: 4px 8px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
}

.c-buttonNav-first{
    margin: 4px 8px 4px 0;
}

.c-promoBox{
    margin:0;
    padding:0;
    overflow: hidden;
    align-items: center;
    position: relative;
    display: flex;
    height: 450px;
    

}

.c-promoImage{
    justify-content: center;
    width: 100%;

}

.c-promoTitle{
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 48px;
}

.c-promoText{
    font-size: 2rem;

}

.c-promoTextBox{
    margin: 0 0 0 200px; 
    position: absolute;
    width: 550px;
    text-align: start;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

}
@media screen and (min-width: 701px) and (max-width: 1200px) {
.c-promoBox{
    height: 350px;

}
.c-promoTitle{
    font-size: 3rem;
    margin-bottom: 48px;
}

.c-promoText{
    font-size: 1.5rem;

}

.c-promoTextBox{
    margin: 0 32px 32px 32px ; 
    width: auto;

}
}

@media only screen and (max-width: 700px) {
  .c-promoBox{
    height: 200px;

}
.c-promoTitle{
    font-size: 2rem;
    margin-bottom: 16px;
}

.c-promoText{
    font-size: 1rem;

}

.c-promoTextBox{
    margin: 0 32px 32px 32px ; 
    width: auto;

}

.c-promoImage{
    width: 110%;

}
}
*/
</style>