import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
}

const theme = extendTheme({
    components: {
        Text: {
            color: "white"
        }
    },
    breakpoints,
    config
})

export default theme