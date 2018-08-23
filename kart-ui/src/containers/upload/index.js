import React from 'react'
import { post, get } from 'axios';
import { config } from '../../env'

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      customName: null,
      userId: null,
      description: null,
      artsAvailable: [],
      env: config.env
    }

    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)

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
    this.fileUpload(this.state.file,
      this.state.customName,
      this.state.userId,
      this.state.description).then((response) => {
        alert('Upload successful !')
        this.setState({
          file: '',
          customName: '',
          description: '',
          artsAvailable: response.data,
        });


      }).catch( (error) => {
        if(error.response.status === 403){
          alert('Unauthrorised Access !')
        }
        else if(error.response) {
          alert(error.response.data.message);
        }

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  onInputTextChange(e) {
    this.setState({ customName: e.target.value })

  }
  onTextAreaChange(e) {
    this.setState({ description: e.target.value })
  }

  onInputTextUserIdChange(e) {
    this.setState({ userId: e.target.value })
  }

  onSearchFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fetchArtsAvailable();
  }

  fetchArtsAvailable() {
    let url = this.getBaseUrl() + '/api/v1/arts';
    url += '/findByUserId/' + this.state.userId;

    get(url).then((response) => {
      console.log(response.data);
      this.setState({ artsAvailable: response.data })
    })
  }
  fileUpload(file, customName, userId, description) {
    const url = this.getBaseUrl() + '/api/v1/arts/upload';
    const formData = new FormData();
    formData.append('file', file)
    formData.append('customName', customName);
    formData.append('userId', userId);
    formData.append('description', description);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }


  render() {
    return (
      <div className="row">

        <div className="col-md-4">
          <h1>Upload Art</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label htmlFor="artName">Art Name</label>
              <input value={this.state.customName} onChange={this.onInputTextChange} type="text" className="form-control" id="artName" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="artDescription">Art Description</label>
              <textarea onChange={this.onTextAreaChange} type="text" className="form-control" id="artDescription" placeholder="Enter description" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputFile">Art File input</label>
              <input onChange={this.onChange} className="btn btn-default" type="file" id="exampleInputFile" />
              <p className="help-block">Use image files only</p>
            </div>
            <button type="submit" className="btn btn-primary">Upload</button>
          </form>
        </div>
        <div className="col-md-8">
          <form onSubmit={this.onSearchFormSubmit}>
            <div className="input-group">
              <span className="input-group-addon">User Id</span>
              <input onChange={this.onInputTextUserIdChange} type="text" className="form-control" placeholder="Enter user Id" aria-describedby="basic-addon2" />
              <span className="input-group-addon" id="basic-addon2" >
                <button type="submit">
                  Fetch arts
            </button>
              </span>
            </div>
          </form>
          <h1>Uploaded Art</h1>
          <ul className="list-group">
            {this.state.artsAvailable.map(response => {
              let imageUrl = this.getBaseUrl() + "/images/" + response.id + response.extension;
              return (
                <li key={response.id} className="list-group-item">
                  <div className="row">
                    <div className="col-md-2">
                      {response.customName}

                    </div>
                    <div className="col-md-10">
                      <a href={imageUrl}>
                      <img width="30px" alt={response.originalFileName} src={imageUrl} />
                  </a>
                    </div>
                  </div>
                </li>
              )

            })}
          </ul>
        </div>


      </div>
    )
  }
}
