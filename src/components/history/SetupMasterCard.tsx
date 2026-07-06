import {
	Alert,
	Button,
	Card,
	Group,
	PasswordInput,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { IconAlertCircle, IconShieldLock } from "@tabler/icons-react";
import { useState } from "react";

interface SetupMasterCardProps {
	onSetMaster: (password: string) => Promise<void>;
	onCancel: () => void;
}

export const SetupMasterCard = ({
	onSetMaster,
	onCancel,
}: SetupMasterCardProps) => {
	const [masterPassword, setMasterPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [setupError, setSetupError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSetupError("");

		if (masterPassword.length < 4) {
			setSetupError("Master password must be at least 4 characters long.");
			return;
		}

		if (masterPassword !== confirmPassword) {
			setSetupError("Passwords do not match.");
			return;
		}

		try {
			await onSetMaster(masterPassword);
			setMasterPassword("");
			setConfirmPassword("");
		} catch {
			setSetupError("Failed to encrypt history. Try again.");
		}
	};

	return (
		<Card withBorder radius="xl" p="xl" shadow="md">
			<Stack gap="md">
				<Group justify="space-between">
					<Group gap="xs">
						<ThemeIcon color="blue" size="lg" radius="md" variant="light">
							<IconShieldLock size="1.2rem" />
						</ThemeIcon>
						<Text size="lg" fw={700}>
							Setup Master Password
						</Text>
					</Group>
					<Button size="xs" variant="subtle" color="gray" onClick={onCancel}>
						Cancel
					</Button>
				</Group>

				<Text size="sm" c="dimmed">
					Encrypt your password history locally in your browser. You will need
					this password to unlock your saved passwords in the future.
				</Text>

				<form onSubmit={handleSubmit}>
					<Stack gap="sm">
						<PasswordInput
							label="New Master Password"
							placeholder="Enter master password"
							value={masterPassword}
							onChange={(e) => setMasterPassword(e.target.value)}
							required
						/>
						<PasswordInput
							label="Confirm Master Password"
							placeholder="Confirm master password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>

						{setupError && (
							<Alert
								icon={<IconAlertCircle size="1rem" />}
								color="red"
								variant="light"
								py="xs"
							>
								{setupError}
							</Alert>
						)}

						<Button type="submit" color="blue" mt="xs" radius="md" fullWidth>
							Enable Encryption & Lock
						</Button>
					</Stack>
				</form>
			</Stack>
		</Card>
	);
};
