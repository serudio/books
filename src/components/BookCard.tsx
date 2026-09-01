import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { Book } from '../data/books'
import { currency } from '../data/pricing'

export function BookCard({ book }: { book: Book }) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 150ms, transform 150ms',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
      }}
    >
      <CardMedia
        component="img"
        image={book.photo}
        alt={`Cover of ${book.title}`}
        loading="lazy"
        sx={{ height: 260, objectFit: 'contain', bgcolor: 'grey.100', p: 1.5 }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.author}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
          <Chip
            size="small"
            color="secondary"
            label={`${book.pricePerWeek} ${currency} / week`}
          />
          <Chip
            size="small"
            variant="outlined"
            icon={<SavingsOutlinedIcon />}
            label={`Pledge ${book.pledge} ${currency}`}
          />
          {!book.available && <Chip size="small" color="default" label="Rented out" />}
        </Stack>
      </CardContent>
    </Card>
  )
}
