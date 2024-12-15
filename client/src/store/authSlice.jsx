import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        isAuthenticated : false,
    },
    reducers :{
        addLoggedInUser: (state, action)=>{
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        removeUser : (state)=>{
            state.user = null;
            state.isAuthenticated = false;
        }

    }

});

export const {addLoggedInUser , removeUser } = authSlice.actions;
export default authSlice.reducer;