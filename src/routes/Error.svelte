<Container>

    <h1>Even de weg kwijt?</h1>
    <h2>De pagina waar je naar zocht bestaat niet (meer).</h2>
    <div>Ga anders terug naar de <button class="c-homeButton" onclick="window.location.href = '/home';"> Home pagina </button></div>


</Container>

<script>

    import Container from "../components/layout/Container.svelte";

    window.scrollTo({
                top: 0,
                left: 0,
            });
</script>

<style lang="scss">

.c-homeButton{
    font-weight: bold;  
    border: 1px  solid white;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 200ms;
    margin: 4px;
    background-color: white;
    color: #4169e1;

}

.c-homeButton:hover{
    color: white;
    background-color: transparent;
}

</style>

