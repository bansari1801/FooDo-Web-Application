//Author - Karan Rathore kr202401@dal.ca
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import * as React from 'react';
import './styles/StaffActionBar.css';

export function StaffActionBar({ onAction }) {
  const onAddStaffButtonClick = () => {
    onAction('addStaff');
  };

  return (
    <>
      <div className="staffActionBar">
        <Button variant="outlined" startIcon={<AddIcon />} size="large" onClick={onAddStaffButtonClick}>
          Add
        </Button>

        <Button sx={{ marginLeft: 2 }} variant="outlined" startIcon={<RefreshIcon />} size="large">
          Refresh
        </Button>
      </div>
    </>
  );
}

export default StaffActionBar;
