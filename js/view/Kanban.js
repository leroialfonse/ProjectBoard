// create a class to export and use in other places.

import Column from "./Column.js"

export default class Kanban {
    // Goes to the html div that includes the kanban board, to build the item there.
    constructor(root) {
        this.root = root

        // Creates the column instance 
        Kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title)
            this.root.appendChild(columnView.elements.root)
        })
    }

    // A method that builds the columns
    static columns() {
        return [
            {
                id: 1,
                title: "Not Started",
            },
            {
                id: 2,
                title: "In Progress",
            },
            {
                id: 3,
                title: "Completed",
            },
            {
                id: 4,
                title: "On Hold",
            },
        ]
    }
}