import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {jwtDecode} from "jwt-decode";
import {ip} from "../../utils/consts";


export const getToken = createAsyncThunk("security/getCookies",
    async () => {
        return localStorage.getItem('token');
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (payload, thunkAPI) => {

        try {
            const res = await axios.post(
                `${ip}/user/registration`,
                payload
            )
            localStorage.setItem('token', res.data.token)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const authUser = createAsyncThunk(
    'auth/authUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(
                `${ip}/user/login`,
                payload
            )

            localStorage.setItem('token', res.data.token)
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const updateToken = createAsyncThunk(
    'auth/updateToken',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(
                `${ip}/user/auth`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )
            localStorage.setItem('token', res.data.token)
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getCurUser = createAsyncThunk(
    'auth/getCurUser',
    async (token, thunkAPI) => {

        try {
            const decoded = jwtDecode(token)
            const res = await axios.get(
                `${ip}/user/${decoded.id}`,
            )
            localStorage.setItem('user', JSON.stringify(res.data))
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: "",
        success: false,
        curStoreId: null
    },
    reducers: {
        initCurStore: (state) => {
            state.curStoreId = JSON.parse(localStorage.getItem("curStoreId"))
        },
        setCurStore: (state, action) => {
            state.curStoreId = action.payload
            localStorage.setItem("curStoreId", JSON.stringify(action.payload))
        },
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("curStoreId")
            state.user = null
            state.token = null
            state.loading = false
            state.success = false
            state.error = ""
            state.curStoreId = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(authUser.pending, (state) => {
                state.loading = true
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(authUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(updateToken.pending, (state) => {
                state.loading = true
            })
            .addCase(updateToken.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(updateToken.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
            .addCase(getCurUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.success = true
                state.error = ""
            })
            .addCase(getCurUser.rejected, (state, action) => {
                state.user = null
                state.token = null
                state.loading = false
                state.success = false
                state.error = action.payload
            })
    }
});

export const selectToken = (state) => state.auth.token

export const selectStatus = (state) => state.auth.loading

export const selectSuccess = (state) => state.auth.success

export const selectUser = (state) => state.auth.user

export const selectUserError = (state) => state.auth.error

export const selectCurStore = (state) => state.auth.curStoreId

export const authReducer = authSlice.reducer

export const {logout, initCurStore, setCurStore} = authSlice.actions