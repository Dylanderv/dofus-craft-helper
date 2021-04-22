import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CommandBar, CommandBarButton, PrimaryButton } from '@fluentui/react';
import { Add } from './Add/Add';
import { ViewGlobal } from './View/Global/ViewGlobal';
import { ViewPerItems } from './View/PerItems/ViewPerItems';
import { useState } from 'react';
import { uuidv4 } from "../Helper/UUIDHelper";
import { GetSelectedRecipes, SaveSelectedRecipes } from "../Services/LocalStorageService"

export function Main() {
    const [craftList, setCraftList] = useState(GetSelectedRecipes())

    const addOneItemToCraftList = (itemToAdd) => {
        let clone = {...itemToAdd};
        clone.uuid = uuidv4();
        SaveSelectedRecipes([...craftList, clone]);
        setCraftList(craft => [...craft, clone]);
    }

    const removeOneItemFromList = (itemToRemove) => {
      SaveSelectedRecipes(craftList.filter(x => x.uuid !== itemToRemove.uuid));
      setCraftList(craft => craft.filter(x => x.uuid !== itemToRemove.uuid));
    }

    const removeAllItems = () => {
      SaveSelectedRecipes([]);
      setCraftList([]);
    }

    return <div>
        <CommandBar
        items={_items}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
      <div>
      <PrimaryButton text="Supprimer tous les objets de la liste" onClick={() => removeAllItems()}/>
        <Switch>
          <Route path="/view/global">
            <ViewGlobal craftList={craftList} removeAllItems={removeAllItems} />
          </Route>
          <Route path="/view/perItems">
            <ViewPerItems craftList={craftList} removeOneItemFromList={removeOneItemFromList} removeAllItems={removeAllItems} />
          </Route>
          <Route path="/add">
            <Add addOneItemToCraftList={addOneItemToCraftList} />
          </Route>
        </Switch>
      </div>
    </div>
}

const CustomButton = props => {
    const WrappedButton = () => (
      <CommandBarButton {...(props)} text={(props.text || props.name)} />
    );
    return <Link component={WrappedButton} to={props.href} />;
  };
  
const _items = [
{
    key: 'craftList',
    text: 'List de craft',
    commandBarButtonAs: CustomButton,
    subMenuProps: {
    items: [
        {
          key: 'global',
          text: 'Vue globale',
          iconProps: { iconName: 'Mail' },
          href: '#/view/global'
        },
        {
          key: 'byitem',
          text: 'Vue par items',
          iconProps: { iconName: 'Calendar' },
          href: '#/view/perItems'
        }
    ],
    },
},
{
    key: 'add',
    text: 'Ajouter des recettes',
    iconProps: { iconName: 'Upload' },
    commandBarButtonAs: CustomButton,
    href: '#/add'
},
];
