const CardComp = ({ idx, name, job, onBtnClick }) => {
  return (
    <div className="card" onClick={() => onBtnClick(idx)}>
      <div className="name">이름 : {name}</div>
      <div className="job">직업 : {job}</div>
    </div>
  );
};

export default CardComp;
