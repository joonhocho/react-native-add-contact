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
  organizations,
  phones,
  emails,
  postals,
  websites,
  relations,
  // socialProfiles,
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
    ].filter((x) => x).join(' '),

    phoneticName: formattedPhoneticName || [
      phoneticGivenName,
      phoneticMiddleName,
      phoneticFamilyName,
    ].filter((x) => x).join(' '),

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
      name,
    }) => ({
      label,
      name,
    })),

    phones: phones && phones.map(({
      label,
      number,
    }) => ({
      label,
      number,
    })),

    emails: emails && emails.map(({
      label,
      address,
      displayName,
    }) => ({
      label,
      address,
      displayName,
    })),

    postals: postals && postals.map(({
      label,
      formattedAddress,
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
      formattedAddress: formattedAddress || [
        street,
        city || subLocality,
        state || subAdministrativeArea,
        postalCode,
        country || isoCountryCode,
      ].filter((x) => x).join(', '),
      street,
      // pobox,
      neighborhood: subLocality,
      city,
      region: state || subAdministrativeArea,
      postcode: postalCode,
      country: country || isoCountryCode,
    })),

    ims: ims && ims.map(({
      label,
      service: protocol,
      username,
    }) => ({
      label,
      protocol,
      username,
    })),

    organizations: organizations && organizations.map(({
      label,
      company,
      title,
      department,
      jobDescription,
      symbol,
      phoneticCompany: phoneticName,
      officeLocation,
    }) => ({
      label,
      company,
      title,
      department,
      jobDescription,
      symbol,
      phoneticName,
      officeLocation,
    })),

    relations: relations && relations.map(({
      label,
      name,
    }) => ({
      label,
      name,
    })),

    events: [
      (birthday || nonGregorianBirthday) && {
        label: 'birthday',
        ...(birthday || nonGregorianBirthday),
      },
    ].concat(dates).filter((x) => x).map(({
      label,
      year,
      month,
      day,
    }) => ({
      label,
      startDate: formatDate({year, month, day}),
    })),

    photos: photos && photos.map(({
      photo,
    }) => ({
      photo,
    })),

    notes: notes && notes.map(({
      note,
    }) => ({
      note,
    })),

    websites: websites && websites.map(({
      label,
      url,
    }) => ({
      label,
      url,
    })),

    sipAddresses: sipAddresses && sipAddresses.map(({
      label,
      sipAddress,
    }) => ({
      label,
      sipAddress,
    })),

    identities: identities && identities.map(({
      identity,
      namespace,
    }) => ({
      identity,
      namespace,
    })),
  };
};
