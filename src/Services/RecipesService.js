import * as Recipes from '../Data/output.json';

export function GetFirstRecipe() {
    return Recipes.recipes[0];
}

export function FilterRecipes(nameFilter = "", typeFilter = "", levelMin = 0, levelMax = 200) {
    const test = Recipes.recipes.filter(x => 
        firstNameContainsOther(x.recipeName, nameFilter)
        && firstNameContainsOther(x.recipeType, typeFilter)
        && x.level <= levelMax
        && x.level >= levelMin
    );
    return test;
}

function firstNameContainsOther(name1, name2) {
    return name1.toLocaleLowerCase().includes(name2.toLocaleLowerCase());
}

export function allRecipesToIngredientList(recipes) {
    const ingredientList = recipes.flatMap(recipe => {
        return recipe.ingredients.map(ingredient => {
            return {
                key: ingredient.item.id,
                name: ingredient.item.name,
                level: ingredient.item.level,
                quantity: ingredient.quantity,
                recipes: [recipe.recipeName],
                iconId: ingredient.item.iconId
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


