export interface CountryDatum {
  name: string;
  code: string;
  cases: number;
  active: number;
  deaths: number;
  recovered: number;
  population: number;
  dailyCases: number;
  dailyDeaths: number;
}

export const LAST_UPDATED = '31.05.20 • 23:59 GMT';

export const globalStats = {
  cases: 6_150_482,
  fatalities: 370_506,
  active: 3_045_430,
  recovered: 2_734_546,
  dailyCases: 136_022,
  dailyFatalities: 5_435,
  dailyActive: 22_102,
};

export const trendData = [
  { date: '25.05', value: 5_624_633 },
  { date: '26.05', value: 5_729_812 },
  { date: '27.05', value: 5_836_947 },
  { date: '28.05', value: 5_947_520 },
  { date: '29.05', value: 6_057_388 },
  { date: '30.05', value: 6_148_521 },
  { date: '31.05', value: 6_150_482 },
];

export const countries: CountryDatum[] = [
  { name: 'USA', code: 'US', cases: 1_845_060, active: 1_170_000, deaths: 105_030, recovered: 570_030, population: 331_000_000, dailyCases: 22_820, dailyDeaths: 1_175 },
  { name: 'Brazil', code: 'BR', cases: 514_849, active: 278_000, deaths: 29_314, recovered: 207_535, population: 212_600_000, dailyCases: 27_343, dailyDeaths: 1_043 },
  { name: 'Russia', code: 'RU', cases: 396_575, active: 152_000, deaths: 4_580, recovered: 240_000, population: 146_700_000, dailyCases: 9_268, dailyDeaths: 138 },
  { name: 'Spain', code: 'ES', cases: 286_718, active: 70_000, deaths: 27_124, recovered: 189_594, population: 47_100_000, dailyCases: 1_184, dailyDeaths: 55 },
  { name: 'UK', code: 'GB', cases: 274_762, active: 165_000, deaths: 38_489, recovered: 71_273, population: 67_200_000, dailyCases: 2_093, dailyDeaths: 347 },
  { name: 'Italy', code: 'IT', cases: 232_664, active: 44_000, deaths: 33_415, recovered: 155_249, population: 60_400_000, dailyCases: 516, dailyDeaths: 111 },
  { name: 'France', code: 'FR', cases: 151_677, active: 75_000, deaths: 28_714, recovered: 47_963, population: 67_100_000, dailyCases: 1_053, dailyDeaths: 63 },
  { name: 'Germany', code: 'DE', cases: 183_410, active: 25_000, deaths: 8_651, recovered: 149_759, population: 83_200_000, dailyCases: 362, dailyDeaths: 26 },
  { name: 'India', code: 'IN', cases: 182_142, active: 90_000, deaths: 5_164, recovered: 86_978, population: 1_380_000_000, dailyCases: 8_380, dailyDeaths: 193 },
  { name: 'Turkey', code: 'TR', cases: 162_848, active: 30_000, deaths: 4_505, recovered: 128_343, population: 84_300_000, dailyCases: 983, dailyDeaths: 27 },
  { name: 'Peru', code: 'PE', cases: 155_674, active: 78_000, deaths: 4_478, recovered: 73_196, population: 32_500_000, dailyCases: 6_154, dailyDeaths: 165 },
  { name: 'Iran', code: 'IR', cases: 148_958, active: 28_000, deaths: 7_790, recovered: 113_168, population: 84_000_000, dailyCases: 2_516, dailyDeaths: 61 },
  { name: 'Chile', code: 'CL', cases: 99_688, active: 56_000, deaths: 1_054, recovered: 42_634, population: 19_100_000, dailyCases: 3_957, dailyDeaths: 34 },
  { name: 'Canada', code: 'CA', cases: 92_858, active: 35_000, deaths: 7_466, recovered: 50_392, population: 38_000_000, dailyCases: 907, dailyDeaths: 104 },
  { name: 'Mexico', code: 'MX', cases: 90_664, active: 18_000, deaths: 9_933, recovered: 62_731, population: 126_000_000, dailyCases: 3_447, dailyDeaths: 501 },
  { name: 'Saudi Arabia', code: 'SA', cases: 85_260, active: 32_000, deaths: 502, recovered: 52_758, population: 34_800_000, dailyCases: 1_645, dailyDeaths: 19 },
];
