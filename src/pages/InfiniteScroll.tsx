import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardMedia, Grid, CircularProgress } from '@mui/material';

interface DogImage {
  id: string;
  url: string;
}

const InfiniteScroll: React.FC = () => {
  const [images, setImages] = useState<DogImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random/5');
      const data = await response.json();
      
      if (data.status === 'success') {
        const newImages = data.message.map((url: string, index: number) => ({
          id: `${page}-${index}`,
          url,
        }));
        setImages(prev => [...prev, ...newImages]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) {
      fetchImages();
    }
  }, [fetchImages]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Infinite Scroll Dog Gallery
      </Typography>
      
      <Grid container spacing={3}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={image.url}
                alt="Dog"
                sx={{
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default InfiniteScroll; 