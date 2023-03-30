// The file that makes things drag and droppable.

export default class DropZone {

    //The method that creates the dropxone functionality, and the range that creates the dropzone.
    static createDropZone() {
        const range = document.createRange()

        range.selectNode(document.body)

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0]


        // the event listener that will enable drag and drops. 
        dropZone.addEventListener("dragover", e => {
            e.preventDefault()
            dropZone.classList.add("kanban__dropzone-active")

        })

        // allows for you to release items when you're done dragging them. 
        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone-active")
        })

        // Drop items that you've dragged in the closest column and spot that you release at. Change that column's data to reflect this new item. 
        dropZone.addEventListener("drop", e => {
            e.preventDefault()
            dropZone.classList.remove("kanban__dropzone-active")

            const columnElement = dropZone.closest(".kanban_column")
            const columnId = Number(columnElement.dataset.id)
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"))
            const droppedIndex = dropZonesInColumn.indexOf(dropZone)
            const itemId = Number(e.dataTransfer.getData("text/plain"))
            const droppedItemElement = document.querySelector(`[data-id]="${itemId}"]`)
            const insertAfter = dropzone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone

            if (droppedItemElement.contains(dropZone)) {
                return
            }

            insertAfter.after(droppedItemElement)

            KanbanAPI.updateItem(itemId, {
                columnId, position: droppedIndex
            })
        })

        return dropZone
    }
}