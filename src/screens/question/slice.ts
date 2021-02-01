import { getQuestion } from "../../services/getQuestions";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, State } from "./types";


const initialState: State = {
  questions: [],
  status: "idle",
  currentIndex: 0,
  answers: [],
  error: "",
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetch",
  async () => {
    const questions = await getQuestion();
    return questions;
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    resetStatus: (state: State, action: any): void => {
      state.status = "idle";
    },
    setCurrentIndex: (state: State, action: any): void => {
      state.currentIndex = action.payload
    },
    addAnswers: (state: State, action: any): void => {
      state.answers[action.payload.index] = action.payload.answer
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchQuestions.fulfilled,
      (state: State, action: PayloadAction) => {
        state.questions = action.payload;
        state.currentIndex = 0
        state.answers = []
        state.status = "done";
      }
    ),
      builder.addCase(fetchQuestions.pending, (state: State, action: any) => {
        state.status = "loading";
      });
    builder.addCase(fetchQuestions.rejected, (state: State, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const answersSelector = (state: any): string[] => state.questions.answers || []
export const currentIndexSelector = (state: any): number => state.questions.currentIndex
export const questionsSelector = (state: any) => state.questions.questions
export const currentAnswerSelector = (state: any): string => state.questions.answers[state.questions.currentIndex] || ''
export const questionSelector = (state: any): Question => state.questions.questions[state.questions.currentIndex] || {}
export const passedQuestionsSelector = (state: any) => {
  const questions: Question[] = state.questions.questions
  const passed = questions.filter((ele, index) => ele.correct_answer === state.questions.answers[index])
  return passed.length
}
export const numberOfQuestions = (state: any): number => state.questions.questions.length
export const { resetStatus, setCurrentIndex, addAnswers } = questionSlice.actions;

export default questionSlice.reducer;
