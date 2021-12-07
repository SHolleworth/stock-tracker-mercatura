const COLORS = {
    LIGHT_TEXT: '#7f7f7f',
    MEDIUM_TEXT: '#4d4d4d',
    DARK_TEXT: '#2b2b2b',
	ACCENT_PRIMARY: '#aaabd1',
	BACKGROUND_LIGHT: '#f9fafa',
	BACKGROUND_DARK: '#f1f2f2',
	UI_ELEMENT: '#d8d9d9',
	UI_ELEMENT_LIGHT: '#eaebeb',
	NEGATIVE: '#f23441',
	POSITIVE: '#01c38d'
}

// --symbol-fontsize: 2rem;
// --section-headers-fontsize: 1rem;
// --subheader-fontsize: 0.8125rem;
// --content-fontsize: 0.75rem;
// --smallcontent-fontsize: 0.6875rem;

const theme = {
    spacing: (x: number = 1) => `${10 * x}px`,

    palette: {
        primary: COLORS.UI_ELEMENT,
        secondary: COLORS.UI_ELEMENT_LIGHT,
        accent: COLORS.ACCENT_PRIMARY,
        text: {
            primary: COLORS.MEDIUM_TEXT,
            secondary: COLORS.ACCENT_PRIMARY,
            tertiary: COLORS.LIGHT_TEXT,
        }
    },

    typography: {

        body1: {
            fontFamily: '"Roboto", "sans-serif"',
            lineHeight: 1.67,
            letterSpacing: "0.09px",
            fontSize: "0.75rem",
        },

        h2: {
            fontFamily: 'Merriweather',
            fontSize: '1rem',
            fontWeight: 700,
        },

        h3: {
            fontFamily: 'Merriweather',
            fontSize: '0.8125rem',
            fontWeight: 700,
            lineHeight: 1.54,
        },
        
        subtitle2: {
            fontFamily: 'Roboto',
            fontSize: '0.8125rem',
            fontWeight: 500
        },

        subtitle1: {
            fontFamily: 'Roboto',
            fontSize: '0.75rem',
            fontWeight: 300,
            fontStyle: 'italic'
        }
    }
}

declare module '@mui/material/styles' {
    interface Palette {
      accent: Palette['primary'];
    }
    interface PaletteOptions {
      accent: PaletteOptions['primary'];
    }
}

export default theme