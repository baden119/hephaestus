import { Container } from '../styled/Container.styled';
import { StyledHeader, Nav } from '../styled/Header.styled';
const Header: React.FC = () => {
  return (
    <StyledHeader color='green'>
      <Container>
        <Nav>
          <h1>Hephaestus Header</h1>
        </Nav>
      </Container>
    </StyledHeader>
  );
};
export default Header;
