import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dictionary } from './pages/Dictionary';
import { DictionaryCategory } from './pages/DictionaryCategory';
import { Games } from './pages/Games';
import { AssociationPuzzleGame } from './pages/AssociationPuzzleGame.tsx';
import { Home } from './pages/Home';
import { MemoryGame } from './pages/MemoryGame';
import { Practice } from './pages/Practice';

/**
 * Rutas principales de la SPA educativa LSM (solo frontend).
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/diccionario" element={<Dictionary />} />
        <Route path="/diccionario/:categoryId" element={<DictionaryCategory />} />
        <Route path="/practicar" element={<Practice />} />
        <Route path="/juegos" element={<Games />} />
        <Route path="/juegos/memorama" element={<MemoryGame />} />
        <Route path="/juegos/rompecabezas" element={<AssociationPuzzleGame />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
