import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import type { Book } from "../../data/books";
import type { BookInput } from "../../utils/db/books";

const emptyBook: BookInput = {
  title: "",
  originalTitle: "",
  author: "",
  originalAuthor: "",
  photo: "",
  pricePerWeek: 0,
  pledge: 0,
  available: true,
  sortOrder: 0,
};

function toInput(book: Book | null): BookInput {
  if (!book) return emptyBook;

  const { id: _id, ...rest } = book;
  return { ...emptyBook, ...rest };
}

type Props = {
  open: boolean;
  /** The book being edited, or null to add a new one. */
  book: Book | null;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: BookInput) => void;
};

function BookForm({ book, saving, onClose, onSubmit }: Omit<Props, "open">) {
  const [values, setValues] = useState<BookInput>(() => toInput(book));

  const set = <K extends keyof BookInput>(key: K, value: BookInput[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const valid = values.title.trim() && values.author.trim();

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (valid) onSubmit(values);
        }}
      >
        <DialogTitle>{book ? "Edit book" : "Add book"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={values.title}
              onChange={(event) => set("title", event.target.value)}
              required
              autoFocus
              fullWidth
            />
            <TextField
              label="Original title"
              value={values.originalTitle ?? ""}
              onChange={(event) => set("originalTitle", event.target.value)}
              fullWidth
            />
            <TextField
              label="Author"
              value={values.author}
              onChange={(event) => set("author", event.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Original author"
              value={values.originalAuthor ?? ""}
              onChange={(event) => set("originalAuthor", event.target.value)}
              fullWidth
            />
            <TextField
              label="Cover image URL"
              value={values.photo}
              onChange={(event) => set("photo", event.target.value)}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Price per week"
                type="number"
                value={values.pricePerWeek}
                onChange={(event) =>
                  set("pricePerWeek", Number(event.target.value))
                }
                fullWidth
              />
              <TextField
                label="Pledge"
                type="number"
                value={values.pledge}
                onChange={(event) => set("pledge", Number(event.target.value))}
                fullWidth
              />
              <TextField
                label="Sort order"
                type="number"
                value={values.sortOrder ?? 0}
                onChange={(event) =>
                  set("sortOrder", Number(event.target.value))
                }
                fullWidth
              />
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  checked={values.available}
                  onChange={(event) => set("available", event.target.checked)}
                />
              }
              label="Available for rent"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!valid || saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

/**
 * Remounts the form on every open so the fields always start from the book
 * being edited — no effect needed to reset them.
 */
export function BookFormDialog({ open, ...formProps }: Props) {
  return (
    <Dialog open={open} onClose={formProps.onClose} fullWidth maxWidth="sm">
      {open && <BookForm key={formProps.book?.id ?? "new"} {...formProps} />}
    </Dialog>
  );
}
