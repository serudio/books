import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import PlaceIcon from '@mui/icons-material/Place'
import TelegramIcon from '@mui/icons-material/Telegram'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import Divider from '@mui/material/Divider'

import { contact } from '../data/contact'
import { currency, rentalTerms } from '../data/pricing'

const rates = [
  { label: 'Per week', value: rentalTerms.perWeek },
  { label: 'Per two weeks', value: rentalTerms.perTwoWeeks },
  { label: 'Each following day', value: rentalTerms.perExtraDay },
  { label: 'Pledge (refundable)', value: rentalTerms.pledge },
]

export function ContactSection() {
  return (
    <Box component="section" id="contact" sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h2" gutterBottom>
        Contact & pickup
      </Typography>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography sx={{ mb: 1 }}>{contact.intro}</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Run by {contact.ownerName}. Write to me and we'll agree on a handover time.
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
          Rates
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            mb: 2,
          }}
        >
          {rates.map((rate) => (
            <Box
              key={rate.label}
              sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                from {rate.value} {currency}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rate.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {rentalTerms.note}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List
          disablePadding
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            columnGap: 3,
          }}
        >
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={<Link href={`mailto:${contact.email}`}>{contact.email}</Link>}
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PhoneIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Phone"
              secondary={
                <Link href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</Link>
              }
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <TelegramIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Telegram"
              secondary={
                <Link href={`https://t.me/${contact.telegram.replace('@', '')}`}>
                  {contact.telegram}
                </Link>
              }
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PlaceIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={contact.city}
              secondary={
                <Link href={contact.mapUrl} target="_blank" rel="noreferrer">
                  {contact.address}
                </Link>
              }
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccessTimeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Handover hours" secondary={contact.hours} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  )
}
