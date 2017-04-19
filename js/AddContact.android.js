import formatContact from './formatContact';

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
    return RNAddContact.addContact(formatContact(data));
  },
};

module.exports = AddContact;
