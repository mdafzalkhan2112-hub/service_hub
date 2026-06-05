import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
  TextField,
  Paper,
  Grid,
  InputLabel,
  FormControl,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BuildIcon from '@mui/icons-material/Build';

const services = [
  { label: 'Electrician', icon: <FlashOnIcon sx={{ fontSize: 40, color: '#2563EB' }} />, color: '#EFF6FF' },
  { label: 'Plumbing', icon: <PlumbingIcon sx={{ fontSize: 40, color: '#2563EB' }} />, color: '#EFF6FF' },
  { label: 'Cleaning', icon: <CleaningServicesIcon sx={{ fontSize: 40, color: '#2563EB' }} />, color: '#EFF6FF' },
  { label: 'Painting', icon: <FormatPaintIcon sx={{ fontSize: 40, color: '#2563EB' }} />, color: '#EFF6FF' },
  { label: 'AC Repair', icon: <AcUnitIcon sx={{ fontSize: 40, color: '#2563EB' }} />, color: '#EFF6FF' },
  { label: 'Carpentry', icon: <BuildIcon sx={{ fontSize: 40, color: '#2563EB' }} />, color: '#EFF6FF' },
];

const serviceCategories = ['Electrician', 'Plumbing', 'Cleaning', 'Painting', 'AC Repair', 'Carpentry'];
const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'];

export default function SearchServicesSection() {
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const handleCategoryChange = (e: SelectChangeEvent) => setCategory(e.target.value);
  const handleCityChange = (e: SelectChangeEvent) => setCity(e.target.value);

  return (
    <Box sx={{ bgcolor: '#F8FAFC', pb: 8 }}>
      {/* ─── Search Bar (floating card) ─── */}
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            px: { xs: 3, md: 5 },
            py: { xs: 3, md: 4 },
            mt: { xs: -4, md: -5 },
            position: 'relative',
            zIndex: 10,
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
          }}
        >
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            {/* Service Category */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth size="medium">
                <InputLabel id="category-label">Service Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Service Category"
                  onChange={handleCategoryChange}
                  sx={{ borderRadius: 2 }}
                >
                  {serviceCategories.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* City */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <FormControl fullWidth size="medium">
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  value={city}
                  label="City"
                  onChange={handleCityChange}
                  sx={{ borderRadius: 2 }}
                >
                  {cities.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Pincode */}
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                fullWidth
                label="Pincode"
                variant="outlined"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                slotProps={{ htmlInput: { maxLength: 6 } }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
            </Grid>

            {/* Search Button */}
            <Grid size={{ xs: 12, sm: 2 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                sx={{
                  py: 1.85,
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
                  boxShadow: '0 6px 20px rgba(37,99,235,0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                    boxShadow: '0 8px 28px rgba(37,99,235,0.45)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* ─── Popular Services ─── */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, letterSpacing: '-0.01em' }}
          >
            Popular Services
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', fontSize: '1.05rem' }}>
            Choose from our most booked professional services
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {services.map((service) => (
            <Grid key={service.label} size={{ xs: 6, sm: 4, md: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                  bgcolor: '#fff',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 4,
                  py: 4,
                  px: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#2563EB',
                    boxShadow: '0 8px 32px rgba(37,99,235,0.15)',
                    transform: 'translateY(-4px)',
                    bgcolor: '#EFF6FF',
                  },
                }}
              >
                {service.icon}
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: '#1E293B',
                    textAlign: 'center',
                  }}
                >
                  {service.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
