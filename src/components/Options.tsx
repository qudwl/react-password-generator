import { Checkbox, Group, Slider, Stack, Text, Tooltip } from "@mantine/core";

export const Options = () => {
    return (
        <Stack gap="lg" m="lg">
            <Group justify="space-between">
                <Tooltip label="Use capital letters." refProp="rootRef">
                    <Checkbox label="ABC" title="Use capital letters." />
                </Tooltip>
                <Tooltip label="Use lowercase letters." refProp="rootRef">
                    <Checkbox label="abc" title="Use lowercase letters." />
                </Tooltip>
                <Tooltip label="Use numbers." refProp="rootRef">
                    <Checkbox label="123" title="Use numbers." />
                </Tooltip>
                <Tooltip label="Use special characters." refProp="rootRef">
                    <Checkbox label="!@#$" title="Use special characters." />
                </Tooltip>
            </Group>
            <Stack>
                <Text id="lengthLabel">Length</Text>
                <Slider marks={[
                    { value: 10, label: '10' },
                    { value: 15, label: '15' },
                    { value: 20, label: '20' },
                    { value: 25, label: '25' }
                ]} min={5} max={30} aria-labelledby="lengthLabel" />
            </Stack>
        </Stack>
    );
}