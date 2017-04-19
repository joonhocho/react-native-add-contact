import React from 'react';
import {requireNativeComponent} from 'react-native';
import formatContact from './formatContact';

const RNContactView = requireNativeComponent('RNContactView', ContactView);

class ContactView extends React.Component {
  render() {
    return (
      <RNContactView
        {...this.props}
        contact={formatContact(this.props.contact)}
      />
    );
  }
}

ContactView.propTypes = {
  contact: React.PropTypes.object,
};

module.exports = ContactView;
