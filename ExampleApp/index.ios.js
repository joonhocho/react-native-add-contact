/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import AddContact, {ContactView} from 'react-native-add-contact';

export default class ExampleApp extends Component {
  componentWillMount() {
    this.setState({
      contact: {
        type: 'organization',

        name: {
          prefix: 'Mr.',
          givenName: 'John',
          middleName: 'Philip',
          familyName: 'Doe',
          previousFamilyName: 'Dope',
          suffix: 'Jr.',

          phoneticGivenName: 'Jon',
          phoneticMiddleName: 'Fil',
          phoneticFamilyName: 'Do',
        },

        nicknames: [{
          label: 'initials',
          name: 'JPD',
        }, {
          name: 'Jony',
        }],

        organizations: [{
          company: 'Google',
          department: 'Engineering',
          title: 'Software Engineer',

          phoneticCompany: 'Gugle',
        }],

        notes: [{
          note: 'This is notes, and it\'s about John.\nHello.',
        }, {
          note: 'This is,\n another note.',
        }],

        photos: [{
          photo: null,
        }],

        phones: [{
          label: 'home',
          number: '123 456 7890',
        }, {
          label: 'work',
          number: '+1 234 567 8901',
        }, {
          label: 'my phone',
          number: '+1239479223',
        }],

        emails: [{
          label: 'Home',
          address: 'john@gmail.com',
          displayName: 'John Doe',
        }, {
          label: 'Happy',
          address: 'happy@gmail.com',
        }, {
          label: 'Other',
          address: 'johnie@hotmail.com',
        }],

        postals: [{
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

        websites: [{
          label: 'google',
          url: 'http://google.com',
        }, {
          label: 'test',
          url: 'test.com',
        }, {
          label: 'company',
          url: 'http://mycompany.com',
        }],

        relations: [{
          label: 'father',
          name: 'Father Doe',
        }, {
          label: 'stranger',
          name: 'Stranger Joe',
        }, {
          label: 'mother',
          name: 'Mother Toe',
        }],

        socialProfiles: [{
          label: null,
          url: null,
          username: 'mark',
          userId: null,
          service: 'facebook',
        }, {
          label: null,
          url: null,
          username: 'google',
          userId: null,
          service: 'twitter',
        }],

        ims: [{
          label: 'my aim',
          service: 'aim',
          username: 'aimer',
        }, {
          label: 'my msn',
          service: 'msn',
          username: 'msner',
        }, {
          label: 'my yahoo',
          service: 'yahoo',
          username: 'yahooer',
        }, {
          label: 'home',
          service: 'facebook',
          username: 'facebooker',
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
          await AddContact.addContact(this.state.contact);
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
