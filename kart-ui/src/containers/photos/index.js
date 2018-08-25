
import React from 'react'
import { apiservice } from '../../services'


export default class Photos extends React.Component {
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
        <ul className="list-group">
            {this.state.artsAvailable.map(response => {
              let imageUrl = apiservice.getBaseUrl() + "/images/" + response.id + response.extension;
              return (
                <li key={response.id} className="list-group-item">
                  <div className="row">
                  <div className="col-md-5">
                  <h3>
                  <a href={imageUrl}>
                        <img width="100px" alt="Missing" src={imageUrl} />
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
      </div>
    )
  }
}
