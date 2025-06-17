const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()

const prisma = new PrismaClient();

router.get('/boards', async (req, res) => {
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

module.exports = router