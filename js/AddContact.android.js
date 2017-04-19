const ReactNative = require('react-native');

const {
  NativeModules,
} = ReactNative;

const {
  RNAddContact,
} = NativeModules;

const AddContact = {
  name: RNAddContact.name,

  addContact(data) {
    return RNAddContact.addContact(data);
  },
};

module.exports = AddContact;
