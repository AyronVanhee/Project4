<button class="c-homeButton" on:click={sendTime}>{hours}:{minutes}</button>

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

</style>