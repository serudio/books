import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import type { Book } from "../../data/books";
import { currency, pledgeFor, priceFor } from "../../data/pricing";
import { formatDate } from "../../utils/date";

type Props = {
  books: Book[];
  /** Trash rows offer restore/delete-forever instead of edit/trash. */
  variant: "catalogue" | "trash";
  emptyText: string;
  onEdit?: (book: Book) => void;
  onTrash?: (book: Book) => void;
  onRestore?: (book: Book) => void;
  onDeleteForever?: (book: Book) => void;
};

/** Rates inherited from the standard terms are dimmed, to set them apart. */
function Amount({ value, isDefault }: { value: number; isDefault: boolean }) {
  return (
    <Tooltip
      title={isDefault ? "Standard rate" : ""}
      disableHoverListener={!isDefault}
    >
      <Typography
        variant="body2"
        component="span"
        color={isDefault ? "text.secondary" : "text.primary"}
        sx={{ fontStyle: isDefault ? "italic" : "normal" }}
      >
        {value} {currency}
      </Typography>
    </Tooltip>
  );
}

export function BookTable({
  books,
  variant,
  emptyText,
  onEdit,
  onTrash,
  onRestore,
  onDeleteForever,
}: Props) {
  if (books.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
        <Typography color="text.secondary">{emptyText}</Typography>
      </Paper>
    );
  }

  const isTrash = variant === "trash";

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Week</TableCell>
            <TableCell align="right">Застава</TableCell>
            <TableCell>{isTrash ? "Deleted" : "Status"}</TableCell>
            {!isTrash && <TableCell align="right">Order</TableCell>}
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
                <Amount
                  value={priceFor(book)}
                  isDefault={book.pricePerWeek == null}
                />
              </TableCell>
              <TableCell align="right">
                <Amount
                  value={pledgeFor(book)}
                  isDefault={book.pledge == null}
                />
              </TableCell>
              <TableCell>
                {isTrash ? (
                  <Typography variant="body2" color="text.secondary">
                    {book.deletedAt
                      ? new Date(book.deletedAt).toLocaleDateString()
                      : "—"}
                  </Typography>
                ) : (
                  <Chip
                    size="small"
                    color={book.available ? "success" : "default"}
                    label={
                      book.available
                        ? "Available"
                        : (formatDate(book.availableFrom) ?? "Rented out")
                    }
                  />
                )}
              </TableCell>
              {!isTrash && (
                <TableCell align="right">{book.sortOrder ?? 0}</TableCell>
              )}
              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                {isTrash ? (
                  <>
                    <Tooltip title="Restore">
                      <IconButton
                        size="small"
                        aria-label={`Restore ${book.title}`}
                        onClick={() => onRestore?.(book)}
                      >
                        <RestoreFromTrashIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete forever">
                      <IconButton
                        size="small"
                        color="error"
                        aria-label={`Delete ${book.title} forever`}
                        onClick={() => onDeleteForever?.(book)}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        aria-label={`Edit ${book.title}`}
                        onClick={() => onEdit?.(book)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Move to trash">
                      <IconButton
                        size="small"
                        aria-label={`Move ${book.title} to trash`}
                        onClick={() => onTrash?.(book)}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
