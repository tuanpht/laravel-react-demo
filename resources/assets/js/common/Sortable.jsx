import React from "react"

export default class Sortable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentSort = this.props.currentSort;
        let classnames = "sortable";
        let content = this.props.content;
        if (currentSort && currentSort.field == this.props.field) {
            if (currentSort.direction == "asc") {
                classnames += " asc";
                content = `<span class="glyphicon glyphicon-sort-by-alphabet"></span> ${content}`;
            } else {
                classnames += " desc";
                content = `<span class="glyphicon glyphicon-sort-by-alphabet-alt"></span> ${content}`;
            }
        }

        return (
            <div
                className={classnames}
                dangerouslySetInnerHTML={{ __html: content }}
                onClick={(e) => this.props.onClick(e, this.props.field)}>
            </div>
        )
    }
}
