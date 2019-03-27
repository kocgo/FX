import Pair from '../components/Pair.js';
import createCustomComponent from '../utils/createComponent.js';
import fetchPairs from '../utils/fetchPairs.js';
import refresh from '../utils/refresh.js';

describe('Test UI Components & Utils', ()=>{
    // AJAX
    let ajaxRes;
    const payloadFX = [
        "USD CHF"
    ]
    
    beforeAll( () => {
        window.appState = [
            {"pair":"USD CHF", "buy":0.99143, "sell":0.99043, "status": "decrease"},
        ]
    })

    it('Should create a FX Component', (done)=>{
        createCustomComponent("test", 
            {
                header: "USD CHF",
                buy: Number(1.93362).toFixed(5),
                sell: Number(0.32432).toFixed(5),
                status: "decrease"
            });

        let el = document.getElementsByTagName("pair-fx");
        expect(el.length).toBeGreaterThan(0);
        done();
    })

    it('Should retrieve data via fetchPairs util', (done) => {
        fetchPairs(payloadFX).then( res => {
            ajaxRes = res
            expect(ajaxRes.length).toBe(1);  
            done();          
        }) 
    })

    it('Should refresh component via refresh util', (done) => {  
        refresh(["USD CHF"]).then( () => {
            expect(
                document.getElementsByClassName("sell-inside-number-1")[0].innerText +
                document.getElementsByClassName("sell-inside-number-2")[0].innerText + 
                document.getElementsByClassName("sell-inside-number-3")[0].innerText).toBeGreaterThan("0.80000");
            done();
        });   
    })
})