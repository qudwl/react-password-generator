import { Container, MantineProvider, Stack, Title } from "@mantine/core"
import '@mantine/core/styles.css';
import { Options } from "./components/Options";
import { Result } from "./components/Result";
import { useEffect, useState } from "react";
import { simplePasswordGen } from "./passwordGen";


const App = () => {
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSpecial, setUseSpecial] = useState<boolean>(true);
  const [length, setLength] = useState<number>(10);
  const [result, setResult] = useState<string>("");

  const newPassword = () => {
    setResult(simplePasswordGen(useUpper, useLower, useNumbers, useSpecial, length));
  }

  useEffect(() => {
    newPassword();
  }, [useUpper, useLower, useNumbers, useSpecial, length]);

  return (
    <MantineProvider>
      <Container size="xs" mt="lg">
        <Stack gap="lg">
          <Title ta="center">Password Generator</Title>
          <Options
            upper={useUpper}
            setUpper={setUseUpper}
            length={length}
            lower={useLower}
            numbers={useNumbers}
            special={useSpecial}
            setLength={setLength}
            setLower={setUseLower}
            setNumbers={setUseNumbers}
            setSpecial={setUseSpecial} />
          <Result password={result} newPassword={newPassword} />
        </Stack>
      </Container>
    </MantineProvider>
  )
}

export default App;