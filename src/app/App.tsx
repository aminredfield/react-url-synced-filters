import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CatalogPage from '../pages/CatalogPage';

/**
 * Корневой компонент приложения с маршрутизацией и AppBar.
 * AppBar обеспечивает единый заголовок на всех страницах.
 */
const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <StorefrontIcon sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 700,
            }}
          >
            Product Catalog
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1, 
          py: 4,
        }}
      >
        <Routes>
          <Route path="/" element={<CatalogPage />} />
        </Routes>
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Product Catalog. Современный интерфейс с Material UI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
