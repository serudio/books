import ClearIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

import { useBooks } from "../hooks/useBooks";
import { matchesQuery } from "../utils/search";
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
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => books.filter((book) => matchesQuery(book, query)),
    [books, query],
  );
  const searching = query.trim().length > 0;

  return (
    <Box component="section" id="books" sx={{ scrollMarginTop: 80 }}>
      {/* component="h1" keeps the existing size but makes this the page's
          one top-level heading — the page had none at all, which leaves
          crawlers without a primary subject for it. */}
      <Typography variant="h2" component="h1" gutterBottom>
        Available books
      </Typography>
      <TextField
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Пошук за назвою або автором"
        aria-label="Пошук книг"
        size="small"
        fullWidth
        type="search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searching ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="Очистити пошук"
                  onClick={() => setQuery("")}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
        sx={{ mb: 2, maxWidth: 480 }}
      />

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {loading
          ? "Loading the library…"
          : searching
            ? `Знайдено ${visible.length} з ${books.length} книг.`
            : `${books.length} книг в бібліотеці. Застава повертається коли ви повертаєте книгу.`}
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Could not load the latest catalogue ({error}). Showing the last known
          list.
        </Alert>
      )}

      {!loading && visible.length === 0 ? (
        <Typography color="text.secondary">
          Нічого не знайдено за запитом «{query.trim()}».
        </Typography>
      ) : (
        <Box sx={gridSx}>
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} variant="rounded" height={400} />
              ))
            : visible.map((book) => <BookCard key={book.id} book={book} />)}
        </Box>
      )}
    </Box>
  );
}
