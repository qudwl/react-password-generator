import {
	ActionIcon,
	Card,
	CopyButton,
	Group,
	PasswordInput,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import {
	IconCheck,
	IconCopy,
	IconPencil,
	IconTrash,
	IconUser,
	IconWorld,
} from "@tabler/icons-react";
import type { SavedPasswordItem } from "../../types";

interface PasswordItemCardProps {
	item: SavedPasswordItem;
	isVisible: boolean;
	onToggleVisibility: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export const PasswordItemCard = ({
	item,
	isVisible,
	onToggleVisibility,
	onEdit,
	onDelete,
}: PasswordItemCardProps) => {
	return (
		<Card withBorder p="md" radius="lg" style={{ overflow: "visible" }}>
			<Stack gap="xs">
				<Group justify="space-between" wrap="nowrap">
					<Stack gap={2} style={{ flexGrow: 1, minWidth: 0 }}>
						{item.website ? (
							<Group gap="xs" wrap="nowrap">
								<IconWorld size="0.95rem" style={{ flexShrink: 0 }} />
								<Text size="sm" fw={600} truncate style={{ maxWidth: "180px" }}>
									{item.website}
								</Text>
							</Group>
						) : (
							<Text size="xs" c="dimmed" fs="italic">
								No Website
							</Text>
						)}

						{item.username ? (
							<Group gap="xs" wrap="nowrap">
								<IconUser size="0.95rem" style={{ flexShrink: 0 }} />
								<Text
									size="xs"
									c="dimmed"
									truncate
									style={{ maxWidth: "180px" }}
								>
									{item.username}
								</Text>
							</Group>
						) : (
							<Text size="xs" c="dimmed" fs="italic">
								No Username
							</Text>
						)}
					</Stack>
					<Text size="10px" c="dimmed">
						{new Date(item.createdAt).toLocaleDateString()}
					</Text>
				</Group>

				<Group gap="xs" align="center" style={{ width: "100%" }}>
					<div style={{ flexGrow: 1 }}>
						<PasswordInput
							value={item.password}
							readOnly
							visible={isVisible}
							onVisibilityChange={onToggleVisibility}
							radius="md"
							styles={{
								innerInput: {
									fontFamily: "monospace",
								},
							}}
						/>
					</div>

					<CopyButton value={item.password}>
						{({ copied, copy }) => (
							<Tooltip
								label={copied ? "Copied" : "Copy password"}
								withArrow
								position="bottom"
							>
								<ActionIcon
									variant="light"
									color={copied ? "teal" : "gray"}
									onClick={copy}
									size="lg"
									radius="md"
								>
									{copied ? (
										<IconCheck size="1rem" />
									) : (
										<IconCopy size="1rem" />
									)}
								</ActionIcon>
							</Tooltip>
						)}
					</CopyButton>

					<Tooltip label="Edit saved details">
						<ActionIcon
							variant="light"
							color="blue"
							onClick={onEdit}
							size="lg"
							radius="md"
						>
							<IconPencil size="1rem" />
						</ActionIcon>
					</Tooltip>

					<Tooltip label="Delete saved password">
						<ActionIcon
							variant="light"
							color="red"
							onClick={onDelete}
							size="lg"
							radius="md"
						>
							<IconTrash size="1rem" />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Stack>
		</Card>
	);
};
