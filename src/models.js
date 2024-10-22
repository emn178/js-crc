/**
 * [js-crc]{@link https://github.com/emn178/js-crc}
 *
 * @namespace crc
 * @version 0.3.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2024
 * @license MIT
 */
// https://reveng.sourceforge.io/crc-catalogue/all.htm
(function () {
  var MODELS = [
    {
      width: 3,
      poly: 0x3,
      init: 0x0,
      refin: false,
      refout: false,
      xorout: 0x7,
      name: 'CRC-3/GSM'
    },
    {
      width: 3,
      poly: 0x3,
      init: 0x7,
      refin: true,
      refout: true,
      xorout: 0x0,
      name: 'CRC-3/ROHC'
    },
    {
      width: 4,
      poly: 0x3,
      init: 0x0,
      refin: true,
      refout: true,
      xorout: 0x0,
      name: 'CRC-4/G-704',
      alias: ['CRC-4/ITU']
    },
    {
      width: 4,
      poly: 0x3,
      init: 0xf,
      refin: false,
      refout: false,
      xorout: 0xf,
      name: 'CRC-4/INTERLAKEN'
    },
    {
      width: 5,
      poly: 0x09,
      init: 0x09,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-5/EPC-C1G2',
      alias: ['CRC-5/EPC']
    },
    {
      width: 5,
      poly: 0x15,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-5/G-704',
      alias: ['CRC-5/ITU']
    },
    {
      width: 5,
      poly: 0x05,
      init: 0x1f,
      refin: true,
      refout: true,
      xorout: 0x1f,
      name: 'CRC-5/USB'
    },
    {
      width: 6,
      poly: 0x27,
      init: 0x3f,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-6/CDMA2000-A'
    },
    {
      width: 6,
      poly: 0x07,
      init: 0x3f,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-6/CDMA2000-B'
    },
    {
      width: 6,
      poly: 0x19,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-6/DARC'
    },
    {
      width: 6,
      poly: 0x03,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-6/G-704',
      alias: ['CRC-6/ITU']
    },
    {
      width: 6,
      poly: 0x2f,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x3f,
      name: 'CRC-6/GSM'
    },
    {
      width: 7,
      poly: 0x09,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-7/MMC',
      alias: ['CRC-7']
    },
    {
      width: 7,
      poly: 0x4f,
      init: 0x7f,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-7/ROHC'
    },
    {
      width: 7,
      poly: 0x45,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-7/UMTS'
    },
    {
      width: 8,
      poly: 0x2f,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0xff,
      name: 'CRC-8/AUTOSAR'
    },
    {
      width: 8,
      poly: 0xa7,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-8/BLUETOOTH'
    },
    {
      width: 8,
      poly: 0x9b,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/CDMA2000'
    },
    {
      width: 8,
      poly: 0x39,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-8/DARC'
    },
    {
      width: 8,
      poly: 0xd5,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/DVB-S2'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/GSM-A'
    },
    {
      width: 8,
      poly: 0x49,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0xff,
      name: 'CRC-8/GSM-B'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/HITAG'
    },
    {
      width: 8,
      poly: 0x07,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x55,
      name: 'CRC-8/I-432-1',
      alias: ['CRC-8/ITU']
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xfd,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/I-CODE'
    },
    {
      width: 8,
      poly: 0x9b,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/LTE'
    },
    {
      width: 8,
      poly: 0x31,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-8/MAXIM-DOW',
      alias: ['CRC-8/MAXIM', 'DOW-CRC']
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xc7,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/MIFARE-MAD'
    },
    {
      width: 8,
      poly: 0x31,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/NRSC-5'
    },
    {
      width: 8,
      poly: 0x2f,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/OPENSAFETY'
    },
    {
      width: 8,
      poly: 0x07,
      init: 0xff,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-8/ROHC'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0xff,
      name: 'CRC-8/SAE-J1850'
    },
    {
      width: 8,
      poly: 0x07,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      name: 'CRC-8/SMBUS',
      alias: ['CRC-8']
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xff,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-8/TECH-3250',
      alias: ['CRC-8/AES', 'CRC-8/EBU']
    },
    {
      width: 8,
      poly: 0x9b,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      name: 'CRC-8/WCDMA'
    },
    {
      width: 10,
      poly: 0x233,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x000,
      name: 'CRC-10/ATM',
      alias: ['CRC-10', 'CRC-10/I-610']
    },
    {
      width: 10,
      poly: 0x3d9,
      init: 0x3ff,
      refin: false,
      refout: false,
      xorout: 0x000,
      name: 'CRC-10/CDMA2000'
    },
    {
      width: 10,
      poly: 0x175,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x3ff,
      name: 'CRC-10/GSM'
    },
    {
      width: 11,
      poly: 0x385,
      init: 0x01a,
      refin: false,
      refout: false,
      xorout: 0x000,
      name: 'CRC-11/FLEXRAY',
      alias: ['CRC-11']
    },
    {
      width: 11,
      poly: 0x307,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x000,
      name: 'CRC-11/UMTS'
    },
    {
      width: 12,
      poly: 0xf13,
      init: 0xfff,
      refin: false,
      refout: false,
      xorout: 0x000,
      name: 'CRC-12/CDMA2000'
    },
    {
      width: 12,
      poly: 0x80f,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x000,
      name: 'CRC-12/DECT',
      alias: ['X-CRC-12']
    },
    {
      width: 12,
      poly: 0xd31,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0xfff,
      name: 'CRC-12/GSM'
    },
    {
      width: 12,
      poly: 0x80f,
      init: 0x000,
      refin: false,
      refout: true,
      xorout: 0x000,
      name: 'CRC-12/UMTS',
      alias: ['CRC-12/3GPP']
    },
    {
      width: 13,
      poly: 0x1cf5,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-13/BBC'
    },
    {
      width: 14,
      poly: 0x0805,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-14/DARC'
    },
    {
      width: 14,
      poly: 0x202d,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x3fff,
      name: 'CRC-14/GSM'
    },
    {
      width: 15,
      poly: 0x4599,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-15/CAN',
      alias: ['CRC-15']
    },
    {
      width: 15,
      poly: 0x6815,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0001,
      name: 'CRC-15/MPT1327'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/ARC',
      alias: ['ARC', 'CRC-16', 'CRC-16/LHA', 'CRC-IBM']
    },
    {
      width: 16,
      poly: 0xc867,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/CDMA2000'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/CMS'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x800d,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/DDS-110'
    },
    {
      width: 16,
      poly: 0x0589,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0001,
      name: 'CRC-16/DECT-R',
      alias: ['R-CRC-16']
    },
    {
      width: 16,
      poly: 0x0589,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/DECT-X',
      alias: ['X-CRC-16']
    },
    {
      width: 16,
      poly: 0x3d65,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0xffff,
      name: 'CRC-16/DNP'
    },
    {
      width: 16,
      poly: 0x3d65,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0xffff,
      name: 'CRC-16/EN-13757'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0xffff,
      name: 'CRC-16/GENIBUS',
      alias: ['CRC-16/DARC', 'CRC-16/EPC', 'CRC-16/EPC-C1G2', 'CRC-16/I-CODE']
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0xffff,
      name: 'CRC-16/GSM'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/IBM-3740',
      alias: ['CRC-16/AUTOSAR', 'CRC-16/CCITT-FALSE']
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0xffff,
      name: 'CRC-16/IBM-SDLC',
      alias: ['CRC-16/ISO-HDLC', 'CRC-16/ISO-IEC-14443-3-B', 'CRC-16/X-25', 'CRC-B', 'X-25']
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xc6c6,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/ISO-IEC-14443-3-A',
      alias: ['CRC-A']
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/KERMIT',
      alias: ['CRC-16/BLUETOOTH', 'CRC-16/CCITT', 'CRC-16/CCITT-TRUE', 'CRC-16/V-41-LSB', 'CRC-CCITT', 'KERMIT']
    },
    {
      width: 16,
      poly: 0x6f63,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/LJ1200'
    },
    {
      width: 16,
      poly: 0x5935,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/M17'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0xffff,
      name: 'CRC-16/MAXIM-DOW',
      alias: ['CRC-16/MAXIM']
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/MCRF4XX'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/MODBUS',
      alias: ['MODBUS']
    },
    {
      width: 16,
      poly: 0x080b,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/NRSC-5'
    },
    {
      width: 16,
      poly: 0x5935,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/OPENSAFETY-A'
    },
    {
      width: 16,
      poly: 0x755b,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/OPENSAFETY-B'
    },
    {
      width: 16,
      poly: 0x1dcf,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0xffff,
      name: 'CRC-16/PROFIBUS',
      alias: ['CRC-16/IEC-61158-2']
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xb2aa,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/RIELLO'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x1d0f,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/SPI-FUJITSU',
      alias: ['CRC-16/AUG-CCITT']
    },
    {
      width: 16,
      poly: 0x8bb7,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/T10-DIF'
    },
    {
      width: 16,
      poly: 0xa097,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/TELEDISK'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x89ec,
      refin: true,
      refout: true,
      xorout: 0x0000,
      name: 'CRC-16/TMS37157'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/UMTS',
      alias: ['CRC-16/BUYPASS', 'CRC-16/VERIFONE']
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0xffff,
      name: 'CRC-16/USB'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      name: 'CRC-16/XMODEM',
      alias: ['CRC-16/ACORN', 'CRC-16/LTE', 'CRC-16/V-41-MSB', 'XMODEM', 'ZMODEM']
    },
    {
      width: 17,
      poly: 0x1685b,
      init: 0x00000,
      refin: false,
      refout: false,
      xorout: 0x00000,
      name: 'CRC-17/CAN-FD'
    },
    {
      width: 21,
      poly: 0x102899,
      init: 0x000000,
      refin: false,
      refout: false,
      xorout: 0x000000,
      name: 'CRC-21/CAN-FD'
    },
    {
      width: 24,
      poly: 0x00065b,
      init: 0x555555,
      refin: true,
      refout: true,
      xorout: 0x000000,
      name: 'CRC-24/BLE'
    },
    {
      width: 24,
      poly: 0x5d6dcb,
      init: 0xfedcba,
      refin: false,
      refout: false,
      xorout: 0x000000,
      name: 'CRC-24/FLEXRAY-A'
    },
    {
      width: 24,
      poly: 0x5d6dcb,
      init: 0xabcdef,
      refin: false,
      refout: false,
      xorout: 0x000000,
      name: 'CRC-24/FLEXRAY-B'
    },
    {
      width: 24,
      poly: 0x328b63,
      init: 0xffffff,
      refin: false,
      refout: false,
      xorout: 0xffffff,
      name: 'CRC-24/INTERLAKEN'
    },
    {
      width: 24,
      poly: 0x864cfb,
      init: 0x000000,
      refin: false,
      refout: false,
      xorout: 0x000000,
      name: 'CRC-24/LTE-A'
    },
    {
      width: 24,
      poly: 0x800063,
      init: 0x000000,
      refin: false,
      refout: false,
      xorout: 0x000000,
      name: 'CRC-24/LTE-B'
    },
    {
      width: 24,
      poly: 0x864cfb,
      init: 0xb704ce,
      refin: false,
      refout: false,
      xorout: 0x000000,
      name: 'CRC-24/OPENPGP',
      alias: ['CRC-24']
    },
    {
      width: 24,
      poly: 0x800063,
      init: 0xffffff,
      refin: false,
      refout: false,
      xorout: 0xffffff,
      name: 'CRC-24/OS-9'
    },
    {
      width: 30,
      poly: 0x2030b9c7,
      init: 0x3fffffff,
      refin: false,
      refout: false,
      xorout: 0x3fffffff,
      name: 'CRC-30/CDMA'
    },
    {
      width: 31,
      poly: 0x04c11db7,
      init: 0x7fffffff,
      refin: false,
      refout: false,
      xorout: 0x7fffffff,
      name: 'CRC-31/PHILIPS'
    },
    {
      width: 32,
      poly: 0x814141ab,
      init: 0x00000000,
      refin: false,
      refout: false,
      xorout: 0x00000000,
      name: 'CRC-32/AIXM',
      alias: ['CRC-32Q']
    },
    {
      width: 32,
      poly: 0xf4acfb13,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      name: 'CRC-32/AUTOSAR'
    },
    {
      width: 32,
      poly: 0xa833982b,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      name: 'CRC-32/BASE91-D',
      alias: ['CRC-32D']
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: false,
      refout: false,
      xorout: 0xffffffff,
      name: 'CRC-32/BZIP2',
      alias: ['CRC-32/AAL5', 'CRC-32/DECT-B', 'B-CRC-32']
    },
    {
      width: 32,
      poly: 0x8001801b,
      init: 0x00000000,
      refin: true,
      refout: true,
      xorout: 0x00000000,
      name: 'CRC-32/CD-ROM-EDC'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0x00000000,
      refin: false,
      refout: false,
      xorout: 0xffffffff,
      name: 'CRC-32/CKSUM',
      alias: ['CKSUM', 'CRC-32/POSIX']
    },
    {
      width: 32,
      poly: 0x1edc6f41,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      name: 'CRC-32/ISCSI',
      alias: ['CRC-32/BASE91-C', 'CRC-32/CASTAGNOLI', 'CRC-32/INTERLAKEN', 'CRC-32C', 'CRC-32/NVME']
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      name: 'CRC-32/ISO-HDLC',
      alias: ['CRC-32', 'CRC-32/ADCCP', 'CRC-32/V-42', 'CRC-32/XZ', 'PKZIP']
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0x00000000,
      name: 'CRC-32/JAMCRC',
      alias: ['JAMCRC']
    },
    {
      width: 32,
      poly: 0x741b8cd7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0x00000000,
      name: 'CRC-32/MEF'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: false,
      refout: false,
      xorout: 0x00000000,
      name: 'CRC-32/MPEG-2'
    },
    {
      width: 32,
      poly: 0x000000af,
      init: 0x00000000,
      refin: false,
      refout: false,
      xorout: 0x00000000,
      name: 'CRC-32/XFER',
      alias: ['XFER']
    },
    {
      width: 40,
      poly: [0x00, 0x04820009],
      init: [0x00, 0x00000000],
      refin: false,
      refout: false,
      xorout: [0xff, 0xffffffff],
      name: 'CRC-40/GSM'
    },
    {
      width: 64,
      poly: [0x42f0e1eb, 0xa9ea3693],
      init: [0, 0],
      refin: false,
      refout: false,
      xorout: [0, 0],
      name: 'CRC-64/ECMA-182',
      alias: ['CRC-64']
    },
    {
      width: 64,
      poly: [0x00000000, 0x0000001b],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0xffffffff, 0xffffffff],
      name: 'CRC-64/GO-ISO'
    },
    {
      width: 64,
      poly: [0x259c84cb, 0xa6426349],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0, 0],
      name: 'CRC-64/MS'
    },
    {
      width: 64,
      poly: [0xad93d235, 0x94c93659],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0xffffffff, 0xffffffff],
      name: 'CRC-64/NVME'
    },
    {
      width: 64,
      poly: [0xad93d235, 0x94c935a9],
      init: [0, 0],
      refin: true,
      refout: true,
      xorout: [0, 0],
      name: 'CRC-64/REDIS'
    },
    {
      width: 64,
      poly: [0x42f0e1eb, 0xa9ea3693],
      init: [0xffffffff, 0xffffffff],
      refin: false,
      refout: false,
      xorout: [0xffffffff, 0xffffffff],
      name: 'CRC-64/WE'
    },
    {
      width: 64,
      poly: [0x42f0e1eb, 0xa9ea3693],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0xffffffff, 0xffffffff],
      name: 'CRC-64/XZ',
      alias: ['CRC-64/GO-ECMA']
    },
    {
      width: 82,
      poly: [0x0308c, 0x01110114, 0x01440411],
      init: [0, 0, 0],
      refin: true,
      refout: true,
      xorout: [0, 0, 0],
      name: 'CRC-82/DARC'
    }
  ];

  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_CRC_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS =
    !root.JS_CRC_NO_NODE_JS &&
    typeof process === 'object' &&
    process.versions &&
    process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS =
    !root.JS_CRC_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;

  function createMethods(exports) {
    for (var i = 0; i < MODELS.length; ++i) {
      var model = MODELS[i];
      var methodName = model.name.replace(/[-/]/g, '_').toLocaleLowerCase();
      exports[methodName] = createModel(MODELS[i]);
      if (model.alias) {
        for (var j = 0; j < model.alias.length; ++j) {
          var aliasMethodName = model.alias[j].replace(/[-/]/g, '_').toLocaleLowerCase();
          exports[aliasMethodName] = exports[methodName];
        }
      }
    }
  }

  var createModel;
  var exports = {};
  if (COMMON_JS) {
    createModel = require('./crc.js').createModel;
    createMethods(exports);
    module.exports = exports;
  } else {
    createModel = root.createModel;
    createMethods(exports);
    for (var key in exports) {
      root[key] = exports[key];
    }
    if (AMD) {
      define(function () {
        return exports;
      });
    }
  }
})();
