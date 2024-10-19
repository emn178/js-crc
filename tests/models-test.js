(function () {
  var MODELS = [
    {
      check: '4',
      residue: 0x2,
      name: "CRC-3/GSM",
    },
    {
      check: '6',
      residue: 0x0,
      name: "CRC-3/ROHC",
    },
    {
      check: '7',
      residue: 0x0,
      name: "CRC-4/G-704",
    },
    {
      check: 'b',
      residue: 0x2,
      name: "CRC-4/INTERLAKEN",
    },
    {
      check: '00',
      residue: 0x00,
      name: "CRC-5/EPC-C1G2",
    },
    {
      check: '07',
      residue: 0x00,
      name: "CRC-5/G-704",
    },
    {
      check: '19',
      residue: 0x06,
      name: "CRC-5/USB",
    },
    {
      check: '0d',
      residue: 0x00,
      name: "CRC-6/CDMA2000-A",
    },
    {
      check: '3b',
      residue: 0x00,
      name: "CRC-6/CDMA2000-B",
    },
    {
      check: '26',
      residue: 0x00,
      name: "CRC-6/DARC",
    },
    {
      check: '06',
      residue: 0x00,
      name: "CRC-6/G-704",
    },
    {
      check: '13',
      residue: 0x3a,
      name: "CRC-6/GSM",
    },
    {
      check: '75',
      residue: 0x00,
      name: "CRC-7/MMC",
    },
    {
      check: '53',
      residue: 0x00,
      name: "CRC-7/ROHC",
    },
    {
      check: '61',
      residue: 0x00,
      name: "CRC-7/UMTS",
    },
    {
      check: 'df',
      residue: 0x42,
      name: "CRC-8/AUTOSAR",
    },
    {
      check: '26',
      residue: 0x00,
      name: "CRC-8/BLUETOOTH",
    },
    {
      check: 'da',
      residue: 0x00,
      name: "CRC-8/CDMA2000",
    },
    {
      check: '15',
      residue: 0x00,
      name: "CRC-8/DARC",
    },
    {
      check: 'bc',
      residue: 0x00,
      name: "CRC-8/DVB-S2",
    },
    {
      check: '37',
      residue: 0x00,
      name: "CRC-8/GSM-A",
    },
    {
      check: '94',
      residue: 0x53,
      name: "CRC-8/GSM-B",
    },
    {
      check: 'b4',
      residue: 0x00,
      name: "CRC-8/HITAG",
    },
    {
      check: 'a1',
      residue: 0xac,
      name: "CRC-8/I-432-1",
    },
    {
      check: '7e',
      residue: 0x00,
      name: "CRC-8/I-CODE",
    },
    {
      check: 'ea',
      residue: 0x00,
      name: "CRC-8/LTE",
    },
    {
      check: 'a1',
      residue: 0x00,
      name: "CRC-8/MAXIM-DOW",
    },
    {
      check: '99',
      residue: 0x00,
      name: "CRC-8/MIFARE-MAD",
    },
    {
      check: 'f7',
      residue: 0x00,
      name: "CRC-8/NRSC-5",
    },
    {
      check: '3e',
      residue: 0x00,
      name: "CRC-8/OPENSAFETY",
    },
    {
      check: 'd0',
      residue: 0x00,
      name: "CRC-8/ROHC",
    },
    {
      check: '4b',
      residue: 0xc4,
      name: "CRC-8/SAE-J1850",
    },
    {
      check: 'f4',
      residue: 0x00,
      name: "CRC-8/SMBUS",
    },
    {
      check: '97',
      residue: 0x00,
      name: "CRC-8/TECH-3250",
    },
    {
      check: '25',
      residue: 0x00,
      name: "CRC-8/WCDMA",
    },
    {
      check: '199',
      residue: 0x000,
      name: "CRC-10/ATM",
    },
    {
      check: '233',
      residue: 0x000,
      name: "CRC-10/CDMA2000",
    },
    {
      check: '12a',
      residue: 0x0c6,
      name: "CRC-10/GSM",
    },
    {
      check: '5a3',
      residue: 0x000,
      name: "CRC-11/FLEXRAY",
    },
    {
      check: '061',
      residue: 0x000,
      name: "CRC-11/UMTS",
    },
    {
      check: 'd4d',
      residue: 0x000,
      name: "CRC-12/CDMA2000",
    },
    {
      check: 'f5b',
      residue: 0x000,
      name: "CRC-12/DECT",
    },
    {
      check: 'b34',
      residue: 0x178,
      name: "CRC-12/GSM",
    },
    {
      check: 'daf',
      residue: 0x000,
      name: "CRC-12/UMTS",
    },
    {
      check: '04fa',
      residue: 0x0000,
      name: "CRC-13/BBC",
    },
    {
      check: '082d',
      residue: 0x0000,
      name: "CRC-14/DARC",
    },
    {
      check: '30ae',
      residue: 0x031e,
      name: "CRC-14/GSM",
    },
    {
      check: '059e',
      residue: 0x0000,
      name: "CRC-15/CAN",
    },
    {
      check: '2566',
      residue: 0x6815,
      name: "CRC-15/MPT1327",
    },
    {
      check: 'bb3d',
      residue: 0x0000,
      name: "CRC-16/ARC",
    },
    {
      check: '4c06',
      residue: 0x0000,
      name: "CRC-16/CDMA2000",
    },
    {
      check: 'aee7',
      residue: 0x0000,
      name: "CRC-16/CMS",
    },
    {
      check: '9ecf',
      residue: 0x0000,
      name: "CRC-16/DDS-110",
    },
    {
      check: '007e',
      residue: 0x0589,
      name: "CRC-16/DECT-R",
    },
    {
      check: '007f',
      residue: 0x0000,
      name: "CRC-16/DECT-X",
    },
    {
      check: 'ea82',
      residue: 0x66c5,
      name: "CRC-16/DNP",
    },
    {
      check: 'c2b7',
      residue: 0xa366,
      name: "CRC-16/EN-13757",
    },
    {
      check: 'd64e',
      residue: 0x1d0f,
      name: "CRC-16/GENIBUS",
    },
    {
      check: 'ce3c',
      residue: 0x1d0f,
      name: "CRC-16/GSM",
    },
    {
      check: '29b1',
      residue: 0x0000,
      name: "CRC-16/IBM-3740",
    },
    {
      check: '906e',
      residue: 0xf0b8,
      name: "CRC-16/IBM-SDLC",
    },
    {
      check: 'bf05',
      residue: 0x0000,
      name: "CRC-16/ISO-IEC-14443-3-A",
    },
    {
      check: '2189',
      residue: 0x0000,
      name: "CRC-16/KERMIT",
    },
    {
      check: 'bdf4',
      residue: 0x0000,
      name: "CRC-16/LJ1200",
    },
    {
      check: '772b',
      residue: 0x0000,
      name: "CRC-16/M17",
    },
    {
      check: '44c2',
      residue: 0xb001,
      name: "CRC-16/MAXIM-DOW",
    },
    {
      check: '6f91',
      residue: 0x0000,
      name: "CRC-16/MCRF4XX",
    },
    {
      check: '4b37',
      residue: 0x0000,
      name: "CRC-16/MODBUS",
    },
    {
      check: 'a066',
      residue: 0x0000,
      name: "CRC-16/NRSC-5",
    },
    {
      check: '5d38',
      residue: 0x0000,
      name: "CRC-16/OPENSAFETY-A",
    },
    {
      check: '20fe',
      residue: 0x0000,
      name: "CRC-16/OPENSAFETY-B",
    },
    {
      check: 'a819',
      residue: 0xe394,
      name: "CRC-16/PROFIBUS",
    },
    {
      check: '63d0',
      residue: 0x0000,
      name: "CRC-16/RIELLO",
    },
    {
      check: 'e5cc',
      residue: 0x0000,
      name: "CRC-16/SPI-FUJITSU",
    },
    {
      check: 'd0db',
      residue: 0x0000,
      name: "CRC-16/T10-DIF",
    },
    {
      check: '0fb3',
      residue: 0x0000,
      name: "CRC-16/TELEDISK",
    },
    {
      check: '26b1',
      residue: 0x0000,
      name: "CRC-16/TMS37157",
    },
    {
      check: 'fee8',
      residue: 0x0000,
      name: "CRC-16/UMTS",
    },
    {
      check: 'b4c8',
      residue: 0xb001,
      name: "CRC-16/USB",
    },
    {
      check: '31c3',
      residue: 0x0000,
      name: "CRC-16/XMODEM",
    },
    {
      check: '04f03',
      residue: 0x00000,
      name: "CRC-17/CAN-FD",
    },
    {
      check: '0ed841',
      residue: 0x000000,
      name: "CRC-21/CAN-FD",
    },
    {
      check: 'c25a56',
      residue: 0x000000,
      name: "CRC-24/BLE",
    },
    {
      check: '7979bd',
      residue: 0x000000,
      name: "CRC-24/FLEXRAY-A",
    },
    {
      check: '1f23b8',
      residue: 0x000000,
      name: "CRC-24/FLEXRAY-B",
    },
    {
      check: 'b4f3e6',
      residue: 0x144e63,
      name: "CRC-24/INTERLAKEN",
    },
    {
      check: 'cde703',
      residue: 0x000000,
      name: "CRC-24/LTE-A",
    },
    {
      check: '23ef52',
      residue: 0x000000,
      name: "CRC-24/LTE-B",
    },
    {
      check: '21cf02',
      residue: 0x000000,
      name: "CRC-24/OPENPGP",
    },
    {
      check: '200fa5',
      residue: 0x800fe3,
      name: "CRC-24/OS-9",
    },
    {
      check: '04c34abf',
      residue: 0x34efa55a,
      name: "CRC-30/CDMA",
    },
    {
      check: '0ce9e46c',
      residue: 0x4eaf26f1,
      name: "CRC-31/PHILIPS",
    },
    {
      check: '3010bf7f',
      residue: 0x00000000,
      name: "CRC-32/AIXM",
    },
    {
      check: '1697d06a',
      residue: 0x904cddbf,
      name: "CRC-32/AUTOSAR",
    },
    {
      check: '87315576',
      residue: 0x45270551,
      name: "CRC-32/BASE91-D",
    },
    {
      check: 'fc891918',
      residue: 0xc704dd7b,
      name: "CRC-32/BZIP2",
    },
    {
      check: '6ec2edc4',
      residue: 0x00000000,
      name: "CRC-32/CD-ROM-EDC",
    },
    {
      check: '765e7680',
      residue: 0xc704dd7b,
      name: "CRC-32/CKSUM",
    },
    {
      check: 'e3069283',
      residue: 0xb798b438,
      name: "CRC-32/ISCSI",
    },
    {
      check: 'cbf43926',
      residue: 0xdebb20e3,
      name: "CRC-32/ISO-HDLC",
    },
    {
      check: '340bc6d9',
      residue: 0x00000000,
      name: "CRC-32/JAMCRC",
    },
    {
      check: 'd2c22f51',
      residue: 0x00000000,
      name: "CRC-32/MEF",
    },
    {
      check: '0376e6e7',
      residue: 0x00000000,
      name: "CRC-32/MPEG-2",
    },
    {
      check: 'bd0be338',
      residue: 0x00000000,
      name: "CRC-32/XFER",
    },
    {
      check: 'd4164fc646',
      residue: 0xc4ff8071ff,
      name: "CRC-40/GSM",
    },
    {
      check: '6c40df5f0b497347',
      residue: 0x0000000000000000,
      name: "CRC-64/ECMA-182",
    },
    {
      check: 'b90956c775a41001',
      residue: 0x5300000000000000,
      name: "CRC-64/GO-ISO",
    },
    {
      check: '75d4b74f024eceea',
      residue: 0x0000000000000000,
      name: "CRC-64/MS",
    },
    {
      check: 'ae8b14860a799888',
      residue: 0xf310303b2b6f6e42,
      name: "CRC-64/NVME",
    },
    {
      check: 'e9c6d914c4b8d9ca',
      residue: 0x0000000000000000,
      name: "CRC-64/REDIS",
    },
    {
      check: '62ec59e3f1a4f00a',
      residue: 0xfcacbebd5931a992,
      name: "CRC-64/WE",
    },
    {
      check: '995dc9bbdf1939fa',
      residue: 0x49958c9abd7d353f,
      name: "CRC-64/XZ",
    },
    {
      check: '09ea83f625023801fd612',
      residue: 0x000000000000000000000,
      name: "CRC-82/DARC",
    }
  ];

  var str = '123456789';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_CRC_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_CRC_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }

  MODELS.forEach(function (model) {
    var methodName = model.name.replace(/[-/]/g, '_').toLocaleLowerCase();
    var method = root[methodName];
    if (method) {
      describe('#' + model.name, function () {
        context('when ' + str, function () {
          it('should be equal to ' + model.check, function () {
            expect(method(str)).to.be(model.check);
          });
        });
      });
    }
  });
})();
