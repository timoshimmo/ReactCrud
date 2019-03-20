import { FormGroup, Label, Input } from 'reactstrap';
import React from 'react';
import '../../css/styles.css';
import axios from 'axios';
import SelectRow from '../widgets/SelectRow';
import {Image} from 'cloudinary-react';

const dotenv = require('dotenv');
dotenv.config();

class Delete extends React.Component {

    constructor(props) {
      super(props);

      this.categoryList = this.categoryList.bind(this);
      this.onChangeCategory = this.onChangeCategory.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          categories: [],
		  cloudName: process.env.CLOUD_NAME,
          selectedCategory: '',
          cloudName: '',
          ageFrom: '',
          ageTo: '',
          categoryDescription: '',
          imagePreviewUrl: '',
      };

    }

    componentDidMount() {
        axios.get('http://localhost:4000/category')
        .then(response => {
              console.log(response.data)
            this.setState({
                categories: response.data,
                cloudName: process.env.CLOUD_NAME
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    categoryList() {
      return this.state.categories.map(function(object, i){
          return <SelectRow obj={object} key={i} />;
      })
    }

    onChangeCategory(e) {

      this.setState({
          selectedCategory: e.target.value,
      })

      axios.get('http://localhost:4000/category/getCategory/'+e.target.value)
      .then(response => {
            console.log(response)
            this.setState({
                ageFrom: response.data.age_from,
                ageTo: response.data.age_to,
                categoryDescription: response.data.category_description,
                imagePreviewUrl: response.data.category_imageUrl,
            })
      })
      .catch(function (error) {
          console.log(error);
      })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.get('http://localhost:4000/category/delete/'+this.state.selectedCategory)
       .then(res => {
         console.log(res.data)

       })
       .catch(error => {
          console.log(error.response)
       });

       this.setState({
         categories: [],
         selectedCategory: '',
         cloudName: '',
         ageFrom: '',
         ageTo: '',
         categoryDescription: '',
         imagePreviewUrl: '',
       });
    }

    render() {

      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<Image alt='' className="imgPreviewHome" cloudName=this.state.cloudName publicId={this.state.imagePreviewUrl}></Image>);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image to Preview</div>);
      }

      return (
            <div className="content">
                <div className="categoriesContainer">
                  <form action="" className="select-input-data">
                     <br />

                     <input type="hidden" name="idValue" value="login"  />

                     <div className="left-container">
                       <FormGroup>
                          <Label for="category" className="label label-default">Category</Label>
                            <Input type="select" name="homeCategory" id="homeCategory" value={this.state.selectedCategory} onChange={(e)=>this.onChangeCategory(e)}>
                            <option value="Select Category">Select Category</option>
                            { this.categoryList() }
                          </Input>
                        </FormGroup>

                        <label className="label label-default"><b>Age Group</b></label>
                        <FormGroup>
                          <div className="float-left-container">
                             <Label for="fromAgeGroupSelect" className="label label-default">From</Label>
                             <Input type="text" readOnly name="fromAgeGroupSelect" id="fromAgeGroupSelect"
                               className="form-control" value={this.state.ageFrom} />

                          </div>

                          <div className="float-left-container">

                             <Label for="toAgeGroupSelect" className="label label-default">To</Label>
                             <Input type="text" readOnly name="toAgeGroupSelect" id="toAgeGroupSelect" className="form-control"
                                value={this.state.ageTo} />

                           </div>

                         </FormGroup>

                         <FormGroup>
                            <Label for="description" className="label label-default">Description</Label><br />
                            <textarea rows="6" readOnly id="description" className="form-control" value={this.state.categoryDescription} />
                         </FormGroup>

                         <FormGroup>
                            <button type="submit" className="btn btn-danger" onClick={(e)=>this.onSubmit(e)}>Delete</button>
                         </FormGroup>

                     </div>

                     <div className="right-container">
                       <FormGroup>
                         <div className="float-left-container">
                           <label className="label label-default">Category Image</label>

                             <div className="imgPreviewHome">
                                {$imagePreview}
                            </div>
                         </div>
                       </FormGroup>
                     </div>
                  </form>
                </div>
          </div>
      )
    }
}

export default Delete;
