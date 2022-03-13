import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../Axios'

export const fetchProductTypes = createAsyncThunk('ProductTyes/fetchCart', async () => {
    const response = await Axios.get('/home').then(res => res.data)
    return response
})
export const ProductTypesrSlice = createSlice({
    name: 'types',
    initialState: {
        typesInfo: [],
        error: '',
        loding: false,
    },
    reducers: {
        SetProductTypes: (state, action) => {
            state.typesInfo = action.payload;
        }
    },
    extraReducers: {
        [fetchProductTypes.fulfilled]: (state, action) => {
            state.loding = false
            state.ProductTypesInfo = action.payload.types

        },
        [fetchProductTypes.pending]: (state, action) => {
            state.loding = true

        },
        [fetchProductTypes.rejected]: (state, action) => {
            state.error = action.error
            state.loding = false

        }

    }
})
export const { SetProductTypes } = ProductTypesrSlice.actions
export default ProductTypesrSlice.reducer;