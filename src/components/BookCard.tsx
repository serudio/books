import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Book } from "../data/books";
import { currency, pledgeFor, priceFor } from "../data/pricing";
import { formatDate } from "../utils/date";

export function BookCard({
  book,
  listView,
}: {
  book: Book;
  listView: boolean;
}) {
  const rented = !book.available;
  const backOn = rented ? formatDate(book.availableFrom) : null;
  // Dimmed, but the chip saying when it is back stays at full strength —
  // that is the one thing a visitor looking at a rented book wants.
  const dimmed = rented ? { opacity: 0.55 } : {};

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: listView ? "row" : "column",
        width: "100%",
        height: "100%",
        transition: "box-shadow 150ms, transform 150ms",
        bgcolor: rented ? "action.hover" : "background.paper",
        "&:hover": rented
          ? undefined
          : {
              boxShadow: listView ? 2 : 4,
              transform: listView ? "none" : "translateY(-2px)",
            },
      }}
    >
      <CardMedia
        component="img"
        image={book.photo}
        alt={`Обкладинка книги «${book.title}»`}
        loading="lazy"
        sx={{
          height: listView ? 112 : 260,
          objectFit: "contain",
          bgcolor: "grey.100",
          p: 1.5,
          width: listView ? 200 : "100%",
          filter: rented ? "grayscale(1)" : "none",
          ...dimmed,
        }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}
      >
        <Box sx={{ flexGrow: 1, ...dimmed }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.3 }}
          >
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
          sx={{ alignItems: "center", flexWrap: "wrap" }}
        >
          <Chip
            size="small"
            color="info"
            label={`${priceFor(book)} ${currency} / 2 тижні`}
            sx={{
              "& .MuiChip-label": { fontSize: "0.75rem" },
              ...dimmed,
            }}
          />
          <Chip
            size="small"
            variant="outlined"
            icon={<SavingsOutlinedIcon />}
            label={`Застава ${pledgeFor(book)} ${currency}`}
            sx={{
              "& .MuiChip-label": { fontSize: "0.65rem" },
              ...dimmed,
            }}
          />
          {rented && (
            <Chip
              size="small"
              variant="outlined"
              color="warning"
              label={backOn ? `Доступна з ${backOn}` : "Орендована"}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
