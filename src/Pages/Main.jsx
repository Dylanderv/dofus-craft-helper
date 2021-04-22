import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CommandBar, CommandBarButton } from '@fluentui/react';
import { Add } from './Add/Add';
import { ViewGlobal } from './View/Global/ViewGlobal';
import { ViewPerItems } from './View/PerItems/ViewPerItems';
import { useState } from 'react';

export function Main() {
    const [craftList, setCraftList] = useState([])

    const addOneItemToCraftList = (itemToAdd) => {
        console.log("called", itemToAdd);
        console.log("current", craftList);
        const newItems = [...craftList, itemToAdd]
        console.log("new items", newItems);
        setCraftList(craft => [...craft, itemToAdd]);
        console.log("fin", craftList);

    }

    return <div>
        <CommandBar
        items={_items}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
      <div>
        <Switch>
          <Route path="/view/global">
            <ViewGlobal craftList={craftList} />
          </Route>
          <Route path="/view/perItems">
            <ViewPerItems craftList={craftList} />
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
        },
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
