export default class ShoppingCartService {
    static myInstance = null;

    static getInstance() {
        if (ShoppingCartService.myInstance == null) {
            ShoppingCartService.myInstance =
                new ShoppingCartService();
        }
        return this.myInstance;
    }
    hostname=window.location.hostname;
    ENDPOINT= (this.hostname==="localhost")? "http://localhost:8080":"https://cs3200-project-server-java.herokuapp.com/";
    sendRequest = (entity, operation) =>
        fetch(`${this.ENDPOINT}/request?entity=${entity}&operation=${operation}`
        ).then(
            response => response.json())
    sendForm = (query) =>
        fetch(`${this.ENDPOINT}/query`, {
            method: 'post',
            body: JSON.stringify({
                records: [query]}),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response=>response.json())
    sendLogin=(username, password) =>{
        // console.log(this.hostname);

       return  fetch(`${this.ENDPOINT}/login?username=${username}&password=${password}`).then(response => response.json());
    };





    logout=()=>
        fetch(`${this.ENDPOINT}/logout`).then(
            response=>response.json()
        )
}
