import React from 'react'
import { apiservice } from '../../services'
import { Carousel } from 'react-bootstrap'
// import { config } from './../../env'

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artsAvailable: []
    }
  }

  fetchArtsAvailable() {
    apiservice.fetchArtsAvailable(this.props.match.params.userid).then((response) => {
      console.log(response.data);
      this.setState({ artsAvailable: response.data })
    })
  }

  componentDidMount(){
    this.fetchArtsAvailable();
  }

  render() {
    return (
      <div>
        <Carousel>
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
        </Carousel>
      </div>
    )
  }
}
