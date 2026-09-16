export type Book = {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  originalAuthor?: string;
  /** Price per week; null falls back to the standard rate. */
  pricePerWeek: number | null;
  /** Refundable deposit; null falls back to the standard pledge. */
  pledge: number | null;
  photo: string;
  available: boolean;
  /** ISO date (YYYY-MM-DD) the book comes back; only meaningful while rented. */
  availableFrom?: string | null;
  /** Position in the catalogue; lower comes first. */
  sortOrder?: number;
  /** Set when the book is in the trash; null when it is live. */
  deletedAt?: string | null;
};

/** Shown when Supabase is not configured, and while the real catalogue loads. */
export const fallbackBooks: Book[] = [
  // {
  //   id: "dune",
  //   title: "Dune",
  //   author: "Frank Herbert",
  //   pricePerWeek: 120,
  //   pledge: 800,
  //   photo: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg",
  //   available: true,
  // },
  // {
  //   id: "the-hobbit",
  //   title: "The Hobbit",
  //   author: "J. R. R. Tolkien",
  //   pricePerWeek: 100,
  //   pledge: 700,
  //   photo: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
  //   available: true,
  // },
  // {
  //   id: "sapiens",
  //   title: "Sapiens: A Brief History of Humankind",
  //   author: "Yuval Noah Harari",
  //   pricePerWeek: 150,
  //   pledge: 1000,
  //   photo: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  //   available: false,
  // },
  // {
  //   id: "clean-code",
  //   title: "Clean Code",
  //   author: "Robert C. Martin",
  //   pricePerWeek: 180,
  //   pledge: 1200,
  //   photo: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
  //   available: true,
  // },
  // {
  //   id: "the-little-prince",
  //   title: "The Little Prince",
  //   author: "Antoine de Saint-Exupéry",
  //   pricePerWeek: 80,
  //   pledge: 500,
  //   photo: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
  //   available: true,
  // },
  // {
  //   id: "1984",
  //   title: "1984",
  //   author: "George Orwell",
  //   pricePerWeek: 110,
  //   pledge: 750,
  //   photo: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  //   available: true,
  // },
];
