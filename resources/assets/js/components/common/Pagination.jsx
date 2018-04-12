import React from "react"

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.currenPageKey = 0;
    }

    renderPageButton(page, label, ariaLabel) {
        this.currenPageKey++;
        return (
            <li key={this.currenPageKey} className={page === this.props.paging.current_page ? "active" : null}>
                <a onClick={page ? (e) => this.props.goToFunc(e, page) : null} title={ariaLabel || null} aria-label={ariaLabel || null}>
                    <span aria-hidden="true" dangerouslySetInnerHTML={{__html: (label || page)}}></span>
                </a>
            </li>
        )
    }

    render() {
        if (!this.props.paging || this.props.paging.last_page === 1) {
            return null;
        }

        let pages = [];
        let limitPages = 5;
        let currenPage = this.props.paging.current_page;

        let startPage = currenPage - Math.floor(limitPages / 2);
        startPage = startPage < 1 ? 1 : startPage;

        let endPage = startPage + limitPages - 1;
        endPage = endPage < this.props.paging.last_page ? endPage : this.props.paging.last_page;

        // If pages between start page and end page are less then limit pages
        startPage = (endPage - startPage + 1) < limitPages && endPage >= limitPages
            ? (endPage - limitPages + 1)
            : startPage;

        if (this.props.paging.prev_page_url) {
            pages.push(this.renderPageButton(1, "&laquo;", "First"));
            pages.push(this.renderPageButton(this.props.paging.current_page - 1, "&lsaquo;", "Previous"));
        }

        if (startPage > 1) {
            pages.push(this.renderPageButton(null, "..."));
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(this.renderPageButton(i));
        }

        if (endPage < this.props.paging.last_page) {
            pages.push(this.renderPageButton(null, "..."));
        }

        if (this.props.paging.next_page_url) {
            pages.push(this.renderPageButton(this.props.paging.current_page + 1, "&rsaquo;", "Next"));
            pages.push(this.renderPageButton(this.props.paging.last_page, "&raquo;", "Last"));
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
