const { response } = require('express');
const mongodb = require('../db/connection');
const e = require('express');
const { title } = require('process');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    // console.log('in getAll of controllers/books.js');
  const result = await mongodb.getDb().db('Booklist').collection('books').find();
  // console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while fetching books.' });
  }
};

const getSingle = async (req, res, next) => {
  try {
    // console.log('in getSingle of controllers/books.js');
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Booklist')
    .collection('books')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while fetching book.' });
  }
};

const create = async (req, res, next) => {
  try {
    // console.log('in create of controllers/books.js');
  // console.log(req.headers); // Add this to log headers
  // console.log(req.body); // Add this to log request body
  const newBook = {
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    series: req.body.series,
    genera: req.body.genera,
    pYear: req.body.pYear,
    age: req.body.age,
  };
  const result = await mongodb.getDb().db('Booklist').collection('books').insertOne(newBook);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Book creation failed!');
  }
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while creating book.' });
  }
};

const update = async (req, res, next) => {
  try {
    // console.log('in update of controllers/books.js');
  const userId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    series: req.body.series,
    genera: req.body.genera,
    pYear: req.body.pYear,
    age: req.body.age,
  };
  const result = await mongodb
    .getDb()
    .db('Booklist')
    .collection('books')
    .replaceOne({ _id: userId }, book);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the book.');
  }
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while updating book.' });
  }
};


const deleteOne = async (req, res, next) => {
  try {
    // console.log('in deleteOne of controllers/books.js');
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('CBooklist')
    .collection('books')
    .deleteOne({ _id: userId });
  if (result.acknowledged) {
    res.status(200).json({ message: 'Book deleted!' });
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the book.');
  }
  } catch (error) {
    res.status(500).json({ message: 'Some error occurred while deleting book.' });
  }
};

module.exports = { getAll, getSingle, create, update, deleteOne };