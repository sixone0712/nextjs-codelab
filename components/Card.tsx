const CardComp = ({ id, name, email, website, onBtnClick }) => {
  return (
    <div className="card" onClick={() => onBtnClick(id)}>
      <div className={'item'}>
        <label>Name:</label>
        <div>{name}</div>
      </div>

      <div className={'item'}>
        <label>E-mail:</label>
        <div>{email}</div>
      </div>

      <div className={'item'}>
        <label>Website:</label>
        <div>{website}</div>
      </div>
    </div>
  );
};

export default CardComp;
