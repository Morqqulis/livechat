/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '20px',
            screens: {
                pc: '1400px',
                lg: '1200px',
                md: '992px',
                sm: '768px',
                xs: '490px'
            }
        },
        extend: {}
    },
    // eslint-disable-next-line no-undef
    plugins: [require('tailwindcss-animated')]
}
