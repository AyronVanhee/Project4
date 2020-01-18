<nav id="navbar">

		{#if screenWidht>700}
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
		{:else}
		<img id="imageMenu" class="c-hamburger" on:click={openMenu} src="./images/hamburgerIcon.svg" alt="hamburger Icon"/>
		<div id="menu" class="c-menu">
			<div class="c-menuItem js-item" on:click={openMenu} >
				<a href="/home" >Home</a>

			</div>
			<div id="row" class="c-menuItem js-item" on:click={openMenu}>    
				<a href="/about">About</a>
			</div>
			{#if token == undefined}
				<div class="c-menuItem js-item" on:click={openMenu}>
					<a href="/login">Login</a>
				</div>
			{:else}
				{#if admin == true}
					<div class="c-menuItem js-item" on:click={openMenu}>
						<a href="/admin">Admin</a>
					</div>
				{/if}
						
				<div class="c-menuItem js-item" on:click={openMenu}>
					<a href="/reservations">{token.sub}</a>
				</div>
				<div class="c-menuItem js-item" on:click={openMenu}>
					<div on:click={Logout}>Logout</div>
				</div>	
			{/if}

		</div>
		
		<img class="c-logo" id="logo" src="images/logo.png" alt="logo"/>

		{/if}
		
</nav>



<script>

    import Container from "../layout/Container.svelte";
    import JwtTokenHelper from "../../modules/JwtToken.js";

    import { onMount } from 'svelte';

	let token;
	let admin=false;
	let screenWidht= screen.width;


	onMount(async () => {        
        //kijken naar een jwttoken
		token = JwtTokenHelper.checkJwtToken();

		admin = JwtTokenHelper.checkIfAdmin();
 
    });


        
    window.addEventListener('resize', function() {
		screenWidht = screen.width;
	});
	
	function Logout(){
		JwtTokenHelper.logout();
	}

	function openMenu(){

		var menu = document.getElementById('menu');

		if(menu.style.display!="block"){
			menu.style.display="block";
			document.getElementById("imageMenu").setAttribute("src","./images/crossIcon.svg");

		}else{
			menu.style.display="none";
			document.getElementById("imageMenu").setAttribute("src","./images/hamburgerIcon.svg");
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
		color: #4169e1;
		height: 75px;
		align-items: center;
		transition: all 200ms;
		z-index: 1;
		padding: 0 64px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.26);

	}

	.c-logo{
		height: 50px;
		width: auto;
		margin: 0 16px;

	}

	.c-navItem{
		margin: 0 16px;
		text-decoration: none;
		color:#4169e1;
	}

	.c-login{
		margin: 0 auto;
		margin-right: 16px;
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
	}

	.c-menu{
		height:auto;
		background-color: whitesmoke;
		position: fixed;
		width: 100%;
		transition: all 200ms;
		z-index: 3;	
		color:#2d51bd;
		margin-top:75px;
		left:0;
		top:0;
	}

	.c-menuItem{
		padding:8px;
	}
}
</style>