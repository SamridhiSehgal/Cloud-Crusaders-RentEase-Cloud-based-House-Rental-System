const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the owner schema
const ownerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: 'owner', // other one be agent...
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  }],
  tenants: [{ // each owner having tenant list
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
  }],
  rentalRequests: [{
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  // notifications: [{
  //      message: String,
  //      date: {
  //          type: Date,
  //          default: Date.now,
  //      },
  // }],
});

// Hash password before saving the owner document
ownerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
ownerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const ownerModel = mongoose.model('Owner', ownerSchema);

async function main() {
  try {
    // 1. Connect to MongoDB Atlas
    await mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING/HouseRentalDB', {  //changed test to HouseRentalDB
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // 2. (Inside main function)  Define mock owner data
    const mockOwners = [
      { username: 'owner1', email: 'owner1@example.com', password: 'password1', phone: 1234567890, role: 'owner' },
      { username: 'owner2', email: 'owner2@example.com', password: 'password2', phone: 9876543210, role: 'owner' },
      { username: 'owner3', email: 'owner3@example.com', password: 'password3', phone: 5551234567, role: 'owner' },
      { username: 'owner4', email: 'owner4@example.com', password: 'password4', phone: 1112223333, role: 'owner' },
      { username: 'owner5', email: 'owner5@example.com', password: 'password5', phone: 4445556666, role: 'owner' },
      { username: 'owner6', email: 'owner6@example.com', password: 'password6', phone: 7778889999, role: 'owner' },
      { username: 'owner7', email: 'owner7@example.com', password: 'password7', phone: 1011121314, role: 'owner' },
      { username: 'owner8', email: 'owner8@example.com', password: 'password8', phone: 1516171819, role: 'owner' },
      { username: 'owner9', email: 'owner9@example.com', password: 'password9', phone: 2022122223, role: 'owner' },
      { username: 'owner10', email: 'owner10@example.com', password: 'password10', phone: 2324252627, role: 'owner' },
      { username: 'owner11', email: 'owner11@example.com', password: 'password11', phone: 2728293031, role: 'owner' },
      { username: 'owner12', email: 'owner12@example.com', password: 'password12', phone: 3132343536, role: 'owner' },
      { username: 'owner13', email: 'owner13@example.com', password: 'password13', phone: 3637383940, role: 'owner' },
      { username: 'owner14', email: 'owner14@example.com', password: 'password14', phone: 4041414243, role: 'owner' },
      { username: 'owner15', email: 'owner15@example.com', password: 'password15', phone: 4344454647, role: 'owner' },
      { username: 'owner16', email: 'owner16@example.com', password: 'password16', phone: 4748495051, role: 'owner' },
      { username: 'owner17', email: 'owner17@example.com', password: 'password17', phone: 5152565758, role: 'owner' },
      { username: 'owner18', email: 'owner18@example.com', password: 'password18', phone: 5859606162, role: 'owner' },
      { username: 'owner19', email: 'owner19@example.com', password: 'password19', phone: 6263676869, role: 'owner' },
      { username: 'owner20', email: 'owner20@example.com', password: 'password20', phone: 6970717273, role: 'owner' },
    ];

    // 3. Hash passwords and insert owners
    const ownersWithHashedPasswords = [];
    for (const ownerData of mockOwners) {
      const hashedPassword = await bcrypt.hash(ownerData.password, 10);
      ownersWithHashedPasswords.push({
        ...ownerData,
        password: hashedPassword,
      });
    }
    await ownerModel.insertMany(ownersWithHashedPasswords);
    console.log('Inserted new owners');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // 4. Close the connection
    mongoose.disconnect();
  }
}

main();

module.exports = ownerModel;
