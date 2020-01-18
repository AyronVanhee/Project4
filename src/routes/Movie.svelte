<script>
  export let id;

  import Container from "../components/layout/Container.svelte";
  import Seat from "../components/Seat.svelte";
  import Times from "../components/Times.svelte";
  import Dates from "../components/Dates.svelte";
  import Movie from "../components/Movie.svelte";
  import JwtTokenHelper from "../modules/JwtToken.js";

  import { onMount } from "svelte";
  import axios from "axios";
  import { get, set } from "idb-keyval";

  let movie = [];
  let dates = [];
  let rooms = [];
  let allSeats = [];
  let occupiedSeats = [];
  let availableSeats = [];
  let date;
  let movieRoom;
  let seat;
  let user;

  let token;

  token = JwtTokenHelper.checkJwtToken();

  onMount(async () => {
    window.scrollTo({
      top: 0,
      left: 0
    });

    try {
      movie = await fetch(`https://localhost:44346/api/Movie/${id}`);
      movie = await movie.json();

      dates = await fetch(`https://localhost:44346/api/Movie/${id}/Dates`);
      dates = await dates.json();
    } catch {
      get("movies").then(arr => {
        movies = arr;
        movies.forEach(function(element) {
          if (element.movieID == id) {
            movie = element;
          }
        });
      });
    }
  });

  async function datePicked(event) {
    rooms = await fetch(
      `https://localhost:44346/api/Movie/${id}/${event.detail.date}`
    );
    rooms = await rooms.json();
    allSeats = [];
    date = date;
    seat = undefined;
  }

  async function getSeats(event) {

    occupiedSeats = await fetch(
      `https://localhost:44346/api/MovieRoom/${event.detail.movieRoom}/occupiedSeats`
    );
    occupiedSeats = await occupiedSeats.json();

    availableSeats = await fetch(
      `https://localhost:44346/api/MovieRoom/${event.detail.movieRoom}/availableSeats`
    );
    availableSeats = await availableSeats.json();

    allSeats = await fetch(
      `https://localhost:44346/api/MovieRoom/${event.detail.movieRoom}/allseats`
    );
    allSeats = await allSeats.json();

    movieRoom = event.detail.movieRoom;
    seat = undefined;
  }

  function ChooseSeat(event) {
    seat = event.detail.seatID;
  }

  function OrderSeat() {
    token = window.localStorage.getItem("JwtToken");
    user = JwtTokenHelper.parseJwt(token);

    const order = {
      movieRoomID: movieRoom,
      seatID: seat,
      UserID: user.UserId
    };

    axios.defaults.headers.post["Authorization"] = "Bearer " + token;

    return axios
      .post("https://localhost:44346/api/MovieRoom/orderReservation ", order)
      .then(res => {
        window.location.href = "/reservations";
      });
  }
</script>

<style>
  .c-movieImage {
    width: 100%;
  }

  @media only screen and (max-width: 900px) {
    .c-movieImage {
      width: 65%;
      margin: 0 auto;
      display: flex;
    }
  }
</style>

<Container>

  <h1>{movie.name}</h1>

  <div class="c-movieInformationGrid">
    <img class="c-movieImage" src={movie.image} alt="movieImage" />
    <div class="c-movieInformationText">
      <h2>Beschrijving:</h2>
      <div class="c-description c-movieInformationItem">
        {movie.description}
      </div>
      <div class="c-movieInformationItem">Release jaar: {movie.year}</div>
      <div class="c-movieInformationItem">Genre: {movie.genreName}</div>
      <div class="c-movieInformationItem">Duur: {movie.duration} minuten</div>
    </div>

  </div>
  {#if dates.length}
    <h2>Dagen</h2>
    <div class="c-datesGrid" style="--columns:{dates.length}">
      {#each dates as date}
        <Dates on:getDate={datePicked} {date} />
      {/each}
    </div>
  {:else}
    <h3>De film wordt momenteel niet getoont.</h3>
  {/if}
  <div>

    {#if rooms.length}
      <hr />
      {#each rooms as room}
        <h3>Zaal {room.roomID}</h3>
        <div class="c-datesGrid" style="--columns:{room.movieRoom.length}">
          {#each room.movieRoom as movieRoom}
            <Times on:getTime={getSeats} {movieRoom} />
          {/each}
        </div>
      {/each}
    {/if}
  </div>

  {#if allSeats.length}
    <hr />
    <h2>Zitplaatsen</h2>
    <div class="c-seatsGrid" style="--columns:{allSeats.length}">
      {#each allSeats as allSeat}
        <Seat
          on:getSeat={ChooseSeat}
          {allSeat}
          {occupiedSeats}
          {availableSeats} />
      {/each}
    </div>
  {/if}

  {#if seat != undefined}
    {#if token != undefined}
      <button class="c-homeButton c-orderButton" on:click={OrderSeat}>
        Plaats reserveren
      </button>
    {:else}
      <div>
        Je moet ingelogd zijn als je een ticket wilt kopen
        <button class="c-homeButton" onclick="window.location.href = '/login';">
          Log hier in
        </button>
      </div>
    {/if}
  {/if}

</Container>
