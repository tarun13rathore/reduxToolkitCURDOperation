# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#   r e d u x T o o l k i t C U R D O p e r a t i o n 
 
 #   r e d u x T o o l k i t C U R D O p e r a t i o n 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk(
  "createTask",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://657fc2666ae0629a3f53998c.mockapi.io/api/curd",
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

//read
export const readTask = createAsyncThunk(
  "readTask",
  async ({ rejectWithValue }) => {
    try {
        const response = await fetch(
            "https://657fc2666ae0629a3f53998c.mockapi.io/api/curd"
          ); 
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//update
export const updateTask = createAsyncThunk(
  "updateTask",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://657fc2666ae0629a3f53998c.mockapi.io/api/curd/${data.id}`,
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
//delete
export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (id, { rejectWithValue }) => {
    

    try {
        const response = await fetch(
            `https://657fc2666ae0629a3f53998c.mockapi.io/api/curd/${id}`,
            {
              method: "delete",
            }
          );
      const res = await response.json();

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const taskSlice = createSlice({
  name: "userDetails",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },


  extraReducers: (builder) => {
    //create
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
        console.log()
      state.loading = false;
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    //read
    builder.addCase(readTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readTask.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
    });
    builder.addCase(readTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    //delete
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((i) => i.id !== id);
      }
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
    //update
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map(
        (i) => (i.id = action.payload.id ? action.payload : i)
      );
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // [createUser.pending]: (state) => {
    //   state.loading = true;
    // },
    // [createUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.users.push(action.payload);
    // },
    // [createUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export const { searchUser } = taskSlice.actions;

export default taskSlice.reducer;

 
 
