const ReactNative = require('react-native');

const {
  NativeModules,
} = ReactNative;

const {
  RNAddContact,
} = NativeModules;

const AddContact = {
  dark: RNAddContact.dark,
  iconOnly: RNAddContact.iconOnly,
  light: RNAddContact.light,
  standard: RNAddContact.standard,
  wide: RNAddContact.wide,

  addContact(data) {
    return RNAddContact.addContact(data);
  },
};

module.exports = AddContact;
