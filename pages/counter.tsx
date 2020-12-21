import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';
import { countMinusAction, countPlusAction } from '../reducer/count';

const CounterPage = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state: RootState) => {
    return state.count;
  });

  return (
    <>
      <div>카운트 : {count}</div>
      <button onClick={() => dispatch(countPlusAction())}>+</button>
      <button onClick={() => dispatch(countMinusAction())}>-</button>
    </>
  );
};

export default CounterPage;
