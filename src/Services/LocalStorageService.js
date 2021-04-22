export function SaveSelectedRecipes(selectedRecipes) {
    window.localStorage.setItem("recipes", JSON.stringify(selectedRecipes));
}

export function GetSelectedRecipes() {
    const selectedItems = window.localStorage.getItem("recipes");
    return selectedItems === null ? [] : JSON.parse(selectedItems);
}
