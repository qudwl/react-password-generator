import { Card, Divider, Stack } from "@mantine/core";
import { useState } from "react";
import type { SavedPasswordItem } from "../types";
import { EmptyHistoryState } from "./history/EmptyHistoryState";
import { HistoryHeader } from "./history/HistoryHeader";
import { LockedHistoryCard } from "./history/LockedHistoryCard";
import { PasswordItemCard } from "./history/PasswordItemCard";
import { SetupMasterCard } from "./history/SetupMasterCard";

interface HistoryProps {
	savedPasswords: SavedPasswordItem[];
	isEncrypted: boolean;
	isUnlocked: boolean;
	onUnlock: (password: string) => Promise<boolean>;
	onLock: () => void;
	onSetMasterPassword: (password: string) => Promise<void>;
	onDisableEncryption: () => Promise<void>;
	onDeletePassword: (id: string) => void;
	onResetAll: () => void;
	onEditClick: (item: SavedPasswordItem) => void;
}

export const History = ({
	savedPasswords,
	isEncrypted,
	isUnlocked,
	onUnlock,
	onLock,
	onSetMasterPassword,
	onDisableEncryption,
	onDeletePassword,
	onResetAll,
	onEditClick,
}: HistoryProps) => {
	const [setupMode, setSetupMode] = useState(false);
	const [visiblePasswords, setVisiblePasswords] = useState<
		Record<string, boolean>
	>({});

	const togglePasswordVisibility = (id: string) => {
		setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const handleSetMaster = async (pw: string) => {
		await onSetMasterPassword(pw);
		setSetupMode(false);
	};

	if (setupMode) {
		return (
			<SetupMasterCard
				onSetMaster={handleSetMaster}
				onCancel={() => setSetupMode(false)}
			/>
		);
	}

	if (isEncrypted && !isUnlocked) {
		return <LockedHistoryCard onUnlock={onUnlock} onResetAll={onResetAll} />;
	}

	return (
		<Card withBorder radius="xl" p="xl" shadow="md">
			<Stack gap="md">
				<HistoryHeader
					itemCount={savedPasswords.length}
					isEncrypted={isEncrypted}
					onLock={onLock}
					onDisableEncryption={onDisableEncryption}
					onSetupLock={() => setSetupMode(true)}
				/>

				<Divider />

				{savedPasswords.length === 0 ? (
					<EmptyHistoryState />
				) : (
					<Stack gap="sm" style={{ maxHeight: "400px", overflowY: "auto" }}>
						{savedPasswords.map((item) => (
							<PasswordItemCard
								key={item.id}
								item={item}
								isVisible={visiblePasswords[item.id] || false}
								onToggleVisibility={() => togglePasswordVisibility(item.id)}
								onEdit={() => onEditClick(item)}
								onDelete={() => onDeletePassword(item.id)}
							/>
						))}
					</Stack>
				)}
			</Stack>
		</Card>
	);
};
