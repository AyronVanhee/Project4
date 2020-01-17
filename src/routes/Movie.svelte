<Container>

    <h1>{movie.name}</h1>

    <div class="c-movieInformationGrid">
        <div>
            <img class="c-movieImage" src={movie.image} alt="movieImage"/>
        </div>
        <div>
            <h2>Beschrijving:</h2>
            <div class="c-description c-movieInformationItem">{movie.description}</div>
            <hr>
            <div class="c-movieInformationItem">Release jaar: {movie.year}</div>
            <div class="c-movieInformationItem">Genre: {movie.genreName}</div>
            <div class="c-movieInformationItem">Duur:  {movie.duration} minuten</div>    
            <hr>
    
            {#if dates.length}
            <h3>Dagen</h3>
            <div class="c-datesGrid" style="--columns:{dates.length}">
                {#each dates as date}
                <label class="container">
                    <input name="date" type="radio" class="c-homeButton" on:click={datePicked(date)}/>
                    <span class="checkmarkText"> {new Date(date).getDate()} {months[new Date(date).getMonth()]} </span>
                    <span class="checkmark"></span>
                </label>
                {/each}
            </div>
            {:else}
                <div>De film wordt momenteel niet getoont.</div>
            {/if}
            <hr>
            <div>
         
            {#if rooms.length}
                {#each rooms as room}
                            <h3>Zaal {room.roomID}</h3>
                            <div class="c-datesGrid" style="--columns:{room.movieRoom.length}">
                                {#each room.movieRoom as movieRoom}
                                    <Times on:getTime={getSeats} movieRoom={movieRoom}/>
                                {/each}
                            </div>
                {/each}
                <hr>
            {/if}
            </div>
        </div>

    </div>

    {#if allSeats.length}
    <h2>Zitplaatsen</h2>
        <div class="c-seatsGrid" style="--columns:{allSeats.length}">
            {#each allSeats as allSeat}
                <Seat on:getSeat={ChooseSeat}  allSeat={allSeat} occupiedSeats={occupiedSeats} availableSeats={availableSeats} />
            {/each}
        </div>
    {/if}


        {#if seat!= undefined}
            {#if token != undefined}
                <button class="c-homeButton c-orderButton" on:click={OrderSeat}>Plaats reserveren</button>
            {:else}
                <div>Je moet ingelogd zijn als je een ticket wilt kopen <button class="c-homeButton" onclick="window.location.href = '/login';">Log hier in </button></div>
            {/if}
        {/if}


</Container>


<script>
    export let id;
    export let dates=[];    

    import Container from "../components/layout/Container.svelte";
    import Seat from "../components/Seat.svelte";
    import Times from "../components/Times.svelte";
    import Movie from "../components/Movie.svelte";
    import JwtTokenHelper from '../modules/JwtToken.js';

    import { onMount } from 'svelte';
    import axios from "axios";
    import { get, set } from 'idb-keyval';



    let movie=[];
    let movies=[];
    let rooms=[];
    let allSeats=[];
    let occupiedSeats=[];
    let availableSeats=[];
    let months= ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    
    let date;
    let movieRoom;
    let seat;
    let user;

    let token;

    token = JwtTokenHelper.checkJwtToken();

    onMount(async () => {   

        window.scrollTo({
            top: 0,
            left: 0,
        });
        try{

            movie = await fetch(`https://localhost:44346/api/Movie/${id}`);
            movie = await movie.json();

            dates = await fetch(`https://localhost:44346/api/Movie/${id}/Dates`);
            dates = await dates.json();
        }catch{

            get('movies')
            .then(arr => {
                movies= arr;
                movies.forEach(function(element){
                    if(element.movieID == id){
                        movie= element;
                    }
                }
                )
        })
        }         
        });
    
    
    async function datePicked(date){
        rooms = await fetch(`https://localhost:44346/api/Movie/${id}/${date}`);
        rooms= await rooms.json();
        allSeats=[];
        date=date;
        seat= undefined;
    }

    async function getSeats(event){
        console.log("alle seats" + event.detail.movieRoom)  

        occupiedSeats = await fetch(`https://localhost:44346/api/MovieRoom/${event.detail.movieRoom}/occupiedSeats`);
        occupiedSeats= await occupiedSeats.json();

        availableSeats = await fetch(`https://localhost:44346/api/MovieRoom/${event.detail.movieRoom}/availableSeats`);
        availableSeats= await availableSeats.json();

        allSeats = await fetch(`https://localhost:44346/api/MovieRoom/${event.detail.movieRoom}/allseats`);
        allSeats= await allSeats.json();

        movieRoom = event.detail.movieRoom;
        seat= undefined;

    }

    function ChooseSeat(event){
        seat= event.detail.seatID;

    }

    function OrderSeat(){
        console.log("de order wordt geplaats")
	    token = window.localStorage.getItem("JwtToken");
        user = JwtTokenHelper.parseJwt(token);
        
        const order = {
            movieRoomID: movieRoom,
            seatID: seat,
            UserID: user.UserId

        }

        axios.defaults.headers.post['Authorization'] = 'Bearer ' + token;

        return axios.post('https://localhost:44346/api/MovieRoom/orderReservation ', order )
         .then(res => {

            window.location.href = "/reservations";

         });


    }
                    
       

</script>

<style>

.c-movieInformationGrid{
    display: grid;
    grid-template-columns: 25% auto;
    grid-gap: 40px;
    margin-bottom: 32px;
}



.c-description{
    font-size: 18px;
}


.c-movieInformationItem{
    margin-bottom: 8px;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

.c-datesGrid{
    animation: 1s ease-out 0s 1 appear;
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns:repeat(var(--columns), calc(100% / var(--columns) - ((var(--columns) - 1) * 20px  / var(--columns ) )));

}


.c-seatsGrid{
    animation: 1s ease-out 0s 1 appear;
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns:repeat(var(--columns), calc(100% / var(--columns) - ((var(--columns) - 1) * 20px  / var(--columns ) )));
    margin-bottom: 16px;

}

.c-movieImage{
    width:100%;

}

.c-orderButton{
    width:45%;
    margin: 0 auto;
    margin-right:0;
    display:flex;
    margin-bottom: 16px;

}


@media only screen and (max-width: 900px) {

h1{
    text-align: center;
}
    
.c-movieInformationGrid{
    grid-template-columns: auto;
    grid-gap: 20px;

}

.c-seatsGrid{
    grid-gap: 10px;
    grid-template-columns:repeat(var(--columns), calc(100% / var(--columns) - ((var(--columns) - 1) * 10px  / var(--columns ) )));

}

.c-movieImage{
    width:75%;
    margin: 0 auto;
    display: flex;
}

}


</style>