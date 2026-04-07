import { stringToQrCodeSVG } from './QrCodeGenerator.js'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen flex flex-col gap-4 items-center justify-center bg-slate-500/20">
      ${stringToQrCodeSVG('https://github.com/vectrex')}
      ${stringToQrCodeSVG('https://github.com/vectrex', {ecl: 'H'})}
  </div>
`
