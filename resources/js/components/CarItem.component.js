import React, {Component } from 'react'
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';  

class CarItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    deleteCar=(id)=> {
        axios.delete('http://localhost:8000/api/cars/' + id) //tham số truyền vào là id
        .then((res) => {
            console.log("Car removed deleted");
            this.props.getCars();
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        const {car, index} = this.props;
        return (
            
            <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.description}</td>
                <td>{car.model}</td>
                <td>{car.produced_on}</td>
                <td><img src={"/images/"+car.image} width= "100px" ></img></td> 
                <td className="display=flex">
                    <Link to={"/cars/" + car.id + "/edit"} className="edit-link">
                        <Button className ="mr-3 btn btn-success" size="sm">Edit</Button>
                    </Link>
                    <Button color="danger" size="sm" onClick={(e) => { if (window.confirm('Bạn có thật sự muốn xóa?')) this.deleteCar(car.id)} }>Delete</Button>
                </td>        
                        
            </tr>  
            
        );
    }
}

export default CarItem;