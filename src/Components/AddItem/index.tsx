import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormItem, ItemDataStruct } from '../../Dtos';
import { useStore } from '../../Hooks/useStore';
import { CurrencyInput } from 'react-currency-mask';

type PropsType = {
  close_modal: React.Dispatch<React.SetStateAction<boolean>>,
  data_to_update?: ItemDataStruct
}

export const AddItem: React.FC<PropsType> = (props) => {

  const { register, handleSubmit, setValue } = useForm<FormItem>();

  const { save, update } = useStore();

  const upload_data = handleSubmit(form => {

    if (props.data_to_update)
      update({ ...form, item_id: props.data_to_update.item_id })

    if (!props.data_to_update)
      save({ ...form });

    props.close_modal(false);

  });

  useEffect(() => {

    if (props.data_to_update) {

      setValue('item_amount', props.data_to_update.item_amount);
      setValue('item_name', props.data_to_update.item_name);
      setValue('item_price', props.data_to_update.item_price);

    }

  }, [])

  return (
    <div className='fixed w-full px-[20px] top-0 left-0 h-[100vh] flex justify-center items-center bg-[#0e14227a] backdrop-blur-sm'>
      <div className='w-full rounded-md min-h-[200px] bg-slate-700 shadow-md'>
        <div className='w-full p-[10px] flex justify-between items-center border-b-[1px] border-b-slate-500'>
          <h1 className='flex justify-start items-center text-slate-300 font-bold'>
            <span className="material-symbols-outlined mr-[5px]">
              {props.data_to_update ? 'edit' : 'add'}
            </span>
            {props.data_to_update ? 'Atualizar item' : 'Adicionar item'}
          </h1>
          <button onClick={() => { props.close_modal(false) }} className='w-[40px] h-[40px] rounded-[50px] flex justify-center items-center bg-slate-500'>
            <span className="material-symbols-outlined text-[1em] text-white">
              close
            </span>
          </button>
        </div>
        <form className='w-full py-[15px] p-[10px] flex flex-col justify-start items-center' onSubmit={upload_data}>
          <div className='w-full flex flex-col justify-start items-center mb-[15px]'>
            <label className='w-full text-slate-200 font-semibold mb-[5px]'>Nome do item: </label>
            <input
              type="text"
              {...register('item_name')}
              className='w-full p-[12px] rounded-md bg-slate-600 border-[1px] border-slate-500 outline-none text-white'
              placeholder='Ex: Macarrão'
            />
          </div>
          <div className='w-full grid grid-cols-2 gap-[10px]'>
            <div className='w-full flex flex-col justify-start items-center mb-[15px]'>
              <label className='w-full text-slate-200 font-semibold mb-[5px]'>Quantidade: </label>
              <input
                type="number"
                {...register('item_amount')}
                className='w-full p-[12px] rounded-md bg-slate-600 border-[1px] border-slate-500 outline-none text-white'
                placeholder='Ex: 3'
              />
            </div>
            <div className='w-full flex flex-col justify-start items-center mb-[15px]'>
              <label className='w-full text-slate-200 font-semibold mb-[5px]'>Preço: </label>
              <CurrencyInput
                defaultValue={props.data_to_update?.item_price || ''}
                onChangeValue={(_, __, val) => {
                  setValue('item_price', val as string);
                }}
                InputElement={
                  <input
                    type="text"
                    {...register('item_price')}
                    className='w-full p-[12px] rounded-md bg-slate-600 border-[1px] border-slate-500 outline-none text-white'
                    placeholder='Ex: Macarrão'
                  />
                }
              />
            </div>
          </div>
          <button className='w-full p-[12px] rounded-md bg-blue-500 font-bold text-white' type='submit'>
            {props.data_to_update ? 'Atualizar item' : 'Adicionar item'}
          </button>
        </form>
      </div>
    </div >
  );
}