import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Loading from './pages/Loading';
import Result from './pages/Result';
import { useI18n, LangToggle } from './i18n';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/result" element={<Result />} />
        <Route path="/animals" element={<PlaceholderPage pageKey="gallery" />} />
        <Route path="/animals/:id" element={<PlaceholderPage pageKey="detail" />} />
        <Route path="/about" element={<PlaceholderPage pageKey="about" />} />
        <Route path="/match" element={<PlaceholderPage pageKey="match" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ pageKey }) {
  const { t } = useI18n();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh gap-4 px-6">
      <div className="absolute top-3 right-3 md:top-4 md:right-4">
        <LangToggle />
      </div>
      <p className="text-text-muted text-lg">
        {t(`placeholder.${pageKey}`)} — {t('common.developing')}
      </p>
    </div>
  );
}
