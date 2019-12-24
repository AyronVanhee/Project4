<nav id="navbar">
	<img class="c-logo" src="images/kinepolis.png" alt="kinepolisImage"/>
	<div class="c-navItem">Item1</div>
	<div class="c-navItem">Item2</div>
</nav>

<main>
	<Home />
</main>

<footer>	
	<div>footer tekst</div>
</footer>

<script>
	export let name;
	
	import Home from "./views/Home.svelte";

	   window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("navbar").style.height = "50px";
    } else {
        document.getElementById("navbar").style.height = "65px";
    }
    }

</script>


<style lang="scss">
	main {
		text-align: center;
		margin: 0 auto;
		margin-top: 100px;
	}

	nav{
		background-color: #212121;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		color: white;
		height: 65px;
		align-items: center;
		transition: all 200ms;
	}

	.c-logo{
		height: 40px;
		width: auto;
		margin: 0 16px;
	}

	.c-navItem{
		margin: 0 16px;
	}

	footer{
		background-color: #212121;
		position: relative;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100px;
	}


</style>