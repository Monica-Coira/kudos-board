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

router.get('/:boardId/:cardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.board.findUnique({
        where: { id: parseInt(boardId) },
    });
    const cardId = parseInt(req.params.cardId)
    const card = await prisma.board.card.findUnique({
        where: { id: parseInt(cardId) },
    });
    res.json(card);
})

router.post('/', async (req, res) => {
    // if (!req.body.name || !req.body.type) {
    //     return res.status(400).send('Name and type are required.')
    // }
    const { id, title, description, category, author, giphyLink, cards } = req.body
    const newBoard = await prisma.board.create({
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

router.post('/boardPage', async (req, res) => {
    // if (!req.body.name || !req.body.type) {
    //     return res.status(400).send('Name and type are required.')
    // }
    const { id, board_id, message, giphyLink, upvotes, author, pinned, board } = req.body
    const newCard = await prisma.card.create({
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