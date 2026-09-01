import MenuBookIcon from '@mui/icons-material/MenuBook'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1.5 }} />
        <Typography variant="h6" component="span" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Book Rent
        </Typography>
        <Box>
          <Button color="inherit" href="#books">
            Books
          </Button>
          <Button color="inherit" href="#contact">
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
