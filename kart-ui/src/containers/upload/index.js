import React from 'react'
import { apiservice } from '../../services'
// import { Carousel } from 'react-bootstrap'

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      customName: null,
      userId: this.props.match.params.userid,
      description: null,
      price: 0,
      currency: '$',
      artsAvailable: []
    }

    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onInputTextPriceChange = this.onInputTextPriceChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.fileUpload = this.fileUpload.bind(this)
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.onInputTextUserIdChange = this.onInputTextUserIdChange.bind(this);
  }


  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    apiservice.fileUpload(this.state.file,
      this.state.customName,
      this.state.userId,
      this.state.description,
      this.state.currency,
      this.state.price).then((response) => {
        alert('Upload successful !')
        this.setState({
          file: '',
          customName: '',
          description: '',
          price: 0,
          artsAvailable: response.data,
        });


      }).catch((error) => {
        if (error.response.status === 403) {
          alert('Unauthrorised Access !')
        }
        else if (error.response) {
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
  onInputTextPriceChange(e) {
    this.setState({ price: e.target.value })

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
    apiservice.fetchArtsAvailable(this.state.userId).then((response) => {
      console.log(response.data);
      this.setState({ artsAvailable: response.data })
    })
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
              <textarea value={this.state.description} onChange={this.onTextAreaChange} type="text" className="form-control" id="artDescription" placeholder="Enter description" />
            </div>
            <div className="form-group">
              <label htmlFor="artDescription">Price ({this.state.currency})</label>
              <input value={this.state.price} onChange={this.onInputTextPriceChange} type="number" className="form-control" id="artPrice" placeholder="Enter Price" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputFile">Art File input</label>
              <input onChange={this.onChange} className="btn btn-default" type="file" id="exampleInputFile" />
              <p className="help-block">Use image files only</p>
            </div>
            <button type="submit" className="btn btn-primary">Upload</button>
          </form>
          <hr/>
        </div>
        <div className="col-md-8">
          <form onSubmit={this.onSearchFormSubmit}>
            <div className="input-group">
              <span className="input-group-addon">User Id</span>
              <input value={this.state.userId} onChange={this.onInputTextUserIdChange} type="text" className="form-control" placeholder="Enter user Id" aria-describedby="basic-addon2" />
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
              let imageUrl = apiservice.getBaseUrl() + "/images/" + response.id + response.extension;
              return (
                <li key={response.id} className="list-group-item">
                  <div className="row">
                  <div className="col-md-5">
                  <h3>
                  <a href={imageUrl}>
                        <img width="60px" alt="Missing" src={imageUrl} />
                      </a>
                      </h3>
                  <p>{response.currency}{response.price}</p>
                      
                    </div>
                    <div className="col-md-7">
                    <h3>{response.customName}</h3>
                  <p>{response.description}</p>
                    </div>
                    
                  </div>
                </li>
              )

            })}
          </ul>


          {/* <Carousel>
            {this.state.artsAvailable.map(response => {
              let imageUrl = apiservice.getBaseUrl() + "/images/" + response.id + response.extension;
              return (
                <Carousel.Item key={response.id} >
                  <img width='100%' height='100%' alt="Missing" src={imageUrl} />
                  <Carousel.Caption>
                    <h3>{response.customName}</h3>
                    <p>{response.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )

            })}
          </Carousel> */}

          {/* <Grid>
            <Row>
              {this.state.artsAvailable.map(response => {
                let imageUrl = apiservice.getBaseUrl() + "/images/" + response.id + response.extension;
                return (
                  <Col xs={6} md={4} key={response.id} >
                    <Image src={imageUrl} rounded />
                      <h3>{response.customName}</h3>
                      <p>{response.description}</p>
                  </Col>
                )

              })}
            </Row>
          </Grid> */}
        </div>


      </div>
    )
  }
}
