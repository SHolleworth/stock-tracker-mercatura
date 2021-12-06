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

export default {
    spacing: 10,

    palette: {
        primary: COLORS.MEDIUM_TEXT,
        text: {
            primary: COLORS.MEDIUM_TEXT,
            secondary: COLORS.ACCENT_PRIMARY,
            tertiary: COLORS.LIGHT_TEXT,
        }
    },

    typography: {
        h2: {
            fontFamily: 'Merriweather',
            fontSize: '0.8125rem',
            fontWeight: 700,
            lineHeight: 1.54,
        },
        subtitle1: {
            fontFamily: 'Roboto',
            fontSize: '0.75rem',
            fontWeight: 300,
            fontStyle: 'italic'
        }
    }
}