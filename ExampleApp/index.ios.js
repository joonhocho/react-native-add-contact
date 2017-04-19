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
  TouchableHighlight
} from 'react-native';
import AddContact, {ContactView} from 'react-native-add-contact';

export default class ExampleApp extends Component {
  componentWillMount() {
    this.setState({
      contact: {
        contactType: 'organization',

        namePrefix: 'Mr.',
        givenName: 'John',
        middleName: 'Philip',
        familyName: 'Doe',
        previousFamilyName: 'Dope',
        nameSuffix: 'Jr.',
        nickname: 'Johnie',

        organizationName: 'Google',
        departmentName: 'Engineering',
        jobTitle: 'Software Engineer',

        phoneticGivenName: 'Jon',
        phoneticMiddleName: 'Fil',
        phoneticFamilyName: 'Do',
        phoneticOrganizationName: 'Gugle',

        note: 'This is notes, and it\'s about John.\nHello.',
        imageData: null,

        phoneNumbers: [{
          label: 'home',
          value: '123 456 7890',
        }, {
          label: 'work',
          value: '+1 234 567 8901',
        }],

        emailAddresses: [{
          label: 'Home',
          value: 'john@gmail.com',
        }, {
          label: 'Happy',
          value: 'happy@gmail.com',
        }, {
          label: 'Other',
          value: 'johnie@hotmail.com',
        }],

        postalAddresses: [{
          label: 'home',
          street: '123 Forbes Ave, Apt 1',
          subLocality: null,
          city: 'San Francisco',
          subAdministrativeArea: null,
          state: 'CA',
          postalCode: '12345-5678',
          country: 'USA',
          isoCountryCode: 'US',
        }, {
          label: 'Vacation Home',
          street: '234 Forbes Ave',
          subLocality: 'subloc',
          city: 'Ocean City',
          subAdministrativeArea: 'subadmin',
          state: 'Hawaii',
          postalCode: '12345-5678',
          country: 'USA',
          isoCountryCode: 'US',
        }],

        urlAddresses: [{
          label: 'company',
          value: 'http://mycompany.com',
        }],

        contactRelations: [{
          label: 'father',
          value: 'Father Doe',
        }, {
          label: 'mother',
          value: 'Mother Toe',
        }],

        socialProfiles: [{
          label: null,
          urlString: null,
          username: 'mark',
          userIdentifier: null,
          service: 'facebook',
        }, {
          label: null,
          urlString: null,
          username: 'google',
          userIdentifier: null,
          service: 'twitter',
        }],

        instantMessageAddresses: [{
          label: null,
          username: 'bill',
          service: 'msn',
        }],

        birthday: {
          year: 1999,
          month: 1,
          day: 31,
        },

        nonGregorianBirthday: null && {
          year: 2000,
          month: 2,
          day: 28,
        },

        dates: [{
          label: 'anniversary',
          year: 2001,
          month: 3,
          day: 30,
        }, {
          label: 'fun day',
          year: 2002,
          month: 4,
          day: 1,
        }],
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableHighlight onPress={async () => {
          await AddContact.addContact({
            givenName: 'John',
            familyName: 'Doe',
          });

          alert('hi');
        }}>
          <Text style={styles.instructions}>
            Test
          </Text>
        </TouchableHighlight>
        <ContactView
          style={styles.contact}
          contact={this.state.contact}
        />
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
  contact: {
    flex: 1,
    alignSelf: 'stretch',
    height: 400,
    backgroundColor: 'red',
  },
});

AppRegistry.registerComponent('ExampleApp', () => ExampleApp);
