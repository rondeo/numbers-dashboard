import React, { Component } from 'react';

class EditProfileTab extends Component {

  componentDidMount() {
    console.log("EditProfileTab componentDidMount");
  }

  render() {
    return (
      <div className="tab-pane active" id="editprofile">
        Edit Profile Tab
      </div>
    );
  }

}

export default EditProfileTab;
