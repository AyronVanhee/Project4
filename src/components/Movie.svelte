<div class="c-movieBox">
		    <a class="js-movie" href="/movie/{movie.movieID}">
        <div class="c-movieImageBox">
            <img class="c-movieImage" src={movie.image} alt="movieImage"/>
        </div>
        </a>

        <div class="c-movieTitle">{movie.name}</div>
</div>


<script>
    export let movie;  

</script>
