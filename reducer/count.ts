export const COUNT_PLUS = 'COUNT_PLUS' as const;
export const COUNT_MINUS = 'COUNT_MINUS' as const;

export const countPlusAction = () => ({
  type: COUNT_PLUS
});

export const countMinusAction = () => ({
  type: COUNT_MINUS
});

export type CounterState = {
  count: number;
};

export type CounterAction =
  | ReturnType<typeof countPlusAction>
  | ReturnType<typeof countMinusAction>;

export const initialState: CounterState = {
  count: 0
};

const reducer = (state: CounterState = initialState, action: CounterAction) => {
  switch (action.type) {
    case COUNT_PLUS:
      return { count: state.count + 1 };
    case COUNT_MINUS:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default reducer;
