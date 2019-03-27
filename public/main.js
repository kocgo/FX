import './components/Pair.js'
import createCustomComponent from './utils/createComponent.js';
import fetchPairs from './utils/fetchPairs.js';
import refresh from './utils/refresh.js';

const payloadFX = [
    "USD CHF", 
    "GBP USD", 
    "GBP CHF", 
    "EUR SEK", 
    "USD JPY",
    "EUR JPY"  
]

window.addEventListener('load', () => {
   fetchPairs(payloadFX).then( res => {
       window.appState = res;
       for (let i in window.appState) {
        createCustomComponent(i, 
            {
                header: window.appState[i]["pair"],
                buy: Number(window.appState[i]["buy"]).toFixed(5),
                sell: Number(window.appState[i]["sell"]).toFixed(5),
                status: window.appState[i]["status"]
            });
    }
   })
});

setInterval(refresh.bind(null, payloadFX), 1000)

