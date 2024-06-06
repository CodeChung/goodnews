import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Select, Button, FormControl, InputLabel, MenuItem, Card, CardHeader, CardMedia, CardContent, Link, Typography, Stack, Box } from '@mui/material';
import { getNews } from './newsService';

function App() {
  const [categoryValue, setCategoryValue] = useState('general');
  const [newsValue, setNewsValue] = useState([]);
  const [statsValue, setStatsValue] = useState({
    avg: 0,
    min: [0, 0],
    max: [0, 0]
  })

  const search = async (event) => {
    event.preventDefault();
    console.log('doing search', categoryValue)
    const news = await getNews(categoryValue)
    console.log('news ', news)
    setNewsValue(news.sort((a, b) => b.score - a.score));
    analyzeNews(news);
  }

  const analyzeNews = (news) => {
    console.log('analyzing news', !news)
    if (!news) return;
    let total = 0;
    let min = Infinity;
    let minDex = 0;
    let max = -Infinity;
    let maxDex = 0;
    for (let i = 0; i < news.length; i++) {
      const currentScore = news[i]?.score || 0;
      console.log(news[i].title, i)
      console.log('score', currentScore)
      total += currentScore;
      if (currentScore < min) {
        min = currentScore;
        minDex = i;
      }
      if (currentScore > max) {
        max = currentScore;
        maxDex = i;
      }
      console.log('min', min, minDex)
      console.log('max', max, maxDex)
    }
    setStatsValue({
      avg: total / news.length,
      max: [max, maxDex],
      min: [min, minDex]
    })
    console.log('stats', {
      avg: total / news.length,
      max: [max, maxDex],
      min: [min, minDex]
    })
  }
  return (
    <div className="App">
      <div className='app-header'>
        <h1>Good News App</h1>
        <p>Will today be a good day?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select size='small' labelId='category-label' label='category' name="category" id="category" value={categoryValue} onChange={e => setCategoryValue(e.target.value)}>
              <MenuItem value="general">
                General
              </MenuItem>
              <MenuItem value="entertainment">
                Entertainment
              </MenuItem>
              <MenuItem value="science">
                Science
              </MenuItem>
              <MenuItem value="technology">
                Technology
              </MenuItem>
              <MenuItem value="business">
                Business
              </MenuItem>
            </Select>
            <Button style={{marginLeft: '3px'}} variant='contained' size='large' onClick={e => search(e)}>Find News</Button>
          </FormControl>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', width: '100%', height: '82vh'}}>
        <Box
          sx={{
            overflow: 'hidden', // Hide overflow outside the container
            overflowY: 'scroll',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '60px'
          }}
        >
          <Stack spacing={2} sx={{
            padding: 2,
          }}>
            {newsValue.sort((a, b) => b.score - a.score).map((item, index) => {
              const score = (Math.abs(item.score * 100)).toFixed(2);
              const status = item.score >= 0 ? 'Positive' : 'Negative'
              return (
                <Card key={index} sx={{ maxWidth: 345 }}>
                  <CardHeader title={
                    <Link underline='hover' href={item.url} target="_blank">
                      <Typography variant='h6'>
                        {item.title}
                      </Typography>
                    </Link>
                  }>

                  </CardHeader>
                  <CardMedia
                    component="img"
                    height="194"
                    image={item.imageurl}
                  />
                  <CardContent>
                    {score}% {status}
                  </CardContent>
                </Card>
              )
            })}
          </Stack>
        </Box>
        {!!statsValue.avg &&

          <Stack spacing={3} sx={{
            marginTop: 10,
            padding: 2,
          }}>
            <Card sx={{ maxWidth: 505 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Best News 😂
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                  {(Math.abs(statsValue.max[0] * 100)).toFixed(2)}% Positive
                </Typography>
                <Link underline='hover' href={newsValue[statsValue.max[1]].url} target="_blank">
                  <Typography variant="body2">
                    {newsValue[statsValue.max[1]].title}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 505 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Worst News 😔
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                  {(Math.abs(statsValue.min[0] * 100)).toFixed(2)}% Negative
                </Typography>
                <Link underline='hover' href={newsValue[statsValue.min[1]].url} target="_blank">
                  <Typography variant="body2">
                    {newsValue[statsValue.min[1]].title}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 505 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  News Average 😐
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }} >
                  {(Math.abs(statsValue.avg * 100)).toFixed(2)}% {statsValue.avg > 0 ? 'Positive' : 'Negative'}
                </Typography>
                <Typography variant="body2">
                  {statsValue.avg > 0 ? 'Not too shabby' : 'Tomorrow will be a better day'}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        }
        <div>

        </div>
      </div>
    </div>
  );
}

export default App;
