import ClearIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
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

const listSx = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
} as const;

export function BookList() {
  const [listView, setListView] = useState(false);
  const { books, loading, error } = useBooks();
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => books.filter((book) => matchesQuery(book, query)),
    [books, query],
  );
  const searching = query.trim().length > 0;

  return (
    <Box component="section" id="books">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h2" component="h1">
          Книги в оренду
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
          sx={{ maxWidth: 480 }}
        />
        <IconButton onClick={() => setListView((prev) => !prev)}>
          <FormatListBulletedIcon color={listView ? "action" : "disabled"} />
        </IconButton>
      </Box>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {loading
          ? "Завантажуємо бібліотеку…"
          : searching
            ? `Знайдено ${visible.length} з ${books.length} книг.`
            : `${books.length} книг в бібліотеці. Застава повертається коли ви повертаєте книгу.`}
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Не вдалося завантажити каталог ({error}). Показуємо останній
          відомий список.
        </Alert>
      )}

      {!loading && visible.length === 0 ? (
        <Typography color="text.secondary">
          Нічого не знайдено за запитом «{query.trim()}».
        </Typography>
      ) : (
        <Box sx={listView ? listSx : gridSx}>
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} variant="rounded" height={400} />
              ))
            : visible.map((book) => (
                <BookCard key={book.id} book={book} listView={listView} />
              ))}
        </Box>
      )}
    </Box>
  );
}
