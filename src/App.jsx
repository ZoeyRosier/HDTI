import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/animals" element={<PlaceholderPage title="动物图鉴" />} />
        <Route path="/animals/:id" element={<PlaceholderPage title="动物档案" />} />
        <Route path="/about" element={<PlaceholderPage title="算法解析" />} />
        <Route path="/match" element={<PlaceholderPage title="好友匹配" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <p className="text-text-muted text-lg">{title} — 开发中</p>
    </div>
  );
}
