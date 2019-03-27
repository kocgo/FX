import fetchPairs from './fetchPairs.js'

const refresh = (async function (payloadFX) {
    await fetchPairs(payloadFX).then( res => {
        // GRAB ONE
        window.appState = [...window.appState].map(e => {
            // FIND AT THE SECOND ARRAY
            let newPair = [...res].filter( s => {
                return e["pair"] === s["pair"]
            })[0]

            // PRICE INCREASE & DECREASE
            let status = ""
            if (newPair["buy"] > e["buy"]){    
                status = "Increase";
            } else if (newPair["buy"] < e["buy"]) {
                status = "Decrease";
            }

            return {
                ...newPair,
                status
            }
        })
        
        // Render New Request On Components    
        for (let i in window.appState){
            let e = window.appState[i]
            let buying = Number(window.appState[i]["buy"]).toFixed(5)
            let selling = Number(window.appState[i]["sell"]).toFixed(5)
            let el = document.getElementById(window.appState[i]["pair"]);
            el.getElementsByClassName("sell-inside-number-1")[0].innerHTML = selling.slice(0,4);
            el.getElementsByClassName("sell-inside-number-2")[0].innerHTML = selling.slice(4,6);
            el.getElementsByClassName("sell-inside-number-3")[0].innerHTML = selling.slice(6,7);
            el.getElementsByClassName("buy-inside-number-1")[0].innerHTML = buying.slice(0,4);
            el.getElementsByClassName("buy-inside-number-2")[0].innerHTML = buying.slice(4,6);
            el.getElementsByClassName("buy-inside-number-3")[0].innerHTML = buying.slice(6,7);

            if (e["status"] == "Decrease" && 
                !el.getElementsByClassName("status-icon")[0].classList.contains("decrease")
            ) {
                el.getElementsByClassName("status-icon")[0].classList.add("decrease");
            } else {
                el.getElementsByClassName("status-icon")[0].classList.remove("decrease");
            }
        } 
    })
})

export default refresh;