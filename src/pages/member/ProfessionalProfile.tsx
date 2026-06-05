import { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from '../../components/landing/Navbar';
import { useAuth } from '../../context/AuthContext';

// Mock data (in a real app, this would be fetched from an API based on the ID)
const professionalData: Record<string, any> = {
  'ravi-kumar': {
    name: 'Ravi Kumar',
    role: 'Electrician',
    rating: 4.9,
    reviews: 145,
    image: '/worker-electrician.png',
    jobs: 320,
    about: 'Experienced electrician with over 8 years of field work. Specializes in residential wiring, appliance installation, and troubleshooting complex electrical faults.',
    services: [
      'Switch & Socket Repair',
      'Fan Installation',
      'Wiring & Grounding',
      'MCB & Inverter Setup',
    ],
  },
  'mohit-sharma': {
    name: 'Mohit Sharma',
    role: 'Plumber',
    rating: 4.8,
    reviews: 98,
    image: '/worker-plumber.png',
    jobs: 280,
    about: 'Expert plumber handling all kinds of pipe leaks, water heater installations, and bathroom fittings. Known for quick response and clean work.',
    services: [
      'Leak Repairs',
      'Tap & Shower Fitting',
      'Geyser Installation',
      'Drain Cleaning',
    ],
  },
  'amit-verma': {
    name: 'Amit Verma',
    role: 'Carpenter',
    rating: 4.7,
    reviews: 112,
    image: '/worker-carpenter.png',
    jobs: 210,
    about: 'Skilled carpenter for custom furniture making, door/window repairs, and modular kitchen setups. Delivers high-quality woodwork with precision.',
    services: [
      'Furniture Repair',
      'Door Lock Change',
      'Bed Assembly',
      'Custom Woodwork',
    ],
  },
};

const dates = ['Today, 5 Jun', 'Tomorrow, 6 Jun', 'Thu, 7 Jun'];
const timeSlots = ['10:00 AM', '12:00 PM', '02:30 PM', '05:00 PM'];

export default function ProfessionalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  const pro = id ? professionalData[id] : null;

  if (!pro) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC' }}>
        <Navbar />
        <Container sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h5">Professional not found</Typography>
          <Button component={RouterLink} to="/" sx={{ mt: 2 }}>Back to Home</Button>
        </Container>
      </Box>
    );
  }

  const handleBooking = () => {
    const booking = {
      id: `book-${Date.now()}`,
      memberEmail: user?.email || 'member@example.com',
      memberName: user?.name || 'Demo Member',
      workerId: id,
      workerName: pro.name,
      workerRole: pro.role,
      date: selectedDate,
      time: selectedTime,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const savedBookingsStr = localStorage.getItem('service_hub_bookings');
    let savedBookings = [];
    if (savedBookingsStr) {
      try {
        savedBookings = JSON.parse(savedBookingsStr);
      } catch (e) {
        savedBookings = [];
      }
    }
    savedBookings.push(booking);
    localStorage.setItem('service_hub_bookings', JSON.stringify(savedBookings));

    alert(`Booking confirmed with ${pro.name} on ${selectedDate} at ${selectedTime}!`);
    navigate('/member');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Button 
          component={RouterLink} 
          to="/" 
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4, color: '#64748B', textTransform: 'none', fontWeight: 600 }}
        >
          Back
        </Button>

        <Grid container spacing={4}>
          {/* Left Column: Profile Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #E2E8F0', mb: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, alignItems: { xs: 'center', sm: 'flex-start' } }}>
                <Avatar 
                  src={pro.image} 
                  alt={pro.name}
                  sx={{ width: 140, height: 140, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                />
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
                    {pro.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 2 }}>
                    <Chip 
                      label={pro.role} 
                      sx={{ bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600 }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                      <Typography sx={{ fontWeight: 700, color: '#0F172A' }}>{pro.rating}</Typography>
                      <Typography sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>({pro.reviews} reviews)</Typography>
                    </Box>
                  </Box>
                  
                  <Typography sx={{ color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <CheckCircleIcon fontSize="small" /> Background Verified
                  </Typography>
                  <Typography sx={{ color: '#64748B', mt: 1 }}>
                    {pro.jobs}+ jobs completed successfully
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}>
                About
              </Typography>
              <Typography sx={{ color: '#475569', lineHeight: 1.7 }}>
                {pro.about}
              </Typography>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#0F172A' }}>
                Services Offered
              </Typography>
              <List sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                {pro.services.map((service: string) => (
                  <ListItem key={service} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <BuildIcon sx={{ color: '#2563EB', fontSize: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary={service} slotProps={{ primary: { sx: { color: '#475569', fontWeight: 500 } } }} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Right Column: Booking Widget */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #E2E8F0', position: 'sticky', top: 24 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#0F172A' }}>
                Book Appointment
              </Typography>

              {/* Date Selection */}
              <Typography sx={{ fontWeight: 600, color: '#475569', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon fontSize="small" /> Select Date
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
                {dates.map((date) => (
                  <Chip
                    key={date}
                    label={date}
                    onClick={() => setSelectedDate(date)}
                    sx={{
                      bgcolor: selectedDate === date ? '#2563EB' : '#F1F5F9',
                      color: selectedDate === date ? '#fff' : '#475569',
                      fontWeight: selectedDate === date ? 600 : 500,
                      borderRadius: 2,
                      py: 2,
                      '&:hover': { bgcolor: selectedDate === date ? '#1d4ed8' : '#E2E8F0' },
                    }}
                  />
                ))}
              </Box>

              {/* Time Selection */}
              <Typography sx={{ fontWeight: 600, color: '#475569', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon fontSize="small" /> Select Time
              </Typography>
              <Grid container spacing={1} sx={{ mb: 4 }}>
                {timeSlots.map((time) => (
                  <Grid size={{ xs: 6 }} key={time}>
                    <Button
                      fullWidth
                      variant={selectedTime === time ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTime(time)}
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        borderColor: selectedTime === time ? 'transparent' : '#E2E8F0',
                        color: selectedTime === time ? '#fff' : '#475569',
                        boxShadow: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: selectedTime === time ? '#1d4ed8' : '#F1F5F9',
                          borderColor: selectedTime === time ? 'transparent' : '#E2E8F0',
                        }
                      }}
                    >
                      {time}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              {/* Action Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleBooking}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                    boxShadow: '0 12px 32px rgba(37,99,235,0.35)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s',
                }}
              >
                Confirm Booking
              </Button>
              <Typography sx={{ textAlign: 'center', mt: 2, color: '#94A3B8', fontSize: '0.85rem' }}>
                You won't be charged yet
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
