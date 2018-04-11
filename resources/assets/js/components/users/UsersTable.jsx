import React, { Component } from 'react'
import App from '../App'
import UserRow from './UserRow'
import Pagination from '../common/Pagination'

export default class UsersTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            paging: {
                current_page: 1
            },
            errors: [],
        }
        this.gotoPage = this.gotoPage.bind(this);
    }

    gotoPage(event, page) {
        event.preventDefault();
        let paging = {...this.state.paging}
        if (paging.current_page !== page) {
            paging.current_page = page
            this.setState({ paging: paging }, this.fetchUsers);
        }
    }

    fetchUsers() {
        axios.get(window.Laravel.baseUrl + '/api/users', {
            params: {
                page: this.state.paging.current_page
            }
        })
            .then(response => {
                let { data, ...paging } = response.data;
                this.setState({
                    users: data,
                    paging: paging,
                })
            })
            .catch(function (error) {
                this.setState({ errors: error })
            })
    }

    componentDidMount() {
        this.fetchUsers()
    }

    renderUsers() {
        if (this.state.users instanceof Array) {
            return this.state.users.map((user, index) => {
                return <UserRow user={user} key={user.id} />
            })
        }
    }

    render() {
        return (
            <App>
                <h1>Users</h1>
                <div className='clearfix'>
                    <a className='btn btn-success' href='/users/create'>Add User</a>
                </div>
                <br />
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUsers()}
                    </tbody>
                </table>
                <div className="pull-right">
                    <Pagination paging={this.state.paging} goToFunc={this.gotoPage} />
                </div>
            </App>
        )
    }
}
