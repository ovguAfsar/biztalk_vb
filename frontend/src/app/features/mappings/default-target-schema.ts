import { SaveTargetSchemaRequest, TargetField } from '../../core/models/mapping.models';

export const DEFAULT_TARGET_SCHEMA_NAME = 'Banka Ödeme JSON Hedefi';

export const DEFAULT_TARGET_FIELDS: TargetField[] = [
  {
    name: 'hesapNo',
    displayName: 'Hesap No',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'odemeTarihi',
    displayName: 'Ödeme Tarihi',
    type: 'date',
    required: false,
    sampleValue: '2026-07-02'
  },
  {
    name: 'tutar',
    displayName: 'Tutar',
    type: 'number',
    required: false,
    sampleValue: '0'
  },
  {
    name: 'aciklama',
    displayName: 'Açıklama',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'tc',
    displayName: 'TC',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'maasTuru',
    displayName: 'Maaş Türü',
    type: 'text',
    required: false,
    sampleValue: 'Ek Ödeme'
  },
  {
    name: 'odemeKodu',
    displayName: 'Ödeme Kodu',
    type: 'text',
    required: false,
    sampleValue: '0052'
  },
  {
    name: 'dovizCinsi',
    displayName: 'Döviz Cinsi',
    type: 'text',
    required: false,
    sampleValue: 'TRY'
  },
  {
    name: 'talimatId',
    displayName: 'Talimat ID',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'durumKaydi',
    displayName: 'Durum Kaydı',
    type: 'text',
    required: false,
    sampleValue: ''
  },
  {
    name: 'islemTarihi',
    displayName: 'İşlem Tarihi',
    type: 'date',
    required: false,
    sampleValue: '2026-07-02'
  }
];

export function createDefaultTargetSchemaRequest(): SaveTargetSchemaRequest {
  return {
    targetName: DEFAULT_TARGET_SCHEMA_NAME,
    fields: DEFAULT_TARGET_FIELDS.map(field => ({ ...field }))
  };
}
