import { FormGroup, Label, Input } from 'reactstrap';
import React from 'react';
import '../../css/styles.css';
import axios from 'axios';
import SelectRow from '../widgets/SelectRow';


class Videos extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeVideoCategory = this.onChangeVideoCategory.bind(this);
    this.onChangeVideoChannel = this.onChangeVideoChannel.bind(this);
    this.onChangeVideoLinks = this.onChangeVideoLinks.bind(this);
    this.onUpdateVideos = this.onUpdateVideos.bind(this);
    this.categoryList = this.categoryList.bind(this);

    this.state = {
        videoCategory: '',
        channelName: '',
        videoLinks: '',
        categories: []
    };
  }

  onUpdateVideos(e) {
      e.preventDefault();

      const obj = {
          videoCategory: this.state.videoCategory,
          channelName: this.state.channelName,
          videoLinks: this.state.videoLinks,
      };

      axios.post('http://localhost:4000/video/updateVideo', obj)
     .then(res => {
       console.log(res);
     })
     .catch(error => {
        console.log(error);
     });

      this.setState({
        videoCategory: '',
        channelName: '',
        videoLinks: '',
       });
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

  onChangeVideoCategory(e) {
      this.setState({
        videoCategory: e.target.value
      });
  }

  onChangeVideoChannel(e) {
    this.setState({
      channelName: e.target.value
    });
  }

  onChangeVideoLinks(e) {
    this.setState({
      videoLinks: e.target.value
    });
  }


  render() {
        return (
          <div>
            <form action="" className="select-input-data">
              <br />
              <br />
              <FormGroup>
                 <Label for="categoriesSelect" className="label label-default">Categories</Label>
                 <Input type="select" name="categoriesList" id="categoriesSelect"  value={this.state.videoCategory}
                  onChange={(e)=>this.onChangeVideoCategory(e)} >
                  <option value="Select Age">Select Category</option>
                  { this.categoryList() }
                  </Input>

               </FormGroup>

               <FormGroup>
                 <Label for="channelName" className="label label-default">Channel</Label>
                 <input type="text" required placeholder="Enter Channel Name" name="channelName" id="channelName"
                   className="form-control"
                   value={this.state.channelName}
                    onChange={(e)=>this.onChangeVideoChannel(e)} />
                </FormGroup>

               <FormGroup>
                  <Label for="videoLink" className="label label-default">Video Link</Label><br />
                  <input type="text" required placeholder="Enter Video Link" id="videoLink" className="form-control"
                    value={this.state.videoLinks}
                     onChange={(e)=>this.onChangeVideoLinks(e)} />
               </FormGroup>

               <FormGroup>
                  <button type="submit" className="btn btn-primary" onClick={(e)=>this.onUpdateVideos(e)}>Upload</button>
               </FormGroup>
            </form>
          </div>

        )

  }

}

export default Videos;
