import { Stack, Text, ThemeIcon } from "@mantine/core";
import { IconKey } from "@tabler/icons-react";

export const EmptyHistoryState = () => {
	return (
		<Stack align="center" gap="xs" py="xl">
			<ThemeIcon color="gray" size="xl" radius="xl" variant="light">
				<IconKey size="1.8rem" />
			</ThemeIcon>
			<Text size="sm" fw={500} c="dimmed">
				No saved passwords yet.
			</Text>
			<Text size="xs" c="dimmed" ta="center">
				Generate a password above, fill in website/username, and click Save.
			</Text>
		</Stack>
	);
};
