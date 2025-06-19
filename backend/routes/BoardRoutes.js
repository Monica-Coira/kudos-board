const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
})

// Filter by category
router.get('/sort', async (req, res) => {
    const { category } = req.query;
    let filters = {};
    let filteredBoards = [];
    if (category === "Recent"){
        filters.category = category;
        filteredBoards = await prisma.board.findMany({
            orderBy: {id: "desc"},
        });
        filteredBoards = filteredBoards.slice(0, 6);
    }
    else if (category){
        filters.category = category;
        filteredBoards = await prisma.board.findMany({
            where: {category : filters.category},
        });
    }
    res.json(filteredBoards);
})

// Search boards by title
router.get('/search', async (req, res) => {
    const { title } = req.query;
    let filters = {};
    if (title){
        filters.title = {
            contains: title,
            mode: 'insensitive'
        }
    }
    const filteredBoards = await prisma.board.findMany({
        where: filters,
    });
    res.json(filteredBoards);
})

// Get board by ID
router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.board.findUnique({
        where: { id: parseInt(boardId) },
    });
    res.json(board);
})

router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.category) {
        return res.status(400).send('Title and category are required.')
    }
    const { title, category, author, image } = req.body
    const newBoard = await prisma.board.create({
        data: {
        title,
        category,
        author,
        image
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