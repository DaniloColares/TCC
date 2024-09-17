import { Container } from "./styles";

export function DeviceButton({deviceName, ...rest}) {
  return (
    <Container 
      type="button"
      {...rest}
    >
      {deviceName}
    </Container>
  )
}