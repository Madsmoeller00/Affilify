// Command to start mapping: node src/scripts/update-category-mappings.js

export function mapCategory(originalCategory) {
  // Convert to lowercase and trim for consistent matching
  const category = originalCategory.toLowerCase().trim();

  // Bolig, Have & Gør-det-selv 
  if ([
    'home, garden & interior',
    'construction & garden',
    'home & interior',
    'living, house & garden',
    'home & utility',
    'hobbies & recreation',
    'garden & construction',
    'gør-det-selv og hobby',
    'bolig, have og interiør'
  ].includes(category)) {
    return "Bolig, Have & Gør-det-selv";
  }

  // Køretøjer & Transport
  if ([
    'car, motorcycle, cycling & boat',
    'car & motor',
    'cars & motorbikes',
    'automotive',
    'bil, mc, cykling og båd'
  ].includes(category)) {
    return "Køretøjer & Transport";
  }

  // Sport, Dyr, Outdoor, Sundhed & Beauty
  if ([
    'sport & fitness',
    'outdoor, nature & animals',
    'sports & outdoor',
    'health & personal care',
    'health & beauty',
    'sports, beauty & health',
    'outdoor, natur og dyr',
    'sport og fitness',
    'sundhed og personlig pleje'
  ].includes(category)) {
    return "Sport, Dyr, Outdoor, Sundhed & Beauty";
  }

  // Tøj, Mode & Accessoires
  if ([
    'clothing & accessories',
    'fashion & lifestyle',
    'fashion',
    'tøj og accessories'
  ].includes(category)) {
    return "Tøj, Mode & Accessoires";
  }

  // Baby, Børn & Forældre
  if ([
    'baby, children & teenagers',
    'children & family',
    'parenting',
    'family & kids',
    'baby, børn og teenager'
  ].includes(category)) {
    return "Baby, Børn & Forældre";
  }

  // Elektronik & Teknologi
  if ([
    'computer & electronics',
    'electronics & technology',
    'consumer electronics',
    'telephony & internet',
    'computer og elektronik'
  ].includes(category)) {
    return "Elektronik & Teknologi";
  }

  // Underholdning, Medie & Spil
  if ([
    'music & film',
    'home entertainment',
    'games & esports',
    'streaming, apps & mobile',
    'musik og film',
    'media & telecom',
    'telecom',
    'telephony & internet',
    'telefoni og internet'
  ].includes(category)) {
    return "Telefoni, internet, Underholdning, Medie & Spil";
  }

  // Mad, Drikke & Fest
  if ([
    'food, drinks & party',
    'food & drink',
    'mad, drikke og fest'
  ].includes(category)) {
    return "Mad, Drikke & Fest";
  }

  // Dating & Voksen
  if ([
    'dating',
    'games & dating',
    'erotic & sex',
    'adult',
    'spil og dating',
    'erotik og sex'
  ].includes(category)) {
    return "Dating & Voksen";
  }

  // Ferie & Oplevelser
  if ([
    'vacation & experiences',
    'travel & accomodation',
    'travel & leisure',
    'ferie og oplevelser'
  ].includes(category)) {
    return "Rejser & Oplevelser";
  }

  // Arbejde & Uddannelse
  if ([
    'job, education & development',
    'work & education',
    'job, uddannelse, udvikling'
  ].includes(category)) {
    return "Arbejde & Uddannelse";
  }

  // Bøger, Litteratur & Kunst
  if ([
    'books & art',
    'books, magazines & newspapers',
    'books, literature & media',
    'bøger og kunst',
  ].includes(category)) {
    return "Bøger, Litteratur & Kunst";
  }

  // Forsikring & Pension
  if ([
    'insurance',
    'insurance & unemployment fund',
    'insurance & pension',
    'money & insurance',
    'penge og forsikring'
  ].includes(category)) {
    return "Penge & Forsikring";
  }

  // Finans & Krypto
  if ([
    'banking & finance',
    'loans',
    'microloans',
    'crypto',
    'finance',
    'payday loans'
  ].includes(category)) {
    return "Finans & Krypto";
  }

  // Virksomhed til Virksomhed
  if ([
    'business-to-business',
  ].includes(category)) {
    return "B2B";
  }

  // Shopping & Gaver
  if ([
    'shopping & gifts',
    'gifts & flowers',
    'daily deals & auctions',
    'retail & shopping',
    'shopping og gaver'
  ].includes(category)) {
    return "Shopping & Gaver";
  }

  // Undersøgelser & Markedsføring
  if ([
    'surveys',
    'research panels & surveys'
  ].includes(category)) {
    return "Undersøgelser & Markedsføring";
  }

  // Non-Profit & Velgørenhed
  if ([
    'non profit & charity'
  ].includes(category)) {
    return "Non-Profit & Velgørenhed";
  }

  // Energi & Utility
  if ([
    'energy'
  ].includes(category)) {
    return "Energi & Utility";
  }

  // Bæredygtighed & Miljø
  if ([
    'sustainable'
  ].includes(category)) {
    return "Bæredygtighed & Miljø";
  }

  // Lodtrækninger og Konkurrencer
  if ([
    'leadshare / leadreward',
    'orderfeed',
    'competitions',
    'lotteries & gambling',
    'gambling'
  ].includes(category)) {
    return "Lodtrækninger og Konkurrencer";
  }

  // Default case
  return "Andet";
} 