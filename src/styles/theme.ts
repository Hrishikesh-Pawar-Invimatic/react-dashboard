import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
        filled: {
          '&:hover': {
            opacity: 0.9,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: alpha('#2196f3', 0.04),
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.1)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 4px 8px rgba(0,0,0,0.08)',
    '0 8px 16px rgba(0,0,0,0.1)',
    '0 16px 24px rgba(0,0,0,0.12)',
    '0 24px 32px rgba(0,0,0,0.14)',
    '0 32px 40px rgba(0,0,0,0.16)',
    '0 40px 48px rgba(0,0,0,0.18)',
    '0 48px 56px rgba(0,0,0,0.2)',
    '0 56px 64px rgba(0,0,0,0.22)',
    '0 64px 72px rgba(0,0,0,0.24)',
    '0 72px 80px rgba(0,0,0,0.26)',
    '0 80px 88px rgba(0,0,0,0.28)',
    '0 88px 96px rgba(0,0,0,0.3)',
    '0 96px 104px rgba(0,0,0,0.32)',
    '0 104px 112px rgba(0,0,0,0.34)',
    '0 112px 120px rgba(0,0,0,0.36)',
    '0 120px 128px rgba(0,0,0,0.38)',
    '0 128px 136px rgba(0,0,0,0.4)',
    '0 136px 144px rgba(0,0,0,0.42)',
    '0 144px 152px rgba(0,0,0,0.44)',
    '0 152px 160px rgba(0,0,0,0.46)',
    '0 160px 168px rgba(0,0,0,0.48)',
    '0 168px 176px rgba(0,0,0,0.5)',
    '0 176px 184px rgba(0,0,0,0.52)',
  ],
}); 