import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PaymentsIcon from '@mui/icons-material/Payments';

const features = [
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 36 }} />,
    title: 'Verified Workers',
    desc: 'Every professional undergoes thorough background checks and skill verification before joining our platform.',
    color: '#10B981',
    bg: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
    iconColor: '#059669',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 36 }} />,
    title: 'Trusted by Thousands',
    desc: 'Over 50,000 happy customers across India rely on Service Hub for their daily service needs.',
    color: '#2563EB',
    bg: 'linear-gradient(135deg, #DBEAFE, #BFDBFE)',
    iconColor: '#1D4ED8',
  },
  {
    icon: <PublicIcon sx={{ fontSize: 36 }} />,
    title: 'Pan India Coverage',
    desc: 'Available in 150+ cities, towns, and rural areas — bringing quality services to your doorstep.',
    color: '#DC2626',
    bg: 'linear-gradient(135deg, #FEE2E2, #FECACA)',
    iconColor: '#B91C1C',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 36 }} />,
    title: 'Fast Response',
    desc: 'Get a confirmed booking in under 2 minutes. Our workers are always ready to serve you quickly.',
    color: '#D97706',
    bg: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
    iconColor: '#B45309',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 36 }} />,
    title: '24/7 Support',
    desc: 'Our dedicated customer support team is available round the clock to resolve any issue instantly.',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
    iconColor: '#6D28D9',
  },
  {
    icon: <PaymentsIcon sx={{ fontSize: 36 }} />,
    title: 'Secure Payments',
    desc: 'Pay only after the job is done. All transactions are encrypted and 100% safe and secure.',
    color: '#0891B2',
    bg: 'linear-gradient(135deg, #CFFAFE, #A5F3FC)',
    iconColor: '#0E7490',
  },
];

const stats = [
  { value: '50K+', label: 'Customers' },
  { value: '12K+', label: 'Workers' },
  { value: '150+', label: 'Cities' },
  { value: '98%', label: 'Satisfaction' },
];

export default function WhyChooseSection() {
  return (
    <Box>
      {/* ─── Why Choose Section ─── */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blob */}
        <Box sx={{
          position: 'absolute', top: '10%', right: '-5%',
          width: 350, height: 350, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <Box sx={{
          position: 'absolute', bottom: '5%', left: '-5%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Heading */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{ color: '#2563EB', fontWeight: 700, letterSpacing: 3, fontSize: '0.78rem' }}
            >
              OUR ADVANTAGES
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: '#0F172A',
                mt: 1,
                mb: 2,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Why Choose{' '}
              <Box component="span" sx={{ color: '#2563EB' }}>
                Service Hub?
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#64748B', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}
            >
              We combine technology, trust and reliability to give you the best service experience in India.
            </Typography>
          </Box>

          {/* Feature Cards Grid */}
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    bgcolor: '#fff',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: 4,
                    p: 3.5,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 20px 48px rgba(0,0,0,0.09)',
                      borderColor: '#BFDBFE',
                    },
                  }}
                >
                  {/* Icon bubble */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      background: feature.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: feature.iconColor,
                      flexShrink: 0,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Box>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', mb: 0.8 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      sx={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.7 }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── Stats Bar ─── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
          py: { xs: 6, md: 7 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {stats.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 2,
                    borderRight: { md: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: '2.2rem', md: '3rem' },
                      color: '#fff',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: '0.85rem',
                      mt: 0.8,
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
