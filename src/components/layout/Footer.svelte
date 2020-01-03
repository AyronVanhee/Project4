<div class="c-footer">
    <div>
        <div class="c-title">Openingsuren</div>
        <div>Maandag ................. 9:00 - 22:00</div>
        <div>Dinsdag ................. 9:00 - 22:00</div>
        <div>Woensdag ................ 9:00 - 22:00</div>
        <div>Donderdag ............... 9:00 - 22:00</div>
        <div>Vrijdag ................. 9:00 - 22:00</div>
        <div>Zaterdag ................ 9:00 - 22:00</div>
        <div>Zondag .................. Gesloten</div>

    </div>

    <div>        
        <div class="c-title">Locatie</div>  
        <div>President Kennedylaan 100</div>
        <div>8500 Kortrijk</div>

    </div>

    <div>        
        <div class="c-title">Contact</div>  
        <div>Telefoon: 056 26 66 66</div>
    </div>
</div>

<div class="c-footerBottom">
Ayron Vanhee - Project 4
</div>


<style>
	.c-footer{
        padding: 48px 240px;
		background-color: whitesmoke;
		position: relative;
		right: 0;
		bottom: 0;
		left: 0;
		height: auto;
        display: grid;
        grid-template-columns: repeat(3, 240px);
        grid-column-gap: 200px;
        grid-row-gap: 36px;
        justify-content: center;
        color:royalblue;

	}

    .c-title{
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 24px;
    }

    .c-footerBottom{
        background-color: white;
        display: flex;
        padding: 16px;
        justify-content: center;
        color:royalblue;
    }

    @media only screen and (max-width: 700px) {
    .c-footer{
        grid-template-columns: repeat(1, 240px);
        padding: 24px 0;


	}
     .c-title{
            font-size: 20px;
    
        }
    }

@media screen and (min-width: 701px) and (max-width: 1200px) {
    .c-footer{
        padding: 24px 0;
        grid-template-columns: repeat(2, auto);

	}
    .c-title{
            font-size: 20px;
    
        }
}
</style>