const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient();

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

router.put('/:cardId', async (req, res) => {
    const { cardId } = req.params
    const { id, board_id, message, giphyLink, upvotes, author, pinned, board } = req.body
    const updatedCard = await prisma.card.update({
        where: { id: parseInt(cardId) },
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
    res.json(updatedCard)
})

router.delete('/:cardId', async (req, res) => {
    const { cardId } = req.params
    const deletedCard = await prisma.card.delete({
        where: { id: parseInt(cardId) }
    })
    res.json(deletedCard)
})

module.exports = router