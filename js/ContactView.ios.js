import React from 'react';
import PropTypes from 'prop-types';
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
  contact: PropTypes.object,
};

module.exports = ContactView;
