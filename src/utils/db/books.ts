import type { Book } from "../../data/books";
import { supabase } from "../../supabase";

export type BookRow = {
  id: string;
  title: string;
  original_title: string | null;
  author: string;
  original_author: string | null;
  photo_url: string | null;
  price_per_week: number;
  pledge: number;
  available: boolean;
  sort_order: number;
};

const columns =
  "id, title, original_title, author, original_author, photo_url, price_per_week, pledge, available, sort_order";

export function mapBookRow(row: BookRow): Book {
  return {
    id: row.id,
    title: row.title,
    originalTitle: row.original_title ?? undefined,
    author: row.author,
    originalAuthor: row.original_author ?? undefined,
    photo: row.photo_url ?? "",
    pricePerWeek: row.price_per_week,
    pledge: row.pledge,
    available: row.available,
    sortOrder: row.sort_order,
  };
}

/** The shape the admin form edits; `id` is assigned by the database. */
export type BookInput = Omit<Book, "id">;

function toRow(book: BookInput) {
  return {
    title: book.title.trim(),
    original_title: book.originalTitle?.trim() || null,
    author: book.author.trim(),
    original_author: book.originalAuthor?.trim() || null,
    photo_url: book.photo.trim() || null,
    price_per_week: book.pricePerWeek,
    pledge: book.pledge,
    available: book.available,
    sort_order: book.sortOrder ?? 0,
  };
}

function client() {
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

export async function getBooks() {
  return client()
    .from("books")
    .select(columns)
    .order("sort_order", { ascending: true })
    .returns<BookRow[]>();
}

export async function createBook(book: BookInput) {
  const { error } = await client().from("books").insert(toRow(book));
  if (error) throw error;
}

export async function updateBook(id: string, book: BookInput) {
  const { error } = await client().from("books").update(toRow(book)).eq("id", id);
  if (error) throw error;
}

export async function deleteBook(id: string) {
  const { error } = await client().from("books").delete().eq("id", id);
  if (error) throw error;
}
