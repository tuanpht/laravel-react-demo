import React, { Component } from "react"
import App from "../layout/App"
import UserRow from "./UserRow"
import Pagination from "../common/Pagination"
import Sortable from "../common/Sortable"

export default class UsersTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            paging: {
                current_page: 1,
                per_page: 10,
            },
            search: {
                keyword: '',
            },
            sort: {
                field: 'id',
                direction: 'asc',
            },
            error: '',
            loading: false,
        }
        this.gotoPage = this.gotoPage.bind(this);
        this.setPageSize = this.setPageSize.bind(this);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        this.filterByKeywordOnEnter = this.filterByKeywordOnEnter.bind(this);
        this.sortByField = this.sortByField.bind(this);
    }

    gotoPage(event, page) {
        event.preventDefault();
        if (this.state.paging.current_page !== page) {
            this.fetchUsers(page, this.state.paging.per_page, this.state.search.keyword, this.state.sort);
        }
    }

    setPageSize(event) {
        let pageSize = event.target.value;
        if (this.state.paging.per_page !== pageSize) {
            this.fetchUsers(1, pageSize, this.state.search.keyword, this.state.sort);
        }
    }

    handleKeywordChange(event) {
        this.setState({
            search: {
                keyword: event.target.value,
            }
        });
    }

    filterByKeywordOnEnter(event) {
        if (event.keyCode == 13) {
            this.fetchUsers(1, this.state.paging.per_page, this.state.search.keyword, this.state.sort);
        }
    }

    fetchUsers(page, perPage, keyword, sort) {
        axios.get(window.Laravel.baseUrl + "/api/users", {
                params: {
                    page: page,
                    per_page: perPage,
                    keyword: keyword,
                    sort: sort.field,
                    dir: sort.direction,
                }
            })
            .then(response => {
                let { data, ...paging } = response.data;
                this.setState({
                    users: data,
                    paging: paging,
                    search: {
                        keyword: keyword,
                    },
                    sort: sort,
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

        this.fetchUsers(1, this.state.paging.per_page, this.state.search.keyword, this.state.sort);
    }

    renderUsers() {
        if (this.state.users instanceof Array) {
            return this.state.users.map((user, index) => {
                return <UserRow user={user} key={user.id} />
            });
        }
    }

    sortByField(event, field) {
        let sort = {...this.state.sort};
        sort.direction = sort.field != field || sort.direction != 'asc' ? 'asc' : 'desc';
        sort.field = field;

        this.fetchUsers(this.state.paging.current_page, this.state.paging.per_page, this.state.search.keyword, sort);
    }

    render() {
        return (
            <App>
                <h2>
                    <span className="title">Users</span>&nbsp;
                    <a className="btn btn-sm btn-success" href="/users/create">
                        <span className="glyphicon glyphicon-plus"></span> Add User
                    </a>
                </h2>
                <div className="top-bar">
                    <input
                        type="text"
                        placeholder="Enter to search..."
                        value={this.state.search.keyword || ''}
                        onChange={this.handleKeywordChange}
                        onKeyDown={this.filterByKeywordOnEnter} />
                    <div className="pull-right">
                        <Pagination paging={this.state.paging} goToFunc={this.gotoPage} />
                    </div>
                </div>
                {this.state.error && (<p className="alert alert-warning clearfix">{this.state.error}</p>)}
                <div className="table-container">
                    <div className={this.state.loading ? "loading" : "hide"}></div>
                    <table className="table table-hover table-bordered">
                        <caption>From item {this.state.paging.from} to {this.state.paging.to} of total {this.state.paging.total} items</caption>
                        <thead>
                            <tr>
                                <td><Sortable field="id" currentSort={this.state.sort} onClick={this.sortByField} content="ID" /></td>
                                <td><Sortable field="name" currentSort={this.state.sort} onClick={this.sortByField} content="Name" /></td>
                                <td><Sortable field="email" currentSort={this.state.sort} onClick={this.sortByField} content="Email" /></td>
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
