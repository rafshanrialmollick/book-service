import bookRepository from "../repository/bookRepository.js";
import notFound from "../middlewares/notFound.js";
import ApiError from "../utils/ApiError.js";
import { deleteBook } from "../controller/Book.controller.js";

const creatBook = async (bookData) => bookRepository.creatBook(bookData);
//const getBooks = async (bookData) => bookRepository.getBooks(bookData);
const getBookGenres = async () => bookRepository.getBookGenres();
const buildBookFilter = (query) => {
  const filter = {};

  if (query.title) {
    filter.title = query.title;
  }

  if (query.author) {
    filter.author = query.author;
  }

  if (query.genre) {
    filter.genre = query.genre;
  }

  if (query.published !== undefined) {
    filter.published = query.published === "true";
  }

  if (query.featured !== undefined) {
    filter.featured = query.featured === "true";
  }

  if (query.tags) {
    filter.tags = {
      $in: query.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.minPages || query.maxPages) {
    filter.pages = {};
    if (query.minPages) filter.pages.$gte = Number(query.minPages);
    if (query.maxPages) filter.pages.$lte = Number(query.maxPages);
  }

  if (query.minRating || query.maxRating) {
    filter.rating = {};
    if (query.minRating) filter.rating.$gte = Number(query.minRating);
    if (query.maxRating) filter.rating.$lte = Number(query.maxRating);
  }

  if (query.publishedYear) {
    filter.publishedYear = Number(query.publishedYear);
  }

  return filter;
};

const getBooks = async (query) => {
  const filter = buildBookFilter(query);
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const sort = query.sort ? query.sort.split(",").join(" ") : "-createdAt";
  const fields = query.fields ? query.fields.split(",").join(" ") : "";
  const sortOrder = query.sortOrder || -1;

  const [total, books] = await Promise.all([
    bookRepository.countBooks(filter),
    bookRepository.findBooks(filter, { sort, skip, limit, fields }),
  ]);

  return {
    page,
    limit,
    total,
    books,
    pages: Math.ceil(total / limit),
  };
};

const getBookById = async (id) => {
  const book = await bookRepository.findBooksById(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return book;
};
const updateBookById = async (id, bookData) => {
  const upBook = await bookRepository.updateBookById(id, bookData);
  if (!upBook) {
    throw new ApiError(404, "Book not found");
  }
  return upBook;
};

const deleteBookById = async (id) => {
  const book = await bookRepository.deleteBookById(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  return book;
};
const getGenreStats = async () => bookRepository.getBooksByGenree();
const getYearStats = () => bookRepository.getBooksByYear();

export default {
  creatBook,
  getBooks,
  getBookGenres,
  getBookById,
  updateBookById,
  deleteBookById,
  getGenreStats,
  getYearStats
};
