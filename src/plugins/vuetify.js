import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.css' // Import Vuetify CSS
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'

const myCustomLightTheme = {
  dark: false,
  colors: {
    'primary-50': '#F3FAF8',
    'primary-100': '#E0F4F0',
    'primary-200': '#C7ECE7',
    'primary-300': '#AEE4DE',
    'primary-400': '#9BDDE7',
    'primary-500': '#51A79A',
    'primary-600': '#7ACBC2',
    'primary-700': '#6EB2A9',
    'primary-800': '#629A90',
    'primary-900': '#4E6F5F',
    'dark-50': '#F9FAFB',
    'dark-100': '#F5F5F5',
    'dark-200': '#EEEEEE',
    'dark-300': '#C2C2C2',
    'dark-400': '#A3A3A3',
    'dark-500': '#858585',
    'dark-600': '#3D3D3D',
    'dark-700': '#616161',
    'dark-800': '#292929',
    'dark-900': '#0A0A0A',
    'error-50': '#FFF1F1',
    'error-100': '#FFE0E0',
    'error-200': '#FFC7C7',
    'error-300': '#FFA0A0',
    'error-400': '#FF6969',
    'error-500': '#FA4545',
    'error-600': '#E71B1B',
    'error-700': '#C31212',
    'error-800': '#A11313',
    'error-900': '#851717',
    'warning-50': '#FEFAEC',
    'warning-100': '#F8F1CA',
    'warning-200': '#FEB29F',
    'warning-300': '#F9D974',
    'warning-400': '#F4CE55',
    'warning-500': '#F1BA31',
    'warning-600': '#CF7510',
    'warning-700': '#AC5311',
    'warning-800': '#8C4114',
    'warning-900': '#733514',

    'info-50': '#EEF4FF',
    'info-100': '#D9E5FF',
    'info-200': '#BCD2FF',
    'info-300': '#8EB5FF',
    'info-400': '#59B0FF',
    'info-500': '#3465FF',
    'info-600': '#1B41F5',
    'info-700': '#1A2EE1',
    'info-800': '#172B86',
    'info-900': '#19278F',

    'success-50': '#ECFDF3',
    'success-100': '#D1FADF',
    'success-200': '#A6F4C5',
    'success-300': '#6EE6A6',
    'success-400': '#32D583',
    'success-500': '#12B76A',
    'success-600': '#039855',
    'success-700': '#027A48',
    'success-800': '#05603A',
    'success-900': '#054F31',

    'progress-50': '#FCE3F9',
    'progress-100': '#F9C7F3',
    'progress-200': '#F495E9',
    'progress-300': '#EE5DDD',
    'progress-400': '#E92AD3',
    'progress-500': '#C314AF',
    'progress-600': '#9D108D',
    'progress-700': '#740C58',
    'progress-800': '#4F0846',
    'progress-900': '#250421',

    primary: '#6e9278',
    secondary: '#403937',
    error: '#fa4545',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.6,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  }
})
