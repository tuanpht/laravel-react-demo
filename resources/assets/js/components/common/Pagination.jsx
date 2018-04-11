import React from 'react'

export default class Pagination extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPageButton(key, page, label, ariaLabel) {
        return (
            <li key={key} className={page === this.props.paging.current_page ? 'active' : ''}>
                <a onClick={(e) => this.props.goToFunc(e, page)} aria-label={ariaLabel || ''}>
                    <span aria-hidden="true" dangerouslySetInnerHTML={{__html: (label || page)}}></span>
                </a>
            </li>
        )
    }

    render() {
        if (!this.props.paging) {
            return;
        }

        let pages = [];
        if (this.props.paging.prev_page_url) {
            pages.push(this.renderPageButton(0, this.props.paging.current_page - 1, '&laquo;', 'Previous'))
        }

        for (var i = 1; i <= this.props.paging.last_page; i++) {
            pages.push(this.renderPageButton(i, i))
        }

        if (this.props.paging.next_page_url) {
            pages.push(this.renderPageButton(i + 1, this.props.paging.current_page + 1, '&raquo;', 'Next'))
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {pages}
                </ul>
            </nav>
        )
    }
}
