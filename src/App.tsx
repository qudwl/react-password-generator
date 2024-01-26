import { Container, MantineProvider, Title } from "@mantine/core"
import '@mantine/core/styles.css';
import { Options } from "./components/Options";


const App = () => {

  return (
    <MantineProvider>
      <Container size="xs" mt="lg">
        <Title ta="center">Password Generator</Title>
        <Options />
      </Container>
    </MantineProvider>
  )
}

export default App;