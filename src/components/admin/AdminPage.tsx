import AddIcon from "@mui/icons-material/Add";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Alert from "@mui/material/Alert";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { signInWithGoogle, signOut, useSession } from "../../auth/useSession";
import type { Book } from "../../data/books";
import { useBooks } from "../../hooks/useBooks";
import { isSupabaseConfigured } from "../../supabase";
import {
  createBook,
  deleteBook,
  emptyTrash,
  restoreBook,
  trashBook,
  updateBook,
  type BookInput,
} from "../../utils/db/books";
import { BookFormDialog } from "./BookFormDialog";
import { BookTable } from "./BookTable";

type Props = {
  onExit: () => void;
};

export function AdminPage({ onExit }: Props) {
  const { session, loading: authLoading, email, isAdmin } = useSession();
  const { books, loading, refresh } = useBooks({ includeTrashed: isAdmin });

  const [tab, setTab] = useState<"catalogue" | "trash">("catalogue");
  const [editing, setEditing] = useState<Book | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const live = books.filter((book) => !book.deletedAt);
  const trashed = books.filter((book) => book.deletedAt);

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

  const openDialog = (book: Book | null) => {
    setEditing(book);
    setError(null);
    setDialogOpen(true);
  };

  const confirmAnd = (message: string, action: () => Promise<void>) => {
    if (window.confirm(message)) void run(action);
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
      <Paper variant="outlined" sx={{ p: 4, maxWidth: 440, mx: "auto" }}>
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="h6">You are not an admin</Typography>
          <Typography variant="body2" color="text.secondary">
            You are signed in as <strong>{email}</strong>. Only the library
            owner can add, edit or remove books.
          </Typography>
          <Button variant="contained" onClick={onExit}>
            Back to the catalogue
          </Button>
          <Button size="small" onClick={() => void signOut()}>
            Sign out and use another account
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
        sx={{ alignItems: { sm: "center" }, mb: 2 }}
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

      <Tabs
        value={tab}
        onChange={(_event, next: "catalogue" | "trash") => setTab(next)}
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label={`Books (${live.length})`} value="catalogue" />
        <Tab
          value="trash"
          label={
            <Badge badgeContent={trashed.length} color="default">
              <Box sx={{ pr: trashed.length ? 2 : 0 }}>Trash</Box>
            </Badge>
          }
        />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {tab === "catalogue" ? (
        <BookTable
          books={live}
          variant="catalogue"
          emptyText="No books yet. Use “Add book” to create the first one."
          onEdit={openDialog}
          onTrash={(book) =>
            void run(async () => {
              await trashBook(book.id);
            })
          }
        />
      ) : (
        <Stack spacing={2}>
          {trashed.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                color="error"
                startIcon={<DeleteSweepIcon />}
                disabled={saving}
                onClick={() =>
                  confirmAnd(
                    `Permanently delete all ${trashed.length} book(s) in the trash? This cannot be undone.`,
                    emptyTrash,
                  )
                }
              >
                Empty trash
              </Button>
            </Box>
          )}
          <BookTable
            books={trashed}
            variant="trash"
            emptyText="The trash is empty."
            onRestore={(book) =>
              void run(async () => {
                await restoreBook(book.id);
              })
            }
            onDeleteForever={(book) =>
              confirmAnd(
                `Permanently delete “${book.title}”? This cannot be undone.`,
                () => deleteBook(book.id),
              )
            }
          />
        </Stack>
      )}

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
