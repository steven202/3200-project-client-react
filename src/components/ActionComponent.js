import React from 'react'
import ShoppingCartService from '../services/shoppingCartService'


export default class ActionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            entity: null,
            operation: null,
            showOperation: false,
            showResult: false,
            resultSet: {records: []},
            resultSet2:{records:[]},
            login: false,
            passwordAlert:false
        }
        this.service = ShoppingCartService.getInstance();
    }

    showResultSet = (res) => {
        this.setState(
            {
                entity: this.state.entity,
                operation: this.state.operation,
                showOperation: this.state.showOperation,
                showResult: true,
                resultSet: res,
                input:""
            })
    }
    showResultSet2=(res)=>
        this.setState({
            resultSet2:res
        })


    render() {
        return (
            <div>
                {!this.state.login&&
                <div className='container-fluid'>
                    <label>username</label>
                    <input value={this.state.username} onChange={(event)=>this.setState({username:event.target.value})} className="form-control"
                    type="text"/>
                    <label>password</label>
                    <input value={this.state.password} onChange={(event)=>this.setState({password:event.target.value})}
                           type="password"  className="form-control"/>
                    <button className='btn btn-primary'
                    onClick={
                        ()=>{this.processLogin(this.state.username, this.state.password)}
                    }
                    >login</button>
                    {this.state.passwordAlert&&<h3 className="font-italic bg-danger">wrong username or password entered.</h3>}
                </div>}
                {this.state.login && <div>
                    <div className="navbar bg-warning">
                        <h3> 1. select an entity.</h3>

                        <div className="btn btn-primary"
                             onClick={() =>
                                 this.setState(
                                     {
                                         entity: "customer",
                                         operation: null, showOperation: true,showResult:false})
                             }>
                            Customer
                        </div>
                        <div className="btn btn-primary"
                             onClick={() =>
                                 this.setState(
                                     {
                                         entity: "product",
                                         operation: null, showOperation: true,showResult:false})
                             }>
                            Product
                        </div>
                        <div className="btn btn-primary"
                             onClick={() =>
                                 this.setState(
                                     {
                                         entity: "seller",
                                         operation: null, showOperation: true,showResult:false})
                             }>
                            Seller
                        </div>
                        <div className="btn btn-primary"
                             onClick={() =>
                                 this.setState(
                                     {
                                         entity: "warehouse",
                                         operation: null, showOperation: true,showResult:false})
                             }>
                            Warehouse
                        </div>
                        <div className="btn btn-primary"
                             onClick={() =>
                                 this.setState(
                                     {
                                         entity: "order",
                                         operation: null, showOperation: true,showResult:false})
                             }>
                            Order
                        </div>

                        <div className="btn btn-danger float-right"
                            onClick={()=>
                            {
                                this.service.logout().then(result=>
                                this.setState({login:false}));
                            }}>
                            log out
                        </div>
                    </div>

                    {this.state.showOperation && <div className="navbar bg-success">
                        <h3> 2. select an operation.</h3>
                        <div className="btn btn-primary"
                             onClick={() => {
                                 this.setState(
                                     {
                                         entity: this.state.entity,
                                         operation: "create", showOperation: false
                                     });
                                 this.service.sendRequest(this.state.entity, "create").then(
                                     result => this.showResultSet(result));
                             }
                             }>
                            Create
                        </div>
                        <div className="btn btn-primary"
                             onClick={() => {
                                 this.setState(
                                     {
                                         entity: this.state.entity,
                                         operation: "read", showOperation: false
                                     });
                                 this.service.sendRequest(this.state.entity, "read").then(
                                     result => this.showResultSet(result));
                             }
                             }>
                            Read
                        </div>
                        <div className="btn btn-primary"
                             onClick={() =>{
                                 this.setState(
                                     {
                                         entity: this.state.entity,
                                         operation: "update", showOperation: false
                                     });
                                 this.service.sendRequest(this.state.entity, "update").then(
                                 result => this.showResultSet(result));}
                             }>
                            Update
                        </div>
                        <div className="btn btn-primary"
                             onClick={() =>{
                                 this.setState(
                                     {
                                         entity: this.state.entity,
                                         operation: "delete", showOperation: false
                                     });
                                 this.service.sendRequest(this.state.entity, "delete").then(
                                 result => this.showResultSet(result));}
                             }>
                            Delete
                        </div>
                    </div>}

                    {this.state.showResult && 
                    <div className="container-fluid">
                    <ul className="list-group">
                        {this.state.resultSet.records.map(
                            (record, index) =>
                                <li className="list-group-item" key={index}>{record}</li>
                        )}
                    </ul>
                        <div>
                            <h2>please enter the specification to do the operation</h2>
                        <textarea className="form-control" value={this.state.input} onChange={(event)=>
                            this.setState({input:event.target.value})}>
                        </textarea>
                            <button className="btn btn-primary"
                                    onClick={()=>{this.service.sendForm(this.state.input).then(result=>this.showResultSet2(result));
                                    this.setState({showResult:false})}}
                            >submit</button>
                        </div>
                    </div>
                    }
                    <ul className="list-group">
                        {this.state.resultSet2.records.map(
                            (record, index) =>
                                <li className="list-group-item" key={index}>{record}</li>
                        )}
                    </ul>
                </div>}
            </div>
        )
    }

    processLogin(username, password) {
        this.service.sendLogin(username,password).then(
            record =>
            {if(record.records[0]==='yes'){
                this.setState({login:true, passwordAlert:false})
            }else{
                this.setState({login:false, passwordAlert:true});

            }
            }
        )
    }
}
