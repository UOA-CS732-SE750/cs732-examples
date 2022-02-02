import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Generate the schema for your data.
 * See: https://mongoosejs.com/docs/guide.html
 * 
 * Note how we haven't defined an "id" property - these are automatically created for us (_id).
 */

/**
 * This schema represents Users in the database.
 */
const userSchema = new Schema({

    username: { type: String, unique: true, required: true }, // Each user must have a unique username
    firstName: String,  // Basic fields
    lastName: String,
    dateOfBirth: Date,

    address: { // address is a nested document
        number: String,
        street: String,
        city: String,
        postcode: Number
    },

    creditCards: [{ lastFourDigits: String, encryptedInfo: String }], // The array syntax means we can have multiple credit cards for a given person

    registeredPets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }], // This is how we reference a different collection.

}, { /* This second object allows us to specify more config info. In this case, we're enabling automatic timetamps using the default options.
        For more options, see the URL above. */
    timestamps: {}
});

// Allows us to add an extra "virtual property" to the schema. This value won't actually be stored in the DB, but can be used like
// a normal property, e.g. console.log(myUser.fullName); or myUser.fullName = 'Bob Marley';
userSchema.virtual('fullName')
    .get(function () { return `${this.firstName} ${this.lastName}`; })
    .set(function (value) {
        this.firstName = value.substr(0, value.indexOf(' '));
        this.lastName = value.substr(value.indexOf(' ') + 1);
    });

// Actually create the User schema
export const User = mongoose.model('User', userSchema);

/**
 * This schema represents Pets in the database.
 */
const petSchema = new Schema({
    number: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    initialRegistrationDate: Date,
    expiryDate: Date,
    isNeutered: Boolean,
    notes: [{ date: Date, content: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: {}
});

// Actually create the Pet schema
export const Pet = mongoose.model('Pet', petSchema);
