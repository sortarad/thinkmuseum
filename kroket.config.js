const colors = {
    white: '#fff',
    primary: '#dd2700',
    'dark': '#1e1f21',
    'dark-tint': '#2c2d2f',
};

const fonts = {
    base:
    '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Berthold City", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Pica", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace'

};

const baseSize = 1.5;

const sizes = {
    100: baseSize * 0.42 + 'rem',
    200: baseSize * 0.56 + 'rem',
    300: baseSize * 0.75 + 'rem',
    400: baseSize + 'rem',
    500: baseSize * 1.33 + 'rem',
    600: baseSize * 1.77 + 'rem',
    700: baseSize * 2.36 + 'rem',
    800: baseSize * 3.15 + 'rem',
    900: baseSize * 4.2 + 'rem',
    1000: baseSize * 5.6 + 'rem',
};

module.exports = {
    outputPath: {
        sass: {
            config: 'resources/scss/_config.scss',
            utilities: 'resources/scss/utilities/_kroket.scss',
        },
        json: 'assets/tokens.json',
    },
    items: {
        color: {
            items: colors,
            output: ['sass', 'json'],
        },
        size: {
            items: sizes,
            output: ['sass', 'json'],
        },
    },
    breakpoints: {
        sm: '(min-width: 32em)',
        md: '(min-width: 48em)',
        lg: '(min-width: 68em)',
    },
    utilities: {
        bg: {
            items: colors,
            output: 'standard',
            property: 'background',
        },
        color: {
            items: colors,
            output: 'standard',
            property: 'color',
        },
        'flow-space': {
            items: sizes,
            output: 'standard',
            property: '--flow-space',
        },
        z: {
            items: {
                default: 0,
                overlay: 1,
            },
            output: 'standard',
            property: 'z-index',
        },
        font: {
            items: fonts,
            output: 'standard',
            property: 'font-family',
        },
        shadow: {
            items: {
                base:
                    '0 0.3px 0.2px rgba(0, 0, 0, 0.025), 0 0.8px 0.5px rgba(0, 0, 0, 0.03), 0 1.5px 0.9px rgba(0, 0, 0, 0.033), 0 2.7px 1.6px rgba(0, 0, 0, 0.036), 0 5px 2.9px rgba(0, 0, 0, 0.039), 0 12px 7px rgba(0, 0, 0, 0.05)',
                heavy:
                    '0 0.7px 0.3px rgba(0, 0, 0, 0.025), 0 1.7px 0.7px rgba(0, 0, 0, 0.03), 0 3.1px 1.4px rgba(0, 0, 0, 0.033), 0 5.6px 2.5px rgba(0, 0, 0, 0.036), 0 10.4px 4.6px rgba(0, 0, 0, 0.039), 0 25px 11px rgba(0, 0, 0, 0.05)',
            },
            output: 'standard',
            property: 'box-shadow',
        },
        radius: {
            items: {
                normal: '5px',
                large: '10px',
            },
            output: 'standard',
            property: 'border-radius',
        },
        'gap-top': {
            items: sizes,
            output: 'standard',
            property: 'margin-top',
        },
        'gap-bottom': {
            items: sizes,
            output: 'standard',
            property: 'margin-bottom',
        },
        'border-top': {
            items: {
                shade: '3px solid rgba(0, 0, 0, 0.1)',
                'shade-dashed': '3px dashed rgba(0, 0, 0, 0.1)',
            },
            output: 'standard',
            property: 'border-top',
        },
        leading: {
            items: {
                flat: '1.1',
                mid: '1.5',
                loose: '1.7',
            },
            output: 'standard',
            property: 'line-height',
        },
        measure: {
            items: {
                long: '80ch',
                short: '50ch',
                compact: '30ch',
            },
            output: 'standard',
            property: 'max-width',
        },
        text: {
            items: sizes,
            output: 'responsive',
            property: 'font-size',
        },
        weight: {
            items: {
                normal: '400',
                bold: '700',
            },
            output: 'standard',
            property: 'font-weight',
        },
    },
};
