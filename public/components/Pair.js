class Pair extends HTMLElement {
    constructor(){
        super()
    }

    set id(id){
        this.setAttribute("id",id)
    }

    set html(props) {
        this.innerHTML = `
        <div id="${props.header}" class="fx-wrapper">

            <div class="fx-header">
            <h3>${props.header}</h3>
            </div>

            <div class="buy-sell"> 
            
                <div class="sell-wrapper">
                    <div class="content-left">
                    <span class="sell-inside-header">Sell GBP</span>
                    <div class="sell-inside-numbers">
                        <span class="sell-inside-number-1">${props.sell.slice(0,4)}</span>
                        <span class="sell-inside-number-2">${props.sell.slice(4,6)}</span>
                        <span class="sell-inside-number-3">${props.sell.slice(6,7)}</span>
                    </div>   
                    </div>
                    <div class="comp-triangle-left">
                    <div class="first-left"></div>
                    <div class="second-left"></div>
                    <div class="third-left"></div>
                    </div>
                </div>
            
                <span class="status-icon"></span>
            
                <div class="buy-wrapper">
                    <div class="content-right">
                    <span class="buy-inside-header">Buy USD</span>
                    <div class="buy-inside-numbers">
                        <span class="buy-inside-number-1">${props.buy.slice(0,4)}</span>
                        <span class="buy-inside-number-2">${props.buy.slice(4,6)}</span>
                        <span class="buy-inside-number-3">${props.buy.slice(6,7)}</span>
                    </div>
                    </div>
                    <div class="comp-triangle-right">
                        <div class="first-right"></div>
                        <div class="second-right"></div>
                        <div class="third-right"></div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

customElements.define('pair-fx', Pair);

export default Pair