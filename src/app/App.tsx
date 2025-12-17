// src/components/App.tsx (или где у тебя App)
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from '@mui/icons-material/Menu';
import CatalogPage from '../pages/CatalogPage';
import SocialMediaLinks from '../widgets/SocialMediaLinks';

const App: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);



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
            sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 700 }}
          >
            Product Catalog
          </Typography>

        </Toolbar>
      </AppBar>



      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
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
            Contacts
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: "center",
            py: 2
          }}>

            <SocialMediaLinks />
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Product Catalog. Modern interface with Material UI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
