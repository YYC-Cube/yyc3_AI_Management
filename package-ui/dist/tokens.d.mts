declare const tokens: {
    colors: {
        brand: {
            primary: string;
            "primary-foreground": string;
            secondary: string;
            "secondary-foreground": string;
            accent: string;
            "accent-foreground": string;
        };
        background: {
            DEFAULT: string;
            foreground: string;
        };
        card: {
            DEFAULT: string;
            foreground: string;
        };
        muted: {
            DEFAULT: string;
            foreground: string;
        };
        border: string;
        input: string;
        ring: string;
        destructive: {
            DEFAULT: string;
            foreground: string;
        };
    };
    spacing: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        8: string;
        10: string;
        12: string;
        16: string;
        20: string;
        24: string;
    };
    borderRadius: {
        sm: string;
        DEFAULT: string;
        lg: string;
        xl: string;
        "2xl": string;
        full: string;
    };
    fontSize: {
        xs: (string | {
            lineHeight: string;
        })[];
        sm: (string | {
            lineHeight: string;
        })[];
        base: (string | {
            lineHeight: string;
        })[];
        lg: (string | {
            lineHeight: string;
        })[];
        xl: (string | {
            lineHeight: string;
        })[];
        "2xl": (string | {
            lineHeight: string;
        })[];
        "3xl": (string | {
            lineHeight: string;
        })[];
        "4xl": (string | {
            lineHeight: string;
        })[];
        "5xl": (string | {
            lineHeight: string;
        })[];
    };
    fontWeight: {
        light: string;
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
        extrabold: string;
    };
    shadows: {
        sm: string;
        DEFAULT: string;
        md: string;
        lg: string;
        xl: string;
    };
    breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        "2xl": string;
    };
};
type Tokens = typeof tokens;

export { type Tokens, tokens };
