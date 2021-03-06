const isSet = (x) => x;

const isNonEmptyString = (x) => typeof x === 'string' && x.length > 0;

const pad = (str, padStr) =>
  padStr.substring(0, padStr.length - str.length) + str;

const formatDate = ({year, month, day}) => [
  pad(String(year || 0), '0000'),
  pad(String(month || 1), '00'),
  pad(String(day || 1), '00'),
].join('-');

export default ({
  // type,
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
  sipAddresses,
  identities,
}) => {
  const {
    formattedName,

    prefix,
    givenName,
    middleName,
    familyName,
    suffix,

    // previousFamilyName,

    formattedPhoneticName,

    phoneticGivenName,
    phoneticMiddleName,
    phoneticFamilyName,
  } = name || {};

  return {
    name: formattedName || [
      prefix,
      givenName,
      middleName,
      familyName,
      suffix,
    ].filter(isSet).join(' '),

    phoneticName: formattedPhoneticName || [
      phoneticGivenName,
      phoneticMiddleName,
      phoneticFamilyName,
    ].filter(isSet).join(' '),

    // photoUri,
    // photoThumbnailUri,

    /*
    names: [{
      displayName: 'Mr. McDonalds',
      givenName: 'John',
      familyName: 'Doe',
      prefix: 'Dr.',
      middleName: 'Philip',
      suffix: 'Jr.',
      phoneticGivenName: 'Jon',
      phoneticMiddleName: 'Phil',
      phoneticFamilyName: 'Doh',
    }],
    */

    nicknames: nicknames && nicknames.map(({
      label,
      value,
    }) => ({
      label,
      name: value,
    })).filter(({name}) => isNonEmptyString(name)),

    phones: phones && phones.map(({
      label,
      number,
    }) => ({
      label,
      number,
    })).filter(({number}) => isNonEmptyString(number)),

    emails: emails && emails.map(({
      label,
      value,
      displayName,
    }) => ({
      label,
      address: value,
      displayName,
    })).filter(({address}) => isNonEmptyString(address)),

    postals: addresses && addresses.map(({
      label,
      street,
      subLocality,
      city,
      subAdministrativeArea,
      state,
      postalCode,
      country,
      isoCountryCode,
      formatted,
    }) => ({
      label,
      formattedAddress: formatted || [
        street,
        city || subLocality,
        state || subAdministrativeArea,
        postalCode,
        country || isoCountryCode,
      ].filter(isSet).join(', '),
      street,
      // pobox,
      neighborhood: subLocality,
      city,
      region: state || subAdministrativeArea,
      postcode: postalCode,
      country: country || isoCountryCode,
    })),

    ims: (socialProfiles || []).concat(ims || []).map(({
      label,
      service,
      username,
      userId,
    }) => ({
      label,
      protocol: service,
      username: username || userId,
    })).filter(({
      protocol,
      username,
    }) =>
      isNonEmptyString(protocol) &&
      isNonEmptyString(username)
    ),

    organizations: jobs && jobs.map(({
      label,
      company,
      title,
      department,
      jobDescription,
      symbol,
      phoneticCompany,
      officeLocation,
    }) => ({
      label,
      company,
      title,
      department,
      jobDescription,
      symbol,
      phoneticName: phoneticCompany,
      officeLocation,
    })),

    relations: relations && relations.map(({
      label,
      value,
    }) => ({
      label,
      name: value,
    })).filter(({name}) => isNonEmptyString(name)),

    events: [
      (birthday || nonGregorianBirthday) && {
        label: 'birthday',
        ...(birthday || nonGregorianBirthday),
      },
    ].concat(dates).filter(isSet).map(({
      label,
      year,
      month,
      day,
    }) => ({
      label,
      startDate: formatDate({year, month, day}),
    })).filter(({startDate}) => isNonEmptyString(startDate)),

    photos: photos && photos.map(({
      data,
      uri,
    }) => ({
      data,
      uri,
    })).filter(({
      data,
      uri,
    }) =>
      isNonEmptyString(data) ||
      isNonEmptyString(uri)
    ),

    notes: notes && notes.map(({
      value,
    }) => ({
      note: value,
    })).filter(({note}) => isNonEmptyString(note)),

    websites: urls && urls.map(({
      label,
      value,
    }) => ({
      label,
      url: value,
    })).filter(({url}) => isNonEmptyString(url)),

    sipAddresses: sipAddresses && sipAddresses.map(({
      label,
      sipAddress,
    }) => ({
      label,
      sipAddress,
    })).filter(({sipAddress}) => isNonEmptyString(sipAddress)),

    identities: identities && identities.map(({
      identity,
      namespace,
    }) => ({
      identity,
      namespace,
    })).filter(({
      identity,
      namespace,
    }) =>
      isNonEmptyString(identity) ||
      isNonEmptyString(namespace)
    ),
  };
};
