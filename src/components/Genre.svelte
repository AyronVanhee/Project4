<div class="c-genreBox" on:click={sendGenre}>
    <div class="c-genreTitle">{genre.genreName}</div>
</div>

<script>
    export let genre;

    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sendGenre() {
		dispatch('getGenre', {
			genre: genre.genreName
		});
	}</script>

<style>

.c-genreBox{
    width: 250px;
    height: auto;
    overflow: hidden;
    margin: 8px 0;
    cursor: pointer;
}

.c-genreBox:hover{
    background-color: white;
    color: #4169e1;
}

.c-genreTitle{
    padding: 16px;
}

</style>