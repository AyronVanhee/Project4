<div class="c-movieBox">

    <div class="c-movieImageBox">
        <img class="c-movieImage" src={movie.image} alt="movieImage"/>
    </div>

    <div class="c-movieTitle">{movie.name}</div>
</div>

<script>
    export let movie;

</script>

<style type="scss" scoped>

    /*@import "@/assets/style/components/home.scss";*/


.c-movieImage{
    width: 120%; 
   

}

.c-movieImageBox{
    overflow: hidden;
    height: 325px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.c-movieBox{
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 18%;
    margin:1%;
    transition: all 200ms;
}

.c-movieBox:hover{
    transform:  scale(1.1);
    cursor: pointer;
}

.c-movieTitle{
    padding: 8px;
    font-weight: bold;
    height: 40px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: royalblue;
}



@media screen and (min-width: 701px) and (max-width: 1200px) {


  .c-movieBox{
    width: 27%;
    margin:3%;

}

.c-movieTitle{
    height: 50px;
  
}

.c-movieImageBox{
    height: 300px;

}

}

@media only screen and (max-width: 700px) {

 .c-movieBox{
   
    width: 44%;
    margin:3%;

}

.c-movieTitle{
    height: 55px;
  
}

.c-movieImageBox{
    height: 180px;

}

.c-movieImage{
    width: 105%; 
   

}

}
</style>