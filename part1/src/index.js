import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

/*
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
    votes: 5
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
    votes: 2
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
    votes: 4,
  }
]*/

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />)
