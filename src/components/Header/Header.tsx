import { Flex, Heading, TabNav } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Flex justify={'between'} align={'end'}>
        <Heading className={'logo'}>
          <Link to={'/'}>NopeBlog</Link>
        </Heading>

        <nav>
          <TabNav.Root>
            <TabNav.Link asChild>
              <NavLink to={'/'} className={'pointer'}>
                Home
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/new-post'} className={'pointer'}>
                New Post
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/contacts'} className={'pointer'}>
                Contacts
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/about'} className={'pointer'}>
                About
              </NavLink>
            </TabNav.Link>
          </TabNav.Root>
        </nav>
      </Flex>
    </header>
  );
};
