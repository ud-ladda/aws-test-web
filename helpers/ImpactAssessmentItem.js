// impactAssesment
const notApplication = 'Not Applicable'
const insignificant = 'Insignificant'
const minor = 'Minor'
const moderate = 'Moderate'
const significant = 'Significant'
const critical = 'Critical'
// likeliHoodAssesment
const rare = 'Rare'
const unlikely = 'Unlikely'
const possible = 'Possible'
const likely = 'Likely'
const almostCertain = 'Almost Certain'

export const impactAssessmentItems = [
  {
    title: 'กรุณาประเมินผลกระทบความเสี่ยงด้าน Financial',
    tooltips: [
      'นำผลกระทบที่คำนวณเป็นตัวเงินให้นำไปเปรียบเทียบกับ Planned EBITDA ของกลุ่มธุรกิจ บริษัท หรือหน่วยงาน ตามความเหมาะสมกับความ เสี่ยงที่ประเมิน',
      'สำหรับการประเมินความเสี่ยงของโครงการลงทุน นำผลกระทบที่มีต่อ % Planned EBITDA on Investment ว่าต่างไปจากที่ได้รับอนุมัติมากน้อย เพียงใด',
    ],
    sliderHeight: 130,
    sliderLabels: {
      0: {
        title: notApplication,
        details: ['No assessment or not relevant this category'],
      },
      1: {
        title: insignificant,
        details: [
          '<1.25% of planned EBITDA',
          '< 5% deviation from planned EBITDA on investment',
        ],
      },
      2: {
        title: minor,
        details: [
          '≥ 1.25% of planned EBITDA',
          '≥ 5% deviation from planned EBITDA on investment',
        ],
      },
      3: {
        title: moderate,
        details: [
          '≥ 2.50% of planned EBITDA',
          '≥ 10% deviation from planned EBITDA on investment',
        ],
      },
      4: {
        title: significant,
        details: [
          '≥ 3.75% of planned EBITDA',
          '≥ 15% deviation from planned EBITDA on investment',
        ],
      },
      5: {
        title: critical,
        details: ['≥ 5.00% of planned EBITDA', 'Miss hurdle rate'],
      },
    },
  },
  {
    title: 'กรุณาประเมินผลกระทบความเสี่ยงด้าน Health & Safety',
    tooltips: [
      'ผลกระทบของเหตุการณ์ความเสี่ยงที่มีต่อสุขภาพ และ/หรือ ความปลอดภัยของพนักงานหรือผู้รับเหมา',
    ],
    sliderHeight: 150,
    sliderLabels: {
      0: {
        title: notApplication,
        details: ['No assessment or not relevant this category'],
      },
      1: {
        title: insignificant,
        details: ['Minor injury with first aid'],
      },
      2: {
        title: minor,
        details: ['1 RWC or', 'Medical treatment'],
      },
      3: {
        title: moderate,
        details: [
          'LTIFR lower than planned or',
          'Multiple Restricted Work Cases (RWC)',
        ],
      },
      4: {
        title: significant,
        details: [
          '1 Fatality or',
          '1 permanent disabilities or',
          'Lost-Time Injuries Frequency',
          'Rate (LTIFR) higher than planned',
        ],
      },
      5: {
        title: critical,
        details: ['Multiple fatalities or', 'Multiple permanent disabilities'],
      },
    },
  },
  {
    title: 'กรุณาประเมินผลกระทบความเสี่ยงด้าน Legal',
    tooltips: [
      'ผลกระทบของการไม่ปฎิบัติตามกฎหมายหรือกฎระเบียบต่างๆ',
      'โทษจำคุก (Imprisonment): หากมีโทษจำคุกให้ถือว่าเป็นผลกระทบฯ ระดับ Critical',
      'ค่าปรับ (Fine): ประเมินจากจำนวนเงินที่คาดว่าจะโดนปรับหากมีการไม่ปฏิบัติตาม',
      'โทษที่ ได้รับ(Penalty)โทษอื่นทางกฎหมายที่ส่งผลกระทบต่อความต่อเนื่องทางธุรกิจ(Business Interruption)',
    ],
    sliderHeight: 180,
    sliderLabels: {
      0: {
        title: notApplication,
        details: ['No assessment or not ', 'relevant this category'],
      },
      1: {
        title: insignificant,
        details: ['Fine: < THB 0.1Mn'],
      },
      2: {
        title: minor,
        details: [
          'Fine: ≥ THB 0.1 Mn or',
          'Other penalties specified by law, resulting minor level of',
          '“BI” impact category',
        ],
      },
      3: {
        title: moderate,
        details: [
          'Fine: ≥ THB 0.3 Mn or',
          'Other penalties specified by law,',
          'resulting in moderate level of ',
          '“BI” impact category',
        ],
      },
      4: {
        title: significant,
        details: [
          'Fine: ≥ THB 0.5 Mn or',
          'Other penalties specified by',
          'law, resulting in significant level',
          'of “BI” impact category',
        ],
      },
      5: {
        title: critical,
        details: [
          'Imprisonment or',
          'Other penalties specified by law,',
          'resulting in critical level of',
          '“Business Interruption (BI)”',
          'impact category',
          'Fine: ≥ THB 1 Mn or',
        ],
      },
    },
  },
  {
    title: 'กรุณาประเมินผลกระทบความเสี่ยงด้าน Reputation',
    tooltips: [
      'ผลกระทบในเชิงลบด้านชื่อเสียงบริษัทโดยอาจเกิดจากการกระทำของบริษัทหรือปัจจัยสภาพแวดล้อมภายนอก',
      'ความเสียหายด้านชื่อเสียงของบริษัท (Reputation Damage Severity)',
      'การแพร่กระจายของข้อมูล (Media Coverage): เช่น ข้อความที่เกี่ยวข้องกับบริษัทในเชิงลบติด top tweet/hashtag',
      'ความมั่นใจต่อผู้มีส่วนได้เสียต่อองค์กร (Stakeholder Confidence): เช่น การ Ban, protest ที่โรงงานบริษัท',
    ],
    sliderHeight: 300,
    sliderLabels: {
      0: {
        title: notApplication,
        details: ['No assessment or not relevant this category'],
      },
      1: {
        title: insignificant,
        details: [
          'Reputation minimally affected. ',
          'No effort or expense required ',
          'to recover',
        ],
      },
      2: {
        title: minor,
        details: [
          'Reputation minimally affected: Little effort/expense required to recover or',
          'Minor coverage in local media',
        ],
      },
      3: {
        title: moderate,
        details: [
          'Reputation damaged: Some effort ',
          '& expense required to recover or',
          'Coverage in local media or',
          'Company fails to meet stakeholder',
          'needs in some areas, but stakeholder',
          'confidence remains largely unchanged.',
        ],
      },
      4: {
        title: significant,
        details: [
          'Reputation severely damaged: Considerable effort & expense ',
          'required to recover or',
          'Significant coverage in national media or',
          'Significant change in stakeholder confidence',
        ],
      },
      5: {
        title: critical,
        details: [
          'Reputation severely damaged ',
          '& irreversible or',
          'Significant coverage in international,',
          'regional or massive coverage in',
          'national media or',
          'Dramatic change in stakeholder',
          'confidence',
        ],
      },
    },
  },
  {
    title: 'กรุณาประเมินผลกระทบความเสี่ยงด้าน Data & System',
    tooltips: [
      'ผลกระทบต่อบริษัทหากเกิดการรั่วไหลหรือสูญหายของข้อมูล รวมถึงความเสียหายต่อระบบ',
      'ผลกระทบจากการสูญหายของข้อมูล(Data Loss Impact)',
      'ความเสียหายต่อระบบท่ีสำคัญ(Critical System Downtime)',
      'ความแพร่กระจายของผลกระทบ(Widespread of Impact)',
    ],
    sliderHeight: 230,
    sliderLabels: {
      0: {
        title: notApplication,
        details: ['No assessment or not relevant this category'],
      },
      1: {
        title: insignificant,
        details: [
          'Loss of public data or',
          'Critical system downtime',
          'variance ≤ 25% from plan ',
        ],
      },
      2: {
        title: minor,
        details: [
          'Loss of internal data or',
          'Critical system downtime variance ≤ 50% from plan or',
          'Damage with impact on Individual level',
        ],
      },
      3: {
        title: moderate,
        details: [
          'Loss of highly confidential or ',
          'confidential data with moderate ',
          'impact of (1), (3), (4), or (6) or',
          'Critical system downtime',
          'variance ≤ 75% from plan or',
          'Damage with impact on',
          'Company level',
        ],
      },
      4: {
        title: significant,
        details: [
          'Loss of highly confidential or ',
          'confidential data with significant',
          'impact of (1), (3), (4), or (6) or',
          'Critical system downtime',
          'variance ≤ 100% from plan or',
          'Damage with impact on BU level',
        ],
      },
      5: {
        title: critical,
        details: [
          'Loss of highly confidential data with ',
          'critical impact of (1), (3), (4), or (6) or',
          'Critical system downtime',
          'variance > 100% variance from plan or',
          'Damage with impact on SCG level',
        ],
      },
    },
  },
  {
    title: 'กรุณาประเมินผลกระทบความเสี่ยงด้าน Business Interruption',
    tooltips: [
      'ผลกระทบต่อความสามารถในการส่งมอบสินค้าและบริการให้กับลูกค้า โดยแบ่งออกเป็น 5 ระดับ',
      'ลูกค้านอกเครือ SCG (External Customer)',
      'ลูกค้าในเครือ SCG และระหว่าง BU (Internal Customer – across BU)',
      'ลูกค้าในเครือ SCG และใน BU เดียวกัน (Internal Customer – within BU)',
      'หน่วยงานที่อยู่ในบริษัทเดียวกัน (Units / functions within Company)',
      'บุคคลที่อยู่ในทีมเดียวกัน หรืองานตนเอง',
    ],
    sliderHeight: 230,
    sliderLabels: {
      0: {
        title: notApplication,
        details: ['No assessment or not relevant this category'],
      },
      1: {
        title: insignificant,
        details: [
          'Loss of public data or',
          'Critical system downtime',
          'variance ≤ 25% from plan ',
        ],
      },
      2: {
        title: minor,
        details: [
          'Loss of internal data or',
          'Critical system downtime variance ≤ 50% from plan or',
          'Damage with impact on Individual level',
        ],
      },
      3: {
        title: moderate,
        details: [
          'Loss of internal data or',
          'Critical system downtime',
          'variance ≤ 50% from plan or',
          'Damage with impact on',
          'Individual level',
        ],
      },
      4: {
        title: significant,
        details: [
          'Loss of highly confidential or ',
          'confidential data with significant',
          'impact of (1), (3), (4), or (6) or',
          'Critical system downtime ',
          'variance ≤ 100% from plan or',
          'Damage with impact on BU level',
        ],
      },
      5: {
        title: critical,
        details: [
          'Loss of highly confidential data with ',
          'critical impact of (1), (3), (4), or (6) or',
          'Critical system downtime',
          'variance > 100% variance from plan or',
          'Damage with impact on SCG level',
        ],
      },
    },
  },
]
export const likeliHoodAssessmentItems = {
  titleHeader: 'กรุณาประเมินโอกาสที่จะเกิด (Likelihood Assessment)',
  sliderHeight: 100,
  sliderLabels: {
    0: {
      title: notApplication,
      details: ['No assessment or not relevant this category'],
    },
    1: {
      title: rare,
      details: ['Extremely unlikely to occur OR > 0% of occurrence'],
    },
    2: {
      title: unlikely,
      details: ['Unlikely to occur OR >= 10% of occurrence'],
    },
    3: {
      title: possible,
      details: ['Possible to occur OR >= 35% of occurrence'],
    },
    4: {
      title: likely,
      details: ['Very likely to occur OR >= 65% of occurrence'],
    },
    5: {
      title: almostCertain,
      details: ['Very likely to occur OR >= 65% of occurrence'],
    },
  },
}
