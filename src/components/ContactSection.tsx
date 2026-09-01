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

import { contact } from '../data/contact'

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
