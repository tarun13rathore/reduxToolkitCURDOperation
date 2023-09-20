import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://64f1d0610e1e60602d244fde.mockapi.io/curd",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    try {
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Read Action
export const showList = createAsyncThunk(
  "userList",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://64f1d0610e1e60602d244fde.mockapi.io/curd"
    );

    try {
      const res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete Action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://64f1d0610e1e60602d244fde.mockapi.io/curd/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      const res = await response.json();
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://64f1d0610e1e60602d244fde.mockapi.io/curd/${data.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    try {
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },
  //create
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //read
    [showList.pending]: (state) => {
      state.loading = true;
    },
    [showList.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //delete
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((i) => i.id !== id);
      }
      console.log(action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //update
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      // state.users.push(action.payload);
      state.users = state.users.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

// this is for configureStore
export default userDetailsSlice.reducer;

// this is for dispatch
export const { searchUser } = userDetailsSlice.actions;
