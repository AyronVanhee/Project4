<div class="c-movieBox">

    <div class="c-movieImageBox">
        <img class="c-movieImage" src={movie.image} alt="movieImage"/>
    </div>

    <div class="c-movieTitle">{movie.name}</div>
</div>

<script>
    export let movie;

</script>

<style>

.c-movieImage{
    width: auto;
    height: 300px;
}

.c-movieImageBox{
    height: 280px;
    overflow: hidden;
}

.c-movieBox{
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);

}

.c-movieTitle{
    padding: 8px;
    font-weight: bold;
    height: 40px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media only screen and (max-width: 700px) {
  .c-movieImage{
    width: auto;
    height: 220px;
}

.c-movieImageBox{
    height: 200px;
    overflow: hidden;
}
}

</style>