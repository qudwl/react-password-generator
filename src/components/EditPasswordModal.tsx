import {
	Button,
	Group,
	Modal,
	PasswordInput,
	Stack,
	TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import type { SavedPasswordItem } from "../types";

interface EditPasswordModalProps {
	opened: boolean;
	onClose: () => void;
	item: SavedPasswordItem | null;
	onSave: (id: string, updatedFields: Partial<SavedPasswordItem>) => void;
}

export const EditPasswordModal = ({
	opened,
	onClose,
	item,
	onSave,
}: EditPasswordModalProps) => {
	const [website, setWebsite] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (item) {
			setWebsite(item.website || "");
			setUsername(item.username || "");
			setPassword(item.password);
		}
	}, [item]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!item || !password.trim()) return;
		onSave(item.id, {
			website: website.trim() || undefined,
			username: username.trim() || undefined,
			password: password.trim(),
		});
		onClose();
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title="Edit Saved Password"
			centered
			radius="lg"
			size="sm"
		>
			<form onSubmit={handleSubmit}>
				<Stack gap="md">
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
					<PasswordInput
						label="Password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						styles={{ innerInput: { fontFamily: "monospace" } }}
					/>
					<Group justify="flex-end" mt="md">
						<Button variant="subtle" color="gray" onClick={onClose} radius="md">
							Cancel
						</Button>
						<Button type="submit" color="blue" radius="md">
							Save Changes
						</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	);
};
