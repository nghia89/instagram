import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const App = createSlice({
    name: "message",
    initialState: {
        message: "Initial message"
    },
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            state.message = action.payload
        }
    }
})

export const { setMessage } = App.actions
export default App.reducer