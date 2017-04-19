/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import AddContact from 'react-native-add-contact';

export default class ExampleApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={async () => {
          const res = await AddContact.addContact({
            name: 'Mr. John Philip Doe Jr.',
            phoneticName: 'Phonetic Name',
            photoUri: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            photoThumbnailUri: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            names: [{
              // displayName: 'Mr. McDonalds',
              givenName: 'John',
              familyName: 'Doe',
              // prefix: 'Dr.',
              // middleName: 'Philip',
              // suffix: 'Jr.',
              // phoneticGivenName: 'Jon',
              // phoneticMiddleName: 'Phil',
              // phoneticFamilyName: 'Doh',
            }],
            nicknames: [{
              label: 'initials',
              name: 'Johnie',
            }, {
              label: '',
              name: 'Jony',
            }],
            phones: [{
              label: 'home',
              number: '2345678901',
              // normalizedNumber: '+12345678901',
            }, {
              label: 'work',
              number: '+12345678901',
            }, {
              label: 'my phone label',
              number: '+1239479223',
            }, {
              label: 'other',
              number: '12345678901',
            }],
            emails: [{
              label: 'work',
              address: 'johndoe@example.com',
              displayName: 'John Doe',
            }, {
              label: 'happy',
              address: 'happy@test.com',
            }, {
              label: 'home',
              address: 'johndoe@test.com',
            }],
            postals: [{
              label: 'home',
              formattedAddress: '123, 123 Forbes Ave, San Francisco, CA 12345 USA',
              street: '123 Forbes Ave',
              pobox: '123',
              neighborhood: 'Oakland',
              city: 'San Francisco',
              region: 'CA',
              postcode: '12345-6789',
              country: 'USA',
            }, {
              label: 'work',
              formattedAddress: '234 Formatted Road, Pittsburgh, PA',
            }],
            ims: [{
              label: 'my aim',
              protocol: 'aim',
              username: 'aimer',
            }, {
              label: 'my msn',
              protocol: 'msn',
              username: 'msner',
            }, {
              label: 'my yahoo',
              protocol: 'yahoo',
              username: 'yahooer',
            }, {
              label: 'home',
              protocol: 'facebook',
              username: 'facebooker',
            }],
            organizations: [{
              label: 'work',
              company: 'Google Inc',
              title: 'Software Engineer',
              department: 'Engineering',
              jobDescription: 'Develop ads.',
              symbol: 'GOOG',
              phoneticName: '',
              officeLocation: '1800 Amphitheatre Pkwy, Mountain View, CA',
            }],
            relations: [{
              label: 'mother',
              name: 'Mom',
            }, {
              label: 'father',
              name: 'Pop',
            }],
            events: [{
              label: 'birthday',
              startDate: '1990-01-23',
            }, {
              label: 'mille',
              startDate: '2000-01-01',
            }],
            photos: [{
              photo: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            }],
            notes: [{
              note: 'This is,\n a note.',
            }, {
              note: 'This is,\n another note.',
            }],
            websites: [{
              label: 'google',
              url: 'http://google.com',
            }, {
              label: 'test',
              url: 'test.com',
            }],
            sipAddresses: [{
              label: 'google',
              sipAddress: 'what is this?',
            }],
            identities: [{
              identity: 'identity',
              namespace: 'namespace',
            }],
          });

          alert(JSON.stringify(res, null, '  '));
        }}>
          <Text style={styles.instructions}>
            Test
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ExampleApp', () => ExampleApp);
