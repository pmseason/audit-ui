import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClosedRoleAuditTask, OpenRoleAuditTask } from '../types/audit';

interface AuditState {
  isLoading: boolean;
  closedRoleTasks: ClosedRoleAuditTask[];
  openRoleTasks: OpenRoleAuditTask[];
  selectedClosedRoleTasks: number[];
  selectedOpenRoleTasks: number[];
}

const initialState: AuditState = {
  isLoading: false,
  closedRoleTasks: [],
  openRoleTasks: [],
  selectedClosedRoleTasks: [],
  selectedOpenRoleTasks: [],
};

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setClosedRoleTasks: (state, action: PayloadAction<ClosedRoleAuditTask[]>) => {
      state.closedRoleTasks = action.payload.sort((a, b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
    },
    setOpenRoleTasks: (state, action: PayloadAction<OpenRoleAuditTask[]>) => {
      state.openRoleTasks = action.payload;
    },
    clearClosedRoleSelection: (state) => {
      state.selectedClosedRoleTasks = [];
    },
    clearOpenRoleSelection: (state) => {
      state.selectedOpenRoleTasks = [];
    },
    selectAllClosedRoleTasks: (state) => {
      state.selectedClosedRoleTasks = state.closedRoleTasks.map((task) => task.id);
    },
    selectAllOpenRoleTasks: (state) => {
      state.selectedOpenRoleTasks = state.openRoleTasks.map((task) => task.id);
    },
    toggleClosedRoleTaskSelection: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const index = state.selectedClosedRoleTasks.indexOf(taskId);
      if (index === -1) {
        state.selectedClosedRoleTasks.push(taskId);
      } else {
        state.selectedClosedRoleTasks.splice(index, 1);
      }
    },
    toggleOpenRoleTaskSelection: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const index = state.selectedOpenRoleTasks.indexOf(taskId);
      if (index === -1) {
        state.selectedOpenRoleTasks.push(taskId);
      } else {
        state.selectedOpenRoleTasks.splice(index, 1);
      }
    },
  },
});

export const {
  setLoading,
  setClosedRoleTasks,
  setOpenRoleTasks,
  clearClosedRoleSelection,
  clearOpenRoleSelection,
  selectAllClosedRoleTasks,
  selectAllOpenRoleTasks,
  toggleClosedRoleTaskSelection,
  toggleOpenRoleTaskSelection,
} = auditSlice.actions;

export default auditSlice.reducer; 