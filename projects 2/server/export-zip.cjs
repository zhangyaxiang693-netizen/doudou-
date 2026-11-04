const table = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = table[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function zipLocalHeader(file) {
  const name = Buffer.from(file.path, "utf8");
  if (name.length > 65535 || file.size > 0xffffffff) throw new Error("切图超过 ZIP 格式大小上限");
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x800, 6);
  header.writeUInt16LE(33, 12); // 1980-01-01, deterministic timestamp
  header.writeUInt32LE(file.crc, 14);
  header.writeUInt32LE(file.size, 18);
  header.writeUInt32LE(file.size, 22);
  header.writeUInt16LE(name.length, 26);
  return Buffer.concat([header, name]);
}
function zipCentralDirectory(files, offset) {
  if (offset > 0xffffffff || files.length > 65535) throw new Error("ZIP 文件超过大小上限");
  const parts = files.map((file) => {
    const name = Buffer.from(file.path, "utf8");
    const header = Buffer.alloc(46);
    header.writeUInt32LE(0x02014b50);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(20, 6);
    header.writeUInt16LE(0x800, 8);
    header.writeUInt16LE(33, 14);
    header.writeUInt32LE(file.crc, 16);
    header.writeUInt32LE(file.size, 20);
    header.writeUInt32LE(file.size, 24);
    header.writeUInt16LE(name.length, 28);
    header.writeUInt32LE(file.offset, 42);
    return Buffer.concat([header, name]);
  });
  const size = parts.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(size, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, end]);
}
module.exports = { crc32, zipLocalHeader, zipCentralDirectory };
