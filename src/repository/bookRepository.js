import Book from "../model/Book.js";

const creatBook = (bookInfo) => Book.create(bookInfo);
const countBooks = (filter) => Book.countDocuments(filter);

const findBooks = (filter, options = {}) => {
  const { sort = "-createdAt", skip = 0, limit = 10, fields = "" } = options;
  let query = Book.find(filter).sort(sort).skip(skip).limit(limit);
  if (fields) {
    query = query.select(fields);
  }
  return query;
};

const getBooks = (bookInfo) => Book.find(bookInfo);
const getBookGenres = () => Book.distinct("genre");
const findBooksById = (id) => Book.findById(id);
const updateBookById = (id, bookData) =>
  Book.findByIdAndUpdate(id, bookData, {
    new: true,
    runValidators: true,
  });

const deleteBookById = (id) => Book.findByIdAndDelete(id);
const getBooksByGenree = () =>
  Book.aggregate([
    {
      $group: {
        _id: "$genre",
        totalBooks: { $sum: 1 },
      },
    },
    {
      $sort: { totalBooks: -1, _id: 1 },
    },
  ]);

const getBooksByYear = () =>
  Book.aggregate([
    {
      $match: {
        publishedYear: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$publishedYear",
        totalBooks: { $sum: 1 },
        avgPrice: { $avg: "$price" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

export default {
  creatBook,
  getBooks,
  getBookGenres,
  countBooks,
  findBooks,
  findBooksById,
  updateBookById,
  deleteBookById,
  getBooksByGenree,
  getBooksByYear,
};
