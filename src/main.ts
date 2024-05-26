import './styles/main.css'

// components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Tooltip from 'primevue/tooltip'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('tooltip', Tooltip)

const uiComponents = [
  { name: 'Button', component: Button },
  { name: 'InputText', component: InputText },
  { name: 'Checkbox', component: Checkbox },
  { name: 'Dropdown', component: Dropdown },
  { name: 'Card', component: Card },
  { name: 'IconField', component: IconField },
  { name: 'InputIcon', component: InputIcon },
  { name: 'InputNumber', component: InputNumber },
  { name: 'Divider', component: Divider },
  { name: 'Toast', component: Toast }
]

uiComponents.forEach((c) => {
  app.component(c.name, c.component)
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
