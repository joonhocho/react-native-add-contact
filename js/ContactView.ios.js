import React from 'react';
import {requireNativeComponent} from 'react-native';

const RNContactView = requireNativeComponent('RNContactView', ContactView);

class ContactView extends React.Component {
  render() {
    return <RNContactView {...this.props} />;
  }
}

ContactView.propTypes = {
  contact: React.PropTypes.object,
  /*
  {
    contactType,

    namePrefix,
    givenName,
    middleName,
    familyName,
    previousFamilyName,
    nameSuffix,
    nickname,

    organizationName,
    departmentName,
    jobTitle,

    phoneticGivenName,
    phoneticMiddleName,
    phoneticFamilyName,
    phoneticOrganizationName,

    note,
    imageData,

    phoneNumbers: [{
      label,
      value,
    }],

    emailAddresses: [{
      label,
      value,
    }],

    postalAddresses: [{
      label,
      street,
      subLocality,
      city,
      subAdministrativeArea,
      state,
      postalCode,
      country,
      isoCountryCode,
    }],

    urlAddresses: [{
      label,
      value,
    }],

    contactRelations: [{
      label,
      value,
    }],

    socialProfiles: [{
      label,
      urlString,
      username,
      userIdentifier,
      service,
    }],

    instantMessageAddresses: [{
      label,
      username,
      service,
    }],

    birthday: {
      year,
      month,
      day,
    },

    nonGregorianBirthday: {
      year,
      month,
      day,
    },

    dates: [{
      label,
      year,
      month,
      day,
    }],
  },
  */
};

module.exports = ContactView;
