<span id="app">
<Navbar/>

<main id="main">
  <svelte:component this={component}  {...props} />
</main>

<Footer/>
</span>

<script>	
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Movie from "./routes/Movie.svelte";
	import Error from "./routes/Error.svelte";
	import Login from "./routes/Login.svelte";
	import Reservation from "./routes/Reservations.svelte";
	import Registreer from "./routes/Registreer.svelte";
	import Admin from "./routes/Admin.svelte";

	import Navbar from "./components/layout/Navbar.svelte";

	import Footer from "./components/layout/Footer.svelte";

	import page from 'page';
	
	//import JwtTokenHelper from './modules/JwtToken.js';

	let component;
	let adminComponent;
	let props= {};
	let token;
	let menu;

	//variable om mee te rekenen
	let i;

	//navbar die kleiner wordt bij scrollen
	window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("navbar").style.height = "50px";
		document.getElementById("menu").style.marginTop = "105px";

    } else {
		document.getElementById("navbar").style.height = "75px";
		document.getElementById("menu").style.marginTop = "115px";

    }
	}

	//routing
	page.redirect('/', '/home');
	page('/home', () => (component = Home));
	page('/about', () => (component = About));
	page('/login', () => (component = Login));
	page('/reservations', () => (component = Reservation));
	page('/registreer', () => (component = Registreer));
	page('/admin', () => (component = Admin));

	page('/movie/:id',context =>{
		 component = Movie;
		 const {params, query} = context;
		 props = {...params, ...query};
		
	 });

	page('*', () => (component = Error));

	page.start();

</script>


<style lang="scss">
	main {
		margin: 0 auto;
		margin-top: 72px;
		min-height: 75%;

	}

</style>