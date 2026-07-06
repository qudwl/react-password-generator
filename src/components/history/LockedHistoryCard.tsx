import {
	Alert,
	Button,
	Card,
	Divider,
	Group,
	PasswordInput,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconLock } from "@tabler/icons-react";
import { useState } from "react";

interface LockedHistoryCardProps {
	onUnlock: (password: string) => Promise<boolean>;
	onResetAll: () => void;
}

export const LockedHistoryCard = ({
	onUnlock,
	onResetAll,
}: LockedHistoryCardProps) => {
	const [unlockPassword, setUnlockPassword] = useState("");
	const [unlockError, setUnlockError] = useState("");
	const [unlocking, setUnlocking] = useState(false);
	const [showResetConfirm, { toggle: toggleResetConfirm }] =
		useDisclosure(false);

	const handleUnlock = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!unlockPassword) return;

		setUnlocking(true);
		setUnlockError("");

		try {
			const success = await onUnlock(unlockPassword);
			if (success) {
				setUnlockPassword("");
			} else {
				setUnlockError("Incorrect master password.");
			}
		} catch {
			setUnlockError("Failed to decrypt. The password may be incorrect.");
		} finally {
			setUnlocking(false);
		}
	};

	return (
		<Card withBorder radius="xl" p="xl" shadow="md">
			<Stack gap="md" align="stretch">
				<Group justify="center" mt="sm">
					<ThemeIcon color="red" size="xl" radius="xl" variant="light">
						<IconLock size="2rem" />
					</ThemeIcon>
				</Group>
				<Text size="lg" fw={700} ta="center">
					Password History Locked
				</Text>
				<Text size="sm" c="dimmed" ta="center">
					Your saved passwords are encrypted using AES-GCM. Please enter your
					master password to decrypt them.
				</Text>

				<form onSubmit={handleUnlock}>
					<Stack gap="xs">
						<PasswordInput
							placeholder="Enter master password"
							value={unlockPassword}
							onChange={(e) => setUnlockPassword(e.target.value)}
							disabled={unlocking}
							required
						/>

						{unlockError && (
							<Alert
								icon={<IconAlertCircle size="1.1rem" />}
								color="red"
								variant="light"
								py="xs"
							>
								{unlockError}
							</Alert>
						)}

						<Button
							type="submit"
							color="red"
							loading={unlocking}
							radius="md"
							fullWidth
						>
							Unlock History
						</Button>
					</Stack>
				</form>

				<Divider label="Alternative Options" labelPosition="center" my="sm" />

				{showResetConfirm ? (
					<Alert
						icon={<IconAlertCircle size="1.2rem" />}
						color="red"
						title="Warning"
						variant="light"
					>
						<Text size="xs" mb="xs">
							Resetting will permanently delete your master password and ALL
							currently saved passwords. This cannot be undone.
						</Text>
						<Group gap="xs">
							<Button size="xs" color="red" onClick={onResetAll}>
								Yes, Reset Everything
							</Button>
							<Button
								size="xs"
								variant="subtle"
								color="gray"
								onClick={toggleResetConfirm}
							>
								Cancel
							</Button>
						</Group>
					</Alert>
				) : (
					<Button
						size="xs"
						variant="subtle"
						color="red"
						onClick={toggleResetConfirm}
					>
						Forgot Password? Reset History
					</Button>
				)}
			</Stack>
		</Card>
	);
};
