import { MappingPatternType, SaveTargetSchemaRequest, TargetField } from '../../core/models/mapping.models';

export const DEFAULT_TARGET_SCHEMA_NAME = 'Banka Ödeme JSON Hedefi';
export const MTV_TARGET_SCHEMA_NAME = 'MTV Data Dosya Hedefi';

export const DEFAULT_TARGET_FIELDS: TargetField[] = [
  {
    name: 'subeKodu',
    displayName: 'Şube Kodu',
    type: 'text',
    required: false,
    sampleValue: '002',
    length: 3,
    startPosition: 0,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'kurumKodu',
    displayName: 'Kurum Kodu',
    type: 'text',
    required: false,
    sampleValue: '4C',
    length: 2,
    startPosition: 3,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'hesapNo',
    displayName: 'Müşteri Hesap Numarası',
    type: 'text',
    required: true,
    sampleValue: '',
    length: 17,
    startPosition: 5,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'adSoyad',
    displayName: 'Ad Soyad',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'aliciHesapIsim',
    displayName: 'Alıcı Hesap İsim',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'aliciIbanNumber',
    displayName: 'Alıcı IBAN Number',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'odemeTarihi',
    displayName: 'Ödeme Tarihi',
    type: 'date',
    required: false,
    sampleValue: '2026-07-02',
    length: 8,
    format: 'YYYYMMDD',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'ayKodu',
    displayName: 'Ay Kodu',
    type: 'text',
    required: false,
    sampleValue: '08',
    length: 2,
    startPosition: 34,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'tutar',
    displayName: 'Maaş Tutarı',
    type: 'number',
    required: true,
    sampleValue: '0',
    length: 18,
    startPosition: 36,
    format: 'amount-18-2',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'aciklama',
    displayName: 'Açıklama',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 100,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'tc',
    displayName: 'TC',
    type: 'text',
    required: true,
    sampleValue: '',
    length: 11,
    startPosition: 22,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'maasTuru',
    displayName: 'Maaş Türü',
    type: 'text',
    required: false,
    sampleValue: 'M',
    length: 1,
    startPosition: 54,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    fixedValue: 'M',
    requiredForOutput: true
  },
  {
    name: 'odemeKodu',
    displayName: 'Ödeme Kodu',
    type: 'text',
    required: false,
    sampleValue: '0052',
    length: 4,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'dovizCinsi',
    displayName: 'Döviz Cinsi',
    type: 'text',
    required: false,
    sampleValue: 'TRY',
    length: 3,
    format: 'fixed-width',
    align: 'left',
    padChar: ' '
  },
  {
    name: 'talimatId',
    displayName: 'Talimat ID',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 7,
    format: 'fixed-width',
    align: 'right',
    padChar: '0'
  },
  {
    name: 'durumKaydi',
    displayName: 'Durum Kaydı',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 1,
    format: 'fixed-width',
    align: 'left',
    padChar: ' '
  },
  {
    name: 'islemTarihi',
    displayName: 'İşlem Tarihi',
    type: 'date',
    required: false,
    sampleValue: '2026-07-02',
    length: 8,
    format: 'YYYYMMDD',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'iban',
    displayName: 'IBAN No',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 26,
    startPosition: 55,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  }
];

export const MTV_TARGET_FIELDS: TargetField[] = [
  {
    name: 'kayitTipi',
    displayName: 'Kayıt Tipi',
    type: 'text',
    required: false,
    sampleValue: 'D',
    length: 1,
    startPosition: 0,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    fixedValue: 'D',
    requiredForOutput: true
  },
  {
    name: 'musteriHesapNo',
    displayName: 'Müşteri Hesap No',
    type: 'text',
    required: true,
    sampleValue: '',
    length: 17,
    startPosition: 1,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'kurumMusteriAdi',
    displayName: 'Kurum Müşteri Adı',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 30,
    startPosition: 18,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'vergiNoTCKimlik',
    displayName: 'Vergi No / TC Kimlik',
    type: 'text',
    required: true,
    sampleValue: '',
    length: 11,
    startPosition: 48,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'plakaNo',
    displayName: 'Plaka No',
    type: 'text',
    required: true,
    sampleValue: '',
    length: 10,
    startPosition: 59,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'vergiYili',
    displayName: 'Vergi Yılı',
    type: 'text',
    required: true,
    sampleValue: '2026',
    length: 4,
    startPosition: 69,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'taksitNo',
    displayName: 'Taksit No',
    type: 'text',
    required: true,
    sampleValue: '01',
    length: 2,
    startPosition: 73,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'tutar',
    displayName: 'Tutar',
    type: 'number',
    required: true,
    sampleValue: '0',
    length: 21,
    startPosition: 75,
    format: 'amount-21-2',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'aciklama',
    displayName: 'Açıklama',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 50,
    startPosition: 96,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'adres',
    displayName: 'Adres',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 50,
    startPosition: 146,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'telefon',
    displayName: 'Telefon',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 10,
    startPosition: 196,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'subeKodu',
    displayName: 'Şube Kodu',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 5,
    startPosition: 206,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  },
  {
    name: 'tahakkukFisNo',
    displayName: 'Tahakkuk Fiş No',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 20,
    startPosition: 211,
    format: 'fixed-width',
    align: 'left',
    padChar: ' ',
    requiredForOutput: true
  },
  {
    name: 'vergiDairesiKodu',
    displayName: 'Vergi Dairesi Kodu',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 6,
    startPosition: 231,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
  }
];

export function createDefaultTargetSchemaRequest(patternType: MappingPatternType = 'maas'): SaveTargetSchemaRequest {
  if (patternType === 'mtv') {
    return {
      targetName: MTV_TARGET_SCHEMA_NAME,
      fields: MTV_TARGET_FIELDS.map(field => ({ ...field }))
    };
  }

  return {
    targetName: DEFAULT_TARGET_SCHEMA_NAME,
    fields: DEFAULT_TARGET_FIELDS.map(field => ({ ...field }))
  };
}
