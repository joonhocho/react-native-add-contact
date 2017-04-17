//
//  RNAddContactBridge.m
//  
//
//  Created by Joon Ho Cho on 4/16/17.
//
//

#import <Foundation/Foundation.h>
#import <Contacts/Contacts.h>
#import <ContactsUI/ContactsUI.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RNAddContact, NSObject)

RCT_EXTERN_METHOD(addContact:(NSDictionary *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject);

@end
