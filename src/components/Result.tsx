import {
	ActionIcon,
	CopyButton,
	Group,
	Paper,
	rem,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import {
	IconCheck,
	IconCopy,
	IconDeviceFloppy,
	IconReload,
} from "@tabler/icons-react";

export const Result = ({
	password,
	newPassword,
	onSaveClick,
	saveDisabled,
}: {
	password: string;
	newPassword: () => void;
	onSaveClick: () => void;
	saveDisabled: boolean;
}) => {
	return (
		<Paper withBorder radius="lg" p="lg">
			<Stack>
				<Text size="lg" ta="center" style={{ wordBreak: "break-all" }}>
					{password}
				</Text>
				<Group justify="center">
					<Tooltip label="Generate a new password." withArrow position="bottom">
						<ActionIcon
							radius="lg"
							onClick={newPassword}
							color="gray"
							variant="subtle"
						>
							<IconReload style={{ width: "70%", height: "70%" }} />
						</ActionIcon>
					</Tooltip>
					<CopyButton value={password}>
						{({ copied, copy }) => (
							<Tooltip
								label={copied ? "Copied" : "Copy"}
								withArrow
								position="bottom"
							>
								<ActionIcon
									radius="lg"
									color={copied ? "teal" : "gray"}
									variant="subtle"
									onClick={copy}
								>
									{copied ? (
										<IconCheck style={{ width: rem(16) }} />
									) : (
										<IconCopy style={{ width: rem(16) }} />
									)}
								</ActionIcon>
							</Tooltip>
						)}
					</CopyButton>
					<Tooltip
						label={
							saveDisabled
								? "Please generate a valid password to save"
								: "Save password to history"
						}
						withArrow
						position="bottom"
					>
						<ActionIcon
							radius="lg"
							onClick={onSaveClick}
							color="blue"
							variant="subtle"
							disabled={saveDisabled}
						>
							<IconDeviceFloppy style={{ width: "70%", height: "70%" }} />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Stack>
		</Paper>
	);
};
