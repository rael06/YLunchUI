import { Container, Box, styled  } from '@material-ui/core'
import { Link } from 'react-router-dom'
import logo from './YLunch-logo.png';

const Logo = styled('img')({
  maxHeight: "6rem"
})

export default function Header() {
  return (
    <Box boxShadow={1}>
    <header>
      <Container maxWidth="xl" >
        <Link to="/">
          <Logo src={logo} alt="Logo Ylunch" />
        </Link>
      </Container>
    </header>
    </Box>
  )
}
