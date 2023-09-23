import { useEffect, useState } from "react";
import { Item } from "./Components/Item"
import { AddItem } from "./Components/AddItem";
import { ConditionalRender } from "./Components/ConditionalRender";
import { items, total_to_pay, useStore } from "./Hooks/useStore";
import { useAtomValue } from "jotai";

function App() {

  const [add_item, set_add_item] = useState(false);
  const items_list = useAtomValue(items);
  const to_pay = useAtomValue(total_to_pay);

  const { list_all } = useStore();

  useEffect(() => { list_all() }, []);

  return (
    <>
      <div className="w-full min-h-[100vh] bg-slate-950 flex flex-col justify-start items-center">
        <div className="w-full h-[80px] flex justify-between px-[30px] items-center border-b-[1px] border-b-slate-800">
          <h1 className="text-white font-semibold text-[1.4em] flex justify-start items-center">
            <span className="material-symbols-outlined text-[1em] mr-[10px]">
              shopping_cart
            </span>
            Carrinho
          </h1>
          <button onClick={() => set_add_item(true)} className="w-[90px] h-[45px] bg-green-500 flex justify-center items-center text-white rounded-[5px]">
            <span className="material-symbols-outlined mr-[5px]">
              add
            </span>
            <p className="mr-[5px]">Item</p>
          </button>
        </div>
        <div className="w-full py-[20px] mb-[80px] px-[20px] flex justify-start flex-col items-center">
          <ConditionalRender condition={items_list?.length || 0}>
            {items_list?.map((item, index) => (
              <Item key={index} data={item} />
            ))}
          </ConditionalRender>
          <ConditionalRender condition={!items_list?.length || 0}>
            <div className="w-full flex-col h-[calc(100vh_-_250px)] flex justify-center items-center">
              <span className="material-symbols-outlined text-white mb-[20px] text-[4em]">
                remove_shopping_cart
              </span>
              <h1 className="text-white font-bold text-[1.2em]">Nenhum item encontado.</h1>
            </div>
          </ConditionalRender>
        </div>
        <div className="fixed flex h-[80px] w-full bottom-0 justify-between px-[20px] items-center left-0 bg-slate-950 border-t-[1px] border-t-slate-800">
          <h1 className="text-white font-bold text-[1.5em]">Total: {to_pay}</h1>
        </div>
      </div>
      <ConditionalRender condition={add_item}>
        <AddItem close_modal={set_add_item} />
      </ConditionalRender>
    </>
  )
}

export default App
