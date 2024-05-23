// server/index.js
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.use(cors());

const getStoryDetails = async (id) => {
  const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
  return response.data;
};

app.get('/api/topstories', async (req, res) => {
  const { data: topStoryIds } = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  const stories = await Promise.all(topStoryIds.slice(0, 10).map(getStoryDetails));
  res.json({ stories });
});

app.get('/api/beststories', async (req, res) => {
  const { data: bestStoryIds } = await axios.get('https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty');
  const stories = await Promise.all(bestStoryIds.slice(0, 10).map(getStoryDetails));
  res.json({ stories });
});

app.get('/api/newstories', async (req, res) => {
  const { data: newStoryIds } = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
  const stories = await Promise.all(newStoryIds.slice(0, 10).map(getStoryDetails));
  res.json({ stories });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
