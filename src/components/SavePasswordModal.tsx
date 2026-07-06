import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

interface SavePasswordModalProps {
	opened: boolean;
	onClose: () => void;
	passwordToSave: string;
	onSave: (website: string, username: string) => void;
}

export const SavePasswordModal = ({
	opened,
	onClose,
	passwordToSave,
	onSave,
}: SavePasswordModalProps) => {
	const [website, setWebsite] = useState("");
	const [username, setUsername] = useState("");

	// Reset fields when opened
	useEffect(() => {
		if (opened) {
			setWebsite("");
			setUsername("");
		}
	}, [opened]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(website, username);
		onClose();
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title="Save Generated Password"
			centered
			radius="lg"
			size="sm"
		>
			<form onSubmit={handleSubmit}>
				<Stack gap="md">
					<TextInput
						label="Password"
						value={passwordToSave}
						readOnly
						disabled
						styles={{
							input: {
								fontFamily: "monospace",
							},
						}}
					/>

					<TextInput
						label="Website / App"
						placeholder="e.g. google.com"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
						data-autofocus
					/>

					<TextInput
						label="Username / Email"
						placeholder="e.g. user@example.com"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<Group justify="flex-end" mt="md">
						<Button variant="subtle" color="gray" onClick={onClose} radius="md">
							Cancel
						</Button>
						<Button type="submit" color="blue" radius="md">
							Save Password
						</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	);
};
