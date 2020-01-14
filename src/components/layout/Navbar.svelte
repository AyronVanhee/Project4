<nav id="navbar">

<div class="c-hamburger" on:click={openMenu}>hamburger</div>
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
			{#if admin == true}
				<div class="c-navItem c-logout">
					<a href="/admin">Admin</a>
				</div>
			{/if}
			
			<div class="c-navItem c-login">
				<a href="/reservations">{token.sub}</a>
			</div>
			<div class="c-navItem c-logout">
				<div on:click={Logout}>Logout</div>
			</div>	
		{/if}
		
	</nav>
	<div id="menu" class="c-menu">
		<div class="">
		    <a href="/home" >Home</a>

		</div>
		<div class="">    
		    <a href="/about">About</a>
		</div>
	</div>

<script>

    import Container from "../layout/Container.svelte";
    import JwtTokenHelper from "../../modules/JwtToken.js";

    import { onMount } from 'svelte';

	let token;
	let admin=false;
	console.log("tekst")

	onMount(async () => {        
        //kijken naar een jwttoken
		token = JwtTokenHelper.checkJwtToken();

		admin = JwtTokenHelper.checkIfAdmin();
		console.log("admin?" +  admin)
          
        });

        
    
	
	function Logout(){
		JwtTokenHelper.logout();
	}

	function openMenu(){
		console.log("erop geklikt")

		var menu = document.getElementById('menu');
		console.log(menu)
		if(menu.style.display!="block"){
			menu.style.display="block";

		}else{
			menu.style.display="none";
		}
	}


</script>


<style lang="scss">
	nav{
		background-color:white;
		position: fixed;
		top: 0;
		left: 0;
		width: calc(100% - 128px);
		display: flex;
		color: white;
		height: 75px;
		align-items: center;
		transition: all 200ms;
		z-index: 1;
		padding: 0 64px;

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

	.c-hamburger{
		display: none;
	}

	.c-menu{
		display: none;
	}

@media screen and (min-width: 701px) and (max-width: 1200px) {
	nav{
		width: 100%;
		padding: 0;
	}
}

@media only screen and (max-width: 700px) {
	nav{
		width: calc(100% - 32px);
		padding: 0 16px;
	}

	.c-logo{
		height: 40px;
		margin: 0 auto;
		margin-right: 16px;

	}

	.c-navItem{
		display: none;
	}

	.c-hamburger{
		display: block;
		color: pink;
	}

	.c-menu{
		height: 100%;
		background-color: pink;
		position: absolute;
		width: 50%;
		transition: all 200ms;
		z-index: 1;

	}
}
</style>