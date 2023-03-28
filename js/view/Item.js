// Building the structure that builds items in the columns

import KanbanAPI from "../api/KanBanAPI.js"
import Kanban from "./Kanban.js"

export default class Item {
    constructor(id, content) {
        this.elements = {}
        this.elements.root = Item.createRoot()
        this.elements.input = this.elements.root.querySelector("kanban__item-input")
        this.elements.root.dataset.id = id
        this.elements.input.textContent = content
        this.content = content

        // Setting what happens when a user clicks away from something. Like, if the user clicks outside of the edit item, the changes get saved. Similar to what happens when you click out of a window, and the mouse focus changes over. 
        const onBlur = () => {
            // Select the item that was changed, and remove whitespace.
            const newContent = this.elements.input.textContent.trim()

            if (newContent === this.content) {
                return
            }

            this.content = newContent

            // Updates the Kanban with the changed content.
            KanbanAPI.updateItem(id, {
                content: this.content
            })
        }

        const confirmOrKill = () => {
            const check = confirm("Are you sure you want to delete?")

            // If check is confirmed, deletes the item from the parent(column), and from local storage.
            if (check) {
                KanbanAPI.deleteItem(id)
                this.elements.input.removeEventListener("blur", onBlur)
                this.elements.root.parentElement.removeChild(this.elements.root)
            }
        }


        // When someone makes a change and clicks away, listen for that event and perform an update. 
        this.elements.input.addEventListener("blur", onBlur)

        // If someone doubleclicks on an item, Ask if the user wants to delete the item, and delete on confirm.
        this.elements.root.addEventListener("dblclick", confirmOrKill)
        /* this was the original method for the confirmOrKill function. It was passed in as the second param for the evnet lister for the above event, as an anon function. If used, remove the function expresssion confirmOrKill higher up.  
        
        () => {
            const check = confirm("Are you sure you want to delete?")

            // If check is confirmed, deletes the item from the parent(column), and from local storage.
            if (check) {
                KanbanAPI.deleteItem(id)
                this.elements.input.removeEventListener("blur", onBlur)
                this.elements.root.parentElement.removeChild(this.elements.root)
            }
        }) */
    }


    static createRoot() {
        const range = documnent.createRange()

        range.selectNode(document.body)

        return range.createContextualFragment(`
        <div class="kanban__item" draggable="true">
        <div class="kanban__item-input" contenteditable></div>
        </div>
    `)

    }
}