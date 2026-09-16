import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { signInWithGoogle, signOut, useSession } from "../../auth/useSession";
import type { Book } from "../../data/books";
import { currency } from "../../data/pricing";
import { useBooks } from "../../hooks/useBooks";
import { isSupabaseConfigured } from "../../supabase";
import {
  createBook,
  deleteBook,
  updateBook,
  type BookInput,
} from "../../utils/db/books";
import { BookFormDialog } from "./BookFormDialog";

type Props = {
  onExit: () => void;
};

export function AdminPage({ onExit }: Props) {
  const { session, loading: authLoading, email, isAdmin } = useSession();
  const { books, loading, refresh } = useBooks();

  const [editing, setEditing] = useState<Book | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    setSaving(true);
    setError(null);
    try {
      await action();
      await refresh();
      setDialogOpen(false);
    } catch (cause: unknown) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (values: BookInput) =>
    run(() => (editing ? updateBook(editing.id, values) : createBook(values)));

  const handleDelete = (book: Book) => {
    if (!window.confirm(`Delete “${book.title}”? This cannot be undone.`))
      return;
    void run(() => deleteBook(book.id));
  };

  const openDialog = (book: Book | null) => {
    setEditing(book);
    setError(null);
    setDialogOpen(true);
  };

  if (!isSupabaseConfigured) {
    return (
      <Alert severity="error">
        Supabase is not configured, so the catalogue cannot be edited.
      </Alert>
    );
  }

  if (authLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session) {
    return (
      <Paper variant="outlined" sx={{ p: 4, maxWidth: 420, mx: "auto" }}>
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="h6">Sign in</Typography>
          <Typography variant="body2" color="text.secondary">
            This area is for the library owner.
          </Typography>
          <Button variant="contained" onClick={() => void signInWithGoogle()}>
            Continue with Google
          </Button>
          <Button size="small" onClick={onExit}>
            Back to the catalogue
          </Button>
        </Stack>
      </Paper>
    );
  }

  if (!isAdmin) {
    return (
      <Paper variant="outlined" sx={{ p: 4, maxWidth: 420, mx: "auto" }}>
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="h6">No access</Typography>
          <Typography variant="body2" color="text.secondary">
            {email} is not allowed to edit this catalogue.
          </Typography>
          <Button variant="outlined" onClick={() => void signOut()}>
            Sign out
          </Button>
          <Button size="small" onClick={onExit}>
            Back to the catalogue
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, mb: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h2">Catalogue</Typography>
          <Typography variant="body2" color="text.secondary">
            Signed in as {email}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openDialog(null)}
        >
          Add book
        </Button>
        <Button onClick={onExit}>View site</Button>
        <Button color="inherit" onClick={() => void signOut()}>
          Sign out
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Week</TableCell>
              <TableCell align="right">Pledge</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Order</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} hover>
                <TableCell sx={{ width: 56 }}>
                  <Avatar
                    variant="rounded"
                    src={book.photo || undefined}
                    alt=""
                    sx={{ width: 36, height: 48 }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell align="right">
                  {book.pricePerWeek} {currency}
                </TableCell>
                <TableCell align="right">
                  {book.pledge} {currency}
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    color={book.available ? "success" : "default"}
                    label={book.available ? "Available" : "Rented out"}
                  />
                </TableCell>
                <TableCell align="right">{book.sortOrder ?? 0}</TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <IconButton
                    size="small"
                    aria-label={`Edit ${book.title}`}
                    onClick={() => openDialog(book)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    aria-label={`Delete ${book.title}`}
                    onClick={() => handleDelete(book)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      <BookFormDialog
        open={dialogOpen}
        book={editing}
        saving={saving}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
