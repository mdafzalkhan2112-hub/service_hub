import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <Box
      id="hero"
      sx={{
        background: 'linear-gradient(135deg, #1a56db 0%, #1e3a8a 60%, #0e7490 100%)',
        minHeight: { xs: '90vh', md: '82vh' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 0 },
        pb: { xs: 8, md: 0 },
      }}
    >
      {/* Background decorative circles */}
      <Box sx={{
        position: 'absolute', top: '-15%', right: '-5%',
        width: 420, height: 420,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: '-20%', left: '-8%',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 6, md: 4 },
          }}
        >
          {/* Left: Text Content */}
          <Box sx={{ flex: 1 }}>


            {/* Heading */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.1,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              Find Verified
              <br />
              Service Workers
              <br />
              Near You
            </Typography>

            {/* Sub text */}
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                maxWidth: 440,
                lineHeight: 1.7,
                mb: 5,
              }}
            >
              Book trusted electricians, plumbers, cleaners, carpenters and more in just a few clicks.
            </Typography>

            {/* CTA Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                component={Link}
                to="/auth/member-login"
                sx={{
                  backgroundColor: '#fff',
                  color: '#1a56db',
                  fontWeight: 700,
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  '&:hover': {
                    backgroundColor: '#f0f6ff',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Find Workers
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<WorkIcon />}
                component={Link}
                to="/auth/member-login"
                sx={{
                  borderColor: 'rgba(255,255,255,0.6)',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  backdropFilter: 'blur(6px)',
                  '&:hover': {
                    borderColor: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Become a Worker
              </Button>
            </Stack>


          </Box>

          {/* Right: Hero Image */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src="/hero-worker.png"
              alt="Service worker cleaning a window"
              sx={{
                width: '100%',
                maxWidth: { xs: 320, md: 480 },
                height: { xs: 280, md: 420 },
                objectFit: 'cover',
                borderRadius: 5,
                boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
                border: '3px solid rgba(255,255,255,0.2)',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
