export interface CaseStudy {
  id: string
  titleKey: string
  clientKey: string
  industryKey: string
  challengeKey: string
  outcomeKey: string
  metricKey: string
  metricValue: string
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    titleKey: 'cases.c1Title',
    clientKey: 'cases.c1Client',
    industryKey: 'cases.c1Industry',
    challengeKey: 'cases.c1Challenge',
    outcomeKey: 'cases.c1Outcome',
    metricKey: 'cases.c1Metric',
    metricValue: '2,400+',
    image: '/assets/images/technology.jpg',
  },
  {
    id: '2',
    titleKey: 'cases.c2Title',
    clientKey: 'cases.c2Client',
    industryKey: 'cases.c2Industry',
    challengeKey: 'cases.c2Challenge',
    outcomeKey: 'cases.c2Outcome',
    metricKey: 'cases.c2Metric',
    metricValue: '98%',
    image: '/assets/images/retail.jpg',
  },
  {
    id: '3',
    titleKey: 'cases.c3Title',
    clientKey: 'cases.c3Client',
    industryKey: 'cases.c3Industry',
    challengeKey: 'cases.c3Challenge',
    outcomeKey: 'cases.c3Outcome',
    metricKey: 'cases.c3Metric',
    metricValue: '40%',
    image: '/assets/images/showroom.jpg',
  },
]
