<!-- <button class="c-homeButton" on:click={sendTime}>{hours}:{minutes}</button> -->
<label class="container">
    <input name="time" type="radio" class="c-homeButton" on:click={sendTime}/>
    <span class="checkmarkText"> {hours}:{minutes} </span>
    <span class="checkmark"></span>
</label>
<script>
    export let movieRoom;

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    function sendTime() {
		dispatch('getTime', {
			movieRoom: movieRoom.movieRoomID
		});
	}

    let hours;
    let minutes;

    onMount(async () => {  
        console.log("de id" + movieRoom)
            hours =new Date (movieRoom.date).getHours();
            minutes = new Date(movieRoom.date).getMinutes();

            if(hours < 10 ){
                hours ='0' +hours
            }

            if(minutes <10){
                minutes = '0'+ minutes;
            }

    });

</script>

<style>

</style>