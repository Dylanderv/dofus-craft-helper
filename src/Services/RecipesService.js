import * as Recipes from '../Data/output.json';

export function GetFirstRecipe() {
    return Recipes.recipes[0];
}

export function FilterRecipes(nameFilter = "", typeFilter = "", levelMin = 0, levelMax = 200) {
    return Recipes.recipes.filter(x => {
        return firstNameContainsOther(x.name, nameFilter)
        && firstNameContainsOther(x.type, typeFilter)
        && x.level <= levelMax
        && x.level >= levelMin
    });
}

function firstNameContainsOther(name1, name2) {
    return name1.toLocaleLowerCase().includes(name2.toLocaleLowerCase());
}

export function allRecipesToIngredientList(recipes) {
    const ingredientList = recipes.flatMap(recipe => {
        if (recipe.ingredients === null) {
            return {
                key: recipe.id,
                name: recipe.name,
                level: recipe.level,
                quantity: 1,
                recipes: [recipe.name],
                iconId: recipe.iconId,
                type: recipe.type
            }
        }
        return recipe.ingredients.map(ingredient => {
            console.log(recipe)
            return {
                key: ingredient.item.id,
                name: ingredient.item.name,
                level: ingredient.item.level,
                quantity: ingredient.quantity,
                recipes: [recipe.name],
                iconId: ingredient.item.iconId,
                type: ingredient.item.type
            }
        })
    });

    return MergeIngredientListDuplicates(ingredientList)
}

function MergeIngredientListDuplicates(ingredientList) {
    const mergedList = [];
    
    ingredientList.forEach(ingredient => {
        let elementInList = mergedList.find(x => x.key === ingredient.key);
        if (elementInList !== undefined) {
            elementInList.quantity += ingredient.quantity;
            elementInList.recipes.push(...ingredient.recipes)
        } else {
            mergedList.push(ingredient);
        }
    })

    return mergedList;
}


