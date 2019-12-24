<div class="o-container">

    <div class="c-filterSelected">{filterOption}</div>

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
    let filterOption;

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

<style>

.o-container{
    max-width: 1200px;
    margin: 0 auto;
}

.c-movieGrid{
    display: grid;
    grid-template-columns: repeat(5, 200px);
    grid-column-gap: 40px;
    grid-row-gap: 40px;
    justify-content: center;
    padding:24px;

    border-radius: 16px;
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
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border: solid 0.8px grey;
  cursor: pointer;
}

.c-dropdownGenre:hover .c-dropdownGenre-content {display: block;}

.c-filterSelected{
    font-size: 24px;
    margin-left: 0;
    text-align: left;
    font-weight: bold;
}

.c-buttonNav{
    background-color: #cf1111;
    color:white;
    padding:8px 16px;
    margin: 4px 8px;
    border: none;
    border-radius: 36px;
    cursor: pointer;
}

.c-buttonNav-first{
    margin: 4px 8px 4px 0;
}


@media only screen and (max-width: 700px) {
    .o-container{
    max-width: 500px;
    margin: 0 auto;
}

  .c-movieGrid{
    grid-template-columns: repeat(2, 140px);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding:16px;
}
}
</style>