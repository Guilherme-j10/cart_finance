import React from 'react';

type PropsType = {
  condition: any
  children: React.ReactNode
}

export const ConditionalRender: React.FC <PropsType> = (props) => {
  return(
    <>
      {props.condition ? props.children : false}
    </>
  );
}