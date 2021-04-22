import { Checkbox, DetailsList, DetailsListLayoutMode, SelectionMode, TextField } from "@fluentui/react"
import { useEffect, useState } from "react";
import { allRecipesToIngredientList } from "../../../Services/RecipesService";


const narrowTextFieldStyles = { fieldGroup: { width: 60 }, display: "inline" };

export function ViewGlobal({ craftList }) {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const newColumns = [
            { key: 'check', name: '', fieldName: 'edit', isResizable: false,
                onRender: () => (
                    <Checkbox/>
                ), minWidth: 10, maxWidth: 30
            },
            { key: 'number', name: '', fieldName: 'edit', isResizable: true,
                onRender: (item) => (
                    <div><TextField styles={narrowTextFieldStyles} /> / {item.quantity}</div>
                ), minWidth: 10, maxWidth: 60
            },
            { key: 'img', name: '', fieldName: 'edit', isResizable: false,
                onRender: (item) => (
                    <img width="30" src={require(`../../../images/${item.iconId}.png`).default}/>
                ), minWidth: 10, maxWidth: 30
            },
            { key: 'column1', name: 'Nom', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column3', name: 'Quantité', fieldName: 'quantity', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Level', fieldName: 'level', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column4', name: 'Recettes', fieldName: 'recipes', minWidth: 100, maxWidth: 200, isResizable: true },
          ];
        setColumns(newColumns);
      }, []);

      const getIngredientList = () => {
          let ingredientList = allRecipesToIngredientList(craftList);
          console.log(ingredientList);
          ingredientList.forEach(x => x.recipes = ingredientRecipesNameToDisplayedName(x.recipes))
          return ingredientList;
      }

      const ingredientRecipesNameToDisplayedName = (recipeNames) => {
            const nameOccurencies = [];
            recipeNames.forEach(x => {
                let elementInList = nameOccurencies.find(y => y.name === x);
                if (elementInList !== undefined) {
                    elementInList.occurence ++;
                } else {
                    nameOccurencies.push({
                        name: x,
                        occurence: 1
                    });
                }
            });
            return nameOccurencies.map(x => `${x.name} x${x.occurence}`).join(", ");
      }

      const onEditCheckedMetadata = (checkMetadata) => {

      }

      const onEditTextMetadata = (textMetadata) => {
          
      }

    return <div>

            <h2> View Global </h2>
            <DetailsList
                items={getIngredientList()}
                columns={columns}
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
            />
        
        
        </div>
}
