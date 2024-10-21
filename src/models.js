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
      check: 0x4,
      name: 'CRC-3/GSM'
    },
    {
      width: 3,
      poly: 0x3,
      init: 0x7,
      refin: true,
      refout: true,
      xorout: 0x0,
      check: 0x6,
      name: 'CRC-3/ROHC'
    },
    {
      width: 4,
      poly: 0x3,
      init: 0x0,
      refin: true,
      refout: true,
      xorout: 0x0,
      check: 0x7,
      name: 'CRC-4/G-704'
    },
    {
      width: 4,
      poly: 0x3,
      init: 0xf,
      refin: false,
      refout: false,
      xorout: 0xf,
      check: 0xb,
      name: 'CRC-4/INTERLAKEN'
    },
    {
      width: 5,
      poly: 0x09,
      init: 0x09,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x00,
      name: 'CRC-5/EPC-C1G2'
    },
    {
      width: 5,
      poly: 0x15,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x07,
      name: 'CRC-5/G-704'
    },
    {
      width: 5,
      poly: 0x05,
      init: 0x1f,
      refin: true,
      refout: true,
      xorout: 0x1f,
      check: 0x19,
      name: 'CRC-5/USB'
    },
    {
      width: 6,
      poly: 0x27,
      init: 0x3f,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x0d,
      name: 'CRC-6/CDMA2000-A'
    },
    {
      width: 6,
      poly: 0x07,
      init: 0x3f,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x3b,
      name: 'CRC-6/CDMA2000-B'
    },
    {
      width: 6,
      poly: 0x19,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x26,
      name: 'CRC-6/DARC'
    },
    {
      width: 6,
      poly: 0x03,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x06,
      name: 'CRC-6/G-704'
    },
    {
      width: 6,
      poly: 0x2f,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x3f,
      check: 0x13,
      name: 'CRC-6/GSM'
    },
    {
      width: 7,
      poly: 0x09,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x75,
      name: 'CRC-7/MMC'
    },
    {
      width: 7,
      poly: 0x4f,
      init: 0x7f,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x53,
      name: 'CRC-7/ROHC'
    },
    {
      width: 7,
      poly: 0x45,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x61,
      name: 'CRC-7/UMTS'
    },
    {
      width: 8,
      poly: 0x2f,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0xff,
      check: 0xdf,
      name: 'CRC-8/AUTOSAR'
    },
    {
      width: 8,
      poly: 0xa7,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x26,
      name: 'CRC-8/BLUETOOTH'
    },
    {
      width: 8,
      poly: 0x9b,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0xda,
      name: 'CRC-8/CDMA2000'
    },
    {
      width: 8,
      poly: 0x39,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x15,
      name: 'CRC-8/DARC'
    },
    {
      width: 8,
      poly: 0xd5,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0xbc,
      name: 'CRC-8/DVB-S2'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x37,
      name: 'CRC-8/GSM-A'
    },
    {
      width: 8,
      poly: 0x49,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0xff,
      check: 0x94,
      name: 'CRC-8/GSM-B'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0xb4,
      name: 'CRC-8/HITAG'
    },
    {
      width: 8,
      poly: 0x07,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x55,
      check: 0xa1,
      name: 'CRC-8/I-432-1'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xfd,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x7e,
      name: 'CRC-8/I-CODE'
    },
    {
      width: 8,
      poly: 0x9b,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0xea,
      name: 'CRC-8/LTE'
    },
    {
      width: 8,
      poly: 0x31,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0xa1,
      name: 'CRC-8/MAXIM-DOW'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xc7,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x99,
      name: 'CRC-8/MIFARE-MAD'
    },
    {
      width: 8,
      poly: 0x31,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0xf7,
      name: 'CRC-8/NRSC-5'
    },
    {
      width: 8,
      poly: 0x2f,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0x3e,
      name: 'CRC-8/OPENSAFETY'
    },
    {
      width: 8,
      poly: 0x07,
      init: 0xff,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0xd0,
      name: 'CRC-8/ROHC'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xff,
      refin: false,
      refout: false,
      xorout: 0xff,
      check: 0x4b,
      name: 'CRC-8/SAE-J1850'
    },
    {
      width: 8,
      poly: 0x07,
      init: 0x00,
      refin: false,
      refout: false,
      xorout: 0x00,
      check: 0xf4,
      name: 'CRC-8/SMBUS'
    },
    {
      width: 8,
      poly: 0x1d,
      init: 0xff,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x97,
      name: 'CRC-8/TECH-3250'
    },
    {
      width: 8,
      poly: 0x9b,
      init: 0x00,
      refin: true,
      refout: true,
      xorout: 0x00,
      check: 0x25,
      name: 'CRC-8/WCDMA'
    },
    {
      width: 10,
      poly: 0x233,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x000,
      check: 0x199,
      name: 'CRC-10/ATM'
    },
    {
      width: 10,
      poly: 0x3d9,
      init: 0x3ff,
      refin: false,
      refout: false,
      xorout: 0x000,
      check: 0x233,
      name: 'CRC-10/CDMA2000'
    },
    {
      width: 10,
      poly: 0x175,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x3ff,
      check: 0x12a,
      name: 'CRC-10/GSM'
    },
    {
      width: 11,
      poly: 0x385,
      init: 0x01a,
      refin: false,
      refout: false,
      xorout: 0x000,
      check: 0x5a3,
      name: 'CRC-11/FLEXRAY'
    },
    {
      width: 11,
      poly: 0x307,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x000,
      check: 0x061,
      name: 'CRC-11/UMTS'
    },
    {
      width: 12,
      poly: 0xf13,
      init: 0xfff,
      refin: false,
      refout: false,
      xorout: 0x000,
      check: 0xd4d,
      name: 'CRC-12/CDMA2000'
    },
    {
      width: 12,
      poly: 0x80f,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0x000,
      check: 0xf5b,
      name: 'CRC-12/DECT'
    },
    {
      width: 12,
      poly: 0xd31,
      init: 0x000,
      refin: false,
      refout: false,
      xorout: 0xfff,
      check: 0xb34,
      name: 'CRC-12/GSM'
    },
    {
      width: 12,
      poly: 0x80f,
      init: 0x000,
      refin: false,
      refout: true,
      xorout: 0x000,
      check: 0xdaf,
      name: 'CRC-12/UMTS'
    },
    {
      width: 13,
      poly: 0x1cf5,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x04fa,
      name: 'CRC-13/BBC'
    },
    {
      width: 14,
      poly: 0x0805,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0x082d,
      name: 'CRC-14/DARC'
    },
    {
      width: 14,
      poly: 0x202d,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x3fff,
      check: 0x30ae,
      name: 'CRC-14/GSM'
    },
    {
      width: 15,
      poly: 0x4599,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x059e,
      name: 'CRC-15/CAN'
    },
    {
      width: 15,
      poly: 0x6815,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0001,
      check: 0x2566,
      name: 'CRC-15/MPT1327'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0xbb3d,
      name: 'CRC-16/ARC'
    },
    {
      width: 16,
      poly: 0xc867,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x4c06,
      name: 'CRC-16/CDMA2000'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0xaee7,
      name: 'CRC-16/CMS'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x800d,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x9ecf,
      name: 'CRC-16/DDS-110'
    },
    {
      width: 16,
      poly: 0x0589,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0001,
      check: 0x007e,
      name: 'CRC-16/DECT-R'
    },
    {
      width: 16,
      poly: 0x0589,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x007f,
      name: 'CRC-16/DECT-X'
    },
    {
      width: 16,
      poly: 0x3d65,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0xffff,
      check: 0xea82,
      name: 'CRC-16/DNP'
    },
    {
      width: 16,
      poly: 0x3d65,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0xffff,
      check: 0xc2b7,
      name: 'CRC-16/EN-13757'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0xffff,
      check: 0xd64e,
      name: 'CRC-16/GENIBUS'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0xffff,
      check: 0xce3c,
      name: 'CRC-16/GSM'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x29b1,
      name: 'CRC-16/IBM-3740'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0xffff,
      check: 0x906e,
      name: 'CRC-16/IBM-SDLC'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xc6c6,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0xbf05,
      name: 'CRC-16/ISO-IEC-14443-3-A'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0x2189,
      name: 'CRC-16/KERMIT'
    },
    {
      width: 16,
      poly: 0x6f63,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0xbdf4,
      name: 'CRC-16/LJ1200'
    },
    {
      width: 16,
      poly: 0x5935,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x772b,
      name: 'CRC-16/M17'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0xffff,
      check: 0x44c2,
      name: 'CRC-16/MAXIM-DOW'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0x6f91,
      name: 'CRC-16/MCRF4XX'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0x4b37,
      name: 'CRC-16/MODBUS'
    },
    {
      width: 16,
      poly: 0x080b,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0xa066,
      name: 'CRC-16/NRSC-5'
    },
    {
      width: 16,
      poly: 0x5935,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x5d38,
      name: 'CRC-16/OPENSAFETY-A'
    },
    {
      width: 16,
      poly: 0x755b,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x20fe,
      name: 'CRC-16/OPENSAFETY-B'
    },
    {
      width: 16,
      poly: 0x1dcf,
      init: 0xffff,
      refin: false,
      refout: false,
      xorout: 0xffff,
      check: 0xa819,
      name: 'CRC-16/PROFIBUS'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0xb2aa,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0x63d0,
      name: 'CRC-16/RIELLO'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x1d0f,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0xe5cc,
      name: 'CRC-16/SPI-FUJITSU'
    },
    {
      width: 16,
      poly: 0x8bb7,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0xd0db,
      name: 'CRC-16/T10-DIF'
    },
    {
      width: 16,
      poly: 0xa097,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x0fb3,
      name: 'CRC-16/TELEDISK'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x89ec,
      refin: true,
      refout: true,
      xorout: 0x0000,
      check: 0x26b1,
      name: 'CRC-16/TMS37157'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0xfee8,
      name: 'CRC-16/UMTS'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0xffff,
      refin: true,
      refout: true,
      xorout: 0xffff,
      check: 0xb4c8,
      name: 'CRC-16/USB'
    },
    {
      width: 16,
      poly: 0x1021,
      init: 0x0000,
      refin: false,
      refout: false,
      xorout: 0x0000,
      check: 0x31c3,
      name: 'CRC-16/XMODEM'
    },
    {
      width: 17,
      poly: 0x1685b,
      init: 0x00000,
      refin: false,
      refout: false,
      xorout: 0x00000,
      check: 0x04f03,
      name: 'CRC-17/CAN-FD'
    },
    {
      width: 21,
      poly: 0x102899,
      init: 0x000000,
      refin: false,
      refout: false,
      xorout: 0x000000,
      check: 0x0ed841,
      name: 'CRC-21/CAN-FD'
    },
    {
      width: 24,
      poly: 0x00065b,
      init: 0x555555,
      refin: true,
      refout: true,
      xorout: 0x000000,
      check: 0xc25a56,
      name: 'CRC-24/BLE'
    },
    {
      width: 24,
      poly: 0x5d6dcb,
      init: 0xfedcba,
      refin: false,
      refout: false,
      xorout: 0x000000,
      check: 0x7979bd,
      name: 'CRC-24/FLEXRAY-A'
    },
    {
      width: 24,
      poly: 0x5d6dcb,
      init: 0xabcdef,
      refin: false,
      refout: false,
      xorout: 0x000000,
      check: 0x1f23b8,
      name: 'CRC-24/FLEXRAY-B'
    },
    {
      width: 24,
      poly: 0x328b63,
      init: 0xffffff,
      refin: false,
      refout: false,
      xorout: 0xffffff,
      check: 0xb4f3e6,
      name: 'CRC-24/INTERLAKEN'
    },
    {
      width: 24,
      poly: 0x864cfb,
      init: 0x000000,
      refin: false,
      refout: false,
      xorout: 0x000000,
      check: 0xcde703,
      name: 'CRC-24/LTE-A'
    },
    {
      width: 24,
      poly: 0x800063,
      init: 0x000000,
      refin: false,
      refout: false,
      xorout: 0x000000,
      check: 0x23ef52,
      name: 'CRC-24/LTE-B'
    },
    {
      width: 24,
      poly: 0x864cfb,
      init: 0xb704ce,
      refin: false,
      refout: false,
      xorout: 0x000000,
      check: 0x21cf02,
      name: 'CRC-24/OPENPGP'
    },
    {
      width: 24,
      poly: 0x800063,
      init: 0xffffff,
      refin: false,
      refout: false,
      xorout: 0xffffff,
      check: 0x200fa5,
      name: 'CRC-24/OS-9'
    },
    {
      width: 30,
      poly: 0x2030b9c7,
      init: 0x3fffffff,
      refin: false,
      refout: false,
      xorout: 0x3fffffff,
      check: 0x04c34abf,
      name: 'CRC-30/CDMA'
    },
    {
      width: 31,
      poly: 0x04c11db7,
      init: 0x7fffffff,
      refin: false,
      refout: false,
      xorout: 0x7fffffff,
      check: 0x0ce9e46c,
      name: 'CRC-31/PHILIPS'
    },
    {
      width: 32,
      poly: 0x814141ab,
      init: 0x00000000,
      refin: false,
      refout: false,
      xorout: 0x00000000,
      check: 0x3010bf7f,
      name: 'CRC-32/AIXM'
    },
    {
      width: 32,
      poly: 0xf4acfb13,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      check: 0x1697d06a,
      name: 'CRC-32/AUTOSAR'
    },
    {
      width: 32,
      poly: 0xa833982b,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      check: 0x87315576,
      name: 'CRC-32/BASE91-D'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: false,
      refout: false,
      xorout: 0xffffffff,
      check: 0xfc891918,
      name: 'CRC-32/BZIP2'
    },
    {
      width: 32,
      poly: 0x8001801b,
      init: 0x00000000,
      refin: true,
      refout: true,
      xorout: 0x00000000,
      check: 0x6ec2edc4,
      name: 'CRC-32/CD-ROM-EDC'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0x00000000,
      refin: false,
      refout: false,
      xorout: 0xffffffff,
      check: 0x765e7680,
      name: 'CRC-32/CKSUM'
    },
    {
      width: 32,
      poly: 0x1edc6f41,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      check: 0xe3069283,
      name: 'CRC-32/ISCSI'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      check: 0xcbf43926,
      name: 'CRC-32/ISO-HDLC'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0x00000000,
      check: 0x340bc6d9,
      name: 'CRC-32/JAMCRC'
    },
    {
      width: 32,
      poly: 0x741b8cd7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0x00000000,
      check: 0xd2c22f51,
      name: 'CRC-32/MEF'
    },
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: false,
      refout: false,
      xorout: 0x00000000,
      check: 0x0376e6e7,
      name: 'CRC-32/MPEG-2'
    },
    {
      width: 32,
      poly: 0x000000af,
      init: 0x00000000,
      refin: false,
      refout: false,
      xorout: 0x00000000,
      check: 0xbd0be338,
      name: 'CRC-32/XFER'
    },
    {
      width: 40,
      poly: [0x00, 0x04820009],
      init: [0x00, 0x00000000],
      refin: false,
      refout: false,
      xorout: [0xff, 0xffffffff],
      check: 0xd4164fc646,
      name: 'CRC-40/GSM'
    },
    {
      width: 64,
      poly: [0x42f0e1eb, 0xa9ea3693],
      init: [0, 0],
      refin: false,
      refout: false,
      xorout: [0, 0],
      check: 0x6c40df5f0b497347,
      name: 'CRC-64/ECMA-182'
    },
    {
      width: 64,
      poly: [0x00000000, 0x0000001b],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0xffffffff, 0xffffffff],
      check: 0xb90956c775a41001,
      name: 'CRC-64/GO-ISO'
    },
    {
      width: 64,
      poly: [0x259c84cb, 0xa6426349],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0, 0],
      check: 0x75d4b74f024eceea,
      name: 'CRC-64/MS'
    },
    {
      width: 64,
      poly: [0xad93d235, 0x94c93659],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0xffffffff, 0xffffffff],
      check: 0xae8b14860a799888,
      name: 'CRC-64/NVME'
    },
    {
      width: 64,
      poly: [0xad93d235, 0x94c935a9],
      init: [0, 0],
      refin: true,
      refout: true,
      xorout: [0, 0],
      check: 0xe9c6d914c4b8d9ca,
      name: 'CRC-64/REDIS'
    },
    {
      width: 64,
      poly: [0x42f0e1eb, 0xa9ea3693],
      init: [0xffffffff, 0xffffffff],
      refin: false,
      refout: false,
      xorout: [0xffffffff, 0xffffffff],
      check: 0x62ec59e3f1a4f00a,
      name: 'CRC-64/WE'
    },
    {
      width: 64,
      poly: [0x42f0e1eb, 0xa9ea3693],
      init: [0xffffffff, 0xffffffff],
      refin: true,
      refout: true,
      xorout: [0xffffffff, 0xffffffff],
      check: 0x995dc9bbdf1939fa,
      name: 'CRC-64/XZ'
    },
    {
      width: 82,
      poly: [0x0308c, 0x01110114, 0x01440411],
      init: [0, 0, 0],
      refin: true,
      refout: true,
      xorout: [0, 0, 0],
      check: 0x09ea83f625023801fd612,
      name: 'CRC-82/DARC'
    },
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
      exports[methodName] = createCrc(MODELS[i]);
    }
  }

  var createCrc;
  var exports = {};
  if (COMMON_JS) {
    createCrc = require('./crc.js').createCrc;
    createMethods(exports);
    module.exports = exports;
  } else {
    createCrc = root.createCrc;
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
