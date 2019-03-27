import '../components/Pair.js'


function createCustomComponent(id, props){
    const main = document.querySelector('main');
    const newElement = document.createElement('pair-fx');
    newElement.setAttribute("id", id)
    newElement.html = props
    main.appendChild(newElement);
}

export default createCustomComponent