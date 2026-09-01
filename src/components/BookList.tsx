import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useBooks } from "../hooks/useBooks";
import { BookCard } from "./BookCard";

const gridSx = {
  display: "grid",
  gap: 3,
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  },
} as const;

export function BookList() {
  const { books, loading, error } = useBooks();

  return (
    <Box component="section" id="books" sx={{ scrollMarginTop: 80 }}>
      <Typography variant="h2" gutterBottom>
        Available books
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {loading
          ? "Loading the library…"
          : `${books.length} titles in the library. The pledge is refunded when the book is returned.`}
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Could not load the latest catalogue ({error}). Showing the last known
          list.
        </Alert>
      )}

      <Box sx={gridSx}>
        {loading
          ? Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} variant="rounded" height={400} />
            ))
          : books.map((book) => <BookCard key={book.id} book={book} />)}
      </Box>
    </Box>
  );
}
