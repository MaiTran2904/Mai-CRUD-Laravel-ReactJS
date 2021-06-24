
import React, { Component } from 'react';
import {Modal,ModalHeader,ModalBody,ModalFooter, Button, FormGroup, Label, Input} from 'reactstrap';
class AddCar extends Component {
	constructor(props){
		super(props);
		//this.handleAddSubmit=this.handleAddSubmit.bind(this);
		this.state={
			file:null,
			image:'',
			description:'',
			model:'',
			produced_on:'',
            errors:{
                image:[''],
                description:[''],
                model:[''],
                produced_on:[''],
            },
		}
	}

	onRedirect=()=>{
		this.setState({file:null,
			image:'',
			description:'',
			model:'',
			produced_on:'',
		});
		this.props.getCars();
	}

	handleAddSubmit=(e)=>{
		e.preventDefault();
		const fileInput=document.querySelector("#fileupload");
		const formData=new FormData();
		console.log(fileInput);
		console.log(fileInput.files[0]);
		formData.append('image',fileInput.files[0]);
		formData.append('description',this.state.description);
		formData.append('model',this.state.model);
		formData.append('produced_on',this.state.produced_on);

		fetch('http://localhost:8000/api/cars', {
        method: 'POST',
        body: formData,
        
      })
      .then(res => { return res.json() }) //ko có return thì kết quả data là undefined
      .then(data => {
        if (data.status === "error") {
            this.setState({
            status:data.status,
            errors: data.errors,
            });

          }else{
          this.props.handleAddSubmit(data.data);//truyền sang cho cha là carList.js để cập nhật lại list car ra trình duyệt
          console.log(data.data);
          this.props.toogleAddModal();
          this.onRedirect();
          this.props.onCloseFormAdd();
          return data;   }//hết else
      })//sau khi nhấn nút submit trên form Add Car thì trả về data, bên phía hàm handleAddSubmit() bên cha là carList.js sẽ nhận lại 
  
	}

	onChangeInput = (e) => {
		this.setState({
            [e.target.name]: e.target.value
        });
	}


	onChangeImage=(e)=>{
		this.setState({file:URL.createObjectURL(e.target.files[0])})
	}


	render(){
		return(
			<div>
			<Button color="primary" onClick={this.props.toogleAddModal}>Add car</Button>
			<Modal isOpen={this.props.newModalCar} toggle={this.props.toogleAddModal}>

			<form onSubmit={this.handleAddSubmit} encType="multipart/form-data" method="post">
				<ModalHeader toggle={this.props.toogleAddModal}>Add a new car</ModalHeader>
				<ModalBody>
				 	<FormGroup>
			        	<Label for="description">Description</Label>
			        	<Input type="text" name="description" onChange={this.onChangeInput}/>
                        <span className ="text-danger">{this.state.errors.description}</span>
                  	</FormGroup>
			      	<FormGroup>
			        	<Label for="model">Model</Label>
			        	<Input type="text" name="model" onChange={this.onChangeInput}/>
                        <span className ="text-danger">{this.state.errors.model}</span>
                      </FormGroup>
			      	<FormGroup>
			        	<Label for="produced_on">Produced_on</Label>
			        	<Input type="date" name="produced_on" onChange={this.onChangeInput}/>
                        <span className ="text-danger">{this.state.errors.produced_on}</span>
			      	</FormGroup>
			      	<FormGroup>
			        	<Label for="image">Image</Label>
			        	<Input id="fileupload" type="file" name="image" onChange={this.onChangeImage}/>
                        <span className ="text-danger">{this.state.errors.image}</span>
			      	</FormGroup>
				</ModalBody>
				<ModalFooter>
				<Button type="submit" color="primary" >Add</Button>
				<Button color="secondary" >Cancel</Button>
				</ModalFooter>
				</form>
			</Modal>
			</div>
			);//đóng return

	}
}
export default AddCar;

