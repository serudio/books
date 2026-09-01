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
};

const columns =
  "id, title, original_title, author, original_author, photo_url, price_per_week, pledge, available";

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
  };
}

export async function getBooks() {
  if (!supabase) throw new Error("Supabase is not configured");

  return supabase
    .from("books")
    .select(columns)
    .order("sort_order", { ascending: true })
    .returns<BookRow[]>();
}
