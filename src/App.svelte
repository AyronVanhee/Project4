<Router url="{url}">
	<nav id="navbar">
		<img class="c-logo" id="logo" src="images/logo.png" alt="logo"/>
		<div class="c-navItem">
		    <Link to="/">Home</Link>

		</div>
		<div class="c-navItem">    
			<Link to="about">About</Link>
		</div>
	</nav>
	
<main>
	<div>
		<Route path="about" component="{About}" />
		<Route path="/" component="{Home}"/>
  </div>
</main>

<Footer/>

</Router>


<script>	
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import { Router, Link, Route } from "svelte-routing";
	import Footer from "./components/layout/Footer.svelte";
	
	export let url = "";


	window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("navbar").style.height = "50px";

    } else {
		document.getElementById("navbar").style.height = "75px";

    }
    }

</script>


<style lang="scss" scoped>
	main {
		text-align: center;
		margin: 0 auto;
		margin-top: 72px;
	}

	nav{
		background-color:white;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		color: white;
		height: 75px;
		align-items: center;
		transition: all 200ms;
		z-index: 1;

	}

	.c-logo{
		height: 50px;
		width: auto;
		margin: 0 16px 0 72px;



	}

	.c-navItem{
		margin: 0 16px;
		text-decoration: none;
	}

@media only screen and (max-width: 700px) {
	.c-logo{

		margin-left: 16px;



	}
}
</style>