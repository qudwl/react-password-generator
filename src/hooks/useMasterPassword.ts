import { useEffect, useState } from "react";
import type { SavedPasswordItem } from "../types";
import {
	getEncryptedHistory,
	saveEncryptedHistory,
	savePlaintextHistory,
	saveVerification,
	verifyMasterPassword,
} from "../utils/secureStorage";

export const useMasterPassword = (
	savedPasswords: SavedPasswordItem[],
	onDecryptedHistoryLoaded: (list: SavedPasswordItem[]) => void,
) => {
	const [isEncrypted, setIsEncrypted] = useState(false);
	const [isUnlocked, setIsUnlocked] = useState(true);
	const [masterPassword, setMasterPassword] = useState<string | null>(null);

	useEffect(() => {
		const isEnc = localStorage.getItem("pw_history_encrypted") === "true";
		setIsEncrypted(isEnc);
		setIsUnlocked(!isEnc);
	}, []);

	const onUnlock = async (pw: string): Promise<boolean> => {
		if (await verifyMasterPassword(pw)) {
			onDecryptedHistoryLoaded(await getEncryptedHistory(pw));
			setIsUnlocked(true);
			setMasterPassword(pw);
			return true;
		}
		return false;
	};

	const onLock = () => {
		setIsUnlocked(false);
		onDecryptedHistoryLoaded([]);
		setMasterPassword(null);
	};

	const onSetMasterPassword = async (pw: string) => {
		await saveVerification(pw);
		await saveEncryptedHistory(savedPasswords, pw);
		setIsEncrypted(true);
		setIsUnlocked(true);
		setMasterPassword(pw);
	};

	const onDisableEncryption = async () => {
		savePlaintextHistory(savedPasswords);
		setIsEncrypted(false);
		setIsUnlocked(true);
		setMasterPassword(null);
	};

	return {
		isEncrypted,
		isUnlocked,
		masterPassword,
		onUnlock,
		onLock,
		onSetMasterPassword,
		onDisableEncryption,
		setIsEncrypted,
		setIsUnlocked,
		setMasterPassword,
	};
};
