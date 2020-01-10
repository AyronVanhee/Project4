<nav id="navbar">
		<img class="c-logo" id="logo" src="images/logo.png" alt="logo"/>
		<div class="c-navItem">
		    <a href="/home" >Home</a>

		</div>
		<div class="c-navItem">    
		    <a href="/about">About</a>
		</div>

		
		{#if token == undefined}
			<div class="c-navItem c-login">
				<a href="/login">Login</a>
			</div>
		{:else}
			<div class="c-navItem c-login">
				<a href="/reservations">{token.sub}</a>
			</div>
			<div class="c-navItem c-logout">
				<div on:click={Logout}>Logout</div>
			</div>	
		{/if}
		
	</nav>
	
<main>
  <svelte:component this={component}  {...props} />
</main>

<Footer/>



<script>	
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Movie from "./routes/Movie.svelte";
	import Error from "./routes/Error.svelte";
	import Login from "./routes/Login.svelte";
	import Reservation from "./routes/Reservations.svelte";
	import Registreer from "./routes/Registreer.svelte";

	import Footer from "./components/layout/Footer.svelte";
	import page from 'page';
	import qs from 'query-string';
	
	import JwtTokenHelper from './modules/JwtToken.js';

	let component;
	let props= {};
	let token= window.localStorage.getItem("Profile");

	window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("navbar").style.height = "50px";

    } else {
		document.getElementById("navbar").style.height = "75px";
    }
	}

	//routing
	page.redirect('/', '/home');
	page('/home', () => (component = Home));
	page('/about', () => (component = About));
	page('/login', () => (component = Login));
	page('/reservations', () => (component = Reservation));
	page('/registreer', () => (component = Registreer));

	page('/movie/:id',context =>{
		 component = Movie;
		 const {params, query} = context;
		 props = {...params, ...query};
		
	 });

	 	page('*', () => (component = Error));


	page.start();

	//kijken of de user al is ingelogd
	token = window.localStorage.getItem("JwtToken");

	if(token != undefined){
		token = JwtTokenHelper.parseJwt(token);

	}

	function Logout(){
		console.log("klik op logout");
		JwtTokenHelper.logout();
		window.location.href = "/home";
	}
        

</script>


<style lang="scss">
	main {
		margin: 0 auto;
		margin-top: 72px;
		min-height: 75%;

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
		margin: 0 16px;

	}

	.c-navItem{
		margin: 0 16px;
		text-decoration: none;
		color:royalblue;
	}

	.c-login{
		margin: 0 auto;
		margin-right: 16px;
		width: 200px;
		overflow: hidden;
		text-align: right;
	}

	.c-logout{
		cursor: pointer;
	}

@media only screen and (max-width: 700px) {
	.c-logo{
		height: 40px;


	}
}
</style>