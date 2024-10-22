type Message = string | number[] | ArrayBuffer | Uint8Array;

interface Crc {
  /**
   * Update crc
   *
   * @param message The message you want to check.
   */
  update(message: Message): Crc;

  /**
   * Return checksum in hex string.
   */
  hex(): string;

  /**
   * Return checksum in hex string.
   */
  toString(): string;

  /**
   * Return checksum in integer array.
   */
  array(): number[];
}

interface Model {
  /**
   * Check and return hex string.
   *
   * @param message The message you want to check.
   */
  (message: Message): string;

  /**
   * Create a crc object.
   */
  create(): Crc;

  /**
   * Create a crc object and check message.
   *
   * @param message The message you want to check.
   */
  update(message: Message): Crc;

  /**
   * Return checksum in hex string.
   *
   * @param message The message you want to check.
   */
  hex(message: Message): string;

  /**
   * Return checksum in integer array.
   *
   * @param message The message you want to check.
   */
  array(message: Message): number[];
}

interface ModelOptions {
  /**
   * The number of bit cells in the linear feedback shift register; the degree of the generator polynomial, less one.
   */
  width: number;

  /**
   * The generator polynomial that sets the feedback tap positions of the shift register. poly is written in the hexadecimal, direct notation found in MSB-first code. The least significant bit corresponds to the inward end of the shift register, and is always set. The highest-order term is omitted.
   */
  poly: number | number[];

  /**
   * The settings of the bit cells at the start of each calculation, before reading the first message bit. init is written in the hexadecimal, direct notation found in MSB-first code. The least significant bit corresponds to the inward end of the shift register.
   */
  init: number | number[];

  /**
   * If equal to false, specifies that the characters of the message are read bit-by-bit, most significant bit (MSB) first; if equal to true, the characters are read bit-by-bit, least significant bit (LSB) first. Each sampled message bit is then XORed with the bit being simultaneously shifted out of the register at the most significant end, and the result is passed to the feedback taps.
   */
  refin: boolean;

  /**
   * If equal to false, specifies that the contents of the register after reading the last message bit are unreflected before presentation; if equal to true, it specifies that they are reflected, character-by-character, before presentation. For the purpose of this definition, the reflection is performed by swapping the content of each cell with that of the cell an equal distance from the opposite end of the register; the characters of the CRC are then true images of parts of the reflected register, the character containing the original MSB always appearing first.
   */
  refout: boolean;

  /**
   * The XOR value applied to the contents of the register after the last message bit has been read and after the optional reflection. xorout is written in hexadecimal notation, having the same endianness as the CRC such that its true image appears in the characters of the CRC.
   */
  xorout: number | number[];
}

export var crc16: Model;
export var crc32: Model;

/**
 * Create a crc model.
 *
 * @param modelOptions The model options.
 */
export function createModel(modelOptions: ModelOptions): Model;
