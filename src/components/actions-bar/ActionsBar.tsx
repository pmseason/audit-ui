import { getClosedRoleAuditTasks, createClosedRoleAudit, startClosedRoleAudit } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React from 'react';
import { setLoading, setClosedRoleTasks, clearSelection } from '@/store/auditSlice';
import { Button } from '../ui/button';

export const ActionsBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedTasks } = useAppSelector((state) => state.audit);

  const handleNewAudit = async () => {
    dispatch(setLoading(true));
    try {
      await createClosedRoleAudit();
      const tasks = await getClosedRoleAuditTasks();
      dispatch(setClosedRoleTasks(tasks));
      dispatch(clearSelection());
    } catch (error) {
      console.error('Error starting audit:', error);
      // You might want to show an error toast here
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleStartAudit = async () => {
    if (selectedTasks.length === 0) return;
    
    dispatch(setLoading(true));
    try {
      await startClosedRoleAudit(selectedTasks);
      const tasks = await getClosedRoleAuditTasks();
      dispatch(setClosedRoleTasks(tasks));
      dispatch(clearSelection());
    } catch (error) {
      console.error('Error starting audit:', error);
      // You might want to show an error toast here
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white shadow-sm">
      <Button
        onClick={handleNewAudit}
        variant="default"
        className='cursor-pointer'
      >
        New Audit
      </Button>
      <Button
        onClick={handleStartAudit}
        variant="default"
        className="bg-green-600 hover:bg-green-700"
        disabled={selectedTasks.length === 0}
      >
        Start Audit ({selectedTasks.length})
      </Button>
    </div>
  );
}; 