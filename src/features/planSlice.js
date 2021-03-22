import { createSlice } from '@reduxjs/toolkit';

export const planSlice = createSlice({
  name: 'plan',
  initialState: {
    plan: null,
  },
  reducers: {

    //These actions we have => login/logout
    buy:(state, action)=>{
      state.plan = action.payload;
      }

    // logout:(state) =>{
    //     state.user = null;
    //   }
  
    },
});

export const { buy } = planSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPlan = state => state.plan.plan;

export default planSlice.reducer;
