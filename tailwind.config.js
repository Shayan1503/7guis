/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'custom-color': {
                    100: '#dad7cd',
                    200: '#a3b18a',
                    300: '#588157',
                    400: '#3a5a40',
                    500: '#344e41'
                }
            }
        }
    },
    plugins: []
};