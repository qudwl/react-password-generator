import type { SavedPasswordItem } from "../types";
import { decryptData, encryptData } from "./crypto";

export const getPlaintextHistory = (): SavedPasswordItem[] => {
	const historyData = localStorage.getItem("pw_history_data");
	if (!historyData) return [];
	try {
		return JSON.parse(historyData);
	} catch {
		return [];
	}
};

export const getEncryptedHistory = async (
	pw: string,
): Promise<SavedPasswordItem[]> => {
	const historyRaw = localStorage.getItem("pw_history_data");
	if (!historyRaw) return [];
	try {
		const historyPayload = JSON.parse(historyRaw);
		const decryptedHistoryStr = await decryptData(historyPayload, pw);
		return JSON.parse(decryptedHistoryStr);
	} catch {
		return [];
	}
};

export const savePlaintextHistory = (list: SavedPasswordItem[]) => {
	localStorage.setItem("pw_history_data", JSON.stringify(list));
	localStorage.setItem("pw_history_encrypted", "false");
	localStorage.removeItem("pw_verification");
};

export const saveEncryptedHistory = async (
	list: SavedPasswordItem[],
	pw: string,
) => {
	const encrypted = await encryptData(JSON.stringify(list), pw);
	localStorage.setItem("pw_history_data", JSON.stringify(encrypted));
};

export const saveVerification = async (pw: string) => {
	const verificationPayload = await encryptData("verified", pw);
	localStorage.setItem("pw_verification", JSON.stringify(verificationPayload));
	localStorage.setItem("pw_history_encrypted", "true");
};

export const verifyMasterPassword = async (pw: string): Promise<boolean> => {
	const verificationRaw = localStorage.getItem("pw_verification");
	if (!verificationRaw) return false;
	try {
		const verificationPayload = JSON.parse(verificationRaw);
		const verifiedStr = await decryptData(verificationPayload, pw);
		return verifiedStr === "verified";
	} catch {
		return false;
	}
};

export const clearSecureStorage = () => {
	localStorage.removeItem("pw_history_encrypted");
	localStorage.removeItem("pw_history_data");
	localStorage.removeItem("pw_verification");
};
