import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                <nav className='navbar navbar-default navbar-static-top'>
                    <div className='container'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#app-navbar-collapse' aria-expanded='false'>
                                <span className='sr-only'>Toggle Navigation</span>
                                <span className='icon-bar' />
                                <span className='icon-bar' />
                                <span className='icon-bar' />
                            </button>
                            <a className='navbar-brand' href='/'>Laravel 5.5 - ReactJS</a>
                        </div>
                        <div className='collapse navbar-collapse' id='app-navbar-collapse'>
                            <ul className='nav navbar-nav'>
                                <li><a href='/users'>Users</a></li>
                                <li><a href='/users/create'>Add User</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
