const hexStringToArrayBuffer = (hex: string) => {
  const hexMatches = hex.match(/.{1,2}/g) || [];
  const typedArray = new Uint8Array(hexMatches.map((byte) => parseInt(byte, 16)));
  return typedArray.buffer;
};

export const Decrypt = async (text: string, key: string) => {
  const [ivHex, dataHex] = text.split(':');
  const iv = hexStringToArrayBuffer(ivHex);
  const data = hexStringToArrayBuffer(dataHex);
  const alg = { name: 'AES-CBC', iv: iv };
  const cryptoKey = await crypto.subtle.importKey('raw', hexStringToArrayBuffer(key), alg, false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt(alg, cryptoKey, data);
  const dec = new TextDecoder();
  return dec.decode(decrypted);
};
