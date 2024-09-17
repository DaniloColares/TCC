import { Container } from "./styles";

export function Input({ icon: Icon, height='56px', ...rest }) {
  return (
    <Container style={height={height}}>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}