import React, { Component } from "react"

export default class UserRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td className="fit-content tools-bar">
                    <a className="btn btn-primary" href={"/users/edit/" + this.props.user.id}>Edit</a>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    }
}
