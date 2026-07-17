export const DEFAULT_TARGET_SCHEMA_NAME = 'Banka Ödeme JSON Hedefi';
export const MTV_TARGET_SCHEMA_NAME = 'Vergi MTV Data Dosya Hedefi';
export const GUMRUK_TARGET_SCHEMA_NAME = 'Gümrük Vergisi Data Dosya Hedefi';
export const TOPLU_VERGI_TARGET_SCHEMA_NAME = 'Toplu Vergi Data Dosya Hedefi';
export const TOS_AAD_TARGET_SCHEMA_NAME = 'TÖS Geniş 100 Açıklamalı AAD Hedefi';
export const TOS_SATIR_TARGET_SCHEMA_NAME = 'TÖS Satır Bazlı Kaynak Hesap No Hedefi';
export const DEFAULT_TARGET_FIELDS = [
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
export const MTV_TARGET_FIELDS = [
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
const COMMON_VERGI_DATA_FIELDS = MTV_TARGET_FIELDS.filter(field => !['plakaNo', 'taksitNo', 'adres', 'telefon', 'tahakkukFisNo'].includes(field.name));
export const GUMRUK_TARGET_FIELDS = [
    ...COMMON_VERGI_DATA_FIELDS.map(field => ({ ...field })),
    {
        name: 'beyannameNo',
        displayName: 'Beyanname No',
        type: 'text',
        required: true,
        sampleValue: '',
        length: 20,
        startPosition: 211,
        format: 'fixed-width',
        align: 'left',
        padChar: ' ',
        requiredForOutput: true
    }
].sort((firstField, secondField) => (firstField.startPosition ?? Number.MAX_SAFE_INTEGER) - (secondField.startPosition ?? Number.MAX_SAFE_INTEGER));
export const TOPLU_VERGI_TARGET_FIELDS = [
    ...COMMON_VERGI_DATA_FIELDS.map(field => ({ ...field })),
    {
        name: 'tahakkukFisNo',
        displayName: 'Tahakkuk Fiş No',
        type: 'text',
        required: true,
        sampleValue: '',
        length: 20,
        startPosition: 211,
        format: 'fixed-width',
        align: 'left',
        padChar: ' ',
        requiredForOutput: true
    }
].sort((firstField, secondField) => (firstField.startPosition ?? Number.MAX_SAFE_INTEGER) - (secondField.startPosition ?? Number.MAX_SAFE_INTEGER));
const TOS_COMMON_TARGET_FIELDS = [
    tosField('kayitTipi', 'Kayıt Tipi', 'text', false, 0, 1, 'D'),
    tosField('odemeTarihi', 'Ödeme Tarihi', 'date', true, 1, 8, undefined, 'YYYYMMDD'),
    tosField('alacakliBanka', 'Alacaklı Banka Kodu', 'text', false, 9, 4),
    tosField('alacakliSube', 'Alacaklı Şube Kodu', 'text', false, 13, 5),
    tosField('alacakliHesap', 'Alacaklı Hesap Numarası', 'text', true, 18, 26),
    tosField('miktar', 'Ödeme Miktarı', 'number', true, 44, 21, undefined, 'amount-21-2', 'right', '0'),
    tosField('dovizCinsi', 'Döviz Cinsi', 'text', true, 65, 3),
    tosField('aciklama', 'Hareket Açıklaması', 'text', false, 68, 100),
    tosField('alacakliAdSoyadi', 'Alacaklı Adı Soyadı', 'text', true, 168, 40),
    tosField('alacakliAdresi', 'Alacaklı Adresi', 'text', false, 208, 50),
    tosField('alacakliTelefonu', 'Alacaklı Telefonu', 'text', false, 258, 20),
    tosField('alacakliVergiNo', 'Alacaklı Vergi No / TCKN', 'text', false, 278, 11),
    tosField('alacakliVergiDairesi', 'Alacaklı Vergi Dairesi', 'text', false, 289, 15),
    tosField('alacakliMusteriNo', 'Alacaklı Müşteri No', 'text', false, 304, 10),
    tosField('alacakliBabaAdi', 'Alacaklı Baba Adı', 'text', false, 314, 20),
    tosField('alacakliEmail', 'Alacaklı E-posta', 'text', false, 334, 50),
    tosField('referans', 'Referans No', 'text', false, 384, 16),
    tosField('parametre', 'Parametre', 'text', false, 400, 40),
    tosField('islemKodu', 'İşlem Kodu', 'text', false, 440, 2, '00')
];
export const TOS_AAD_TARGET_FIELDS = [
    ...TOS_COMMON_TARGET_FIELDS.map(field => ({ ...field })),
    tosField('durumKodu', 'Durum Kodu', 'text', false, 487, 2),
    tosField('eftReference', 'EFT Referans No', 'text', false, 489, 30)
];
export const TOS_SATIR_TARGET_FIELDS = [
    ...TOS_COMMON_TARGET_FIELDS.map(field => ({ ...field })),
    tosField('kaynakHesapNo', 'Kaynak Hesap No', 'text', true, 442, 26),
    tosField('durumKodu', 'Durum Kodu', 'text', false, 479, 2),
    tosField('eftReference', 'EFT Referans No', 'text', false, 481, 30)
];
function tosField(name, displayName, type, required, startPosition, length, fixedValue, format = 'fixed-width', align = 'left', padChar = ' ') {
    return {
        name,
        displayName,
        type,
        required,
        sampleValue: fixedValue ?? '',
        length,
        startPosition,
        format,
        align,
        padChar,
        fixedValue,
        requiredForOutput: true
    };
}
export function createDefaultTargetSchemaRequest(patternType = 'maas', isFixedWidthRawSource = false) {
    if (patternType === 'tos') {
        return isFixedWidthRawSource
            ? {
                targetName: TOS_SATIR_TARGET_SCHEMA_NAME,
                fields: TOS_SATIR_TARGET_FIELDS.map(field => ({ ...field }))
            }
            : {
                targetName: TOS_AAD_TARGET_SCHEMA_NAME,
                fields: TOS_AAD_TARGET_FIELDS.map(field => ({ ...field }))
            };
    }
    if (patternType === 'mtv' || patternType === 'vergi_mtv') {
        return {
            targetName: MTV_TARGET_SCHEMA_NAME,
            fields: MTV_TARGET_FIELDS.map(field => ({ ...field }))
        };
    }
    if (patternType === 'vergi_gumruk') {
        return {
            targetName: GUMRUK_TARGET_SCHEMA_NAME,
            fields: GUMRUK_TARGET_FIELDS.map(field => ({ ...field }))
        };
    }
    if (patternType === 'vergi_toplu') {
        return {
            targetName: TOPLU_VERGI_TARGET_SCHEMA_NAME,
            fields: TOPLU_VERGI_TARGET_FIELDS.map(field => ({ ...field }))
        };
    }
    return {
        targetName: DEFAULT_TARGET_SCHEMA_NAME,
        fields: DEFAULT_TARGET_FIELDS.map(field => ({ ...field }))
    };
}
//# sourceMappingURL=default-target-schema.js.map