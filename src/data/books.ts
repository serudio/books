export type Book = {
  id: string
  title: string
  author: string
  /** Rental price per week, in the currency below. */
  pricePerWeek: number
  /** Refundable deposit held while the book is rented. */
  pledge: number
  photo: string
  available: boolean
}

export const currency = 'PLN'

export const books: Book[] = [
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    pricePerWeek: 12,
    pledge: 80,
    photo: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
    available: true,
  },
  {
    id: 'the-hobbit',
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    pricePerWeek: 10,
    pledge: 70,
    photo: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    available: true,
  },
  {
    id: 'sapiens',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    pricePerWeek: 15,
    pledge: 100,
    photo: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    available: false,
  },
  {
    id: 'clean-code',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    pricePerWeek: 18,
    pledge: 120,
    photo: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
    available: true,
  },
  {
    id: 'the-little-prince',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    pricePerWeek: 8,
    pledge: 50,
    photo: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg',
    available: true,
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    pricePerWeek: 11,
    pledge: 75,
    photo: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    available: true,
  },
]
