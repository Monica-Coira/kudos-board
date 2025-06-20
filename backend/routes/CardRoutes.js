const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient();

router.get('/getTitle/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const board = await prisma.board.findMany({
        where: { id : parseInt(boardId) },
    });
    res.json(board);
})

router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const cards = await prisma.card.findMany({
        where: { board_id : parseInt(boardId) },
        orderBy: [
            { pinned: "desc" },
            { id: "desc" }
        ]
    });
    res.json(cards);
})

router.get('/', async (req, res) => {
    const cards = await prisma.card.findMany();
    res.json(cards);
})

router.get('/:cardId', async (req, res) => {
    const cardId = parseInt(req.params.cardId)
    const card = await prisma.card.findUnique({
        where: { id: parseInt(cardId) },
    });
    res.json(card);
})

router.post('/', async (req, res) => {
    if (!req.body.message || !req.body.giphyLink) {
        return res.status(400).send('Message and GIF are required.')
    }
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

router.put('/upvote/:boardId/:cardId', async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const boardId = parseInt(req.params.boardId);
    const upvotedCard = await prisma.card.update({
        where: { id: cardId },
        data: {
            upvotes: {
                increment: 1,
            },
        },
    })
    const upvotedCards = await prisma.card.findMany({
        where: { board_id: boardId },
        orderBy: [
            { pinned: "desc" },
            { id: "desc" }
        ]
    })
    res.json(upvotedCards);
})

router.put('/pin/:boardId/:cardId', async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const boardId = parseInt(req.params.boardId);
    const pinnedCard = await prisma.card.update({
        where: { id: cardId },
        data: {
            pinned: true
        }
    })
    const updatedCards = await prisma.card.findMany({
        where: { board_id: boardId },
        orderBy: [
            { pinned: "desc" },
            { id: "desc" }
        ]
    })
    res.json(updatedCards);
})

router.put('/unpin/:boardId/:cardId', async (req, res) => {
    const cardId = parseInt(req.params.cardId);
    const boardId = parseInt(req.params.boardId);
    const pinnedCard = await prisma.card.update({
        where: { id: cardId },
        data: {
            pinned: false
        }
    })
    const updatedCards = await prisma.card.findMany({
        where: { board_id: boardId },
        orderBy: [
            { pinned: "desc" },
            { id: "desc" }
        ]
    })
    res.json(updatedCards);
})

router.post('/', async (req, res) => {
    if (!req.body.message || !req.body.giphyLink) {
        return res.status(400).send('Message and GIPHY link are required.')
    }
    const { board_id, message, giphyLink, upvotes, author, pinned } = req.body
    const newCard = await prisma.card.create({
        data: {
        board_id,
        message,
        giphyLink,
        upvotes,
        author,
        pinned
        }
    })
    res.json(newCard)
})

router.delete('/:cardId', async (req, res) => {
    const { cardId } = req.params
    const deletedCard = await prisma.card.delete({
        where: { id: parseInt(cardId) }
    })
    res.json(deletedCard)
})

module.exports = router