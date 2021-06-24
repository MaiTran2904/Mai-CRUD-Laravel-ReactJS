// import React, { Component } from 'react';

// import { Table,Button } from "reactstrap";
// import {Link} from 'react-router-dom'

// import axios from 'axios';
// import { data } from 'browserslist';


// // import AddCar from './AddCar.component';


// class CarList extends Component
// {

//     state={
//             cars:[],
//             loading:true,
//         }
//     }


//     async componentDidMount() {
//         const res = await axios.get('http://localhost:8000/api/cars');

//         if(res.data.status === 200)
//         {
//             this.setState({
//                 students:res.data.students,
//                 loading:false,
//             });
//         }
        
//     }




//     render(){
//         var car_HTML = "";

//         if (this.state.loading)
//         {
//             car_HTML= <tr><td colSpan="7"><h2>Loading.....</h2></td></tr>
//         }
//         else{
//             car_HTML = 
//             this.state.cars.map((car,index)=>{
//                 return (

//                     <tr key={car.id}>
//                         <td>{car.id}</td>
//                         <td>{car.description}</td>
//                         <td>{car.model}</td>
//                         <td>{car.produced_on}</td>
//                         <td><img width="100px" src={"/images/" + car.image}/></td>  
//                         <td>
//                             <Link to={`edit-car/${item.id}`} className="btn btn-success brn-sm" size="sm">Edit</Link>
                            
//                         </td>
//                         <td>
//                             <Button type="button" color="danger" size="sm">Delete</Button>
//                         </td>
//                     </tr>
//                 );
//             });
//         }


//         return(
//             <div>
//                 <h2>Cars list</h2>
//                 <div className="card-header">
//                     <h4>
//                         <Link to={add-car} className="btn btn-primary btn-sm float-end">Add a new car</Link>
//                     </h4>

//                 </div>
//                 <Table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Description</th>
//                             <th>Model</th>
//                             <th>Produced_on</th>
//                             <th>Image</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {car_HTML}
//                     </tbody>
//                 </Table>
//             </div>
//         );

//     }

// }

// export default CarList;



import React, { Component } from 'react';

import { Table,Button } from "reactstrap";

import axios from 'axios';


import AddCar from './AddCar.component';


class CarList extends Component{

    constructor(props){

        super(props);

        this.state={

            cars:[],

            noDataFound:'',

            newModalCar:true,


        }

    }


    componentDidMount(){

        this.getCars();

    }


    getCars(){

        axios.get("http://localhost:8000/api/cars").then((response) =>

            {

                console.log(response.data.data);

                if (response.status === 200) {

                    this.setState( {cars: response.data.data ? response.data.data : [], } );

                }


                if (response.data.status === "failed" && response.data.success === false) {

                    this.setState( {noDataFound: response.data.message,} );

                }

            }).catch((error) => {

                console.log(error);

            });

    }


    toogleAddModal=()=>{

        this.setState({newModalCar:!this.state.newModalCar});

    }


    handleAddSubmit=(car)=>{

        const {cars}=this.state;

        cars.push(car);

        this.setState({cars:cars,})

    }


    onCloseFormAdd=()=>{

        this.setState({newModalCar:false});

    }


    render(){

        const {cars, noDataFound, newModalCar}=this.state;

        var carDetail=[];

        if (cars.length){

            carDetail=cars.map((car,index)=>{  //lặp qua mảng cars, cứ mỗi phần tử thì lưu vào biến car

                      return (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.description}</td>
                            <td>{car.model}</td>
                            <td>{car.produced_on}</td>
                            <td><img width="100px" src={"/images/" + car.image}/></td>  
                            <td>
                                <Button color="success" className="mr-3" size="sm">Edit</Button>
                                <Button color="danger" size="sm">Delete</Button>
                            </td>
                        </tr>    
                        
                      ); //đóng return 

        }); //đóng map

        }//đóng if


        return(

            <div>

            <h2>List of Cars</h2>

                <AddCar newModalCar={newModalCar} toogleAddModal={this.toogleAddModal} getCars={this.getCars} onCloseFormAdd={this.onCloseFormAdd} handleAddSubmit={this.handleAddSubmit}/>

                <Table>

                <thead>

                <tr>

                <th>ID</th>

                <th>Description</th>

                <th>Model</th>

                <th>Produced_on</th>

                <th>Image</th>

                <th>Function</th>

                </tr>

                </thead>

                {cars.length === 0 ? 

                (<tbody><tr><td><h2>{noDataFound}</h2></td></tr></tbody>) : 

                (<tbody>{carDetail}</tbody>)}

                </Table>

            </div>

        );

    }

}

export default CarList;





