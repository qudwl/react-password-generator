const ITERATIONS = 100000;
const HASH = "SHA-256";
const ALGORITHM = "AES-GCM";

function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

function hexToBytes(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = Number.parseInt(hex.substring(i * 2, i * 2 + 2), 16);
	}
	return bytes;
}

async function deriveKey(
	password: string,
	saltBytes: Uint8Array,
): Promise<CryptoKey> {
	const enc = new TextEncoder();
	const baseKey = await window.crypto.subtle.importKey(
		"raw",
		enc.encode(password),
		{ name: "PBKDF2" },
		false,
		["deriveKey"],
	);

	return window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: saltBytes as BufferSource,
			iterations: ITERATIONS,
			hash: HASH,
		},
		baseKey,
		{ name: ALGORITHM, length: 256 },
		false,
		["encrypt", "decrypt"],
	);
}

export interface EncryptedPayload {
	ciphertext: string;
	iv: string;
	salt: string;
}

export async function encryptData(
	plaintext: string,
	password: string,
): Promise<EncryptedPayload> {
	const saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
	const ivBytes = window.crypto.getRandomValues(new Uint8Array(12));
	const key = await deriveKey(password, saltBytes);

	const enc = new TextEncoder();
	const ciphertextBuffer = await window.crypto.subtle.encrypt(
		{
			name: ALGORITHM,
			iv: ivBytes as BufferSource,
		},
		key,
		enc.encode(plaintext),
	);

	return {
		ciphertext: bytesToHex(new Uint8Array(ciphertextBuffer)),
		iv: bytesToHex(ivBytes),
		salt: bytesToHex(saltBytes),
	};
}

export async function decryptData(
	payload: EncryptedPayload,
	password: string,
): Promise<string> {
	const saltBytes = hexToBytes(payload.salt);
	const ivBytes = hexToBytes(payload.iv);
	const ciphertextBytes = hexToBytes(payload.ciphertext);
	const key = await deriveKey(password, saltBytes);

	const decryptedBuffer = await window.crypto.subtle.decrypt(
		{
			name: ALGORITHM,
			iv: ivBytes as BufferSource,
		},
		key,
		ciphertextBytes as BufferSource,
	);

	const dec = new TextDecoder();
	return dec.decode(decryptedBuffer);
}
