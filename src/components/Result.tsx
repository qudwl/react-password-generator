import { ActionIcon, Button, CopyButton, Group, Paper, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export const Result = ({ password }: { password: string }) => {
    return (
        <Paper withBorder radius="lg" p="lg">
            <Group justify="space-between">
                <Text ta="center" size="lg">{password}</Text>
                <CopyButton value={password}>
                    {({ copied, copy }) => (
                        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                            {copied ? 'Copied' : 'Copy'}
                        </Button>
                    )}
                </CopyButton>
            </Group>
        </Paper>
    );
}