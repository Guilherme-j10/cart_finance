export type ItemDataStruct = {
  item_id: string,
  item_name: string,
  item_price: string,
  item_amount: string
}

export type FormItem = {
  item_name: string,
  item_price: string,
  item_amount: string
}

export type StorageData = {
  items: ItemDataStruct[]
}

export type StoreResolverType = {
  save: (item_payload: Omit<ItemDataStruct, 'item_id'>) => void,
  delete: (item_id: string) => void,
  find: (item_id: string) => ItemDataStruct,
  update: (payload_update: ItemDataStruct) => void,
  list_all: () => StorageData
}

export type StoreHookType = {
  items_list: ItemDataStruct[],
  store_resolver_database: StoreResolverType
}