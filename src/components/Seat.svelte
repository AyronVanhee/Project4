<button id={allSeat.seatNumber} class="c-homeButton js-Seat" on:click={sendSeat}>{allSeat.seatNumber}</button>

<script>
    export let allSeat;
    export let occupiedSeats;
    export let availableSeats;

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    let i;
    let j;

    onMount(async () => {  
        for(i=0; i< availableSeats.length; i++){       
            if(allSeat.seatID == availableSeats[i].seatID){
                var elem = document.getElementById(allSeat.seatNumber);
                elem.classList.add("c-available");
                elem.style.backgroundColor="green";
                elem.style.color="white";
                        //elem.style.backgroundColor="pink";
                    }
            }

        for(i=0; i< occupiedSeats.length; i++){
            if(allSeat.seatID == occupiedSeats[i].seatID){
                var elem = document.getElementById(allSeat.seatNumber);
                elem.classList.add("c-occupied");
                elem.style.backgroundColor="red";
                }
            }
        
                            

    });

    function sendSeat(){
        dispatch("getSeat", {
            seatID: allSeat.seatID
        })
    }

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

.c-available{
    background-color: green!important;
    color: pink;
}

.c-occupied{
    background-color: red!important;
    color: pink;
}

</style>