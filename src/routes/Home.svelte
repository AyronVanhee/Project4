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

    <div class="c-notification js-notification" id="notification" >
        <div class="js-addText">Sla de films op zodat je deze ook offline kunt raadplegen</div>
        <img id="notificationIcon" class="c-add js-addImage" src="./images/plus.svg" alt="icon"/>
    </div>


</Container>

<script>
    import Movie from "../components/Movie.svelte";
    import Genre from "../components/Genre.svelte";

    import Container from "../components/layout/Container.svelte";

    import { onMount } from 'svelte';
    import { get, set } from 'idb-keyval';

    let movies=[];
    let genres =[];
    let indexedMovies=[];
    let filterOption= "Alle films";

	onMount(async () => {       
        
        window.scrollTo({
            top: 0,
            left: 0,
        });

        var notification = document.getElementById("notification")
    
        try{      
            filterOption = "Alle films"
            movies = await fetch(`https://localhost:44346/api/Movie`);
            movies = await movies.json();

            genres= await fetch('https://localhost:44346/api/Movie/genres');
            genres = await genres.json();

            get('movies')
            .then(arr => {
            
                var icon = document.getElementById("notificationIcon");
                notification.style.display="flex";

                if(arr == undefined){
                    console.log("er zit niets in de offline database")
                    if(movies.length){

                        icon.addEventListener('click', function(){
                            notification.style.display="none";
                            set('movies', movies)
                        })
                    }
                if(movies == arr){
                    console.log("zelfde gegevens")
                }        
               
                }else{

                    var gelijkeArrays = true;
                    if(arr.length !== movies.length){
                        gelijkeArrays = false;
                    }
                    for(var i = arr.length; i--;) {
                        if(JSON.stringify(arr[i]) !== JSON.stringify(movies[i])){
                            gelijkeArrays = false;
                            break;
                            }
                    }
                   
                   if(gelijkeArrays){
                        notification.style.display="none";

                   }else{
                        document.querySelector(".js-addText").innerHTML = "De offline database is niet up-to-date, wil je deze updaten?";
                        icon.addEventListener('click', function(){
                            notification.style.display="none";
                            set('movies', movies)
                        })
                   }
            
                }
        
        })

        }catch{

            console.log("error bij de api")
            get('movies')
            .then(arr=> {
                var icon = document.getElementById("notificationIcon");
                notification.style.display="flex";

                if(arr == undefined || arr== null){
                    console.log("database is leeg")
                    
                    document.querySelector(".js-addText").innerHTML = "Er zijn geen films offline opgeslagen :(";
                    document.getElementById("notificationIcon").src = "./images/crossIcon.svg";
                    
                    icon.addEventListener('click', function(){
                        notification.style.display="none";
                     })

                }else{
                    console.log("de database is niet leeg")
                    movies = arr;
                    document.querySelector(".js-addText").innerHTML = "Kan geen verbinding maken met de api, offline films worden opgehaald...";
                    document.getElementById("notificationIcon").src = "./images/crossIcon.svg";

                    icon.addEventListener('click', function(){
                         notification.style.display="none";
                     })
                }
            })
        }
        
        
    })

    
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
        movies = await fetch(`https://localhost:44346/api/Movie/genres/${event.detail.genre}`)
        movies = await movies.json();
        filterOption = event.detail.genre;

    }

</script>

<style>

h1{
    text-align: center;
}


</style>