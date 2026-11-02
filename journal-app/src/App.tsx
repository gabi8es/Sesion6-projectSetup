import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AddJournal } from './pages/AddJournal'
import { Home } from './pages/Home'
import { MyJournals } from './pages/MyJournals'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="journals" element={<MyJournals />} />
          <Route path="journals/new" element={<AddJournal />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
