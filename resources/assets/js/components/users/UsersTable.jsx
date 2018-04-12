import React, { Component } from "react"
import App from "../App"
import UserRow from "./UserRow"
import Pagination from "../common/Pagination"

export default class UsersTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            paging: {
                current_page: 1,
                per_page: 10,
            },
            error: '',
            loading: false,
        }
        this.gotoPage = this.gotoPage.bind(this);
        this.setPageSize = this.setPageSize.bind(this);
    }

    gotoPage(event, page) {
        event.preventDefault();
        if (this.state.paging.current_page !== page) {
            this.fetchUsers(page);
        }
    }

    setPageSize(event) {
        let pageSize = event.target.value;
        if (this.state.paging.per_page !== pageSize) {
            this.fetchUsers(1, pageSize);
        }
    }

    fetchUsers(page, perPage) {
        axios.get(window.Laravel.baseUrl + "/api/users", {
                params: {
                    page: page,
                    per_page: perPage,
                }
            })
            .then(response => {
                let { data, ...paging } = response.data;
                this.setState({
                    users: data,
                    paging: paging,
                });
            });
    }

    componentDidMount() {
        let component = this;

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            component.setState({ loading: true });
            return config;
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            component.setState({
                loading: false,
                error: '',
            });
            return response;
        }, function (error) {
            component.setState({
                loading: false,
                error: error.response.statusText,
            });
            return Promise.reject(error);
        });

        this.fetchUsers();
    }

    renderUsers() {
        if (this.state.users instanceof Array) {
            return this.state.users.map((user, index) => {
                return <UserRow user={user} key={user.id} />
            });
        }
    }

    render() {
        return (
            <App>
                <h1>Users</h1>
                <div className="top-bar">
                    <a className="btn btn-success" href="/users/create">Add User</a>
                    <div className="pull-right">
                        <Pagination paging={this.state.paging} goToFunc={this.gotoPage} />
                    </div>
                </div>
                {this.state.error && (<p className="alert alert-warning clearfix">{this.state.error}</p>)}
                <div className="table-container">
                    <div className={this.state.loading ? "loading" : "hide"}></div>
                    <table className="table table-hover table-bordered">
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
                </div>
                <div className="bottom-bar">
                    <div className="pull-left">
                        <select value={this.state.paging.per_page} onChange={this.setPageSize}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="pull-right">
                        <Pagination paging={this.state.paging} goToFunc={this.gotoPage} />
                    </div>
                </div>
            </App>
        )
    }
}
