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
            <h2>Dagen</h2>
            <div class="c-datesGrid" style="--columns:{dates.length}">
                {#each dates as date}
                    <button class="c-homeButton" on:click={datePicked(date)}>{new Date(date).getDate()} {months[new Date(date).getMonth()]}</button>
                {/each}
            </div>
            {:else}
                <div>De film wordt momenteel niet getoont.</div>
            {/if}
            <hr>
            <div>
         
            {#if rooms.length}
                {#each rooms as room}
                            <h2>Zaal {room.roomID}</h2>
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
        <button class="c-homeButton" on:click={OrderSeat}>Plaats reserveren</button>
    {/if}

    {#if movies.length}
    <h2>Andere films van hetzelfde genre:</h2>
    <div class="c-movieGrid">
        {#each movies as movie}
                <Movie movie={movie}/>
        {/each}
    </div>
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

    onMount(async () => {        
        movie = await fetch(`https://localhost:44346/api/Movie/${id}`);
        movie = await movie.json();

	    dates = await fetch(`https://localhost:44346/api/Movie/${id}/Dates`);
        dates = await dates.json();

        movies = await fetch(`https://localhost:44346/api/Movie/genres/${movie.genreName}`)
        movies = await movies.json();

        movies = movies.slice(0,6);

        movies.forEach(removeSeenMovie);

        function removeSeenMovie(item, index){
            console.log("de each " + item.name + index)
            if(item.name ==movie.name){
                console.log("verwijderen")
               
                movies.splice(index, 1)
            }
            
        }
          
        });
    
    
    async function datePicked(date){
        console.log("de rooms");
        rooms = await fetch(`https://localhost:44346/api/Movie/${id}/${date}`);
        rooms= await rooms.json();
        allSeats=[];
        date=date;
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

    }

    function ChooseSeat(event){
        console.log("klikt op seat" + event.detail.seatID)
        seat= event.detail.seatID;

    }

    function OrderSeat(){
        console.log("de order wordt geplaats")
	    token = window.localStorage.getItem("JwtToken");
        user = JwtTokenHelper.parseJwt(token);
        console.log(token)
        console.log(user);
        console.log("movieroom " + movieRoom + " seat " + seat+ " user " + user.UserId)
        
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

<style lang="scss">

.c-movieInformationGrid{
    display: grid;
    grid-template-columns: 30% auto;
    grid-gap: 40px;
}



.c-description{
    font-size: 18px;
}

.c-movieImage{
    width: 100%;
    animation: 1s ease-out 0s 1 appear;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);


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

.c-datesGrid{
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns:repeat(var(--columns), calc(100% / var(--columns) - ((var(--columns) - 1) * 20px  / var(--columns ) )));

}


.c-homeButton{
    font-weight: bold;  
    border: 1px  solid white;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 200ms;
    margin: 4px;
    background-color: white;
    color: #4169e1;

}

.c-homeButton:hover{
    color: white;
    background-color: transparent;
}

.c-homeButton:focus{
    color: white;
    background-color: transparent;
}

.c-seatsGrid{
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns:repeat(var(--columns), calc(100% / var(--columns) - ((var(--columns) - 1) * 20px  / var(--columns ) )));
}

.c-seat{
    background-color: transparent;
    border: 1px solid white;
    border-radius: 16px;
}

@media only screen and (max-width: 700px) {
.c-movieInformationGrid{
    grid-template-columns: auto;
    grid-gap: 20px;

}

.c-seatsGrid{
    grid-gap: 10px;
    grid-template-columns:repeat(var(--columns), calc(100% / var(--columns) - ((var(--columns) - 1) * 10px  / var(--columns ) )));

}

}
</style>