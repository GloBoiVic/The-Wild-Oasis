import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

const LoginLayout = styled.main`
  min-height: 80vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log into your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
