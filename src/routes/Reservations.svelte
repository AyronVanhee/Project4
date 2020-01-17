<Container>

  <h1>Tickets</h1>

  {#if reservations.length}
    <div class="c-movieGrid">
      {#each reservations as movie}
        <Reservation reservation={movie} />
      {/each}
    </div>
  {:else}
    <h2>Je hebt nog geen tickets gekocht.</h2>
  {/if}

</Container>

<script>
  import Container from "../components/layout/Container.svelte";
  import Reservation from "../components/ReservatedMovie.svelte";

  import axios from "axios";
  import { onMount } from "svelte";

  let reservations = [];

  onMount(async () => {
    let token = window.localStorage.getItem("JwtToken");

    axios.defaults.headers.get["Authorization"] = "Bearer " + token;

    axios.get("https://localhost:44346/api/User/reservations").then(res => {
      reservations = res.data;
    });
  });
</script>

<style>
  h1 {
    text-align: center;
  }
</style>