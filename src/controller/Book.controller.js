import { success } from "zod";
import bookService from "../services/bookService.js";
import logger from "../utils/logger.js";

export const creatBook = async (req, res, next) => {
  try {
    const book = await bookService.creatBook(req.body);
    res.status(201).json({
      success: true,
      messages: "Book created succesfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const result = await bookService.getBooks(req.query);
    res.status(200).json({
      success: true,
      count: result.books.length,
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.books,
    });
  } catch (error) {
    next(error);
  }
};
export const getBookGenres = async (req, res, next) => {
  try {
    const genres = await bookService.getBookGenres();
    res.status(200).json({
      success: true,
      message: "Genres fetched successfully",
      data: genres.sort(),
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const upBoook = await bookService.updateBookById(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: upBoook,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await bookService.deleteBookById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getBookStats = async (req, res, next) => {
  try {
    const stats = await bookService.getGenreStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookStatsByYear = async (_req, res, next) => {
  try {
    const stats = await bookService.getYearStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
