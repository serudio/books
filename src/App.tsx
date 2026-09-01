import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { BookList } from './components/BookList'
import { ContactSection } from './components/ContactSection'
import { Header } from './components/Header'
import { contact } from './data/contact'

export default function App() {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container maxWidth="lg" component="main" sx={{ py: { xs: 4, md: 6 }, flexGrow: 1 }}>
        <Stack spacing={{ xs: 5, md: 8 }}>
          <BookList />
          <ContactSection />
        </Stack>
      </Container>

      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {contact.ownerName} · Book Rent
        </Typography>
      </Box>
    </Box>
  )
}
