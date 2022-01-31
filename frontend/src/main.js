import {
    createApp
} from 'vue'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';


import router from './router'
import store from './store'
import middleware from "@grafikri/vue-middleware"

import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

window.axios = require('axios');



import App from './App.vue'

window.axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")  
store.dispatch('auth/getUser')    

 router.beforeEach(middleware({
     store
 }))




const app = createApp(App)


app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(VueClipboard)

app.component('Card', Card);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);

app.mount('#app')