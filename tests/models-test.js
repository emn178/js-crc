(function () {
  var MODELS = [
    {
      check: '4',
      name: "CRC-3/GSM",
    },
    {
      check: '6',
      name: "CRC-3/ROHC",
    },
    {
      check: '7',
      name: "CRC-4/G-704",
    },
    {
      check: 'b',
      name: "CRC-4/INTERLAKEN",
    },
    {
      check: '00',
      name: "CRC-5/EPC-C1G2",
    },
    {
      check: '07',
      name: "CRC-5/G-704",
    },
    {
      check: '19',
      name: "CRC-5/USB",
    },
    {
      check: '0d',
      name: "CRC-6/CDMA2000-A",
    },
    {
      check: '3b',
      name: "CRC-6/CDMA2000-B",
    },
    {
      check: '26',
      name: "CRC-6/DARC",
    },
    {
      check: '06',
      name: "CRC-6/G-704",
    },
    {
      check: '13',
      name: "CRC-6/GSM",
    },
    {
      check: '75',
      name: "CRC-7/MMC",
    },
    {
      check: '53',
      name: "CRC-7/ROHC",
    },
    {
      check: '61',
      name: "CRC-7/UMTS",
    },
    {
      check: 'df',
      name: "CRC-8/AUTOSAR",
    },
    {
      check: '26',
      name: "CRC-8/BLUETOOTH",
    },
    {
      check: 'da',
      name: "CRC-8/CDMA2000",
    },
    {
      check: '15',
      name: "CRC-8/DARC",
    },
    {
      check: 'bc',
      name: "CRC-8/DVB-S2",
    },
    {
      check: '37',
      name: "CRC-8/GSM-A",
    },
    {
      check: '94',
      name: "CRC-8/GSM-B",
    },
    {
      check: 'b4',
      name: "CRC-8/HITAG",
    },
    {
      check: 'a1',
      name: "CRC-8/I-432-1",
    },
    {
      check: '7e',
      name: "CRC-8/I-CODE",
    },
    {
      check: 'ea',
      name: "CRC-8/LTE",
    },
    {
      check: 'a1',
      name: "CRC-8/MAXIM-DOW",
    },
    {
      check: '99',
      name: "CRC-8/MIFARE-MAD",
    },
    {
      check: 'f7',
      name: "CRC-8/NRSC-5",
    },
    {
      check: '3e',
      name: "CRC-8/OPENSAFETY",
    },
    {
      check: 'd0',
      name: "CRC-8/ROHC",
    },
    {
      check: '4b',
      name: "CRC-8/SAE-J1850",
    },
    {
      check: 'f4',
      name: "CRC-8/SMBUS",
    },
    {
      check: '97',
      name: "CRC-8/TECH-3250",
    },
    {
      check: '25',
      name: "CRC-8/WCDMA",
    },
    {
      check: '199',
      name: "CRC-10/ATM",
    },
    {
      check: '233',
      name: "CRC-10/CDMA2000",
    },
    {
      check: '12a',
      name: "CRC-10/GSM",
    },
    {
      check: '5a3',
      name: "CRC-11/FLEXRAY",
    },
    {
      check: '061',
      name: "CRC-11/UMTS",
    },
    {
      check: 'd4d',
      name: "CRC-12/CDMA2000",
    },
    {
      check: 'f5b',
      name: "CRC-12/DECT",
    },
    {
      check: 'b34',
      name: "CRC-12/GSM",
    },
    {
      check: 'daf',
      name: "CRC-12/UMTS",
    },
    {
      check: '04fa',
      name: "CRC-13/BBC",
    },
    {
      check: '082d',
      name: "CRC-14/DARC",
    },
    {
      check: '30ae',
      name: "CRC-14/GSM",
    },
    {
      check: '059e',
      name: "CRC-15/CAN",
    },
    {
      check: '2566',
      name: "CRC-15/MPT1327",
    },
    {
      check: 'bb3d',
      name: "CRC-16/ARC",
    },
    {
      check: '4c06',
      name: "CRC-16/CDMA2000",
    },
    {
      check: 'aee7',
      name: "CRC-16/CMS",
    },
    {
      check: '9ecf',
      name: "CRC-16/DDS-110",
    },
    {
      check: '007e',
      name: "CRC-16/DECT-R",
    },
    {
      check: '007f',
      name: "CRC-16/DECT-X",
    },
    {
      check: 'ea82',
      name: "CRC-16/DNP",
    },
    {
      check: 'c2b7',
      name: "CRC-16/EN-13757",
    },
    {
      check: 'd64e',
      name: "CRC-16/GENIBUS",
    },
    {
      check: 'ce3c',
      name: "CRC-16/GSM",
    },
    {
      check: '29b1',
      name: "CRC-16/IBM-3740",
    },
    {
      check: '906e',
      name: "CRC-16/IBM-SDLC",
    },
    {
      check: 'bf05',
      name: "CRC-16/ISO-IEC-14443-3-A",
    },
    {
      check: '2189',
      name: "CRC-16/KERMIT",
    },
    {
      check: 'bdf4',
      name: "CRC-16/LJ1200",
    },
    {
      check: '772b',
      name: "CRC-16/M17",
    },
    {
      check: '44c2',
      name: "CRC-16/MAXIM-DOW",
    },
    {
      check: '6f91',
      name: "CRC-16/MCRF4XX",
    },
    {
      check: '4b37',
      name: "CRC-16/MODBUS",
    },
    {
      check: 'a066',
      name: "CRC-16/NRSC-5",
    },
    {
      check: '5d38',
      name: "CRC-16/OPENSAFETY-A",
    },
    {
      check: '20fe',
      name: "CRC-16/OPENSAFETY-B",
    },
    {
      check: 'a819',
      name: "CRC-16/PROFIBUS",
    },
    {
      check: '63d0',
      name: "CRC-16/RIELLO",
    },
    {
      check: 'e5cc',
      name: "CRC-16/SPI-FUJITSU",
    },
    {
      check: 'd0db',
      name: "CRC-16/T10-DIF",
    },
    {
      check: '0fb3',
      name: "CRC-16/TELEDISK",
    },
    {
      check: '26b1',
      name: "CRC-16/TMS37157",
    },
    {
      check: 'fee8',
      name: "CRC-16/UMTS",
    },
    {
      check: 'b4c8',
      name: "CRC-16/USB",
    },
    {
      check: '31c3',
      name: "CRC-16/XMODEM",
    },
    {
      check: '04f03',
      name: "CRC-17/CAN-FD",
    },
    {
      check: '0ed841',
      name: "CRC-21/CAN-FD",
    },
    {
      check: 'c25a56',
      name: "CRC-24/BLE",
    },
    {
      check: '7979bd',
      name: "CRC-24/FLEXRAY-A",
    },
    {
      check: '1f23b8',
      name: "CRC-24/FLEXRAY-B",
    },
    {
      check: 'b4f3e6',
      name: "CRC-24/INTERLAKEN",
    },
    {
      check: 'cde703',
      name: "CRC-24/LTE-A",
    },
    {
      check: '23ef52',
      name: "CRC-24/LTE-B",
    },
    {
      check: '21cf02',
      name: "CRC-24/OPENPGP",
    },
    {
      check: '200fa5',
      name: "CRC-24/OS-9",
    },
    {
      check: '04c34abf',
      name: "CRC-30/CDMA",
    },
    {
      check: '0ce9e46c',
      name: "CRC-31/PHILIPS",
    },
    {
      check: '3010bf7f',
      name: "CRC-32/AIXM",
    },
    {
      check: '1697d06a',
      name: "CRC-32/AUTOSAR",
    },
    {
      check: '87315576',
      name: "CRC-32/BASE91-D",
    },
    {
      check: 'fc891918',
      name: "CRC-32/BZIP2",
    },
    {
      check: '6ec2edc4',
      name: "CRC-32/CD-ROM-EDC",
    },
    {
      check: '765e7680',
      name: "CRC-32/CKSUM",
    },
    {
      check: 'e3069283',
      name: "CRC-32/ISCSI",
    },
    {
      check: 'cbf43926',
      name: "CRC-32/ISO-HDLC",
    },
    {
      check: '340bc6d9',
      name: "CRC-32/JAMCRC",
    },
    {
      check: 'd2c22f51',
      name: "CRC-32/MEF",
    },
    {
      check: '0376e6e7',
      name: "CRC-32/MPEG-2",
    },
    {
      check: 'bd0be338',
      name: "CRC-32/XFER",
    },
    {
      check: 'd4164fc646',
      name: "CRC-40/GSM",
    },
    {
      check: '6c40df5f0b497347',
      name: "CRC-64/ECMA-182",
    },
    {
      check: 'b90956c775a41001',
      name: "CRC-64/GO-ISO",
    },
    {
      check: '75d4b74f024eceea',
      name: "CRC-64/MS",
    },
    {
      check: 'ae8b14860a799888',
      name: "CRC-64/NVME",
    },
    {
      check: 'e9c6d914c4b8d9ca',
      name: "CRC-64/REDIS",
    },
    {
      check: '62ec59e3f1a4f00a',
      name: "CRC-64/WE",
    },
    {
      check: '995dc9bbdf1939fa',
      name: "CRC-64/XZ",
    },
    {
      check: '09ea83f625023801fd612',
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
    describe('#' + model.name, function () {
      context('when ' + str, function () {
        it('should be equal to ' + model.check, function () {
          expect(method(str)).to.be(model.check);
        });
      });
    });
  });

  var crc_82_darc = root.crc_82_darc;
  describe('#CRC-82/DARC', function () {
    context('when ' + str, function () {
      it('should be equal to []', function () {
        expect(crc_82_darc.array(str).toHexString()).to.be('009ea83f625023801fd612');
      });
    });
  });

  var crc_64_ecma_182 = root.crc_64_ecma_182;
  describe('#CRC-64/ECMA-182', function () {
    context('when ' + str, function () {
      it('should be equal to []', function () {
        expect(crc_64_ecma_182.array(str).toHexString()).to.be('6c40df5f0b497347');
      });
    });
  });
})();
