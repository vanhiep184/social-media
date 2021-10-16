import React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/system';

export default function Layout({ children }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        maxWidth: theme.breakpoints.values.lg,
        margin: '0 auto',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Box
            sx={{
              height: '100vh',
              margin: '0 1rem',
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
