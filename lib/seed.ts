import 'dotenv/config';
import { MongoClient } from 'mongodb';
import type { SacramentMeeting } from './types';

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

async function seed() {
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    const db = client.db('sacrament-meetings');
    const col = db.collection('meetings');

    const existing = await col.countDocuments();
    if (existing > 0) {
      console.log(`Database already has ${existing} meetings. Dropping and re-seeding...`);
      await col.drop();
    }

    const result = await col.insertMany(meetings);
    console.log(`Seeded ${result.insertedCount} meetings into sacrament-meetings.meetings`);

    const docs = await col.find().sort({ date: 1 }).toArray();
    console.log('\nMeetings in database:');
    for (const doc of docs) {
      console.log(`  [${doc.id}] ${doc.date} - ${doc.meetingType} - ${doc.presiding}`);
    }
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});