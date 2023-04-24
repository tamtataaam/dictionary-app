import { Layout } from 'components';
import { Route, Routes } from 'react-router-dom';

import { MainPage, StarredWordsPage } from './pages';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path="/starred" element={<StarredWordsPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
