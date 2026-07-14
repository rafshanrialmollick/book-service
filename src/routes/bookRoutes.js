import { Router } from "express";
import {
  creatBook,
  getBooks,
  getBookGenres,
  getBookById,
  updateBook,
  deleteBook,
  getBookStats,
  getBookStatsByYear
} from "../controller/Book.controller.js";

const router = Router();

router.route("/")
.post(creatBook)
.get(getBooks);

router.get("/genres", getBookGenres);
router.get("/stats", getBookStats);
router.get('/stats/year', getBookStatsByYear);

router.route("/:id")
.get(getBookById)
.patch(updateBook)
.delete(deleteBook);

export default router;
