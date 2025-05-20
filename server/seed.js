const mongoose = require('mongoose');
const Owner = require('./models/owner.model'); // Adjust path if needed
const { faker } = require('@faker-js/faker');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://RentEase_mongodb:rentease04@renteasecluster.fs68ztf.mongodb.net/RentEase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err));

// Predefined room URLs
const roomLinks = [
  "https://www.magicbricks.com/1-bhk-room-for-rent-in-delhi",
  "https://www.nobroker.in/property/1rk-apartment-for-rent-in-dwarka-delhi",
  "https://www.99acres.com/room-on-rent-in-laxmi-nagar-delhi-ffid",
  "https://www.nestaway.com/houses-for-rent-in-koramangala-bangalore",
  "https://www.nobroker.in/1-rk-flat-for-rent-in-whitefield-bangalore",
  "https://www.magicbricks.com/1-bhk-room-for-rent-in-hsr-layout-bangalore",
  "https://www.99acres.com/1-rk-room-on-rent-in-kothrud-pune-ffid",
  "https://www.nobroker.in/property/1rk-apartment-for-rent-in-viman-nagar-pune",
  "https://www.magicbricks.com/room-on-rent-in-hinjewadi-pune-ffid",
  "https://www.nobroker.in/property/1rk-apartment-for-rent-in-andheri-east-mumbai",
  "https://www.99acres.com/1-rk-room-on-rent-in-chembur-mumbai-ffid",
  "https://www.magicbricks.com/1-bhk-room-for-rent-in-bandra-mumbai",
  "https://www.nobroker.in/property/1rk-flat-for-rent-in-hafeezpet-hyderabad",
  "https://www.magicbricks.com/room-on-rent-in-bowrampet-hyderabad-ffid",
  "https://www.99acres.com/room-on-rent-in-madhapur-hyderabad-ffid",
  "https://www.nobroker.in/1rk-apartment-for-rent-in-salt-lake-kolkata",
  "https://www.magicbricks.com/room-on-rent-in-dumdum-kolkata-ffid",
  "https://www.nobroker.in/property/1rk-flat-for-rent-in-anna-nagar-chennai",
  "https://www.99acres.com/room-on-rent-in-t-nagar-chennai-ffid",
  "https://www.magicbricks.com/1-bhk-room-for-rent-in-velachery-chennai"
];

// Predefined tenants array
const tenants = [
  {
    tenantId: "T001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    currentAddress: "Flat 301, Sunshine Apartments, Delhi",
    rentPaid: 12000,
    dueAmount: 0,
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    status: "Active"
  },
  {
    tenantId: "T002",
    name: "Anjali Verma",
    email: "anjali.verma@example.com",
    phone: "9123456789",
    currentAddress: "Room 204, Green Residency, Mumbai",
    rentPaid: 15000,
    dueAmount: 1500,
    leaseStart: "2024-02-01",
    leaseEnd: "2024-11-30",
    status: "Active"
  },
  // ... (Include all tenant objects from your list here, truncated for brevity)
  {
    tenantId: "T015",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "9922334455",
    currentAddress: "Flat 501, Pearl Apartments, Chennai",
    rentPaid: 13000,
    dueAmount: 0,
    leaseStart: "2024-04-01",
    leaseEnd: "2025-03-31",
    status: "Active"
  }
];

async function seedOwners() {
  try {
    // Clear existing owners
    await Owner.deleteMany({});
    console.log('Existing owners cleared');

    const owners = [];

    for (let i = 0; i < 20; i++) {
      owners.push({
        username: faker.internet.userName(),
        email: faker.internet.email(undefined, undefined, 'gmail.com'),
        password: 'password123', // Ideally hash this in production
        phone: faker.phone.number('91##########'),
        role: 'owner',
        rooms: roomLinks,   // Assign all room URLs to each owner or you can randomly select
        tenants: tenants,   // Assign full tenant list or you can pick subsets or random tenants per owner
        rentalRequests: ["pending", "approved", "rejected"][Math.floor(Math.random() * 3)],
      });
    }

    await Owner.insertMany(owners);
    console.log('20 Owners seeded successfully');
  } catch (error) {
    console.error('Error seeding owners:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedOwners();
