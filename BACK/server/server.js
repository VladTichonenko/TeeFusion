const express = require('express');
const { PrismaClient } = require('../hello-prisma/node_modules/@prisma/client');
const bodyParser = require('body-parser');
const path =require('path');



const prisma = new PrismaClient();
const app = express();
app.use(express.static(path.join(__dirname,'../../FRONT')));

app.get('/',(req,res) =>{
res.sendFile(path.join(__dirname,'public','../../FRONT','index.html'));
})

// 1. Создание пользователя
app.post('/users', async (req, res) => {
  const { name, balance } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, balance: balance || 0 }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания пользователя' });
  }
});

// 2. Получение данных пользователя
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Пользователь не найден' });
  }
});

// 3. Создание голосования
app.post('/votes', async (req, res) => {
  const { userId, photo1Url, photo2Url } = req.body;
  try {
    const vote = await prisma.vote.create({
      data: {
        userId,
        photo1Url,
        photo2Url
      }
    });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания голосования' });
  }
});

// 4. Получение данных голосования
app.get('/votes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vote = await prisma.vote.findUnique({
      where: { id: parseInt(id) }
    });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: 'Голосование не найдено' });
  }
});

// 5. Обновление голосов
app.put('/votes/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { photo, userId } = req.body;

  try {
    const vote = await prisma.vote.findUnique({ where: { id: parseInt(id) } });

    if (!vote || vote.closed) {
      return res.status(400).json({ error: 'Голосование закрыто или не существует' });
    }

    if (photo === 1) {
      if (vote.votersForPhoto1.includes(userId)) {
        return res.status(400).json({ error: 'Вы уже голосовали за это фото' });
      }
      const updatedVote = await prisma.vote.update({
        where: { id: parseInt(id) },
        data: {
          votesForPhoto1: vote.votesForPhoto1 + 1,
          votersForPhoto1: { push: userId }
        }
      });
      res.json(updatedVote);
    } else if (photo === 2) {
      if (vote.votersForPhoto2.includes(userId)) {
        return res.status(400).json({ error: 'Вы уже голосовали за это фото' });
      }
      const updatedVote = await prisma.vote.update({
        where: { id: parseInt(id) },
        data: {
          votesForPhoto2: vote.votesForPhoto2 + 1,
          votersForPhoto2: { push: userId }
        }
      });
      res.json(updatedVote);
    } else {
      res.status(400).json({ error: 'Неверный выбор фото' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления голосов' });
  }
});

// 6. Закрытие голосования и определение победителя
app.put('/votes/:id/close', async (req, res) => {
  const { id } = req.params;

  try {
    const vote = await prisma.vote.findUnique({ where: { id: parseInt(id) } });

    if (!vote || vote.closed) {
      return res.status(400).json({ error: 'Голосование уже закрыто или не существует' });
    }

    let winner = 'Ничья';
    if (vote.votesForPhoto1 > vote.votesForPhoto2) {
      winner = 'Фото 1';
    } else if (vote.votesForPhoto2 > vote.votesForPhoto1) {
      winner = 'Фото 2';
    }

    const updatedVote = await prisma.vote.update({
      where: { id: parseInt(id) },
      data: {
        closed: true,
        winner
      }
    });

    res.json(updatedVote);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка закрытия голосования' });
  }
});

// GET /api/vote-time
app.get('/api/vote-time', async (req, res) => {
  try {
      // Получаем оставшееся время из базы данных
      const voteTime = await prisma.voteTime.findFirst({
          orderBy: {
              updatedAt: 'desc'
          }
      });

      if (!voteTime) {
          return res.status(404).json({ message: 'Время не найдено' });
      }

      res.json({ remainingTime: voteTime.remainingTime });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при получении времени' });
  }
});

// POST /api/update-vote-time
app.post('/api/update-vote-time', async (req, res) => {
  const { remainingTime } = req.body;

  if (remainingTime == null) {
      return res.status(400).json({ message: 'Оставшееся время не указано' });
  }

  try {
      // Обновляем оставшееся время в базе данных
      const updatedVoteTime = await prisma.voteTime.upsert({
          where: { id: 1 }, // Здесь предполагается, что id=1 - уникальная запись времени
          update: { remainingTime, updatedAt: new Date() },
          create: { remainingTime, updatedAt: new Date() }
      });

      res.json({ message: 'Время обновлено', remainingTime: updatedVoteTime.remainingTime });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при обновлении времени' });
  }
});

// 5. Обновление голосов
app.put('/votes/:id/vote', async (req, res) => {
  const { id } = req.params;
  const { photo, userId } = req.body;

  try {
    const vote = await prisma.vote.findUnique({ where: { id: parseInt(id) } });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!vote || vote.closed) {
      return res.status(400).json({ error: 'Голосование закрыто или не существует' });
    }

    if (user.balance <= 0) {
      return res.status(400).json({ error: 'У вас недостаточно баллов для голосования' });
    }

    if (photo === 1) {
      if (vote.votersForPhoto1.includes(userId)) {
        return res.status(400).json({ error: 'Вы уже голосовали за это фото' });
      }
      const updatedVote = await prisma.vote.update({
        where: { id: parseInt(id) },
        data: {
          votesForPhoto1: vote.votesForPhoto1 + 1,
          votersForPhoto1: { push: userId }
        }
      });

      await prisma.user.update({
        where: { id: userId },
        data: { balance: user.balance - 1 }
      });

      res.json(updatedVote);
    } else if (photo === 2) {
      if (vote.votersForPhoto2.includes(userId)) {
        return res.status(400).json({ error: 'Вы уже голосовали за это фото' });
      }
      const updatedVote = await prisma.vote.update({
        where: { id: parseInt(id) },
        data: {
          votesForPhoto2: vote.votesForPhoto2 + 1,
          votersForPhoto2: { push: userId }
        }
      });

      await prisma.user.update({
        where: { id: userId },
        data: { balance: user.balance - 1 }
      });

      res.json(updatedVote);
    } else {
      res.status(400).json({ error: 'Неверный выбор фото' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления голосов' });
  }
});

// Маршрут для получения user_id из URL
app.get('/tma/:user_id', async (req, res) => {
  const userId = req.params.user_id; // Получаем user_id из параметров URL

  try {
      // Здесь вы можете использовать userId для выполнения запросов к базе данных
      const user = await prisma.user.findUnique({
          where: { user_id: parseInt(userId) }, // Предполагается, что user_id - это число
      });

      if (!user) {
          return res.status(404).json({ error: 'Пользователь не найден' });
      }

      // Если пользователь найден, вы можете вернуть данные или выполнить другие действия
      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  const open = await import('open');
  open.default(`http://localhost:${PORT}`);
});