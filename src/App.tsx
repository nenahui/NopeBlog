import { Container } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NewPost } from './pages/NewPost/NewPost';
import { Contacts } from './pages/Contacts/Contacts';
import { About } from './pages/About/About';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <Container size={'2'} mt={'2'}>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/posts'} element={<Home />} />
        <Route path={'/new-post'} element={<NewPost />} />
        <Route path={'/contacts'} element={<Contacts />} />
        <Route path={'/about'} element={<About />} />
      </Routes>
    </Container>
  );
};
