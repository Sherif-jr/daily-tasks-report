import { EmployeeWithTasks } from "@/interfaces/employee.interface";
import Task from "@/interfaces/task.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CacheState {
  employees: EmployeeWithTasks[] | null;
  tasks: Task[] | null;
}

export const INITIAL_STATE: CacheState = {
  employees: null,
  tasks: null,
};
type CacheDataPayloadAction<T extends keyof CacheState> = PayloadAction<{
  key: T;
  data: CacheState[T];
}>;

const cacheSlice = createSlice({
  name: "cache",
  initialState: INITIAL_STATE,
  reducers: {
    cacheData: <T extends keyof CacheState>(
      state: CacheState,
      action: CacheDataPayloadAction<T>
    ) => {
      state[action.payload.key] = action.payload.data;
    },
  },
});

export const { cacheData } = cacheSlice.actions;
const cacheReducer = cacheSlice.reducer;
export default cacheReducer;
