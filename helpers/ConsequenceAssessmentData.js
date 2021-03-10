export const yellowCell = '#feef50'
export const redCell = '#eb3924'
export const greenCell = '#439659'

export const likelihoods = [
  {
    title: 'Almost Certain',
    level: 5,
    impacts: [
      { level: 1, color: yellowCell, label: 'M' },
      { level: 2, color: yellowCell, label: 'M' },
      { level: 3, color: redCell, label: 'H' },
      { level: 4, color: redCell, label: 'H' },
      { level: 5, color: redCell, label: 'H' },
    ],
  },
  {
    title: 'Likely',
    level: 4,
    impacts: [
      { level: 1, color: greenCell, label: 'L' },
      { level: 2, color: yellowCell, label: 'M' },
      { level: 3, color: yellowCell, label: 'M' },
      { level: 4, color: redCell, label: 'H' },
      { level: 5, color: redCell, label: 'H' },
    ],
  },
  {
    title: 'Possible',
    level: 3,
    impacts: [
      { level: 1, color: greenCell, label: 'L' },
      { level: 2, color: yellowCell, label: 'M' },
      { level: 3, color: yellowCell, label: 'M' },
      { level: 4, color: redCell, label: 'H' },
      { level: 5, color: redCell, label: 'H' },
    ],
  },
  {
    title: 'Unlikely',
    level: 2,
    impacts: [
      { level: 1, color: greenCell, label: 'L' },
      { level: 2, color: greenCell, label: 'L' },
      { level: 3, color: yellowCell, label: 'M' },
      { level: 4, color: yellowCell, label: 'M' },
      { level: 5, color: redCell, label: 'H' },
    ],
  },
  {
    title: 'Rare',
    level: 1,
    impacts: [
      { level: 1, color: greenCell, label: 'L' },
      { level: 2, color: greenCell, label: 'L' },
      { level: 3, color: greenCell, label: 'L' },
      { level: 4, color: yellowCell, label: 'M' },
      { level: 5, color: yellowCell, label: 'M' },
    ],
  },
]

export const impactLegends = [
  { title: 'Insignificant', level: 1 },
  { title: 'Minor', level: 2 },
  { title: 'Moderate', level: 3 },
  { title: 'Significant', level: 4 },
  { title: 'Critical', level: 5 },
]

export const colorDetails = [
  {
    title: 'ระดับสูง',
    color: redCell,
    details: [
      'ระดับที่ไม่สามารถยอมรับได้',
      'ต้องลดระดับความเสี่ยงให้อยู่ระดับกลางหรือต่ำ',
    ],
  },
  {
    title: 'ระดับกลาง',
    color: yellowCell,
    details: ['ต้องลด Likelihood และ/หรือ Potential Impact อย่างน้อย 1 ระดับ'],
  },
  {
    title: 'ระดับต่ำ',
    color: greenCell,
    details: [
      'ระดับที่สามารถยอมรับได้',
      'รักษาประสิทธิผลของมาตรบริหารความเสี่ยง',
      'ลด Likelihood หรือ Potential Impact หากประโยชน์ที่ได้รับเพิ่มมากกว่าค่าใช้จ่ายที่สูงขึ้น',
    ],
  },
]
