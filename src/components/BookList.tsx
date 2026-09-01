import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { books } from '../data/books'
import { BookCard } from './BookCard'

export function BookList() {
  return (
    <Box component="section" id="books" sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h2" gutterBottom>
        Available books
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {books.length} titles in the library. The pledge is refunded when the book is returned.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Box>
    </Box>
  )
}
