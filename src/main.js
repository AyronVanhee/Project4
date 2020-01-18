import App from './App.svelte';


//de css files worden hier ingezet zodat er een live reload wordt uitgevoerd
//eerst werd er gewerkt met een screen.scss waarin dat al deze files werden gezet,
//maar er werd op het einde nog eens een normalize css geplaats die bepaalde elementen veranderde

// Settings
import './assets/style/settings/global.scss';

// Generic 
//import './assets/style/generic/normalize.scss';

// Elements
import './assets/style/elements/page.scss';

// Objects

// Components
import './assets/style/components/home.scss';
import './assets/style/components/movie.scss';
import './assets/style/components/button.scss';
import './assets/style/components/login.scss';
import './assets/style/components/scrollbar.scss';
import './assets/style/components/moviePage.scss';


const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;