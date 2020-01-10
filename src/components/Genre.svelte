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
    height: auto;
    overflow: hidden;
    border: solid 0.4px whitesmoke;
}

.c-genreTitle{
    font-size: 14px;
    padding: 16px;
}

</style>