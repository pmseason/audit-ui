import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClosedRoleAuditTask, OpenRoleAuditTask, ScrapedPosition } from '../types/audit';

interface AuditState {
  isLoading: boolean;
  closedRoleTasks: ClosedRoleAuditTask[];
  openRoleTasks: OpenRoleAuditTask[];
  scrapedPositions: ScrapedPosition[];
}

const initialState: AuditState = {
  isLoading: false,
  closedRoleTasks: [],
  openRoleTasks: [],
  scrapedPositions: [],
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
    setScrapedPositions: (state, action: PayloadAction<ScrapedPosition[]>) => {
      state.scrapedPositions = action.payload;
    },
  },
});

export const {
  setLoading,
  setClosedRoleTasks,
  setOpenRoleTasks,
  setScrapedPositions,
} = auditSlice.actions;

export default auditSlice.reducer; 