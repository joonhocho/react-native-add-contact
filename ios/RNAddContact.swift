//
//  RNAddContact.swift
//  
//
//  Created by Joon Ho Cho on 4/16/17.
//
//

import Foundation
import Contacts
import ContactsUI

@objc(RNAddContact)
class RNAddContact: NSObject, CNContactViewControllerDelegate {
  weak var controller: UINavigationController?
  var resolve: RCTPromiseResolveBlock?
  var reject: RCTPromiseRejectBlock?
  
  @objc func constantsToExport() -> [String: Any] {
    return [
      "name": "RNAddContact",
    ]
  }
  
  @objc func addContact(_ data: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    print("addcontact", data)
    self.resolve = resolve
    self.reject = reject
    let contact = createContact(data: data)
    viewContact(contact)
  }
  
  func createContact(data: [String: Any]) -> CNMutableContact {
    // Creating a mutable object to add to the contact
    let contact = CNMutableContact()
    
    
    if let givenName = data["givenName"] as? String {
      contact.givenName = givenName
    }
    if let familyName = data["familyName"] as? String {
      contact.familyName = familyName
    }
    
    // let homeEmail = CNLabeledValue(label:CNLabelHome, value:"john@example.com")
    // let workEmail = CNLabeledValue(label:CNLabelWork, value:"j.appleseed@icloud.com")
    // contact.emailAddresses = [homeEmail, workEmail]
    
    contact.phoneNumbers = [CNLabeledValue(
      label:CNLabelPhoneNumberiPhone,
      value:CNPhoneNumber(stringValue:"(408) 555-0126"))]
    
    let homeAddress = CNMutablePostalAddress()
    homeAddress.street = "1 Infinite Loop"
    homeAddress.city = "Cupertino"
    homeAddress.state = "CA"
    homeAddress.postalCode = "95014"
    contact.postalAddresses = [CNLabeledValue(label:CNLabelHome, value:homeAddress)]
    
    let birthday = NSDateComponents()
    birthday.day = 1
    birthday.month = 4
    birthday.year = 1988  // You can omit the year value for a yearless birthday
    
    return contact
  }
  
  func viewContact(_ contact: CNMutableContact) {
    let controller = CNContactViewController(forUnknownContact: contact)
    controller.delegate = self
    controller.contactStore = CNContactStore()
    controller.modalPresentationStyle = .pageSheet
    
    let navController = UINavigationController(rootViewController: controller)
    self.controller = navController
    
    navController.setNavigationBarHidden(false, animated: false)
    navController.navigationItem.title = "Add Contact"
    navController.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(handleDone))
    navController.navigationBar.barTintColor = UIColor(red: 1, green: 0, blue: 0, alpha: 1)
    
    DispatchQueue.main.async {
      UIApplication.shared.keyWindow?.rootViewController?.present(navController, animated: true, completion: nil)
    }
  }
  
  func handleDone() {
    controller?.dismiss(animated: true) {
      self.controller = nil
      self.resolve?(true)
      self.resolve = nil
      self.reject = nil
    }
  }
  
  
  func contactViewController(_ viewController: CNContactViewController, didCompleteWith contact: CNContact?) {
    handleDone()
  }
}
