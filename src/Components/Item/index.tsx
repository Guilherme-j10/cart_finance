import React, { useState } from 'react';
import { ItemDataStruct } from '../../Dtos';
import { limit_string } from '../../Utils';
import { ConditionalRender } from '../ConditionalRender';
import { useStore } from '../../Hooks/useStore';
import { AddItem } from '../AddItem';

type ItemData = {
  data: ItemDataStruct
}

export const Item: React.FC<ItemData> = (props) => {

  const [remove_item, set_remove_item] = useState(false);
  const [edit_item, set_edit_item] = useState(false);

  const store_handle = useStore();

  const handle_remove_item = () => {

    store_handle.delete(props.data.item_id)
    set_remove_item(false);

  }

  return (
    <>
      <div className="w-full p-[10px] rounded-md bg-[#ffffff2d] mb-[10px] last:mb-[0px] grid grid-cols-[20px_1fr_90px_90px] items-center">
        <p className='w-full flex justify-center items-center text-slate-200 font-bold text-[.9em]'>x{props.data.item_amount}</p>
        <div className='w-full flex justify-start items-center'>
          <h1 className='text-slate-200 text-[.9em] ml-[10px]'>{props.data.item_name}</h1>
        </div>
        <div className='w-full flex justify-end items-center'>
          <p className='text-slate-200 font-bold'>{limit_string(props.data.item_price, 10)}</p>
        </div>
        <div className='flex justify-end items-center'>
          <button
            onClick={() => set_remove_item(true)}
            className='w-[30px] h-[30px] rounded-[3px] bg-red-400 flex justify-center items-center text-white mr-[10px]'
          >
            <span className="material-symbols-outlined text-[1em]">
              delete
            </span>
          </button>
          <button
            onClick={() => set_edit_item(true)}
            className='w-[30px] h-[30px] rounded-[3px] bg-blue-400 flex justify-center items-center text-white'
          >
            <span className="material-symbols-outlined text-[1em]">
              edit
            </span>
          </button>
        </div>
      </div>
      <ConditionalRender condition={edit_item}>
        <AddItem
          close_modal={set_edit_item}
          data_to_update={{
            ...props.data
          }}
        />
      </ConditionalRender>
      <ConditionalRender condition={remove_item}>
        <div className='fixed w-full px-[20px] top-0 left-0 h-[100vh] flex justify-center items-center bg-[#0e14227a] backdrop-blur-sm'>
          <div className='w-full rounded-md min-h-[200px] bg-slate-700 shadow-md'>
            <div className='w-full p-[10px] flex justify-between items-center border-b-[1px] border-b-slate-500'>
              <h1 className='flex justify-start items-center text-slate-300 font-bold'>
                <span className="material-symbols-outlined mr-[5px]">
                  delete
                </span>
                Remover item
              </h1>
              <button onClick={() => { set_remove_item(false) }} className='w-[40px] h-[40px] rounded-[50px] flex justify-center items-center bg-slate-500'>
                <span className="material-symbols-outlined text-[1em] text-white">
                  close
                </span>
              </button>
            </div>
            <div className='w-full h-[190px] flex flex-col justify-center items-center'>
              <h1 className='text-slate-200 font-semibold'>Tem certeza de que deseja remover este item?</h1>
              <button
                onClick={() => handle_remove_item()}
                className='w-[180px] rounded-md p-[12px] text-white font-bold bg-red-400 mt-[40px]'
              >
                Confirmar
              </button>
            </div>
          </div>
        </div >
      </ConditionalRender>
    </>
  );
}