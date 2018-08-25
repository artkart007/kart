


import React from 'react'
import { apiservice } from '../../services'
import './index.css'

export default class Paintings extends React.Component {
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

  componentDidMount() {
    this.fetchArtsAvailable();
  }

  render() {
    return (
      <div>
        {this.state.artsAvailable.map(response => {
          let imageUrl = apiservice.getBaseUrl() + "/images/" + response.id + response.extension;
          return (
            <div key={response.id} className="card col-md-4">
              <img className="imgCard" src={imageUrl} alt="Missing" />
              <div className="containerCard">
                <h4><b>{response.customName}</b></h4>
                <p>{response.description}</p>
                <b>{response.currency}{response.price}</b>
              </div>
            </div>
          )

        })}
      </div>
    )
  }
}
