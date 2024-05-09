import React from 'react';
import { marked } from 'marked';
import { Box, TextField, Grid, Typography } from '@mui/material';

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = React.useState('');

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Enter Markdown"
            multiline
            fullWidth
            rows={20}
            variant="outlined"
            onChange={handleChange}
            value={markdown}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography component="div" sx={{ border: '1px solid grey', padding: 2, minHeight: '100%', overflowY: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MarkdownPreviewer;
