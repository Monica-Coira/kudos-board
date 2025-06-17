const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const boards = await prisma.boards.findMany();
    res.json(boards);
})

router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.boards.findUnique({
        where: { id: parseInt(boardId) },
    });
    res.json(board);
})

router.post('/', async (req, res) => {
    // if (!req.body.name || !req.body.type) {
    //     return res.status(400).send('Name and type are required.')
    // }
    const { id, title, description, category, author, giphyLink, cards } = req.body
    const newBoard = await prisma.boards.create({
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
    res.json(newBoard)
})

router.post('/', async (req, res) => {
    // if (!req.body.name || !req.body.type) {
    //     return res.status(400).send('Name and type are required.')
    // }
    const { id, board_id, message, giphyLink, upvotes, author, pinned, board } = req.body
    const newCard = await prisma.cards.create({
        data: {
        id,
        board_id,
        message,
        giphyLink,
        upvotes,
        author, 
        pinned, 
        board
        }
    })
    res.json(newCard)
})

router.put('/:boardId', async (req, res) => {
    const { boardId } = req.params
    const { id, title, description, category, author, giphyLink, cards } = req.body
    const updatedBoard = await prisma.boards.update({
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
    const deletedBoard = await prisma.boards.delete({
        where: { id: parseInt(boardId) }
    })
    res.json(deletedBoard)
})

module.exports = router