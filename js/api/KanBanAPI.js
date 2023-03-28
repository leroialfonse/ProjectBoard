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
    static insertItems(columnId, content) {
        const data = read()
        const column = data.find(column => column.id == columnId)
        const item = {
            // Creete an id for items by using a random number 0 - 100000, and rounding it to whole numbers, and the content that will exist in the item.
            id: Math.floor(Math.random() * 100000),
            content
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

    // Delete an item
    static deleteItem(itemId) {
        const data = read()

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
            }, {
                id: 2,
                items: []
            }, {
                id: 3,
                items: []
            }, {
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