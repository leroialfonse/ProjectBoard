// Creates column class

import KanbanAPI from "../api/KanBanAPI.js"

export default class Column {
    // A constructor that will do the actual building.
    constructor(id, title) {
        this.element = {}
        this.elements.root = Column.createRoot()
        this.element.title = this.elements.root.querySelector(".kanban-column-title")
        this.elements.items = this.elements.root.querySelector(".kanban-column-items")
        this.elements.addItem = this.elements.root.querySelector(".kanban-add-items")

        this.elements.root.dataset.id = id
        this.element.title.textContent = title

        // What happens to add items?
        this.elements.addItem.addEventListener("click", () => {
            const newItem = KanbanAPI.insertItems(id, "")
            this.renderItem(newItem)
        })
    }
    // Create a method to go to the root item
    // Which will generate each column with the elements that will allow us to create the html elements that the column will need.
    static createRoot() {
        // Creates a chain of items that can be linked together, that can and needs to be hooked to something, in this case, the body of the documnet.
        const range = document.createRange()

        // The code that actually hooks the range to the document.
        range.selectNode(document.body)

        // Creates the actual HTML element ( contextual fragment ), directly inside JS. 
        return range.createContextualFragment(`           
            <div class="kanban-column-title"></div>
            <div class="kanban-column-items"></div>
            <button class="kanban-add-items" type="button">Add</button>
            </div>        

        `).children[0]
    }


    // Show the items in the column, as a child of the column
    renderItem(data) {
        const item = new Item(data.id, data.content)
        this.elements.items.appednChild(item.elements.root)
    }
}