const i18n_fr = require("./dofusData/i18n_fr.json");
const Items = require("./dofusData/Items.json");
const ItemSets = require("./dofusData/ItemSets.json");
const ItemTypes = require("./dofusData/ItemTypes.json");
const Recipes = require("./dofusData/Recipes.json");
const fs = require('fs');

function link() {
    // Besoin 
    // Nom, id, range de level & drop (item name + chances)
    return {
        recipes: Recipes.map(recipe => {
            const recipeName = i18n_fr.texts[recipe.resultNameId];
            const recipeType = i18n_fr.texts[GetItemType(recipe.resultTypeId).nameId]
            const level = recipe.resultLevel;
            const ingredients = ProcessIngredients(recipe.ingredientIds, recipe.quantities);
            const relatedItem = GetUsefullItemData(GetItem(recipe.resultId));
            return({
                key: recipe.resultId,
                itemId: recipe.resultId,
                recipeName,
                recipeType,
                level,
                ingredients,
                relatedItem
            });
        })
    }
}

function ProcessIngredients(ingredientsIds, quantities) {
    return ingredientsIds.map((id, index) => {
        const quantity = quantities[index];
        return {
            item: GetUsefullItemData(GetItem(id)),
            quantity
        };
    });
}

function GetUsefullItemData(item) {
    return {
        id: item.id,
        level: item.level,
        name: i18n_fr.texts[item.nameId],
        iconId: item.iconId
    }
}

function GetItem(itemId) {
    return Items.find(x => x.id === itemId);
}

function GetItemType(typeId) {
    return ItemTypes.find(x => x.id === typeId);
}

fs.writeFileSync('output.json', JSON.stringify(link()));

// let larve = dropInfoArray.filter(el => el.id === 31)[0];
// console.log(larve)
// console.log(larve.drop);
// console.log(larve.temporisDrops);
