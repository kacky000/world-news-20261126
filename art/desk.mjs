// desk.mjs — the news desk: the day, its stories and what was left out.
// Edition 1 was filed at about 00:45 UTC, so most of the day is still ahead: anything that had not
// happened yet is tagged FORECAST and says when it is due. Every item is dated 26 November 2026 (UTC)
// in the report named as its source. Stories from other days are listed in LEFT_OUT, never above.

export const DAY = {
  big: '26 NOVEMBER 2026',
  weekday: 'THURSDAY',
  short: 'Thu 26 Nov 2026',
  edition: 'EDITION 1 · FILED 00:45 UTC · THANKSGIVING DAY IN THE U.S.',
  foot:
    'Sources: Yonhap, Korea Times, Korea Herald, ABC News (Australia), Al Jazeera, EU Council, ECB, EFE, UEFA, FIFA, FIA, NFL, NBA, NHL, NBC New York, La Nación, IBGE, Cricket World, Rio Times, Hans India. Only events of Thursday 26 November 2026 (UTC).',
};

export const REGIONS = {
  ASIA: { name: 'ASIA', short: 'ASIA', colour: '#b3261e', tint: '#f8dcd6' },
  OCE: { name: 'OCEANIA', short: 'OCEANIA', colour: '#00798c', tint: '#d3ecef' },
  MIDEAST: { name: 'MIDDLE EAST', short: 'MID EAST', colour: '#a05a00', tint: '#f3e1c4' },
  AFRICA: { name: 'AFRICA', short: 'AFRICA', colour: '#3c7a1e', tint: '#dcebd0' },
  EUROPE: { name: 'EUROPE', short: 'EUROPE', colour: '#1d4ed8', tint: '#d9e3fb' },
  NAM: { name: 'NORTH AMERICA', short: 'N. AMERICA', colour: '#6d28a8', tint: '#e7daf5' },
  LATAM: { name: 'LATIN AMERICA', short: 'LAT. AM.', colour: '#c2410c', tint: '#fbe0d0' },
};

export const SURE = {
  C: { word: 'CONFIRMED', colour: '#15803d', means: 'happened' },
  O: { word: 'OFFICIAL', colour: '#1d4ed8', means: 'official statement' },
  R: { word: 'REPORTED', colour: '#7c3aed', means: 'one outlet' },
  L: { word: 'CLAIM', colour: '#c2410c', means: 'one side says' },
  F: { word: 'FORECAST', colour: '#64748b', means: 'due later today' },
};

export const STORIES = [
  // ── leads ──
  {
    slot: 'lead', region: 'ASIA', field: 'MARKETS', place: 'Seoul', lon: 127, lat: 37.5, utc: '00:00', tick: 'Kospi +1%',
    head: "Seoul stocks open 1% up after Wednesday's 6% plunge",
    sum: 'The Kospi starts the day at 4,745.10, up 47.59 points, with traders waiting for the Bank of Korea’s last rate decision of the year.',
    caption: 'KOSPI +1.01% AT THE OPEN', icon: 'chartUp', sure: 'C', src: 'Yonhap / Korea Times',
  },
  {
    slot: 'lead', region: 'EUROPE', field: 'BUDGET', place: 'Brussels', lon: 4.4, lat: 50.8, utc: '09:00', tick: 'EU summit',
    head: 'EU leaders open special summit on a €1.58 trillion budget',
    sum: 'The 27 meet for two days on the 2028–2034 budget (€1,582.5bn proposed) and on how to fund Ukraine through 2027.',
    caption: 'SPECIAL EUROPEAN COUNCIL', icon: 'summit', sure: 'F', src: 'EU Council invitation',
  },
  {
    slot: 'lead', region: 'NAM', field: 'HOLIDAY', place: 'New York', lon: -74, lat: 40.7, utc: '13:30', tick: 'NY parade',
    head: "100th Macy's Thanksgiving Day Parade steps off in New York",
    sum: 'America keeps Thanksgiving: a record 100 balloons and inflatables are due on the route from 8:30 a.m. Eastern time.',
    caption: 'THANKSGIVING DAY, U.S.', icon: 'balloon', sure: 'F', src: 'NBC New York',
  },

  // ── picture cards ──
  {
    slot: 'card', region: 'ASIA', field: 'CENTRAL BANKS', place: 'Seoul', lon: 127.4, lat: 36.6,
    head: 'Bank of Korea sets rates',
    sum: 'Base rate is 3.00%; 18 of 19 economists polled expect a rise to 3.25%.',
    icon: 'percent', sure: 'F', src: 'Korea Herald',
  },
  {
    slot: 'card', region: 'ASIA', field: 'COURTS', place: 'Seoul', lon: 126.6, lat: 37.9, utc: '01:15', tick: 'Yoon ruling',
    head: 'Top court rules on Yoon perjury case',
    sum: 'Due 10:15 Seoul time; two lower courts acquitted the ex-president.',
    icon: 'gavel', sure: 'F', src: 'Korea Times',
  },
  {
    slot: 'card', region: 'LATAM', field: 'PARLIAMENT', place: 'Buenos Aires', lon: -58.4, lat: -34.6, utc: '15:00', tick: 'Argentina budget',
    head: 'Argentina debates its 2027 budget',
    sum: 'Deputies sit from noon; the Senate takes up a bill to suspend primaries.',
    icon: 'dome', sure: 'F', src: 'La Nación',
  },
  {
    slot: 'card', region: 'OCE', field: 'HEALTH', place: 'Brisbane', lon: 153, lat: -27.5, utc: '00:12', tick: 'Qld chief quits',
    head: 'Queensland ambulance chief resigns',
    sum: 'Craig Emery goes after seven patients died waiting for ambulances since June.',
    icon: 'cross', sure: 'O', src: 'ABC News',
  },
  {
    slot: 'card', region: 'OCE', field: 'ELECTIONS', place: 'Melbourne', lon: 145, lat: -37.8,
    head: 'Victoria: two days to the vote',
    sum: 'Premier Ben Carroll campaigns in Dandenong South before Saturday’s state election.',
    icon: 'ballot', sure: 'C', src: 'ABC live blog',
  },
  {
    slot: 'card', region: 'MIDEAST', field: 'CONFLICT', place: 'Sanaa · Riyadh', lon: 44.2, lat: 15.4,
    head: 'Blast in Sanaa; missiles over Riyadh',
    sum: 'Saudi-led coalition says it shot down two Houthi ballistic missiles.',
    icon: 'missile', sure: 'L', src: 'Al Jazeera live',
  },
  {
    slot: 'card', region: 'NAM', field: 'AMERICAN FOOTBALL', place: 'Detroit · Arlington', lon: -83, lat: 42.3, utc: '18:00', tick: 'Bears–Lions',
    head: 'NFL Thanksgiving double bill',
    sum: 'Bears at Lions 18:00 UTC, then Eagles at Cowboys 21:30 UTC.',
    icon: 'gridiron', sure: 'F', src: 'NFL schedule',
  },
  {
    slot: 'card', region: 'EUROPE', field: 'FOOTBALL', place: '18 grounds', utc: '17:45', tick: 'Europa League',
    head: 'Europa League matchday 5',
    sum: '18 matches: Olympiacos–Milan at 17:45, Juventus–Omonia at 20:00 UTC.',
    icon: 'soccer', sure: 'F', src: 'UEFA',
  },
  {
    slot: 'card', region: 'EUROPE', field: 'ELECTIONS', place: 'Madrid', lon: -3.7, lat: 40.4, utc: '21:00', tick: 'Spain debate',
    head: "Spain's four-way election debate",
    sum: 'Sánchez, Feijóo, Abascal and Colau meet on TV three days before the vote.',
    icon: 'podium', sure: 'F', src: 'EFE',
  },
  {
    slot: 'card', region: 'MIDEAST', field: 'FOOTBALL', place: 'Al Rayyan, Qatar', lon: 51.4, lat: 25.3, utc: '13:00', tick: 'U-17 World Cup',
    head: 'U-17 World Cup: eight group games',
    sum: 'Among them Morocco–Spain, Uzbekistan–Italy and Vietnam–Mali.',
    icon: 'trophy', sure: 'F', src: 'FIFA / ESPN',
  },
  {
    slot: 'card', region: 'OCE', field: 'CRICKET', place: 'Christchurch', lon: 172.6, lat: -43.5, utc: '22:00', tick: 'NZ v India',
    head: 'New Zealand v India, 2nd Test',
    sum: 'The final Test of the series starts at Hagley Oval at 22:00 UTC.',
    icon: 'cricket', sure: 'F', src: 'Cricket World',
  },
  {
    slot: 'card', region: 'AFRICA', field: 'PRICES', place: 'Lusaka', lon: 28.3, lat: -15.4, utc: '08:00', tick: 'Zambia CPI',
    head: 'Zambia posts November inflation',
    sum: 'Out at 08:00 UTC, a day before the central bank sets its rate.',
    icon: 'coins', sure: 'F', src: 'Rio Times',
  },

  // ── briefs ──
  { slot: 'brief', region: 'NAM', field: 'AMERICAN FOOTBALL', lon: -118.3, lat: 34, utc: '01:00', tick: 'Packers–Rams', head: 'Packers at Rams: first NFL "Thanksgiving Eve" game', sum: 'Both 6-4; Inglewood, California', sure: 'F', src: 'Packers.com' },
  { slot: 'brief', region: 'NAM', field: 'BASKETBALL', lon: -93.3, lat: 45, utc: '00:30', head: 'NBA Cup group night: Timberwolves–Thunder tips off', sum: 'Nine games on the night', sure: 'O', src: 'NBA.com' },
  { slot: 'brief', region: 'NAM', field: 'ICE HOCKEY', lon: -78.6, lat: 35.8, head: 'NHL plays 14 games on the eve of Thanksgiving', sum: 'All start at 00:00 UTC or later', sure: 'O', src: 'NHL.com' },
  { slot: 'brief', region: 'NAM', field: 'MARKETS', lon: -72.5, lat: 41.8, head: 'Wall Street shut for Thanksgiving', sum: 'Early close follows on Friday', sure: 'O', src: 'NYSE calendar' },
  { slot: 'brief', region: 'EUROPE', field: 'FARMING', lon: 3.2, lat: 51.6, head: 'Farmers rally in Brussels as the summit opens', sum: 'Against cuts to the farm policy', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'EUROPE', field: 'CENTRAL BANKS', lon: 8.7, lat: 50.1, utc: '12:30', tick: 'ECB account', head: 'ECB publishes the account of its October meeting', sum: 'Frankfurt', sure: 'F', src: 'ECB calendar' },
  { slot: 'brief', region: 'EUROPE', field: 'ECONOMIC DATA', lon: 11.1, lat: 49.5, utc: '07:00', head: 'German GfK consumer confidence for December', sum: 'Consensus −29 after −30.8', sure: 'F', src: 'ActionForex' },
  { slot: 'brief', region: 'EUROPE', field: 'ELECTIONS', lon: -4.5, lat: 39.5, utc: '13:00', head: 'Spain: postal-vote deadline for 1.1m voters', sum: 'Election is on Sunday 29 Nov', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'EUROPE', field: 'MIGRATION', lon: -18, lat: 27.7, head: 'Spain sends its military emergency unit to El Hierro', sum: 'After a surge in boat arrivals', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'EUROPE', field: 'DIPLOMACY', lon: 13.4, lat: 52.5, head: 'German and Romanian foreign ministers meet on Ukraine', sum: 'Berlin; host is Johann Wadephul', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'EUROPE', field: 'TENNIS', lon: 11.3, lat: 44.5, utc: '09:00', head: 'Davis Cup quarter-finals: Great Britain v Germany', sum: 'Bologna; then Austria v Spain', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'EUROPE', field: 'FOOTBALL', lon: 21, lat: 47, utc: '15:30', tick: 'Conf. League', head: 'Conference League matchday 4: Kairat–Mjällby first', sum: 'Ajax–Thun 17:45, Borac–Atalanta 20:00', sure: 'F', src: 'UEFA' },
  { slot: 'brief', region: 'EUROPE', field: 'BASKETBALL', lon: 19.3, lat: 42.4, utc: '18:00', head: 'Montenegro v Spain, basketball World Cup qualifier', sum: 'Podgorica', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'EUROPE', field: 'WEATHER', lon: -0.5, lat: 42.9, head: 'Pyrenees: up to 15 cm of snow forecast in 24 hours', sum: 'Persistent rain on the Cantabrian coast', sure: 'F', src: 'Tutiempo' },
  { slot: 'brief', region: 'LATAM', field: 'FOOTBALL', lon: -99.7, lat: 19.3, utc: '01:00', head: 'Liga MX quarter-finals begin: Toluca v Atlas', sum: 'Then Monterrey v América, 03:10 UTC', sure: 'F', src: 'Excélsior / ESPN' },
  { slot: 'brief', region: 'LATAM', field: 'PRICES', lon: -43.2, lat: -22.9, utc: '12:00', tick: 'Brazil IPCA-15', head: 'Brazil: IBGE publishes mid-November inflation', sum: 'IPCA-15; October reading was 0.32%', sure: 'F', src: 'IBGE calendar' },
  { slot: 'brief', region: 'LATAM', field: 'ELECTIONS', lon: -78.5, lat: -0.2, head: 'Ecuador: last day of local-election campaign', sum: '5,749 posts are voted on Sunday 29 Nov', sure: 'F', src: 'Primicias' },
  { slot: 'brief', region: 'LATAM', field: 'TRADE', lon: -82.4, lat: 23.1, head: 'Cuba: Havana trade fair Fihav closes with forum', sum: '42nd edition, 24–26 Nov', sure: 'F', src: 'Vanguardia' },
  { slot: 'brief', region: 'LATAM', field: 'LABOUR', lon: -96.7, lat: 17.1, head: "Mexico: Oaxaca teachers' 48-hour strike shuts schools", sum: 'Union section 22; no classes Thursday', sure: 'R', src: 'El Heraldo' },
  { slot: 'brief', region: 'LATAM', field: 'BASKETBALL', lon: -56.2, lat: -34.9, utc: '23:10', tick: 'Uruguay–Canada', head: 'Uruguay v Canada, basketball World Cup qualifier', sum: 'Montevideo', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'LATAM', field: 'ELECTIONS', lon: -66.9, lat: 10.5, head: 'Spaniards abroad: last day of consular voting', sum: 'Buenos Aires, Mexico City, Havana', sure: 'F', src: 'EFE' },
  { slot: 'brief', region: 'MIDEAST', field: 'MOTORSPORT', lon: 52.6, lat: 26.6, utc: '14:30', head: 'F1 Qatar Grand Prix: drivers face the press at Lusail', sum: 'Russell, Leclerc, Piastri; race Sunday', sure: 'F', src: 'FIA schedule' },
  { slot: 'brief', region: 'MIDEAST', field: 'BUSINESS', lon: 55.3, lat: 25.2, head: 'Dubai: Doers Summit ends its second and last day', sum: 'More than 5,000 participants expected', sure: 'F', src: 'Dubai Media Office' },
  { slot: 'brief', region: 'AFRICA', field: 'BUSINESS', lon: 28, lat: -26.2, utc: '07:00', tick: 'Ramaphosa', head: 'Ramaphosa addresses South Africa small-business summit', sum: 'National MSME and co-operatives summit', sure: 'F', src: 'The Presidency' },
  { slot: 'brief', region: 'AFRICA', field: 'SOCIETY', lon: -4, lat: 5.3, utc: '13:00', head: 'Abidjan: AfDB dialogue on gender-based violence', sum: 'For the 16 Days of Activism', sure: 'F', src: 'allAfrica / AfDB' },
  { slot: 'brief', region: 'ASIA', field: 'MARKETS', lon: 139.7, lat: 35.7, utc: '00:00', head: 'Nikkei opens 0.9% up at 57,514.92', sum: 'After a 2.8% fall on Wednesday', sure: 'R', src: 'Jin10' },
  { slot: 'brief', region: 'OCE', field: 'ELECTIONS', lon: 144, lat: -36.3, utc: '00:20', head: 'One Nation: we may hold balance of power in Victoria', sum: 'Deputy leader cites upper-house polls', sure: 'L', src: 'ABC live blog' },
  { slot: 'brief', region: 'OCE', field: 'COURTS', lon: 146.5, lat: -38.6, head: "Labor seeks injunction over dumped Liberal's shirts", sum: 'Victorian Supreme Court hearing', sure: 'F', src: 'ABC live blog' },
  { slot: 'brief', region: 'OCE', field: 'BUDGET', lon: 143, lat: -38.3, utc: '01:45', head: 'Victorian Coalition releases election costings', sum: 'Press conference at 02:00 UTC', sure: 'F', src: 'ABC live blog' },
  { slot: 'brief', region: 'OCE', field: 'BUSINESS', lon: 151.2, lat: -33.9, head: 'Sydney court rules on David Jones administration', sum: 'Administrators asked for more time', sure: 'F', src: 'ABC News' },
  { slot: 'brief', region: 'OCE', field: 'ECONOMIC DATA', lon: 149.1, lat: -35.3, utc: '00:30', head: 'Australia: third-quarter capital spending data', sum: 'Consensus +4.4% after −3.6%', sure: 'F', src: 'ActionForex' },
  { slot: 'brief', region: 'ASIA', field: 'CIVIC LIFE', lon: 77.2, lat: 28.6, utc: '05:30', tick: 'India: Constitution Day', head: 'India marks its 77th Constitution Day', sum: 'Colleges read the Preamble at 11:00 IST', sure: 'F', src: 'Hans India' },
  { slot: 'brief', region: 'ASIA', field: 'REMEMBRANCE', lon: 72.9, lat: 19.1, head: 'Mumbai remembers the 26/11 attacks, 18 years on', sum: 'Anniversary of the 2008 attacks', sure: 'F', src: 'Observer Voice' },
  { slot: 'brief', region: 'ASIA', field: 'FOOTBALL', lon: 103.8, lat: 1.3, head: 'AFC Champions League Two: Tampines v Shanghai Shenhua', sum: 'Jalan Besar, Singapore; group G', sure: 'F', src: 'AFC fixtures' },
  { slot: 'brief', region: 'AFRICA', field: 'DIPLOMACY', lon: 36.8, lat: -1.3, head: "Germany's Steinmeier ends three-nation Africa tour", sum: "Côte d'Ivoire, Ghana and Kenya", sure: 'F', src: 'Rio Times' },
  { slot: 'brief', region: 'AFRICA', field: 'WEATHER', lon: 20, lat: -31.5, head: 'South Africa: extreme fire-danger warning for the Cape', sum: 'Heat in Northern and Western Cape', sure: 'F', src: 'The Citizen' },
];

// Stories a reader might expect here that belong to another day.
export const LEFT_OUT = [
  { what: 'Kospi plunges 6.16% to 4,697.51, a 10-month low', when: 'WED 25 NOV' },
  { what: 'U.S. announces tariffs on 14 trade partners', when: 'WED 25 NOV' },
  { what: 'Giza vehicle fire kills at least 30 in Egypt', when: 'WED 25 NOV' },
  { what: 'Ukraine hits three Russian oil refineries', when: 'NIGHT 24–25 NOV' },
  { what: 'Solomon Islands signs security deal with Australia', when: 'WED 25 NOV' },
  { what: 'White House turkey pardon', when: 'TUE 24 NOV' },
  { what: 'NFL: Chiefs at Bills kicks off 01:20 UTC', when: 'FRI 27 NOV' },
  { what: 'Rocket Lab Electron launch from New Zealand', when: 'FRI 27 NOV' },
];
