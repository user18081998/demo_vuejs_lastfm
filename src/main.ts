import {createApp} from 'vue'
import StellarUI from 'stellar-ui';
import 'stellar-ui/dist/style.css';
import App from './App.vue'

const app = createApp(App)

app.use(StellarUI)
app.mount('#app')