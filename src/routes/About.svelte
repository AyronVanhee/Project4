<Container>

    <h1>About</h1>
    <div>Dit is project 4 waarbij er een website wordt gemaakt a.d.h.v. Svelte.
    Hierbij maak ik een cinema website en app.</div>
    <div>Hierbij maak ik gebruik van de plugins:</div>
    <ul>
        <li>rollup-plugin-scss</li>
        <li>page.js</li>
        <li>Axios</li>
        <li>idb-keyval</li>
    </ul>

    <h2>Rollup-Plugin-Scss</h2>
    <div>Deze wordt gebruikt om Scss te kunnen schrijven.
    Hierbij voeg je in rollup.config.js een import toe namelijk "import scss from 'rollup-plugin-scss';".

    Hij zal dan de scss bestanden schrijven naar Sass.css. De scss bestanden stop je dan in main.js zodat je 
    live kunt reloaden. Er is geen mogelijkheid om een scss bestand apart toe te voegen aan een svelte bestand

    </div>

    <h2>Page.js</h2>
    <div>Dit werd mij aangeraden in de Svelte discord server. Hierbij kreeg dan ook een pdf file met een tutorial. Svelte bevat geen ingeboude routing, daarom dat ik gebruik maak van Page.js, het is namelijk ook de meest gebruikte.
    De meeste routing libraries zijn eigenlijk voor SPA. Voor complexere websiters wordt er dan gebruik gemaakt van Sapper.
    Sapper maakt deel uit van Svelte.
    </div>

    <h2>Axios</h2>
    <div>Dit wordt gebruikt voor de apicalls.</div>

    <h2>Idb-keyval</h2>
    <div>Hiermee kan je eenvoudiger gebruik maken van indexeddb.
    Ik maak gebruik van indexeddb omdat de website ook offline moet kunnen geraadpleegt worden.
    </div>
</Container>

<script>

    import Container from "../components/layout/Container.svelte";

    window.scrollTo({
            top: 0,
            left: 0,
        });
</script>

<style lang="scss">

h2{
    margin-top: 8px;
}


</style>

