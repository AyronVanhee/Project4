<script>
  export let date;

  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec"
  ];

  const dispatch = createEventDispatcher();

  function sendDate() {
    dispatch("getDate", {
      date: date
    });
  }
</script>

<style>

</style>

<label class="container">
  <input name="date" type="radio" class="c-homeButton" on:click={sendDate} />
  <span class="checkmarkText">
    {new Date(date).getDate()} {months[new Date(date).getMonth()]}
  </span>
  <span class="checkmark" />
</label>
