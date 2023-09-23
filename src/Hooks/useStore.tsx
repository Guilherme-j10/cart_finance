import { v4 } from 'uuid';
import { ItemDataStruct, StorageData, StoreResolverType } from '../Dtos';
import { atom, useSetAtom } from 'jotai';
import currencyFormatter from 'currency-formatter';

export const items = atom([] as ItemDataStruct[]);
export const total_to_pay = atom('R$ 0,00');

export const useStore = (): StoreResolverType => {

  const set_items_list = useSetAtom(items);
  const set_total_to_pay = useSetAtom(total_to_pay);

  const handle_resolve_total_to_pay = (data: ItemDataStruct[]) => {

    const complete_amount = data.reduce((acc, item) => {

      const current_price = currencyFormatter.unformat(item.item_price, { code: 'BRL' });

      return acc += (current_price * parseInt(item.item_amount));

    }, 0);

    set_total_to_pay(currencyFormatter.format(complete_amount, { code: 'BRL' }));

  }

  const sotore_key_name = 'item_control';

  const store_resolver_database: StoreResolverType = {
    save: (item_payload: Omit<ItemDataStruct, 'item_id'>) => {

      let current_data = localStorage.getItem(sotore_key_name) as string | StorageData;

      if (typeof current_data === 'string')
        current_data = JSON.parse(current_data)

      if (typeof current_data !== 'string' && !current_data)
        current_data = { items: [] };

      let item_data = item_payload as ItemDataStruct;
      const item_id = v4();

      item_data = {
        ...item_data,
        item_id: item_id
      }

      if (typeof current_data === 'object')
        current_data.items.push(item_data)

      localStorage.setItem(sotore_key_name, JSON.stringify(current_data));

      store_resolver_database.list_all();

    },
    delete: (item_id: string) => {

      let current_data = JSON.parse(localStorage.getItem(sotore_key_name) as string) as StorageData;
      current_data = {
        items: current_data.items.map(item => item.item_id !== item_id ? item : null).filter(val => val) as ItemDataStruct[]
      };

      localStorage.setItem(sotore_key_name, JSON.stringify(current_data));

      store_resolver_database.list_all();

    },
    find: (item_id: string): ItemDataStruct => {

      let current_data = JSON.parse(localStorage.getItem(sotore_key_name) as string) as StorageData;

      const [item] = current_data.items.filter(item => item.item_id === item_id);

      return item || [];

    },
    update: (payload_update: ItemDataStruct) => {

      let current_data = JSON.parse(localStorage.getItem(sotore_key_name) as string) as StorageData;

      current_data = {
        items: current_data.items.map(item => item.item_id === payload_update.item_id ? ({
          ...item,
          ...payload_update
        }) : item)
      };

      localStorage.setItem(sotore_key_name, JSON.stringify(current_data));

      store_resolver_database.list_all();

    },
    list_all: () => {

      const current_data = JSON.parse(localStorage.getItem(sotore_key_name) as string) as StorageData;

      handle_resolve_total_to_pay(current_data.items);
      set_items_list(current_data?.items || []);

      return current_data;

    }
  }

  return store_resolver_database;

}