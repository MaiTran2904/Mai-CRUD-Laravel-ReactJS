import React, { Component } from 'react';
import axios from 'axios';
// import { BrowserRouter as Router } from 'react-router-dom';
import {
	ModalBody,
	ModalFooter, 
	Button, 
	FormGroup, 
	Label, 
	Input} from 'reactstrap';
import { data } from 'jquery';

class EditCarPage extends Component {
	constructor(props){
		super(props);
		
		this.state={
			file:null,
			image:'',
			description:'',
			model:'',
			produced_on:'',
			produced_on:'',
            errors:{
                image:[''],
                description:[''],
                model:[''],
                produced_on:[''],
            },
		};

		this.onChangeInput=this.onChangeInput.bind(this);
		this.onChangeImage=this.onChangeImage.bind(this);

	}


	onChangeInput(event) {
		this.setState({
            [event.target.name]: event.target.value
        });
	}

	onChangeImage (event) {
		this.setState({
            file:URL.createObjectURL(event.target.files[0])
        })
	}

	componentDidMount= (e) => {
		console.log("Hello");
		const id = this.props.match.params.id;
		console.log(id);
		axios.get('http://localhost:8000/api/cars/' + id)
		.then(res =>{
			this.setState({
				description:res.data.data.description,
				model:res.data.data.model,
				produced_on: res.data.data.produced_on,
				image: res.data.data.image
			});			
			console.log(res.data.data);
		})
		.catch((error) => {

			console.log(error);
		})
	}

	
	handleEditSubmit=(event)=>{
		event.preventDefault(); //ngăn tải form do mặc định
		const fileInput = document.querySelector('#fileupload') ;
		const formData = new FormData();
		formData.append('image', fileInput?fileInput.files[0]:this.state.image);
		formData.append('description',this.state.description);
		formData.append('model',this.state.model);
		formData.append('produced_on',this.state.produced_on);
		formData.append("_method", "put");
		console.log(formData);
		
		// nếu truyền bằng đối tượng thì
		// const carObject = {
		// name: this.state.name,
		// model: this.state.model,
		// description: this.state.description
		// };
		
		//dùng axios (ko dùng fetch với method put đc), nhưng dùng put thì ko truyền form data đc
		axios
		.post('http://localhost:8000/api/cars/'+this.props.match.params.id, formData)
		.then((res) => {
			console.log(res.data);
			if (res.data.status==="error") {
				console.log(res.data.errors);
				this.setState({
						status: res.data.status,
						errors: res.data.errors,
					});
			}
			else{
				console.log('Car updated!');
				//this.props.history.push('/');
				this.props.history.push("/");
			
			}
		})
		.catch((err) => {
			console.log(err);
			console.log('Update car Error');
		});
		
}
	render(){
		return(
			<div className="container">
			<form 
                onSubmit={this.handleEditSubmit} 
                encType="multipart/form-data" 
                method="put"
            >
				<ModalBody>
				 	<FormGroup>
			        	<Label for="description">Description</Label>
			        	<Input type="text" name="description" onChange={this.onChangeInput} value={this.state.description}/>
                        <span className ="text-danger">{this.state.errors.description}</span>
                  	</FormGroup>
			      	<FormGroup>
			        	<Label for="model">Model</Label>
			        	<Input type="text" name="model" onChange={this.onChangeInput} value={this.state.model}/>
                        <span className ="text-danger">{this.state.errors.model}</span>
                      </FormGroup>
			      	<FormGroup>
			        	<Label for="produced_on">Produced_on</Label>
			        	<Input type="date" name="produced_on" onChange={this.onChangeInput} value={this.state.produced_on}/>
                        <span className ="text-danger">{this.state.errors.produced_on}</span>
			      	</FormGroup>
			      	<FormGroup>
						<Label for="image">Image (old)</Label> 
						<br/>
                        <img id="old_img" src={this.state.image!==""?"/images/"+(this.state.image) : this.state.file} width={200} height={150} ></img>
                        <br/>
						<br/>						<Input id="fileupload" type="file" name="image"label="chọn" onChange={(e) => this.setState({file:URL.createObjectURL(e.target.files[0])})} />
                        <br/>
						<img src={this.state.file} width={200} height={150} />
						&nbsp;&nbsp;<span className ="text-danger">{this.state.errors.image==null?"":this.state.errors.image}</span>
					  </FormGroup>
				</ModalBody>
				<ModalFooter>
				    <Button type="submit" color="primary" >Save</Button>
				    <Button color="secondary" >Cancel</Button>
				</ModalFooter>
			</form>
			{/* </Modal> */}
			</div>
			);//đóng return

	}
}
export default EditCarPage;

