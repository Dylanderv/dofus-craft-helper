import { DetailsList, DetailsListLayoutMode, IconButton, SelectionMode } from "@fluentui/react"
import { useEffect, useState } from "react";

export function ViewPerItems({ craftList, removeOneItemFromList}) {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const newColumns = [
            { key: 'img', name: '', fieldName: 'edit', isResizable: false,
                onRender: (item) => (
                    <img width="30" src={require(`../../../images/${item.iconId}.png`).default}/>
                ), minWidth: 10, maxWidth: 30
            },
            { key: 'column1', name: 'Nom', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Level', fieldName: 'level', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column3', name: 'Quantité', fieldName: 'quantity', minWidth: 100, maxWidth: 200, isResizable: true },
          ];
        setColumns(newColumns);
      }, []);

    const recipeToItemList = (recipe, quantity) => {
        return recipe.ingredients.map(ingredient => {
            return {
                key: ingredient.item.id,
                name: ingredient.item.name,
                level: ingredient.item.level,
                quantity: ingredient.quantity * quantity,
                iconId: ingredient.item.iconId
            }
        });
    }

    const itemListWithMergedDuplicated = () => {
        let mergedList = [];
        craftList.forEach(item => {
            let elementInList = mergedList.find(x => x.data.itemId === item.itemId);
            if (elementInList !== undefined) {
                elementInList.quantity ++;
            } else {
                mergedList.push({
                    data: item,
                    quantity: 1
                });
            }
        })
        console.log(mergedList)
        return mergedList;
    }

    return <div>

            <h2> View per items </h2>
            {itemListWithMergedDuplicated().map(item => 
                <div>
                    <h3>
                        <img src={require(`../../../images/${item.data.relatedItem.iconId}.png`).default}/>
                        {item.data.recipeName} {item.quantity > 1 ? `x${item.quantity}` : ""}
                        <IconButton iconProps={{iconName: "Delete"}} title="Ajouter à la liste de craft" ariaLabel="Ajouter à la liste de craft"
                            onClick={() => removeOneItemFromList(item.data)}/>
                        </h3>
                    <DetailsList
                        items={recipeToItemList(item.data, item.quantity)}
                        columns={columns}
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.none}
                    />
                </div>
                )}
        
        
        </div>
}
