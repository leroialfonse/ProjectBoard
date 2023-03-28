// Creates column class

import KanBanAPI from "../api/KanBanAPI.js"
import Item from "./Item.js";

export default class Column {
    // A constructor that will do the actual building.
    constructor(id,title) {


        // 

        // The things the column should use to be created.
        this.elements = {}
        this.elements.root = Column.createRoot()
        this.elements.title = this.elements.root.querySelector(".kanban__column-title")
        this.elements.items = this.elements.root.querySelector(".kanban__column-items")
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item")

        this.elements.root.dataset.id = id
        this.elements.title.textContent = title


        // What happens to add items?
        this.elements.addItem.addEventListener("click", () => {
            const newItem = KanBanAPI.insertItem(id, "")
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

        // Creates the actual HTML elements ( contextual fragment ), directly inside JS. 
        return range.createContextualFragment(`           
            <div class="kanban__column-title"></div>
            <div class="kanban__column-items"></div>
            <button class="kanban__add-items" type="button">Add</button>
            </div>        

        `).children[0]
    }


    // Show the items in the column, as a child of the column
    renderItem(data) {
        console.log(data.id, data.content)
        const item = new Item(data.id, data.content)
        this.elements.items.appendChild(item.elements.root)
    }
}



// import KanbanAPI from "../api/KanbanAPI.js"
// // import DropZone from "./DropZone.js";
// import Item from "./Item.js";

// export default class Column {
//     // A constructor that will do the actual building, and tells the module what elements to select / have

//     constructor(id, title) {

//         // const topDropZone = DropZone.createDropZone()

//         // The things the column should use to be created.

//         this.elements = {}
//         this.elements.root = Column.createRoot()
//         this.elements.title = this.elements.root.querySelector(".kanban__column-title")
//         this.elements.items = this.elements.root.querySelector(".kanban__column-items")
//         this.elements.addItem = this.elements.root.querySelector(".kanban__add-item")

//         this.elements.root.dataset.id = id
//         this.elements.title.textContent = title

//         // this.elements.items.appendChild(topDropZone)

//         this.elements.addItem.addEventListener("click",
//             () => {
//                 const newItem = KanbanAPI.insertItem(id, "")
//                 this.renderItem(newItem)
//             }
//         )
//     }

//     static createRoot() {
//         const range = document.createRange()

//         range.selectNode(document.body)

//         return range.createContextualFragment(`
//             <div class="kanban__column">
//                 <div class="kanban__column-title"></div>
//                 <div class="kanban__column-items"></div>
//                 <button class="kanban__add-item" type="button">+ Add</button>
//             </div>
            
//         `).children[0]
//     }

//     renderItem(data) {
//         console.log(data.id, data.content)
//         const item = new Item(data.id, data.content)
//         this.elements.items.appendChild(item.elements.root)
//     }
// }