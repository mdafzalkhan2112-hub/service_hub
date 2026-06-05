import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const professionals = [
  {
    id: 'ravi-kumar',
    name: 'Ravi Kumar',
    role: 'Electrician',
    rating: 4.9,
    image: '/worker-electrician.png',
    jobs: 320,
  },
  {
    id: 'mohit-sharma',
    name: 'Mohit Sharma',
    role: 'Plumber',
    rating: 4.8,
    image: '/worker-plumber.png',
    jobs: 280,
  },
  {
    id: 'amit-verma',
    name: 'Amit Verma',
    role: 'Carpenter',
    rating: 4.7,
    image: '/worker-carpenter.png',
    jobs: 210,
  },
];

export default function TopProfessionalsSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = (id: string) => {
    if (isAuthenticated) {
      navigate(`/professional/${id}`);
    } else {
      navigate(`/auth/member-login?redirect=/professional/${id}`);
    }
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFC', py: 10 }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              mb: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            Top Rated Professionals
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.05rem' }}>
            Verified experts trusted by thousands of customers
          </Typography>
        </Box>

        {/* Professional Cards */}
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {professionals.map((pro) => (
            <Grid key={pro.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1.5px solid #E2E8F0',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: '0 16px 48px rgba(37,99,235,0.12)',
                    transform: 'translateY(-6px)',
                    borderColor: '#BFDBFE',
                  },
                }}
              >
                {/* Worker Photo */}
                <Box
                  component="img"
                  src={pro.image}
                  alt={pro.name}
                  sx={{
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Card Content */}
                <Box sx={{ p: 3 }}>
                  {/* Name + Rating row */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.15rem', color: '#0F172A' }}>
                      {pro.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                      <StarIcon sx={{ color: '#F59E0B', fontSize: 18 }} />
                      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>
                        {pro.rating}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Role chip */}
                  <Chip
                    label={pro.role}
                    size="small"
                    sx={{
                      bgcolor: '#EFF6FF',
                      color: '#2563EB',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      mb: 2.5,
                      borderRadius: 1.5,
                    }}
                  />

                  {/* Jobs done */}
                  <Typography sx={{ color: '#94A3B8', fontSize: '0.82rem', mb: 2.5 }}>
                    {pro.jobs}+ jobs completed
                  </Typography>

                  {/* Book Now Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleBookNow(pro.id)}
                    startIcon={<CalendarMonthIcon />}
                    sx={{
                      py: 1.4,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                        boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
