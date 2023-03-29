// The backend for the KanBan this will allow the kanban to work with local storage for storing data


// The class to export
export default class KanbanAPI {
    // the method to show a column where the data is/will be stored.
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId)


        // an error case
        if (!column) {
            return []
        }

        return column.items
    }

    //Creating new items to be stored in the column.
    static insertItem(columnId, content) {
        const data = read()
        const column = data.find(column => column.id == columnId)
        const item = {
            // Creete an id for items by using a random number 0 - 100000, and rounding it to whole numbers, and the content that will exist in the item.
            id: Math.floor(Math.random() * 100000),
            content,
        }

        if (!column) {
            throw new Error("Column does not exist.")
        }

        //Add the item to the column, and save the entry.
        column.items.push(item)
        save(data)

        // Ensure the new item will be displayed.
        return item
    }

    static updateItem(itemId, newProps) {
        const data = read()
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId)

                if (item) {
                    return [item, column]
                }
            }
        })()

        if (!item) {
            throw new Error("Item not found!")
        }


        // Check to see if the item you're looking at has had updated it's content after a move or whatever, and whether it needs to be reset.
        item.content = newProps.content === undefined ? item.content : newProps.content

        // Updating column item positions
        if (
            // If there's a new item in a new column, or a new position for an item
            newProps.columnId !== undefined && newProps.position !== undefined
        ) {
            const targetColumn = data.find(column => column.id == newProps.columnId)

            if (!targetColumn) {
                throw new Error("Target column not found!")
            }

            // Delete the item out of it's old column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1)

            // Place that column item, into the new column/positon
            targetColumn.items.splice(newProps.position, 0, item)
        }
        save(data)

    }


    // Delete an item
    static deleteItem(itemId) {
        const data = read()

        // Loop through the columns of items
        for (const column of data) {
            // Loop through the items in the column
            const item = column.items.find(item => item.id == itemId)

            // If the item exists, want to adapt the list with a splice
            if (item) {
                column.items.splice(column.items.indexOf(item), 1)
            }
        }

        save(data)
    }
}


// A function to read info from the local storage
function read() {
    const json = localStorage.getItem("kanban-data")

    // If there is no data in local storage, then I want to return a default array of columns that will accept our items.
    if (!json) {
        return [

            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
            {
                id: 4,
                items: []
            },

        ]
    }

    // return that data as readable JSON
    return JSON.parse(json)
}


// Put stuff into the local storage
function save(data) {

    // Have to send data to localStorage as a string; don't forget JSON.stringify.
    localStorage.setItem
        ("kanban-data", JSON.stringify(data))
}

