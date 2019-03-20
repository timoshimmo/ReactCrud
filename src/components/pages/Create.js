import { FormGroup, Label, Input, Nav, NavItem, NavLink, Row, Col, TabPane, TabContent } from 'reactstrap';
import React from 'react';
import classnames from 'classnames';
import '../../css/styles.css';
import axios from 'axios';
import Videos from './Videos';

const dotenv = require('dotenv');
dotenv.config();

class Create extends React.Component {

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.imgSubmit = this.imgSubmit.bind(this);
      this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
      this.onChangeAgeFrom = this.onChangeAgeFrom.bind(this);
      this.onChangeAgeTo = this.onChangeAgeTo.bind(this);
      this.onChangeCategoryDescription = this.onChangeCategoryDescription.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          activeTab: '1',
          cloudName: '',
          file: '',
          imagePreviewUrl: '',
          categoryName: '',
          ageFrom: '',
          ageTo: '',
          categoryDescription: '',
          videos: []
      };
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

    imgSubmit(imageName) {
      imageName.preventDefault();
      console.log('handle uploading-', this.state.file);
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

    onChangeCategoryName(e) {
        this.setState({
            categoryName: e.target.value
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

        const obj = {
            categoryName: this.state.categoryName,
            ageFrom: this.state.ageFrom,
            ageTo: this.state.ageTo,
            categoryDescription: this.state.categoryDescription,
            imgUrl: imgurl,
            videos: this.state.videos,
        };

        axios.post('http://localhost:4000/category/add', obj)
       .then(res => {
         console.log(res.data)
         axios.post(url, fd, config)
           .then(response => {
             console.log(response.data)
           })
           .catch(err => {
             console.log(err.response)
           })
       })
       .catch(error => {
          console.log(error.response)
       });

       this.setState({
         categoryName: '',
         ageFrom: '',
         ageTo: '',
         categoryDescription: '',
         imagePreviewUrl: '',
         videos: [],
        });
    }

    render() {
      
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img alt='' className="imgPreviewHome" src={imagePreviewUrl}  />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image to Preview</div>);
      }

      return (
            <div className="content">
                <Nav pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                         >
                          Categories
                      </NavLink>
                  </NavItem>

                  <NavItem>
                     <NavLink
                     className={classnames({ active: this.state.activeTab === '2' })}
                       onClick={() => { this.toggle('2'); }}
                       >
                          Videos
                      </NavLink>
                   </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} className="category-container">
                  <TabPane tabId="1">
                    <Row>
                     <Col sm="12">
                         <form action="" className="select-input-data" encType="multipart/form-data">
                            <br />

                            <div className="left-container">
                              <FormGroup>
                                 <Label for="category" className="label label-default">Category</Label>
                                 <input type="text" required placeholder="Enter Category Name" name="category" id="category" className="form-control"
                                   value={this.state.categoryName}
                                   onChange={(e)=>this.onChangeCategoryName(e)} />
                               </FormGroup>

                               <label className="label label-default" style={{ marginTop: 18 }}><b>Age Group</b></label>
                               <FormGroup>
                                 <div className="float-left-container">
                                    <Label for="fromAgeGroupSelect" className="label label-default">From</Label>
                                    <Input type="select" name="fromAgeGroupSelect" id="fromAgeGroupSelect" value={this.state.ageFrom} onChange={(e)=>this.onChangeAgeFrom(e)} >
                                      <option value="Select Age">Select Age</option>
                                      <option value="0">0</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                    </Input>
                                 </div>
                                 <div className="float-right-container">

                                    <Label for="toAgeGroupSelect" className="label label-default">To</Label>
                                    <Input type="select" name="toAgeGroupSelect" id="toAgeGroupSelect" value={this.state.ageTo} onChange={(e)=>this.onChangeAgeTo(e)}>
                                      <option value="Select Age">Select Age</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                      <option value="+">+</option>
                                    </Input>
                                  </div>
                                </FormGroup>

                                <FormGroup>
                                   <Label for="description" className="label label-default" style={{ marginTop: 20 }}>Description</Label><br />
                                   <textarea rows="7" required placeholder="Enter description here" id="description" className="form-control"
                                     value={this.state.categoryDescription}
                                     onChange={(e)=>this.onChangeCategoryDescription(e)} />


                                </FormGroup>

                                <FormGroup>
                                   <button type="submit" className="btn btn-primary" onClick={(e)=>this.onSubmit(e)}>Submit</button>
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
                     </Col>
                   </Row>
                  </TabPane>

                  <TabPane tabId="2">
                  <Row>
                     <Col sm="12">
                        <Videos />
                     </Col>
                  </Row>
                  </TabPane>
                </TabContent>
            </div>

      )
    }
}

export default Create;
