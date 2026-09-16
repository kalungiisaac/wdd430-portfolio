import 'dotenv/config';
import { MongoClient } from 'mongodb';
import type { SacramentMeeting, Speaker } from './types';

const uri = process.env.mongodb_URL;
if (!uri) {
  console.error('MONGODB_URL is not defined in .env');
  process.exit(1);
}

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Mark Hansen',
    conducting: 'Brother David Carter',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Emily Walker',
    wardBusiness: [
      { description: 'Sustaining of Brother Paul Nielson as Sunday School president.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Rachel Bennett', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Brother Thomas Peterson', topic: 'Pondering the Atonement', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Samuel Taylor',
    announcements: [
      'Ward temple trip: May 16 at 8:00 a.m.',
      'Baptism service: May 17 at 4:00 p.m.',
    ],
  },
  {
    id: 2,
    date: '2026-05-17',
    meetingType: 'stake',
    presiding: 'Stake President Ronald Young',
    conducting: 'Bishop Mark Hansen',
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Sister Melissa Roberts',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 137, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Stake President Ronald Young', topic: 'Trusting in the Lord', type: 'speaker' },
      { name: 'Sister Karen White', topic: 'Ministering with Love', type: 'speaker' },
      { name: 'Stake Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 83, title: 'Guide Us, O Thou Great Jehovah' },
    closingPrayer: 'Brother Joseph Anderson',
  },
  {
    id: 3,
    date: '2026-06-07',
    meetingType: 'testimony',
    presiding: 'Bishop Mark Hansen',
    conducting: 'Brother David Carter',
    openingHymn: { number: 172, title: 'In Humility, Our Savior' },
    openingPrayer: 'Sister Olivia Martin',
    wardBusiness: [
      { description: 'Release of Sister Nancy Lewis as Relief Society secretary with thanks.' },
      { description: 'Sustaining of Sister Jane Christensen as Relief Society secretary.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Members of the congregation', topic: 'Testimonies of the members', type: 'speaker' },
    ],
    closingHymn: { number: 24, title: 'God Bless Our Prophet Dear' },
    closingPrayer: 'Sister Abigail Tyler',
    announcements: ['Potluck picnic after church: June 14 at the pavilion.'],
  },
  {
    id: 4,
    date: '2026-08-02',
    meetingType: 'regular',
    presiding: 'Bishop Mark Hansen',
    conducting: 'Brother James Scott',
    openingHymn: { number: 96, title: 'Dearest Children, God Is Near You' },
    openingPrayer: 'Brother Nathan Brown',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 171, title: 'This Is the Sacrament' },
    speakers: [
      { name: 'Sister Sandra Miller', topic: 'The Blessings of Temple Worship', type: 'speaker' },
      { name: 'Brother Daniel Clark', topic: 'Following the Prophet Today', type: 'speaker' },
    ],
    closingHymn: { number: 57, title: 'Each Life That Touches Ours for Good' },
    closingPrayer: 'Sister Hannah Davis',
    announcements: ['Back-to-school seminary kickoff: August 9 at 11:30 a.m.'],
  },
  {
    id: 5,
    date: '2026-09-06',
    meetingType: 'testimony',
    presiding: 'Bishop Mark Hansen',
    conducting: 'Brother David Carter',
    openingHymn: { number: 196, title: 'Testimony' },
    openingPrayer: 'Brother Ryan Edwards',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 177, title: 'God Our Father, Hear Us Pray' },
    speakers: [
      { name: 'Members of the congregation', topic: 'Testimonies of the members', type: 'speaker' },
    ],
    closingHymn: { number: 305, title: 'The Light Divine' },
    closingPrayer: 'Sister Grace Lewis',
  },
  {
    id: 6,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop Mark Hansen',
    conducting: 'Brother David Carter',
    openingHymn: { number: 68, title: 'God Moved on the Waters' },
    openingPrayer: 'Sister Laura Bennett',
    wardBusiness: [
      { description: 'Announcement of the youth theme devotionals for the coming year.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 138, title: 'O Thou, Before the World Began' },
    speakers: [
      { name: 'Sister Katherine Frost', topic: 'Strengthening Our Families', type: 'speaker' },
      { name: 'Brother Michael Adams', topic: 'Living the Gospel with Joy', type: 'speaker' },
      { name: 'Adult Choir', topic: '', type: 'musical-number' },
    ],
    closingHymn: { number: 243, title: 'Let Us All Press On' },
    closingPrayer: 'Brother James Wilson',
    announcements: ['General conference begins Sunday, October 4.'],
  },
];

const speakers: Speaker[] = [
  {
    id: 1,
    name: 'Sister Rachel Bennett',
    title: 'Sister',
    calling: 'Young Women President',
    bio: 'Rachel Bennett has served in the Young Women organization for over five years. She is passionate about helping youth develop lasting testimonies of Jesus Christ through daily scripture study and prayer. She and her husband, Aaron, have four children and live in the Riverside area.',
  },
  {
    id: 2,
    name: 'Brother Thomas Peterson',
    title: 'Brother',
    calling: 'High Priest',
    bio: 'Thomas Peterson is a lifelong member of the Church and has served in various callings including ward mission leader and elders quorum president. He loves teaching the gospel and has a deep appreciation for the Atonement of Jesus Christ. He retired from teaching high school history in 2024.',
  },
  {
    id: 3,
    name: 'Stake President Ronald Young',
    title: 'President',
    calling: 'Riverside Stake President',
    bio: 'Ronald Young has served as stake president since 2022. He works as a family physician in the community and is dedicated to ministering to members throughout the stake. He and his wife, Linda, are the parents of six children and grandparents of twelve.',
  },
  {
    id: 4,
    name: 'Sister Karen White',
    title: 'Sister',
    calling: 'Relief Society Counselor',
    bio: 'Karen White serves as a counselor in the Riverside Ward Relief Society presidency. She has a talent for organizing community service projects and loves extending Christlike love to those around her. She works as a nurse at the local hospital.',
  },
  {
    id: 5,
    name: 'Sister Sandra Miller',
    title: 'Sister',
    calling: 'Temple Ordinance Worker',
    bio: 'Sandra Miller has been a temple ordinance worker for over three years. She finds great joy in serving in the temple and loves sharing her testimony of the blessings of temple worship. She is also an accomplished pianist and frequently plays for ward meetings.',
  },
  {
    id: 6,
    name: 'Brother Daniel Clark',
    title: 'Brother',
    calling: 'Sunday School Teacher',
    bio: 'Daniel Clark teaches the adult Sunday School class and is known for his engaging and insightful lessons. He has a deep love for the scriptures and enjoys helping class members apply gospel principles in their daily lives. He works as a software engineer.',
  },
  {
    id: 7,
    name: 'Sister Katherine Frost',
    title: 'Sister',
    calling: 'Primary President',
    bio: 'Katherine Frost serves as the Riverside Ward Primary president. She is dedicated to teaching children about Jesus Christ with love and patience. She and her husband, Brian, have three children who are all active in the ward. She enjoys gardening and reading.',
  },
  {
    id: 8,
    name: 'Brother Michael Adams',
    title: 'Brother',
    calling: 'Elders Quorum President',
    bio: 'Michael Adams serves as the elders quorum president and is committed to ministering to every brother in the ward. He finds joy in service and loves sharing his testimony through daily gospel study. He is a local business owner and community volunteer.',
  },
  {
    id: 9,
    name: 'Bishop Mark Hansen',
    title: 'Bishop',
    calling: 'Riverside Ward Bishop',
    bio: 'Bishop Mark Hansen has served as the bishop of the Riverside Ward since 2021. He is a dedicated servant leader who loves the members of his ward. He works as an accountant and is active in community organizations. He and his wife, Susan, have five children.',
  },
  {
    id: 10,
    name: 'Brother David Carter',
    title: 'Brother',
    calling: 'Ward Executive Secretary',
    bio: 'David Carter serves as the ward executive secretary and assists the bishopric with scheduling and administrative tasks. He is organized, reliable, and always willing to serve. He works as a financial analyst and enjoys outdoor activities with his family.',
  },
];

async function seed() {
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    const db = client.db('sacrament-meetings');

    // Seed meetings
    const meetingsCol = db.collection('meetings');
    const existingMeetings = await meetingsCol.countDocuments();
    if (existingMeetings > 0) {
      console.log(`Dropping ${existingMeetings} existing meetings...`);
      await meetingsCol.drop();
    }
    const meetingResult = await meetingsCol.insertMany(meetings);
    console.log(`Seeded ${meetingResult.insertedCount} meetings`);

    // Seed speakers
    const speakersCol = db.collection('speakers');
    const existingSpeakers = await speakersCol.countDocuments();
    if (existingSpeakers > 0) {
      console.log(`Dropping ${existingSpeakers} existing speakers...`);
      await speakersCol.drop();
    }
    const speakerResult = await speakersCol.insertMany(speakers);
    console.log(`Seeded ${speakerResult.insertedCount} speakers`);

    console.log('\nMeetings:');
    for (const doc of await meetingsCol.find().sort({ date: 1 }).toArray()) {
      console.log(`  [${doc.id}] ${doc.date} - ${doc.meetingType} - ${doc.presiding}`);
    }

    console.log('\nSpeakers:');
    for (const doc of await speakersCol.find().sort({ name: 1 }).toArray()) {
      console.log(`  [${doc.id}] ${doc.name} - ${doc.calling}`);
    }
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});