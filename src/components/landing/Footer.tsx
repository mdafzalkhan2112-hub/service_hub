import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from 'react-router-dom';

const popularServices = [
  'Plumbing',
  'Electrical Repair',
  'Home Cleaning',
  'Carpentry',
  'Appliance Repair',
];

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Become a Worker', to: '/auth/member-login' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Privacy Policy', to: '#' },
  { label: 'Terms & Conditions', to: '#' },
];

const socialIcons = [
  { icon: <FacebookIcon fontSize="small" />, label: 'Facebook' },
  { icon: <TwitterIcon fontSize="small" />, label: 'Twitter' },
  { icon: <InstagramIcon fontSize="small" />, label: 'Instagram' },
  { icon: <LinkedInIcon fontSize="small" />, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <Box>
      {/* ── Main Footer ── */}
      <Box sx={{ bgcolor: '#0F172A', pt: 8, pb: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>

            {/* Col 1 — Brand */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: '#fff', mb: 2, fontSize: '1.3rem' }}
              >
                Service Hub
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, mb: 3, fontSize: '0.88rem' }}
              >
                Connecting customers with trusted professionals across India. Book verified
                electricians, plumbers, cleaners, carpenters, painters and more with confidence.
              </Typography>
              {/* Social Icons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialIcons.map((s) => (
                  <IconButton
                    key={s.label}
                    aria-label={s.label}
                    size="small"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      bgcolor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 2,
                      '&:hover': {
                        color: '#fff',
                        bgcolor: '#2563EB',
                        borderColor: '#2563EB',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    {s.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>

            {/* Col 2 — Popular Services */}
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#fff', mb: 2.5, fontSize: '0.95rem', letterSpacing: 0.3 }}
              >
                Popular Services
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {popularServices.map((service) => (
                  <Box component="li" key={service}>
                    <Link
                      href="#"
                      underline="none"
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        '&:hover': { color: '#60A5FA' },
                        transition: 'color 0.2s',
                      }}
                    >
                      <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#2563EB', flexShrink: 0 }} />
                      {service}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Col 3 — Quick Links */}
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#fff', mb: 2.5, fontSize: '0.95rem', letterSpacing: 0.3 }}
              >
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickLinks.map((link) => (
                  <Box component="li" key={link.label}>
                    <Link
                      component={RouterLink}
                      to={link.to}
                      underline="none"
                      sx={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        '&:hover': { color: '#60A5FA' },
                        transition: 'color 0.2s',
                      }}
                    >
                      <Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#2563EB', flexShrink: 0 }} />
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Col 4 — Contact */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: '#fff', mb: 2.5, fontSize: '0.95rem', letterSpacing: 0.3 }}
              >
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { icon: <LocationOnIcon sx={{ fontSize: 17, color: '#2563EB' }} />, text: 'Punjab, India' },
                  { icon: <PhoneIcon sx={{ fontSize: 17, color: '#2563EB' }} />, text: '+91 98765-43210' },
                  { icon: <EmailIcon sx={{ fontSize: 17, color: '#2563EB' }} />, text: 'support@servicehub.com' },
                ].map((item) => (
                  <Box key={item.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                      p: 0.8, bgcolor: 'rgba(37,99,235,0.12)', borderRadius: 1.5,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem' }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* ── Bottom Bar ── */}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mt: 6, mb: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
              © {new Date().getFullYear()} Service Hub. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '0.82rem',
                    '&:hover': { color: '#60A5FA' },
                    transition: 'color 0.2s',
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
