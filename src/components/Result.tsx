import { ActionIcon, Button, Code, CopyButton, Group, Paper, Stack, Text, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy, IconReceipt, IconReload } from "@tabler/icons-react";

export const Result = ({ password, newPassword }: { password: string, newPassword: () => void }) => {
    return (
        <Paper withBorder radius="lg" p="lg">
            <Stack>
                <Text size="lg" ta="center">{password}</Text>
                <Group justify="center">
                    <Tooltip label="Generate a new password." withArrow position="bottom">
                        <ActionIcon radius="lg" onClick={newPassword} color="gray" variant="subtle">
                            <IconReload style={{ width: '70%', height: '70%' }} />
                        </ActionIcon>
                    </Tooltip>
                    <CopyButton value={password}>
                        {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                                <ActionIcon radius="lg" color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                    {copied ? (
                                        <IconCheck style={{ width: rem(16) }} />
                                    ) : (
                                        <IconCopy style={{ width: rem(16) }} />
                                    )}
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </CopyButton>
                </Group>
            </Stack>
        </Paper>
    );
}