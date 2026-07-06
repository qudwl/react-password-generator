import { Container, MantineProvider, Stack, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { useCallback, useEffect, useState } from "react";
import { EditPasswordModal } from "./components/EditPasswordModal";
import { History } from "./components/History";
import { Options } from "./components/Options";
import { Result } from "./components/Result";
import { SavePasswordModal } from "./components/SavePasswordModal";
import { useSecureHistory } from "./hooks/useSecureHistory";
import { simplePasswordGen } from "./passwordGen";
import type { SavedPasswordItem } from "./types";

const App = () => {
	const [useUpper, setUseUpper] = useState<boolean>(true);
	const [useLower, setUseLower] = useState<boolean>(true);
	const [useNumbers, setUseNumbers] = useState<boolean>(true);
	const [useSpecial, setUseSpecial] = useState<boolean>(true);
	const [length, setLength] = useState<number>(10);
	const [result, setResult] = useState<string>("");

	const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<SavedPasswordItem | null>(
		null,
	);

	const {
		savedPasswords,
		isEncrypted,
		isUnlocked,
		onUnlock,
		onLock,
		onSetMasterPassword,
		onDisableEncryption,
		onDeletePassword,
		onResetAll,
		onSavePassword,
		onEditSave,
	} = useSecureHistory();

	const newPassword = useCallback(() => {
		setResult(
			simplePasswordGen(useUpper, useLower, useNumbers, useSpecial, length),
		);
	}, [useUpper, useLower, useNumbers, useSpecial, length]);

	useEffect(() => {
		newPassword();
	}, [newPassword]);

	const isResultInvalid =
		result === "" || result === "Please select at least one option.";
	const saveDisabled = isResultInvalid || (isEncrypted && !isUnlocked);

	return (
		<MantineProvider>
			<Container size="xs" mt="lg" mb="xl">
				<Stack gap="lg">
					<Title ta="center">Password Generator</Title>
					<Options
						upper={useUpper}
						setUpper={setUseUpper}
						length={length}
						lower={useLower}
						numbers={useNumbers}
						special={useSpecial}
						setLength={setLength}
						setLower={setUseLower}
						setNumbers={setUseNumbers}
						setSpecial={setUseSpecial}
					/>
					<Result
						password={result}
						newPassword={newPassword}
						onSaveClick={() => setIsSaveModalOpen(true)}
						saveDisabled={saveDisabled}
					/>
					<History
						savedPasswords={savedPasswords}
						isEncrypted={isEncrypted}
						isUnlocked={isUnlocked}
						onUnlock={onUnlock}
						onLock={onLock}
						onSetMasterPassword={onSetMasterPassword}
						onDisableEncryption={onDisableEncryption}
						onDeletePassword={onDeletePassword}
						onResetAll={onResetAll}
						onEditClick={(item) => {
							setEditingItem(item);
							setIsEditModalOpen(true);
						}}
					/>
				</Stack>
			</Container>

			<SavePasswordModal
				opened={isSaveModalOpen}
				onClose={() => setIsSaveModalOpen(false)}
				passwordToSave={result}
				onSave={(website, username) =>
					onSavePassword(result, website, username)
				}
			/>

			<EditPasswordModal
				opened={isEditModalOpen}
				onClose={() => {
					setIsEditModalOpen(false);
					setEditingItem(null);
				}}
				item={editingItem}
				onSave={onEditSave}
			/>
		</MantineProvider>
	);
};

export default App;
