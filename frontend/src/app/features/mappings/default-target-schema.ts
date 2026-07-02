import { SaveTargetSchemaRequest, TargetField } from '../../core/models/mapping.models';

export const DEFAULT_TARGET_SCHEMA_NAME = 'Banka Ödeme JSON Hedefi';

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
    displayName: 'Hesap No',
    type: 'text',
    required: false,
    sampleValue: '',
    length: 17,
    startPosition: 5,
    format: 'fixed-width',
    align: 'right',
    padChar: '0',
    requiredForOutput: true
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
    displayName: 'Tutar',
    type: 'number',
    required: false,
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
    padChar: ' '
  },
  {
    name: 'tc',
    displayName: 'TC',
    type: 'text',
    required: false,
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
    displayName: 'Maaş Türü / Ödeme Türü',
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
    padChar: '0'
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
    padChar: ' '
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

export function createDefaultTargetSchemaRequest(): SaveTargetSchemaRequest {
  return {
    targetName: DEFAULT_TARGET_SCHEMA_NAME,
    fields: DEFAULT_TARGET_FIELDS.map(field => ({ ...field }))
  };
}
