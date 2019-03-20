import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React from 'react';
import '../../css/styles.css';
import axios from 'axios';
import SelectRow from '../widgets/SelectRow';
import TableRow from '../widgets/TableRow';
import {Image} from 'cloudinary-react';

const dotenv = require('dotenv');
dotenv.config();

class Home extends React.Component {

    constructor(props) {
      super(props);

      this.categoryList = this.categoryList.bind(this);
      this.onChangeCategory = this.onChangeCategory.bind(this);
      this.toggle = this.toggle.bind(this);

      this.state = {
          categories: [],
          cloudName: process.env.CLOUD_NAME,
          homeCategory: '',
          ageFrom: '',
          ageTo: '',
          categoryDescription: '',
          imagePreviewUrl: '',
          videos: [],
          modal: false,
          videoid: '',
      };

    }

    componentDidMount() {

        axios.get('http://localhost:4000/category')
        .then(response => {
              console.log(response.data)
            this.setState({
                categories: response.data
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
          homeCategory: e.target.value,
      })

      axios.get('http://localhost:4000/category/getCategory/'+e.target.value)
      .then(response => {
            console.log(response)
            this.setState({
               cloudName: process.env.CLOUD_NAME,
                ageFrom: response.data.age_from,
                ageTo: response.data.age_to,
                categoryDescription: response.data.category_description,
                imagePreviewUrl: response.data.category_imageUrl,
                videos: response.data.category_videos,
            })
      })
      .catch(function (error) {
          console.log(error);
      })
    }

    toggle = () => {
       this.setState(
         prevState => ({
           modal: !prevState.modal
         })
       );
   }

   /* ,
   {
     videoid: vid
   }
   */

   videoList() {
     return this.state.videos.map(function(object, i){
         return <TableRow obj={object} key={i} />;
     })
   }

/*   onDelete(e) {
      e.preventDefault();
      axios.get('http://localhost:4000/video/deleteVideos/'+this.state.videoid)
   } */

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
                     <div className="left-container">
                       <FormGroup>
                          <Label for="category" className="label label-default">Category</Label>
                            <Input type="select" name="homeCategory" id="homeCategory" value={this.state.homeCategory} onChange={(e)=>this.onChangeCategory(e)}>
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

               <div>

                  <h5 align="left" style={{ marginTop: 20 }}>Video List</h5>
                  <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                      <tr>
                        <th>Channels</th>
                        <th>Links</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        { this.videoList() }
                   </tbody>
                  </table>

               </div>

               <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Delete Video</ModalHeader>
                <ModalBody>
                   Are you sure you want to delete this video?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => { this.toggle();} }>Yes</Button>{' '}
                  <Button color="secondary" onClick={() => { this.toggle(); } }>Cancel</Button>
                </ModalFooter>
              </Modal>

          </div>
      )
    }
}


export default Home;
