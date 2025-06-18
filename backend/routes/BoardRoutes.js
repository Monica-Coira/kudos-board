const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
})

router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.board.findUnique({
        where: { id: parseInt(boardId) },
    });
    res.json(board);
})

router.get('/search/:title', async (req, res) => {
    const boardTitle = parseInt(req.params.title)
    const board = await prisma.board.findMany({
        where: { title: parseInt(boardTitle) },
    });
    res.json(board);
})

router.get('/sort/', async (req, res) => {
    const { category } = req.query;
    let filters = {};
    if (category){
        filters.category = category;
    }
    const filteredUsers = await prisma.board.findMany({
        where: category,
    });
    res.json(filteredUsers);
})

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.category) {
        return res.status(400).send('Title and category are required.')
    }
    const { id, title, category, author, image, cards } = req.body
    const newBoard = await prisma.board.create({
        data: {
        id,
        title,
        category,
        author,
        image,
        cards
        }
    })
    res.json(newBoard)
})

router.put('/:boardId', async (req, res) => {
    const { boardId } = req.params
    const { id, title, description, category, author, giphyLink, cards } = req.body
    const updatedBoard = await prisma.board.update({
        where: { id: parseInt(boardId) },
        data: {
        id,
        title, 
        description,
        category,
        author,
        giphyLink,
        cards
        }
    })
    res.json(updatedBoard)
})

router.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(boardId) }
    })
    res.json(deletedBoard)
})

module.exports = router