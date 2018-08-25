import React from 'react'
import { PageHeader } from 'react-bootstrap'
import { config } from '../../env'

export default class SubHeader extends React.Component {

    render() {
        return (
            <PageHeader>
                {this.props.user ? this.props.user.fullName : 'Hi'} <small>@{ this.props.user? this.props.user.username: 'its me !'}</small>
            </PageHeader>
        )
    }
}