
import CryptoJS from "crypto-js";
const SECRET_KEY = 'mr.Sy'
export function encryptCrypto(objectData){
    // Encrypt
    const encryptText = CryptoJS.AES.encrypt(JSON.stringify(objectData), SECRET_KEY).toString();
    return encryptText
}

export function decryptCrypto(encryptText ){
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(encryptText, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

export function encryptCryptoString(stringData){
    // Encrypt
    const encryptText = CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
    return encryptText
}

export function decryptCryptoString(encryptText ){
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(encryptText, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData
}