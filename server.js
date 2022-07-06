import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/Book.js";
mongoose.connect("mongodb://localhost/bookapi");
const app = express();
const port = 3022;

app.get("/", (req, res) => {
    res.send("<h1>Book Site API</h1>");
});
app.use(express.json());

app.post("/book", async (req, res) => {
    const book = new Book({
        title: "ttt",
        description: "ddd",
        numberOfPages: 999,
    });
    await book.save();

    console.log("book created: " + new Date());
    res.status(200).json({
        message: "book was created",
    });
});
app.get("/book", async (req, res) => {
    const book = await Book.find().sort({ title: 1 });
    res.status(200).json({ message: "fetched single book", book });
});
app.get("/book/:id", async (req, res) => {
    const id = req.params.id;
    const books= await Book.find({ _id: id });
    res.status(200).json({ message: "fetched  book with id" + id, books });
});

app.put("/book/:id", async (req, res) => {
    const id = req.params.id;
    const oldBook = await Book.find({ _id: id });
    await Book.updateOne({ _id: id }, { $set: { ...req.body } });
    const newBook = await Book.find({ _id: id });
    res.status(200).json({
        message: "replaced book with id=" + id,
        oldBook,
        newBook,
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
