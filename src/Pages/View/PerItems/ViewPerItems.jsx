import { DetailsList, DetailsListLayoutMode, SelectionMode } from "@fluentui/react"
import { useEffect, useState } from "react";


export function ViewPerItems({ craftList }) {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const newColumns = [
            { key: 'column1', name: 'Nom', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Level', fieldName: 'level', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column3', name: 'Quantité', fieldName: 'quantity', minWidth: 100, maxWidth: 200, isResizable: true },
          ];
        setColumns(newColumns);
      }, []);

    const recipeToItemList = (recipe) => {
        return recipe.ingredients.map(ingredient => {
            return {
                key: ingredient.item.id,
                name: ingredient.item.name,
                level: ingredient.item.level,
                quantity: ingredient.quantity
            }
        })
    }

    return <div>

            <h2> View per items </h2>
            {craftList.map(item => 
                <div>
                    <h3>{item.recipeName}</h3>
                    <DetailsList
                        items={recipeToItemList(item)}
                        columns={columns}
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.none}
                    />
                </div>
                )}
        
        
        </div>
}
