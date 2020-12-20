import React, { MouseEvent } from 'react';

const CardComp = React.memo(
  ({
    id,
    name,
    email,
    website,
    onLButtonClick,
    onRButtonClick
  }: {
    id: number;
    name: string;
    email: string;
    website: string;
    onLButtonClick: (
      e: MouseEvent<HTMLDivElement, MouseEvent>,
      index: number
    ) => void;
    onRButtonClick: (
      e: MouseEvent<HTMLDivElement, MouseEvent>,
      index: number
    ) => void;
  }) => {
    return (
      <div
        className="card"
        onClick={e => onLButtonClick(e, id)}
        onContextMenu={e => onRButtonClick(e, id)}
      >
        <div className={'item'}>
          <label>Name:</label>
          <div className={'item-text'}>{name}</div>
        </div>

        <div className={'item'}>
          <label>E-mail:</label>
          <div className={'item-text'}>{email}</div>
        </div>

        <div className={'item'}>
          <label>Website:</label>
          <div className={'item-text'}>{website}</div>
        </div>
      </div>
    );
  }
);

export default React.memo(CardComp);
