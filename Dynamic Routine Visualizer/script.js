document.addEventListener("DOMContentLoaded", () => {
    const draggableItems = document.querySelectorAll(".draggable-item");
    const routineGrid = document.querySelector(".routine-grid");
    const saveRoutineBtn = document.getElementById("save-routine");
    const editModal = document.getElementById("editModal");
    const editInput = document.getElementById("editInput");
    const saveEdit = document.getElementById("saveEdit");
    const cancelEdit = document.getElementById("cancelEdit");
    const playButton = document.getElementById("play-routine");
    //const clearRoutineBtn = document.getElementById("clear-routine");
    const resetRoutineBtn = document.getElementById("reset-routine");
    let currentItem = null; // Store the item being edited

    // Add dragstart event to each draggable item
    draggableItems.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", item.dataset.type);
            item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    });

    // Enable dropping on the routine grid
    routineGrid.addEventListener("dragover", (e) => {
        e.preventDefault();
        routineGrid.classList.add("highlight");
    });

    routineGrid.addEventListener("dragleave", () => {
        routineGrid.classList.remove("highlight");
    });

    routineGrid.addEventListener("drop", (e) => {
        e.preventDefault();
        routineGrid.classList.remove("highlight");

        const itemType = e.dataTransfer.getData("text/plain");

        if (itemType) {
            // Check if the item already exists
            // const existingItems = Array.from(routineGrid.querySelectorAll(".routine-item span"));
            // const isDuplicate = existingItems.some(item => item.textContent.toLowerCase() === itemType);

            // if (isDuplicate) {
            //     alert("This item already exists in the routine!");
            //     return;
            // }

            // Create a new routine item
            const newItem = document.createElement("div");
            newItem.classList.add("routine-item");

            const textSpan = document.createElement("span");
            textSpan.textContent = itemType.charAt(0).toUpperCase() + itemType.slice(1);
            newItem.appendChild(textSpan);

            // Add delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "✖";
            deleteBtn.setAttribute("aria-label", "Delete item");
            newItem.appendChild(deleteBtn);

            // Double-click to edit
            newItem.addEventListener("dblclick", () => {
                currentItem = newItem;
                editInput.value = textSpan.textContent;
                editModal.style.display = "flex";
                editInput.focus();
            });

            // Delete functionality
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                newItem.remove();
            });

            routineGrid.appendChild(newItem);
        }
    });

    //Play Routine 
    playButton.addEventListener("click", () => {
        const items = document.querySelectorAll(".routine-item");
        
        if (items.length === 0) {
            alert("No routine to play!");
            return;
        }
    
        items.forEach((item, index) => {
            item.classList.remove("playing"); // Reset animation
            setTimeout(() => {
                item.classList.add("playing");
            }, index * 1000); // Delay each item by 1 second
        });
    }); 
    // Save Routine (Log to console and localStorage)
    saveRoutineBtn.addEventListener("click", () => {
        const items = document.querySelectorAll(".routine-item");
        const routine = Array.from(items).map(item => item.querySelector("span").textContent);

        localStorage.setItem("routine", JSON.stringify(routine));
        console.log("Routine Saved:", routine);
        alert("Routine Saved! (Check the Console)");
    });

    // Clear Routine
    // clearRoutineBtn.addEventListener("click", () => {
    //     if (confirm("Are you sure that you want to clear this entire routine?")) {
    //         routineGrid.innerHTML ="";
    //     }
    // });

    // Reset Routine 
    resetRoutineBtn.addEventListener("click", () => {
        location.reload();
    });

    // Save Edit
    saveEdit.addEventListener("click", () => {
        const newText = editInput.value.trim();
        if (newText === "") {
            alert("Please enter a valid name.");
            return;
        }
        currentItem.querySelector("span").textContent = newText;
        editModal.style.display = "none";
        currentItem = null;
    });

    // Cancel Edit
    cancelEdit.addEventListener("click", () => {
        editModal.style.display = "none";
        currentItem = null;
    });

    // Close modal when clicking outside
    editModal.addEventListener("click", (e) => {
        if (e.target === editModal) {
            editModal.style.display = "none";
            currentItem = null;
        }
    });

    // Prevent clicks inside the modal content from closing the modal
    editModal.querySelector(".modal-content").addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Close modal when pressing the Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && editModal.style.display === "flex") {
            editModal.style.display = "none";
            currentItem = null;
        }
    });

    // Load saved routine from localStorage
    const savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
    savedRoutine.forEach(itemType => {
        const newItem = document.createElement("div");
        newItem.classList.add("routine-item");

        const textSpan = document.createElement("span");
        textSpan.textContent = itemType;
        newItem.appendChild(textSpan);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "✖";
        deleteBtn.setAttribute("aria-label", "Delete item");
        newItem.appendChild(deleteBtn);

        newItem.addEventListener("dblclick", () => {
            currentItem = newItem;
            editInput.value = textSpan.textContent;
            editModal.style.display = "flex";
            editInput.focus();
        });

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            newItem.remove();
        });

        routineGrid.appendChild(newItem);
    });
});