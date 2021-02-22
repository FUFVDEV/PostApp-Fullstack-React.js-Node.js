import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles'
import Post from './pages/Post/Post'
import theme from './global/themeConfig'
import './App.css';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Container maxWidth="md">
        <Post />
      </Container>
    </ThemeProvider>
  );
}

export default App;
