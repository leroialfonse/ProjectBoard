// create a class to export and use in other places.

export default class Kanban {
    // Goes to the html div that includes the kanban board, to build the item there.
    constructor(root) {
        this.root = root

        // Creates the column instance 
        Kanban.columns().forEach(column => {
            // TODO: Create an instance of column class
        })
    }

    // A method that builds the columns
    static columns() {
        return [
            {
                id: 1,
                title: "Not Started"
            }, {
                id: 2,
                title: "In Progress"
            }, {
                id: 3,
                title: "Completed"
            }, {
                id: 4,
                title: "On Hold"
            },
        ]
    }
}