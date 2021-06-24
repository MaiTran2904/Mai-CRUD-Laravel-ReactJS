import React, { Component } from 'react';
import { Table,Button } from 'reactstrap';
import axios from 'axios';
import Addcar from './AddCar.component'
import CarItem from './CarItem.component'
class CarList extends Component {
    constructor(props){
        super(props);    
        this.state={
            cars:[],
            noDataFound:[],
            newModalCar:false,
        }
    }

    componentDidMount(){
        this.getCars();
    }

    getCars=()=>{
        axios.get("http://localhost:8000/api/cars").then((response)=>
        {
            console.log(response.data.data);
            if(response.status === 200){
                this.setState({cars:response.data.data?response.data.data:[],});
            }if(response.data.status ==="failed" && response.data.success === "false"){
                this.setState({noDataFound:response.data.message,});
            }
        }).catch((error)=>{
            console.log(error);
        });
    }

    //tham số car này là tham số đầu vào
    

    handleAddSubmit=(car)=>{
        console.log();
        const {cars}=this.state;
        cars.push(car);
        this.setState({cars:cars,})
    }

    toogleAddModal=()=>{
        this.setState({
            newModalCar:!this.state.newModalCar
        });
    }

    onCloseFormAdd=()=>{
        this.setState({
            newModalCar:false
        });
    }

    


    render() {
        const {cars, noDataFound, newModalCar}=this.state;
        var carDetail=[];
        if(cars.length){
            carDetail=cars.map((car, index)=>{
                return(
                    <CarItem key={car.id?car.id:0} car={car} getCars={this.getCars}/>                   
                );
            });
        }
        return (
            <div className="container">
                <h2>MY CARS LIST    </h2>
            <Addcar 
                newModalCar = {newModalCar} 
                toogleAddModal = {this.toogleAddModal} 
                onCloseForm={this.onCloseForm} 
                handleAddSubmit={this.handleAddSubmit}
            />
            <Table>
                <thead>
                    <tr className="text-primary">
                        <th>ID</th>
                        <th>Description</th>
                        <th>Model</th>
                        <th>Produced_on</th>
                        <th>Image</th>
                        <th>Function</th>
                    </tr>
                </thead>
                {cars.length === 0 ?
                (<tbody>
                    <tr>
                        <td><h2>{noDataFound}</h2></td>
                    </tr>
                </tbody>):
                (<tbody>{carDetail}</tbody>)
                }
            </Table>
            </div>
        );
    }
}

export default CarList;