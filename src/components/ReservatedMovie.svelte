<div class="c-movieBox">
        <div class="c-movieImageBox">
            <img class="c-movieImage" src={movie.image} alt="movieImage"/>
        </div>

        <div class="c-movieTitle">{reservation.movieName}</div>
        <div class="c-movieTitle c-movieItem">Zaal: {reservation.room}</div>
        <div class="c-movieTitle c-movieItem">Zetel nummer: {reservation.seatNumber}</div>
        <div class="c-movieTitle c-movieItem">{hours}:{minutes} {new Date(reservation.date).getDate()}-{new Date(reservation.date).getMonth()}-{new Date(reservation.date).getFullYear()} </div>

        <div>iets</div>

</div>


<script>
    export let reservation;

    import { onMount } from 'svelte';

    let movie=[];
    let hours;
    let minutes;

    onMount(async () => {        
            movie = await fetch(`https://localhost:44346/api/Movie/${reservation.movieId}`);
            movie = await movie.json();

            hours =new Date (reservation.date).getHours();
            minutes = new Date(reservation.date).getMinutes();

            if(hours < 10 ){
                hours ='0' +hours
            }

            if(minutes <10){
                minutes = '0'+ minutes;
            }
        });

    

</script>

<style type="scss">

.c-movieImageBox{
    cursor: default;
}


</style>