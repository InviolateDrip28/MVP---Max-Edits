const COUNTRY_CODES: string[] = [
  "AF",
  "AL",
  "DZ",
  "AD",
  "AO",
  "AG",
  "AR",
  "AM",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BT",
  "BO",
  "BA",
  "BW",
  "BR",
  "BN",
  "BG",
  "BF",
  "BI",
  "KH",
  "CM",
  "CA",
  "CV",
  "CF",
  "TD",
  "CL",
  "CN",
  "CO",
  "KM",
  "CG",
  "CR",
  "CI",
  "HR",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "CD",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "SZ",
  "ET",
  "FJ",
  "FI",
  "FR",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GR",
  "GD",
  "GT",
  "GN",
  "GW",
  "GY",
  "HT",
  "HN",
  "HU",
  "IS",
  "IN",
  "ID",
  "IQ",
  "IE",
  "IL",
  "IT",
  "JM",
  "JP",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KW",
  "KG",
  "LA",
  "LV",
  "LB",
  "LS",
  "LR",
  "LY",
  "LI",
  "LT",
  "LU",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MT",
  "MH",
  "MR",
  "MU",
  "MX",
  "FM",
  "MD",
  "MC",
  "MN",
  "ME",
  "MA",
  "MZ",
  "MM",
  "NA",
  "NR",
  "NP",
  "NL",
  "NZ",
  "NI",
  "NE",
  "NG",
  "MK",
  "NO",
  "OM",
  "PK",
  "PW",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PL",
  "PT",
  "QA",
  "RO",
  "RW",
  "KN",
  "LC",
  "WS",
  "SM",
  "ST",
  "SA",
  "SN",
  "RS",
  "SC",
  "SL",
  "SG",
  "SK",
  "SI",
  "SB",
  "SO",
  "ZA",
  "KR",
  "ES",
  "LK",
  "VC",
  "PS",
  "SD",
  "SR",
  "SE",
  "CH",
  "TJ",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TO",
  "TT",
  "TN",
  "TR",
  "TM",
  "TV",
  "UG",
  "UA",
  "AE",
  "GB",
  "US",
  "UY",
  "UZ",
  "VU",
  "VE",
  "VN",
  "YE",
  "ZM",
  "ZW",
];

const COUNTRY_NAMES: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua And Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia And Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "DR Congo",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Rwanda",
  "Saint Kitts And Nevis",
  "Saint Lucia",
  "Samoa",
  "San Marino",
  "Sao Tome And Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Saint Vincent And Grenadines",
  "State of Palestine",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad And Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const COUNTRY_CODE_TO_NAME: Record<string, string> = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AD: "Andorra",
  AO: "Angola",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BR: "Brazil",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CR: "Costa Rica",
  CI: "Côte d'Ivoire",
  HR: "Croatia",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  CD: "DR Congo",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  SZ: "Eswatini",
  ET: "Ethiopia",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GR: "Greece",
  GD: "Grenada",
  GT: "Guatemala",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HN: "Honduras",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IQ: "Iraq",
  IE: "Ireland",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Laos",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MR: "Mauritania",
  MU: "Mauritius",
  MX: "Mexico",
  FM: "Micronesia",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  MK: "North Macedonia",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PL: "Poland",
  PT: "Portugal",
  QA: "Qatar",
  RO: "Romania",
  RW: "Rwanda",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  KR: "South Korea",
  ES: "Spain",
  LK: "Sri Lanka",
  VC: "Saint Vincent And Grenadines",
  PS: "State of Palestine",
  SD: "Sudan",
  SR: "Suriname",
  SE: "Sweden",
  CH: "Switzerland",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Vietnam",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  "Antigua And Barbuda": "AG",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  "Bosnia And Herzegovina": "BA",
  Botswana: "BW",
  Brazil: "BR",
  "Brunei Darussalam": "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  "Cape Verde": "CV",
  "Central African Republic": "CF",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  Congo: "CG",
  "Costa Rica": "CR",
  "Côte d'Ivoire": "CI",
  Croatia: "HR",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  "Dominican Republic": "DO",
  "DR Congo": "CD",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  Eritrea: "ER",
  Estonia: "EE",
  Eswatini: "SZ",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kiribati: "KI",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  "Marshall Islands": "MH",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Micronesia: "FM",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nauru: "NR",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Macedonia": "MK",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palau: "PW",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Rwanda: "RW",
  "Saint Kitts And Nevis": "KN",
  "Saint Lucia": "LC",
  Samoa: "WS",
  "San Marino": "SM",
  "Sao Tome And Principe": "ST",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  "Solomon Islands": "SB",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  Spain: "ES",
  "Sri Lanka": "LK",
  "Saint Vincent And Grenadines": "VC",
  "State of Palestine": "PS",
  Sudan: "SD",
  Suriname: "SR",
  Sweden: "SE",
  Switzerland: "CH",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  "Timor-Leste": "TL",
  Togo: "TG",
  Tonga: "TO",
  "Trinidad And Tobago": "TT",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Tuvalu: "TV",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

const COUNTRY_CODE_TO_CURRENCY: Record<string, string> = {
  AF: "AFN",
  AL: "ALL",
  DZ: "DZD",
  AS: "USD",
  AD: "EUR",
  AO: "AOA",
  AI: "XCD",
  AG: "XCD",
  AR: "ARS",
  AM: "AMD",
  AW: "AWG",
  AU: "AUD",
  AT: "EUR",
  AZ: "AZN",
  BS: "BSD",
  BH: "BHD",
  BD: "BDT",
  BB: "BBD",
  BY: "BYN",
  BE: "EUR",
  BZ: "BZD",
  BJ: "XOF",
  BM: "BMD",
  BT: "BTN",
  BO: "BOB",
  BA: "BAM",
  BW: "BWP",
  BR: "BRL",
  IO: "USD",
  BN: "BND",
  BG: "BGN",
  BF: "XOF",
  BI: "BIF",
  CV: "CVE",
  KH: "KHR",
  CM: "XAF",
  CA: "CAD",
  KY: "KYD",
  CF: "XAF",
  TD: "XAF",
  CL: "CLF",
  CN: "CNY",
  CX: "AUD",
  CC: "AUD",
  CO: "COP",
  KM: "KMF",
  CD: "CDF",
  CG: "XAF",
  CK: "NZD",
  CR: "CRC",
  HR: "EUR",
  CW: "ANG",
  CY: "EUR",
  CZ: "CZK",
  CI: "XOF",
  DK: "DKK",
  DJ: "DJF",
  DM: "XCD",
  DO: "DOP",
  EC: "USD",
  EG: "EGP",
  SV: "SVC",
  GQ: "XAF",
  ER: "ERN",
  EE: "EUR",
  SZ: "ZAR",
  ET: "ETB",
  EU: "EUR",
  FK: "FKP",
  FO: "DKK",
  FJ: "FJD",
  FI: "EUR",
  FR: "EUR",
  GF: "EUR",
  PF: "XPF",
  TF: "EUR",
  GA: "XAF",
  GM: "GMD",
  GE: "GEL",
  DE: "EUR",
  GH: "GHS",
  GI: "GIP",
  GR: "EUR",
  GL: "DKK",
  GD: "XCD",
  GP: "EUR",
  GU: "USD",
  GT: "GTQ",
  GN: "GNF",
  GW: "XOF",
  GY: "GYD",
  HT: "HTG",
  HN: "HNL",
  HK: "HKD",
  HU: "HUF",
  IS: "ISK",
  IN: "INR",
  ID: "IDR",
  IQ: "IQD",
  IE: "EUR",
  IM: "GBP",
  IL: "ILS",
  IT: "EUR",
  JM: "JMD",
  JP: "JPY",
  JE: "GBP",
  JO: "JOD",
  KZ: "KZT",
  KE: "KES",
  KI: "AUD",
  KR: "KRW",
  KW: "KWD",
  KG: "KGS",
  LA: "LAK",
  LV: "EUR",
  LB: "LBP",
  LS: "LSL",
  LR: "LRD",
  LY: "LYD",
  LI: "CHF",
  LT: "EUR",
  LU: "EUR",
  MO: "MOP",
  MG: "MGA",
  MW: "MWK",
  MY: "MYR",
  MV: "MVR",
  ML: "XOF",
  MT: "EUR",
  MH: "USD",
  MQ: "EUR",
  MR: "MRU",
  MU: "MUR",
  YT: "EUR",
  MX: "MXN",
  FM: "USD",
  MD: "MDL",
  MC: "EUR",
  MN: "MNT",
  ME: "EUR",
  MS: "XCD",
  MA: "MAD",
  MZ: "MZN",
  MM: "MMK",
  NA: "NAD",
  NR: "AUD",
  NP: "NPR",
  NL: "EUR",
  NC: "XPF",
  NZ: "NZD",
  NI: "NIO",
  NE: "XOF",
  NG: "NGN",
  NU: "NZD",
  NF: "AUD",
  MP: "USD",
  NO: "NOK",
  OM: "OMR",
  PK: "PKR",
  PW: "USD",
  PA: "PAB",
  PG: "PGK",
  PY: "PYG",
  PE: "PEN",
  PH: "PHP",
  PL: "PLN",
  PT: "EUR",
  PR: "USD",
  QA: "QAR",
  MK: "MKD",
  RO: "RON",
  RW: "RWF",
  RE: "EUR",
  BL: "EUR",
  SH: "SHP",
  KN: "XCD",
  LC: "XCD",
  MF: "EUR",
  PM: "EUR",
  VC: "XCD",
  WS: "WST",
  SM: "EUR",
  ST: "STN",
  SA: "SAR",
  SN: "XOF",
  RS: "RSD",
  SC: "SCR",
  SL: "SLE",
  SG: "SGD",
  SX: "ANG",
  SK: "EUR",
  SI: "EUR",
  SB: "SBD",
  SO: "SOS",
  ZA: "ZAR",
  SS: "SSP",
  ES: "EUR",
  LK: "LKR",
  SD: "SDG",
  SR: "SRD",
  SE: "SEK",
  CH: "CHE",
  TW: "TWD",
  TJ: "TJS",
  TZ: "TZS",
  TH: "THB",
  TL: "USD",
  TG: "XOF",
  TK: "NZD",
  TO: "TOP",
  TT: "TTD",
  TN: "TND",
  TR: "TRY",
  TM: "TMT",
  TC: "USD",
  TV: "AUD",
  UG: "UGX",
  UA: "UAH",
  AE: "AED",
  GB: "GBP",
  US: "USD",
  UY: "UYI",
  UZ: "UZS",
  VU: "VUV",
  VE: "VEF",
  VN: "VND",
  VG: "USD",
  VI: "USD",
  WF: "XPF",
  EH: "MAD",
  YE: "YER",
  ZM: "ZMW",
  ZW: "ZWL",
};

const PARTNERS = [
  {
    image: "/partners/atlantic_logo.png",
    link: "https://www.financeads.net/tc.php?t=70726C4772109258T",
  },
  {
    image: "/partners/currencysolutions_logo.png",
    link: "https://currencysolutions.com/",
  },
  {
    image: "/partners/halofinancial_logo.png",
    link: "https://halofinancial.com/",
  },
  {
    image: "/partners/instarem_logo.png",
    link: "https://www.instarem.com/",
  },
  {
    image: "/partners/ofx_logo.png",
    link: "https://www.ofx.com/p/currapay/",
  },
  {
    image: "/partners/remitly_logo.png",
    link: "https://remitly.tod8mp.net/55g9ko",
  },
  {
    image: "/partners/ria_logo.png",
    link: "https://ria-money-transfer.7eer.net/e1KVn6",
  },
  {
    image: "/partners/moneygram_logo.png",
    link: "https://moneygram.com/",
  },
  {
    image: "/partners/transfergo_logo.png",
    link: "https://transfergo.sjv.io/xLk4Jx",
  },
  {
    image: "/partners/westernunion_logo.png",
    link: "https://westernunion.com/",
  },
  {
    image: "/partners/wise_logo.png",
    link: "https://wise.prf.hn/click/camref:1011l3XFpW",
  },
  {
    image: "/partners/worldremit_logo.png",
    link: "https://worldremit.sjv.io/DyKXW5",
  },
  {
    image: "/partners/xe_logo.png",
    link: "https://xe-money-transfer.sjv.io/QjymYa",
  },
];

interface PartnerDetails {
  displayName: string;
  link: string;
  image: string;
  fees: string;
  transferTime: string;
}

const PARTNER_NAMES_TO_DETAILS: Record<string, PartnerDetails> = {
  "Western Union": {
    displayName: "Western Union",
    link: "https://www.tkqlhce.com/click-101237354-15662762",
    image: "/partners/westernunion_logo.png",
    fees: "3",
    transferTime: "Minutes to 2 Days",
  },
  "Currency Solution": {
    displayName: "Currency Solutions",
    link: "https://www.currencysolutions.com",
    image: "/partners/currencysolutions_logo.png",
    fees: "0",
    transferTime: "Minutes to 2 Days",
  },
  XE: {
    displayName: "XE",
    link: "https://xe-money-transfer.pxf.io/c/5580726/2132164/12610",
    image: "/partners/xe_logo.png",
    fees: "3",
    transferTime: "Minutes to 2 Days",
  },
  "Atlantic Money": {
    displayName: "Atlantic Money",
    link: "https://www.financeads.net/tc.php?t=70726C4772109258T",
    image: "/partners/atlantic_logo.png",
    fees: "3",
    transferTime: "Minutes to 2 Days",
  },
  Instarem: {
    displayName: "Instarem",
    link: "https://www.instarem.com",
    image: "/partners/instarem_logo.png",
    fees: "3",
    transferTime: "Minutes to 2 Days",
  },
  OFX: {
    displayName: "OFX",
    link: "https://www.ofx.com/p/currapay/",
    image: "/partners/ofx_logo.png",
    fees: "0",
    transferTime: "Minutes to 2 Days",
  },
  Remitly: {
    displayName: "Remitly",
    link: "https://remitly.tod8mp.net/55g9ko",
    image: "/partners/remitly_logo.png",
    fees: "3",
    transferTime: "Minutes to 2 Days",
  },
  Ria: {
    displayName: "Ria",
    link: "https://ria-money-transfer.7eer.net/e1KVn6",
    image: "/partners/ria_logo.png",
    fees: "3",
    transferTime: "Minutes to 2 Days",
  },
};

interface ModalDetails {
  description: string[];
  details?: string;
}

const PARTNER_NAMES_TO_PROMOTION: Record<string, ModalDetails> = {
  "Western Union": {
    description: [
      "Get a $0 transfer fee* the first time you send money internationally online or with the Western Union app.",
    ],
    details: "FX gains apply.",
  },
  "Currency Solution": {
    description: [
      "Currency Solutions is a “zero-fee” broker (FX gains still apply).",
    ],
  },
  Remitly: {
    description: [
      "$0 fee on first transfer.",
      "$0 fees anytime you send a transfer of $1,000 or higher in the USA-IND corridor.",
    ],
  },
  OFX: {
    description: [
      "OFX is a “zero-fee” broker (FX gains still apply).",
    ],
  },
  "Atlantic Money": {
    description: [
      "Fixed fee for the first transfer gets waived for every person using the tracked URL. Applies to standard and express but the 0.1% for express will still be charged.",
      "Referral program: £15 or €15 for each referred person via unique link. Referred person gets a free transfer. Needs to do a transfer and pass standard checks.",
    ],
  },
};

const LANGUAGES = ["EN", "IN", "ES", "CN"];

const FAQS = [
  {
    label: "What does CurraPay do?",
    content:
      "Our website and mobile app helps users find the cheapest, quickest, and best way to send money internationally in real-time across every corridor for the widest range of financial institutions. We are building an online marketplace where financial institutions find customers and vice versa, across every corridor in the international money transfer market.",
  },
  {
    label: "Is CurraPay free? ",
    content:
      "Yes! We provide our price comparison services to our users, individuals and businesses, for free at the point of use.",
  },
  {
    label: "How can I send an international money transfer?",
    content:
      "Our free price comparison service allows users to instantly compare offerings from banks, money transfer companies, and crypto companies that facilitate international money transfers. When you find the option that best matches your preferences, you can click the “Send” button and we will send you to one of our partner’s sites where you can execute your transaction.",
  },
  {
    label: "How does CurraPay make money?",
    content:
      "We generate revenue from referring users to the international money transfer vendors included on this site.",
  },
  {
    label: "What is the mid-market exchange rate?",
    content:
      "This is the exchange rate that financial institutions use when buying and selling currencies in private markets; it is also the exchange rate that Google shares with users. We provide this exchange rate to our users and if you sign up to receive notifications, we alert you to when an exchange rate is particularly strong.",
  },
  {
    label: "Who do you work with?",
    content:
      "We work with Remitly, Wise, Ria, Atlantic Money, Western Union, MoneyGram, OFX, TransferGo, Currency Solutions, XE, Halo Financial, and World Remit (WorldRemit). Our goal is to help people move away from using banks and towards lower-cost alternative options to save consumers billions of dollars each year. ",
  },
];

export {
  COUNTRY_CODES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_NAMES,
  COUNTRY_NAME_TO_CODE,
  COUNTRY_CODE_TO_CURRENCY,
  PARTNER_NAMES_TO_DETAILS,
  PARTNER_NAMES_TO_PROMOTION,
  PARTNERS,
  LANGUAGES,
  FAQS,
};
