import questionSlice from "../screens/question/slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    questions: questionSlice,
  },
});

export default store