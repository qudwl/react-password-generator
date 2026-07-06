import {
	ActionIcon,
	Badge,
	Button,
	Group,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { IconLock, IconShieldLock } from "@tabler/icons-react";

interface HistoryHeaderProps {
	itemCount: number;
	isEncrypted: boolean;
	onLock: () => void;
	onDisableEncryption: () => Promise<void>;
	onSetupLock: () => void;
}

export const HistoryHeader = ({
	itemCount,
	isEncrypted,
	onLock,
	onDisableEncryption,
	onSetupLock,
}: HistoryHeaderProps) => {
	return (
		<Group justify="space-between" align="center">
			<Stack gap={0}>
				<Group gap="xs">
					<Text size="lg" fw={700}>
						Saved Passwords
					</Text>
					<Badge
						color={isEncrypted ? "teal" : "gray"}
						variant="light"
						radius="sm"
					>
						{isEncrypted ? "Encrypted" : "Unencrypted"}
					</Badge>
				</Group>
				<Text size="xs" c="dimmed">
					{itemCount} item{itemCount !== 1 ? "s" : ""} saved
				</Text>
			</Stack>

			<Group gap="xs">
				{isEncrypted ? (
					<>
						<Tooltip label="Lock history immediately">
							<ActionIcon variant="light" color="red" onClick={onLock}>
								<IconLock size="1.1rem" />
							</ActionIcon>
						</Tooltip>
						<Button
							size="xs"
							variant="subtle"
							color="gray"
							onClick={onDisableEncryption}
						>
							Disable Encryption
						</Button>
					</>
				) : (
					<Button
						size="xs"
						leftSection={<IconShieldLock size="0.9rem" />}
						variant="light"
						color="blue"
						onClick={onSetupLock}
					>
						Lock with Password
					</Button>
				)}
			</Group>
		</Group>
	);
};
