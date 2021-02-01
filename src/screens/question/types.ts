
export type State = {
    questions: Question[] | void;
    status: "idle" | "done" | "loading" | "failed";
    currentIndex: number|void;
    answers: (string|void)[];
    error: string | undefined;
};
export type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[]
}