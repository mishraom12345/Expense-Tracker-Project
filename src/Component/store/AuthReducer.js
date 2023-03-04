import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLogin:false,
    idToken:localStorage.getItem('idToken')
}

const authslice = createSlice({
    name:'authentication',
    initialState:initialState,
    reducers:{
        Login(state,action){
            localStorage.setItem('idToken',action.payload)
            state.isLogin=true
            state.idToken = action.payload
        },
        Logout(state){
            localStorage.removeItem('idToken')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('email')
            state.isLogin = false
            state.idToken =null
        }

    }

})

const initialState2 = {
    showDarkTheme:false
}

const darkslice = createSlice({
    name:'dark',
    initialState:initialState2,
    reducers:{
        showDark(state){
            state.showDarkTheme = !state.showDarkTheme
        }
    }
})

const initialValues = {
    expenses: [],
    total: 0,
  };
  
  const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState: initialValues,
    reducers: {
      setexpenses(state, action) {
        state.expenses = action.payload;
        state.total = action.payload
      },
    },
  });
  
export const expensesActions = expensesSlice.actions;

export const darkAction = darkslice.actions

const store = configureStore({
    reducer:{authAction:authslice.reducer,dark:darkslice.reducer,expense:expensesSlice.reducer}
})

export const authAction = authslice.actions

export default store

