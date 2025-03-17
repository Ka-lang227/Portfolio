let isGrid = false;
function toggleLayout() {
    const layout = document.getElementById("layout");
    isGrid = !isGrid;
    if (isGrid) {
        layout.classList.remove("container");
        layout.classList.add("grid");
    } else {
        layout.classList.remove("grid");
        layout.classList.add("container");
    }
}