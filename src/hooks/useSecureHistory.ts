import { useEffect, useState } from "react";
import type { SavedPasswordItem } from "../types";
import {
	clearSecureStorage,
	getPlaintextHistory,
	saveEncryptedHistory,
} from "../utils/secureStorage";
import { useMasterPassword } from "./useMasterPassword";

export const useSecureHistory = () => {
	const [savedPasswords, setSavedPasswords] = useState<SavedPasswordItem[]>([]);

	const {
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
	} = useMasterPassword(savedPasswords, setSavedPasswords);

	useEffect(() => {
		const isEnc = localStorage.getItem("pw_history_encrypted") === "true";
		if (!isEnc) {
			setSavedPasswords(getPlaintextHistory());
		}
	}, []);

	const saveList = async (list: SavedPasswordItem[], pw: string | null) => {
		setSavedPasswords(list);
		if (isEncrypted && pw) {
			await saveEncryptedHistory(list, pw);
		} else {
			localStorage.setItem("pw_history_data", JSON.stringify(list));
		}
	};

	const onDeletePassword = (id: string) =>
		saveList(
			savedPasswords.filter((p) => p.id !== id),
			masterPassword,
		);

	const onResetAll = () => {
		clearSecureStorage();
		setSavedPasswords([]);
		setIsEncrypted(false);
		setIsUnlocked(true);
		setMasterPassword(null);
	};

	const onSavePassword = (
		password: string,
		website: string,
		username: string,
	) => {
		const newItem = {
			id: window.crypto.randomUUID
				? window.crypto.randomUUID()
				: Math.random().toString(36).substring(2, 11),
			password,
			website: website.trim() || undefined,
			username: username.trim() || undefined,
			createdAt: new Date().toISOString(),
		};
		saveList([newItem, ...savedPasswords], masterPassword);
	};

	const onEditSave = (
		id: string,
		updatedFields: Partial<SavedPasswordItem>,
	) => {
		const updated = savedPasswords.map((item) =>
			item.id === id ? { ...item, ...updatedFields } : item,
		);
		saveList(updated, masterPassword);
	};

	return {
		savedPasswords,
		isEncrypted,
		isUnlocked,
		masterPassword,
		onUnlock,
		onLock,
		onSetMasterPassword,
		onDisableEncryption,
		onDeletePassword,
		onResetAll,
		onSavePassword,
		onEditSave,
	};
};
