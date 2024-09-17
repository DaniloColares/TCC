import { Container } from "./styles";

export function ButtonIcon({icon: Icon, ...rest}) {
  return (
    <Container 
      type="button"
      {...rest}
    >
      {Icon && <Icon size={200} />}
    </Container>
  )
}