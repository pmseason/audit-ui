import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClosedRoleAuditTask } from '../types/audit';

interface AuditState {
  isLoading: boolean;
  closedRoleTasks: ClosedRoleAuditTask[];
  selectedTasks: number[];
}

const initialState: AuditState = {
  isLoading: false,
  closedRoleTasks: [],
  selectedTasks: [],
};

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setClosedRoleTasks: (state, action: PayloadAction<ClosedRoleAuditTask[]>) => {
      state.closedRoleTasks = action.payload;
    },
    setSelectedTasks: (state, action: PayloadAction<number[]>) => {
      state.selectedTasks = action.payload;
    },
    clearSelection: (state) => {
      state.selectedTasks = [];
    },
    selectAllTasks: (state) => {
      state.selectedTasks = state.closedRoleTasks.map((task) => task.id);
    },
    toggleTaskSelection: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const index = state.selectedTasks.indexOf(taskId);
      if (index === -1) {
        state.selectedTasks.push(taskId);
      } else {
        state.selectedTasks.splice(index, 1);
      }
    },
  },
});

export const {
  setLoading,
  setClosedRoleTasks,
  setSelectedTasks,
  toggleTaskSelection,
  clearSelection,
  selectAllTasks,
} = auditSlice.actions;

export default auditSlice.reducer; 