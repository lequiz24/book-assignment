import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MenuBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
     
        <img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="Logo"
          style={{ height: '40px', marginRight: '10px' }}
        />
        
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
