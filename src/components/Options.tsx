import { Checkbox, Group, Paper, Slider, Stack, Text, Tooltip } from "@mantine/core";

type OptionsProps = {
    lower: boolean;
    setLower: (lower: boolean) => void;
    upper: boolean;
    setUpper: (upper: boolean) => void;
    numbers: boolean;
    setNumbers: (numbers: boolean) => void;
    special: boolean;
    setSpecial: (special: boolean) => void;
    length: number;
    setLength: (length: number) => void;
}

export const Options = ({ lower, setLower, upper, setUpper, numbers, setNumbers, special, setSpecial, length, setLength }: OptionsProps) => {
    return (
        <Paper shadow="md" withBorder radius="xl" p="xl">
            <Stack gap="lg" m="lg">
                <Group justify="space-between">
                    <Tooltip label="Use capital letters." refProp="rootRef">
                        <Checkbox radius="lg" checked={upper} onChange={(e) => setUpper(e.currentTarget.checked)} label="ABC" title="Use capital letters." />
                    </Tooltip>
                    <Tooltip label="Use lowercase letters." refProp="rootRef">
                        <Checkbox radius="lg" checked={lower} onChange={(e) => setLower(e.currentTarget.checked)} label="abc" title="Use lowercase letters." />
                    </Tooltip>
                    <Tooltip label="Use numbers." refProp="rootRef">
                        <Checkbox radius="lg" checked={numbers} onChange={(e) => setNumbers(e.currentTarget.checked)} label="123" title="Use numbers." />
                    </Tooltip>
                    <Tooltip label="Use special characters." refProp="rootRef">
                        <Checkbox radius="lg" checked={special} onChange={(e) => setSpecial(e.currentTarget.checked)} label="!@#$" title="Use special characters." />
                    </Tooltip>
                </Group>
                <Stack>
                    <Text id="lengthLabel">Length</Text>
                    <Slider value={length} onChange={setLength} marks={[
                        { value: 10, label: '10' },
                        { value: 15, label: '15' },
                        { value: 20, label: '20' },
                        { value: 25, label: '25' }
                    ]} min={5} max={30} aria-labelledby="lengthLabel" />
                </Stack>
            </Stack>
        </Paper>
    );
}