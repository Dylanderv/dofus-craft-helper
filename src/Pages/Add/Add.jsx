import { DetailsList, DetailsListLayoutMode, IconButton, SelectionMode, TextField, Toggle } from "@fluentui/react"
import { useEffect, useRef, useState } from "react";
import { FilterRecipes } from "../../Services/RecipesService"

export function Add({ addOneItemToCraftList }) {

    const [items, setItems] = useState([]);
    const [columns, setColumns] = useState([]);
    const [onlyCard, setOnlyCard] = useState(false);
    const [search, setSearch] = useState("");
    const refItems = useRef(items);

    const updateItems = (newItems) => {
        refItems.current = newItems;
        setItems(newItems);
    }

    useEffect(() => {
        const newItems = FilterRecipes();
        updateItems(newItems);
    
        const newColumns = [
          { key: 'edit', name: '', fieldName: 'edit', isResizable: false,
            onRender: (item) => (
              <IconButton iconProps={{iconName: "Add"}} title="Ajouter à la liste de craft" ariaLabel="Ajouter à la liste de craft"
              onClick={() => addOneItemToCraftList(item)}/>
              ), minWidth: 10, maxWidth: 30
          },
          { key: 'img', name: '', fieldName: 'edit', isResizable: false,
              onRender: (item) => (
                  <img width="30" alt="item icon" src={require(`../../images/${item.relatedItem.iconId}.png`).default}/>
              ), minWidth: 10, maxWidth: 30
          },
            { key: 'column1', name: 'Nom', fieldName: 'recipeName', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Type', fieldName: 'recipeType', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column3', name: 'Level', fieldName: 'level', minWidth: 100, maxWidth: 200, isResizable: true },
          ];
        setColumns(newColumns);
      }, []);

    const _onChangeText = (ev, value) => {
        setSearch(value);
        setItems(FilterRecipes(value, onlyCard ? "Carte d'Ecaflip (Temporis)" : ""));
    }
    
    const _onChangeOnlyCard = (ev, value) => {
        setOnlyCard(value);
        setItems(FilterRecipes(search, value ? "Carte d'Ecaflip (Temporis)" : ""));
    }

    return <div>
            <h2>    Add </h2>
            
            <TextField label="Filter by name:" onChange={_onChangeText}/>

            <Toggle
            label="Filtres cartes temporis"
            onChange={_onChangeOnlyCard}
            onText="Uniquement les cartes temporis"
            offText="Toutes les recettes"
          />

            <DetailsList
              items={items}
              columns={columns}
              checked={onlyCard}
              layoutMode={DetailsListLayoutMode.justified}
              selectionMode={SelectionMode.none}
            />
        
        
        </div>
}


