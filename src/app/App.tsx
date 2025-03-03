import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Loader } from 'src/components/Loader/Loader';
import { ROUTES } from 'src/constants/constants';

const RepositoriesPage = lazy(() => import("src/pages/RepositoriesPage"));
const FavoritesPage = lazy(() => import("src/pages/FavoritesPage"));
const ProfilePage = lazy(() => import("src/pages/ProfilePage"));

export const App = () => {
  return (
    <BrowserRouter basename="/github-search/">
      <Suspense fallback={<Loader loading={true} />}>
        <Routes>
          <Route path={ROUTES.home} element={<RepositoriesPage />} />
          <Route path={ROUTES.favorites} element={<FavoritesPage />} />
          <Route path={ROUTES.profile} element={<ProfilePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
