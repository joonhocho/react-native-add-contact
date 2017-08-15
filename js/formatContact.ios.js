const isNonEmptyString = (x) => typeof x === 'string' && x.length > 0;

export default ({
  type: contactType,
  name,
  nicknames,
  jobs,
  phones,
  emails,
  addresses,
  urls,
  relations,
  socialProfiles,
  ims,
  birthday,
  nonGregorianBirthday,
  dates,
  notes,
  photos,
  // sipAddresses,
  // identities,
}) => {
  const {
    // formattedName,

    prefix: namePrefix,
    givenName,
    middleName,
    familyName,
    suffix: nameSuffix,

    previousFamilyName,

    // formattedPhoneticName

    phoneticGivenName,
    phoneticMiddleName,
    phoneticFamilyName,
  } = name || {};

  const {
    // label,
    company: organizationName,
    title: jobTitle,
    department: departmentName,
    // jobDescription,
    // symbol,
    phoneticCompany: phoneticOrganizationName,
    // officeLocation,
  } = jobs && jobs[0] || {};

  const photo = photos && photos[0] || null;

  return {
    contactType,

    namePrefix,
    givenName,
    middleName,
    familyName,
    previousFamilyName,
    nameSuffix,

    nickname: nicknames && nicknames[0] && nicknames[0].value,

    organizationName,
    departmentName,
    jobTitle,

    phoneticGivenName,
    phoneticMiddleName,
    phoneticFamilyName,
    phoneticOrganizationName,

    note: notes && notes[0] && notes[0].value,
    imageData: photo && photo.data,
    imageUri: photo && photo.uri,

    phoneNumbers: phones && phones.map(({
      label,
      number,
    }) => ({
      label,
      value: number,
    })).filter(({value}) => isNonEmptyString(value)),

    emailAddresses: emails && emails.map(({
      label,
      value,
      // displayName,
    }) => ({
      label,
      value,
    })).filter(({value}) => isNonEmptyString(value)),

    postalAddresses: addresses && addresses.map(({
      label,
      // formatted,
      street,
      subLocality,
      city,
      subAdministrativeArea,
      state,
      postalCode,
      country,
      isoCountryCode,
    }) => ({
      label,
      street,
      subLocality,
      city,
      subAdministrativeArea,
      state,
      postalCode,
      country,
      isoCountryCode,
    })),

    urlAddresses: urls && urls.map(({
      label,
      value,
    }) => ({
      label,
      value,
    })).filter(({value}) => isNonEmptyString(value)),

    contactRelations: relations && relations.map(({
      label,
      value,
    }) => ({
      label,
      value,
    })).filter(({value}) => isNonEmptyString(value)),

    socialProfiles: socialProfiles && socialProfiles.map(({
      label,
      url,
      username,
      userId,
      service,
    }) => ({
      label,
      service,
      username,
      userIdentifier: userId,
      urlString: url,
    })).filter(({
      service,
      username,
      userIdentifier,
      urlString,
    }) =>
      isNonEmptyString(urlString) ||
      isNonEmptyString(service) && (
        isNonEmptyString(username) ||
        isNonEmptyString(userIdentifier)
      )
    ),

    instantMessageAddresses: ims && ims.map(({
      label,
      service,
      username,
    }) => ({
      label,
      service,
      username,
    })).filter(({
      service,
      username,
    }) =>
      isNonEmptyString(username) &&
      isNonEmptyString(service)
    ),

    birthday,

    nonGregorianBirthday,

    dates: dates && dates.map(({
      label,
      year,
      month,
      day,
    }) => ({
      label,
      year,
      month,
      day,
    })),
  };
};

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
    value, !
  }],

  emailAddresses: [{
    label,
    value, !
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
    value, !
  }],

  contactRelations: [{
    label,
    value, !
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
    username, !
    service, !
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
