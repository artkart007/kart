import React from 'react'
import { post, get } from 'axios';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      customName: null,
      userId: null,
      artsAvailable: [],
      env: 'prod'
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.onInputTextUserIdChange = this.onInputTextUserIdChange.bind(this);
  }

  getBaseUrl() {
    if (this.state.env === 'prod') {
      return '';
    }

    return 'http://localhost:8090'
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file, this.state.customName, this.state.userId).then((response) => {
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  onInputTextChange(e) {
    this.setState({ customName: e.target.value })

  }
  onInputTextUserIdChange(e) {
    this.setState({ userId: e.target.value })
    this.fetchArtsAvailable();
  }

  fetchArtsAvailable() {
    const url = this.getBaseUrl() + '/api/v1/arts';
    get(url).then((response) => {
      console.log(response.data);
      this.setState({ artsAvailable: response.data })
    })
  }
  fileUpload(file, customName, userId) {
    const url = this.getBaseUrl() + '/api/v1/arts/upload';
    const formData = new FormData();
    formData.append('file', file)
    formData.append('customName', customName);
    formData.append('userId', userId);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }


  render() {
    return (
      <div>
        <h1>Upload Art</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User Id</label>
            <input onChange={this.onInputTextUserIdChange} type="text" className="form-control" id="userId" placeholder="Enter user Id" />
          </div>

          <div className="form-group">
            <label htmlFor="artName">Art Name</label>
            <input onChange={this.onInputTextChange} type="text" className="form-control" id="artName" placeholder="Enter name" />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputFile">File input</label>
            <input onChange={this.onChange} className="btn btn-default" type="file" id="exampleInputFile" />
            <p className="help-block">Use image files only</p>
          </div>
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
        <hr />
        <ul className="list-group">
          {this.state.artsAvailable.map(response => {
            let imageUrl = this.getBaseUrl() + "/images/" + response.originalFileName;
            return (
              <li className="list-group-item">
                <div className="row">
                  <div className="col-md-2">
                    {response.customName}

                  </div>
                  <div className="col-md-10">
                    <img width="30px" alt={response.originalFileName} src={imageUrl} />

                  </div>
                </div>
              </li>
            )

          })}
        </ul>
      </div>
    )
  }
}
