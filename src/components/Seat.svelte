<!-- <button id={allSeat.seatNumber} class="c-homeButton js-Seat" on:click={sendSeat}>{allSeat.seatNumber}</button> -->
{#if available}

    <label class="container">
        <input id={allSeat.seatNumber} name="seat" type="radio" class="c-homeButton  js-Seat" on:click={sendSeat}/>
        <span  class="checkmarkText"> {allSeat.seatNumber}</span>
        <span class="checkmark c-available"></span>
    </label>
{:else}
    <label class="containerOccupied">
        <input id={allSeat.seatNumber} type="radio" class="c-homeButton  js-Seat"/>
        <span  class="checkmarkText"> {allSeat.seatNumber}</span>
        <span class="checkmark  c-occupied"></span>
    </label>
{/if}

<script>
    export let allSeat;
    export let occupiedSeats;
    export let availableSeats;

    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

    //variabelen om mee te rekenen
    let i;
    let j;

    let available;

    onMount(async () => {  
        for(i=0; i< availableSeats.length; i++){       
            if(allSeat.seatID == availableSeats[i].seatID){
                var elem = document.getElementById(allSeat.seatNumber);
                available =true;
                        //elem.style.backgroundColor="pink";
                    }
            }

        for(i=0; i< occupiedSeats.length; i++){
            if(allSeat.seatID == occupiedSeats[i].seatID){
                var elem = document.getElementById(allSeat.seatNumber);
                console.log(elem)
                elem.style.backgroundColor="red";
                available=false;
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
.container{
    color:white;
}


.containerOccupied{
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 32px;
    background-color: red;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius:8px; 

}

 /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #4169e1;
    border:1px solid white;

  }
  
  /* When the radio button is checked, add a white background */
  .container input:checked ~ .checkmark {
    border:1px solid white;
    background-color: #4169e1;
  }

.c-available{
    background-color: green;
    color:white;
}

.c-occupied{
    background-color: red;
}

.container .checkmark:after {
      top: 9px;
      left: 9px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: white;;
  }


</style>