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
    height: 40px;
    overflow: hidden;
    border: solid 0.4px #f0f0f0;
}

.c-genreTitle{
    font-size: 14px;
    padding: 8px;
}

</style>