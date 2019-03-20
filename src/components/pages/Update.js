import { FormGroup, Label, Input } from 'reactstrap';
import React from 'react';
import '../../css/styles.css';
import axios from 'axios';
import SelectRow from '../widgets/SelectRow';
import {Image} from 'cloudinary-react';

const dotenv = require('dotenv');
dotenv.config();

class Update extends React.Component {

    constructor(props) {
      super(props);

      this.categoryList = this.categoryList.bind(this);
      this.onChangeCategory = this.onChangeCategory.bind(this);
      this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
      this.onChangeAgeFrom = this.onChangeAgeFrom.bind(this);
      this.onChangeAgeTo = this.onChangeAgeTo.bind(this);
      this.onChangeCategoryDescription = this.onChangeCategoryDescription.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          file: '',
          categories: [],
          category : '',
          cloudName: process.env.CLOUD_NAME,
          selectedCategory : '',
          ageFrom: '',
          ageTo: '',
          categoryDescription: '',
          loadedImg: '',
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

    onChangeCategoryName(e) {
        this.setState({
            category: e.target.value
        });
    }

    onChangeAgeFrom(e) {
        this.setState({
            ageFrom: e.target.value
        });
    }

    onChangeAgeTo(e) {
        this.setState({
            ageTo: e.target.value
        });
    }

    onChangeCategoryDescription(e) {
        this.setState({
            categoryDescription: e.target.value
        });
    }

    imageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
        this.setState({
           file: file,
           imagePreviewUrl: reader.result
         });
       }

       reader.readAsDataURL(file)
    }

    onChangeCategory(e) {

      this.setState({
          selectedCategory: e.target.value,
      })

      axios.get('http://localhost:4000/category/getCategory/'+e.target.value)
      .then(response => {
            console.log(response)
            this.setState({
                category: response.data.category_name,
                ageFrom: response.data.age_from,
                ageTo: response.data.age_to,
                categoryDescription: response.data.category_description,
                loadedImg: response.data.category_imageUrl,
            })
      })
      .catch(function (error) {
          console.log(error);
      })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file);

        const imgurl = this.state.file.name
        const url = process.env.CLOUDINARY_UPLOAD_LINK;
        const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

        const fd = new FormData();

        fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        fd.append('tags', 'browser_upload');
        fd.append("file", this.state.file);
        const config = {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        };

        let imgUrlLink = ''

        if(imgurl !== '') {
             imgUrlLink = imgurl
        }
        else {
            imgUrlLink = this.state.loadedImg
        }

        const obj = {
          category: this.state.category,
          ageFrom: this.state.ageFrom,
          ageTo: this.state.ageTo,
          categoryDescription: this.state.categoryDescription,
          imagePreviewUrl: imgUrlLink,
        };

        axios.post('http://localhost:4000/category/update/'+this.state.selectedCategory, obj)
       .then(res => {
         console.log(res.data)
         if(imgurl !== '')  {
           axios.post(url, fd, config)
             .then(response => {
               console.log(response.data)
             })
             .catch(err => {
               console.log(err.response)
             })
         }
       })
       .catch(error => {
          console.log(error.response)
       });

       this.setState({
           file: '',
           categories: [],
           category : '',
           cloudName: '',
           selectedCategory: '',
           ageFrom: '',
           ageTo: '',
           categoryDescription: '',
           loadedImg: '',
           imagePreviewUrl: '',
       });
    }

    render() {

      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img alt='' className="imgPreviewHome" src={imagePreviewUrl}  />);
      } else {
        $imagePreview = (<Image alt='' className="imgPreviewHome" cloudName="pikintvpics" publicId={this.state.loadedImg}></Image>);
      }

      return (
            <div className="content">
                <div className="categoriesContainer">
                  <form action="" className="select-input-data">
                     <br />
                     <div className="left-container">
                       <FormGroup>
                          <Label for="category" className="label label-default">Category</Label>
                            <Input type="select" name="homeCategory" id="homeCategory" value={this.state.homeCategory} onChange={(e)=>this.onChangeCategory(e)}>
                            <option value="Select Category">Select Category</option>
                            { this.categoryList() }
                            </Input>
                            <br />
                            <input type="text" required placeholder="Enter Category Name" name="category" id="category" className="form-control"
                              value={this.state.category}
                              onChange={(e)=>this.onChangeCategoryName(e)} />
                        </FormGroup>

                        <label className="label label-default"><b>Age Group</b></label>
                        <FormGroup>
                          <div className="float-left-container">
                             <Label for="fromAgeGroupSelect" className="label label-default">From</Label>
                             <Input type="text" name="fromAgeGroupSelect" id="fromAgeGroupSelect"
                               className="form-control" value={this.state.ageFrom}
                               onChange={(e)=>this.onChangeAgeFrom(e)} />

                          </div>

                          <div className="float-left-container">

                             <Label for="toAgeGroupSelect" className="label label-default">To</Label>
                             <Input type="text" name="toAgeGroupSelect" id="toAgeGroupSelect" className="form-control"
                                value={this.state.ageTo}
                                onChange={(e)=>this.onChangeAgeTo(e)} />
                           </div>

                         </FormGroup>

                         <FormGroup>
                            <Label for="description" className="label label-default">Description</Label><br />
                            <textarea rows="6" id="description" className="form-control" value={this.state.categoryDescription}
                             onChange={(e)=>this.onChangeCategoryDescription(e)} />
                         </FormGroup>

                         <FormGroup>
                            <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>Update</button>
                         </FormGroup>
                     </div>

                     <div className="right-container">
                       <FormGroup>
                         <div className="float-left-container">
                           <label className="label label-default">Category Image</label>
                           <input name = "image" className="fileInput"
                             type="file"
                             onChange={(e)=>this.imageChange(e)} />
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

export default Update;
