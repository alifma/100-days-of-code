import { CssBaseline, Container } from '@mui/material';
import MarkdownPreviewer from './MarkdownPreviewer';

function App() {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <h1>Markdown Previewer</h1>
      <MarkdownPreviewer />
    </Container>
  );
}

export default App;
