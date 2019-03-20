import React, { Component } from 'react';

class SelectRow extends Component {

  render() {
    return(
      <option value={this.props.obj.category_name}>{this.props.obj.category_name}</option>
    )
  }

}

export default SelectRow;
