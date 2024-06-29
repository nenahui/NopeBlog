import { Container, Text } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NewPost } from './pages/NewPost/NewPost';
import { Contacts } from './pages/Contacts/Contacts';
import { About } from './pages/About/About';
import { Header } from './components/Header/Header';
import { PostForm } from './components/PostForm/PostForm';
import { PagesForm } from './components/PagesForm/PagesForm';

export const App = () => {
  return (
    <Container size={'2'}>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/posts'} element={<Home />} />
        <Route path={'/new-post'} element={<NewPost />} />
        <Route path={'/contacts'} element={<Contacts />}>
          <Route path={'edit'} element={<PagesForm type={'contacts'} />} />
        </Route>
        <Route path={'/about'} element={<About />}>
          <Route path={'edit'} element={<PagesForm type={'about'} />} />
        </Route>
        <Route
          path={'/post/:postId/edit'}
          element={<PostForm type={'edit'} />}
        />
        <Route
          path={'*'}
          element={
            <Text as={'p'} mt={'3'} size={'8'} align={'center'}>
              Not found
            </Text>
          }
        />
      </Routes>
    </Container>
  );
};
