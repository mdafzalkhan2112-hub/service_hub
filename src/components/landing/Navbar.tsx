import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Find Workers', href: '#staff' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [loginAnchorEl, setLoginAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginOpen = (e: React.MouseEvent<HTMLElement>) => setLoginAnchorEl(e.currentTarget);
  const handleLoginClose = () => setLoginAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box sx={{ width: 260 }} role="presentation">
      <Typography variant="h6" sx={{ p: 2, fontWeight: 700, color: 'primary.main' }}>
        Service Hub
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.href} onClick={() => setMobileOpen(false)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/auth/staff-login'); setMobileOpen(false); }}>
                <LoginIcon sx={{ mr: 1, fontSize: 18 }} />
                <ListItemText primary="Staff Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/auth/member-login'); setMobileOpen(false); }}>
                <LoginIcon sx={{ mr: 1, fontSize: 18 }} />
                <ListItemText primary="Member Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/auth/register'); setMobileOpen(false); }}>
                <PersonAddIcon sx={{ mr: 1, fontSize: 18 }} />
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate(user?.role === 'staff' ? '/staff' : '/member'); setMobileOpen(false); }}>
                <DashboardIcon sx={{ mr: 1, fontSize: 18, color: 'primary.main' }} />
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { logout(); setMobileOpen(false); }}>
                <LogoutIcon sx={{ mr: 1, fontSize: 18, color: 'error.main' }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 72 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                fontSize: '1.3rem',
                color: 'primary.main',
                textDecoration: 'none',
                flexShrink: 0,
                mr: 4,
              }}
            >
              Service Hub
            </Typography>

            {/* Desktop Nav Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
              {navLinks.map((item) => (
                <Button
                  key={item.label}
                  component="a"
                  href={item.href}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    px: 1.5,
                    '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
                  }}
                  disableRipple
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Desktop CTA Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, alignItems: 'center' }}>
              {!isAuthenticated ? (
                <>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={handleLoginOpen}
                    startIcon={<LoginIcon />}
                    sx={{
                      borderRadius: 2,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 600,
                      textTransform: 'none',
                      px: 2.5,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    component={Link}
                    to="/auth/register"
                    startIcon={<PersonAddIcon />}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      px: 2.5,
                      background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                      '&:hover': { background: 'linear-gradient(135deg, #1d4ed8, #1e40af)' },
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    size="medium"
                    component={Link}
                    to={user?.role === 'staff' ? '/staff' : '/member'}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      px: 2.5,
                      background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                      '&:hover': { background: 'linear-gradient(135deg, #1d4ed8, #1e40af)' },
                      mr: 1.5,
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={logout}
                    startIcon={<LogoutIcon />}
                    sx={{
                      borderRadius: 2,
                      borderColor: 'error.main',
                      color: 'error.main',
                      fontWeight: 600,
                      textTransform: 'none',
                      px: 2.5,
                      '&:hover': { borderColor: 'error.dark', backgroundColor: 'error.50' },
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Box>

            {/* Mobile Hamburger */}
            <IconButton
              sx={{ display: { md: 'none' }, ml: 'auto' }}
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Login Dropdown Menu */}
      <Menu
        anchorEl={loginAnchorEl}
        open={Boolean(loginAnchorEl)}
        onClose={handleLoginClose}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              mt: 1,
              borderRadius: 3,
              minWidth: 200,
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.06)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', letterSpacing: 1, textTransform: 'uppercase' }}>
            Login As
          </Typography>
        </Box>
        <MenuItem
          component={Link}
          to="/auth/member-login"
          onClick={handleLoginClose}
          sx={{ py: 1.5, px: 2, gap: 1.5, '&:hover': { backgroundColor: 'primary.50', color: 'primary.main' } }}
        >
          <PersonAddIcon fontSize="small" sx={{ color: 'primary.main' }} />
          <Typography sx={{ fontWeight: 500 }}>Member Login</Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to="/auth/staff-login"
          onClick={handleLoginClose}
          sx={{ py: 1.5, px: 2, gap: 1.5, mb: 0.5, '&:hover': { backgroundColor: 'info.50', color: 'info.main' } }}
        >
          <LoginIcon fontSize="small" sx={{ color: 'info.main' }} />
          <Typography sx={{ fontWeight: 500 }}>Staff Login</Typography>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
