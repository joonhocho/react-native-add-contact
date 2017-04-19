package com.reactlibrary.addcontact;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.provider.ContactsContract.RawContacts;
import android.provider.ContactsContract.Contacts;
import android.provider.ContactsContract.CommonDataKinds.*;
import android.provider.ContactsContract.Data;
import android.provider.ContactsContract.Intents.Insert;
import android.util.Base64;
import android.util.Log;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class RNAddContactModule extends ReactContextBaseJavaModule {
    private static final int ACTIVITY_INSERT_OR_EDIT = 8472;

    private static final String E_TIMEOUT = "E_TIMEOUT";
    private static final String E_CANCELLED = "E_CANCELLED";
    private static final String E_NO_DATA_FOUND = "E_NO_DATA_FOUND";

    private static final int NOT_SET = -24983;


    private Promise mPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == ACTIVITY_INSERT_OR_EDIT) {
                if (mPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPromise.reject(E_CANCELLED, "Insert or edit was cancelled");
                    } else {
                        Uri uri = intent.getData();
                        if (uri == null) {
                            mPromise.reject(E_NO_DATA_FOUND, "No contact data found");
                        } else {
                            mPromise.resolve(uri.toString());
                        }
                    }
                    mPromise = null;
                }
            }
        }
    };

    public RNAddContactModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "RNAddContact";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("name", getName());
        return constants;
    }

    private void log(String msg) {
        Log.d("RNAddContact", msg == null ? "null" : msg);
    }

    private ArrayList<ContentValues> getContactValues(ReadableMap data) {
        ArrayList<ContentValues> valuesList = new ArrayList<>();

        valuesList.add(getRawContactsContentValues(data));

        valuesList.add(getContactsContentValues(data));

        for (ReadableMap item : getArrayOfMap(data, "names")) {
            valuesList.add(getNameContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "nicknames")) {
            valuesList.add(getNicknameContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "phones")) {
            valuesList.add(getPhoneContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "emails")) {
            valuesList.add(getEmailContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "postals")) {
            valuesList.add(getPostalContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "ims")) {
            valuesList.add(getImContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "organizations")) {
            valuesList.add(getOrganizationContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "relations")) {
            valuesList.add(getRelationContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "events")) {
            valuesList.add(getEventContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "photos")) {
            valuesList.add(getPhotoContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "notes")) {
            valuesList.add(getNoteContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "websites")) {
            valuesList.add(getWebsiteContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "sipAddresses")) {
            valuesList.add(getSipAddressContentValues(item));
        }

        for (ReadableMap item : getArrayOfMap(data, "identities")) {
            valuesList.add(getIdentityContentValues(item));
        }

        return valuesList;
    }

    private void putExtra(Intent intent, String key, String value) {
        if (value != null && !value.isEmpty()) {
            intent.putExtra(key, value);
        }
    }

    private void addContentValue(ContentValues values, String key, String value) {
        if (value != null && !value.isEmpty()) {
            values.put(key, value);
        }
    }

    private void addContentValue(ContentValues values, String key, Integer value) {
        if (value != null) {
            values.put(key, value);
        }
    }

    private void addContentValue(ContentValues values, String key, byte[] value) {
        if (value != null) {
            values.put(key, value);
        }
    }

    private String getString(ReadableMap map, String key) {
        if (map.hasKey(key) && map.getType(key) == ReadableType.String) {
            return map.getString(key);
        }
        return null;
    }

    private Integer getInt(ReadableMap map, String key) {
        if (map.hasKey(key) && map.getType(key) == ReadableType.Number) {
            return map.getInt(key);
        }
        return null;
    }

    private byte[] getBlob(ReadableMap map, String key) {
        if (map.hasKey(key) && map.getType(key) == ReadableType.String) {
            String base64 = map.getString(key);
            if (base64 != null && !base64.isEmpty()) {
                return Base64.decode(base64, 0);
            }
        }
        return null;
    }

    private ReadableArray getArray(ReadableMap map, String key) {
        if (map.hasKey(key) && map.getType(key) == ReadableType.Array) {
            return map.getArray(key);
        }
        return null;
    }

    private ArrayList<ReadableMap> getArrayOfMap(ReadableMap map, String key) {
        ReadableArray array = getArray(map, key);
        ArrayList<ReadableMap> list = new ArrayList<>();
        if (array != null) {
            for (int i = 0; i < array.size(); i++) {
                if (array.getType(i) == ReadableType.Map) {
                    list.add(array.getMap(i));
                }
            }
        }
        return list;
    }

    private ContentValues getRawContactsContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, RawContacts.CONTENT_ITEM_TYPE);
        addContentValue(values, RawContacts.ACCOUNT_NAME, getString(data, "accountName"));
        addContentValue(values, RawContacts.ACCOUNT_TYPE, getString(data, "accountType"));
        addContentValue(values, RawContacts.SOURCE_ID, getString(data, "sourceId"));
        return values;
    }

    private ContentValues getContactsContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Contacts.CONTENT_ITEM_TYPE);
        addContentValue(values, Contacts.DISPLAY_NAME, getString(data, "displayName"));
        addContentValue(values, Contacts.PHOTO_ID, getInt(data, "photoId"));
        addContentValue(values, Contacts.PHOTO_FILE_ID, getInt(data, "photoFileId"));
        addContentValue(values, Contacts.PHOTO_URI, getString(data, "photoUri"));
        addContentValue(values, Contacts.PHOTO_THUMBNAIL_URI, getString(data, "photoThumbnailUri"));
        addContentValue(values, Contacts.LOOKUP_KEY, getString(data, "lookupKey"));
        addContentValue(values, Contacts.IS_USER_PROFILE, getInt(data, "isUserProfile"));
        addContentValue(values, Contacts.STARRED, getInt(data, "starred"));
        return values;
    }

    private ContentValues getNameContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, StructuredName.CONTENT_ITEM_TYPE);
        addContentValue(values, StructuredName.DISPLAY_NAME, getString(data, "displayName"));
        addContentValue(values, StructuredName.GIVEN_NAME, getString(data, "givenName"));
        addContentValue(values, StructuredName.FAMILY_NAME, getString(data, "familyName"));
        addContentValue(values, StructuredName.PREFIX, getString(data, "prefix"));
        addContentValue(values, StructuredName.MIDDLE_NAME, getString(data, "middleName"));
        addContentValue(values, StructuredName.SUFFIX, getString(data, "suffix"));
        addContentValue(values, StructuredName.PHONETIC_GIVEN_NAME, getString(data, "phoneticGivenName"));
        addContentValue(values, StructuredName.PHONETIC_MIDDLE_NAME, getString(data, "phoneticMiddleName"));
        addContentValue(values, StructuredName.PHONETIC_FAMILY_NAME, getString(data, "phoneticFamilyName"));
        return values;
    }

    private int getNicknameType(String label) {
        if (label == null || label.isEmpty()) {
            return Nickname.TYPE_DEFAULT;
        }
        switch (label.toLowerCase()) {
            case "default":
                return Nickname.TYPE_DEFAULT;
            case "othername":
            case "other name":
            case "other_name":
                return Nickname.TYPE_OTHER_NAME;
            case "maidenname":
            case "maiden name":
            case "maiden_name":
                return Nickname.TYPE_MAIDEN_NAME;
            case "shortname":
            case "short name":
            case "short_name":
                return Nickname.TYPE_SHORT_NAME;
            case "initials":
                return Nickname.TYPE_INITIALS;
            default:
                return Nickname.TYPE_CUSTOM;
        }
    }

    private void addNicknameLabel(ContentValues values, String label) {
        int type = getNicknameType(label);
        if (type != NOT_SET) {
            addContentValue(values, Nickname.TYPE, type);
        }
        if (type == Nickname.TYPE_CUSTOM) {
            addContentValue(values, Nickname.LABEL, label);
        }
    }

    private ContentValues getNicknameContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Nickname.CONTENT_ITEM_TYPE);
        addNicknameLabel(values, getString(data, "label"));
        addContentValue(values, Nickname.NAME, getString(data, "name"));
        return values;
    }

    private int getPhoneType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "home":
                return Phone.TYPE_HOME;
            case "mobile":
                return Phone.TYPE_MOBILE;
            case "work":
                return Phone.TYPE_WORK;
            case "faxwork":
            case "fax work":
            case "fax_work":
                return Phone.TYPE_FAX_WORK;
            case "faxhome":
            case "fax home":
            case "fax_home":
                return Phone.TYPE_FAX_HOME;
            case "pager":
                return Phone.TYPE_PAGER;
            case "other":
                return Phone.TYPE_OTHER;
            case "callback":
                return Phone.TYPE_CALLBACK;
            case "car":
                return Phone.TYPE_CAR;
            case "companymain":
            case "company main":
            case "company_main":
                return Phone.TYPE_COMPANY_MAIN;
            case "isdn":
                return Phone.TYPE_ISDN;
            case "main":
                return Phone.TYPE_MAIN;
            case "otherfax":
            case "other fax":
            case "other_fax":
                return Phone.TYPE_OTHER_FAX;
            case "radio":
                return Phone.TYPE_RADIO;
            case "telex":
                return Phone.TYPE_TELEX;
            case "ttytdd":
            case "tty tdd":
            case "tty_tdd":
                return Phone.TYPE_TTY_TDD;
            case "workmobile":
            case "work mobile":
            case "work_mobile":
                return Phone.TYPE_WORK_MOBILE;
            case "workpager":
            case "work pager":
            case "work_pager":
                return Phone.TYPE_WORK_PAGER;
            case "assistant":
                return Phone.TYPE_ASSISTANT;
            case "mms":
                return Phone.TYPE_MMS;
            default:
                return Phone.TYPE_CUSTOM;
        }
    }

    private void addPhoneLabel(ContentValues values, String label) {
        int type = getPhoneType(label);
        if (type != NOT_SET) {
            addContentValue(values, Phone.TYPE, type);
        }
        if (type == Phone.TYPE_CUSTOM) {
            addContentValue(values, Phone.LABEL, label);
        }
    }

    private ContentValues getPhoneContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Phone.CONTENT_ITEM_TYPE);
        addPhoneLabel(values, getString(data, "label"));
        addContentValue(values, Phone.NUMBER, getString(data, "number"));
        addContentValue(values, Phone.NORMALIZED_NUMBER, getString(data, "normalizedNumber"));
        return values;
    }

    private int getEmailType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "home":
                return Email.TYPE_HOME;
            case "work":
                return Email.TYPE_WORK;
            case "other":
                return Email.TYPE_OTHER;
            case "mobile":
                return Email.TYPE_MOBILE;
            default:
                return Email.TYPE_CUSTOM;
        }
    }

    private void addEmailLabel(ContentValues values, String label) {
        int type = getEmailType(label);
        if (type != NOT_SET) {
            addContentValue(values, Email.TYPE, type);
        }
        if (type == Email.TYPE_CUSTOM) {
            addContentValue(values, Email.LABEL, label);
        }
    }

    private ContentValues getEmailContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Email.CONTENT_ITEM_TYPE);
        addEmailLabel(values, getString(data, "label"));
        addContentValue(values, Email.ADDRESS, getString(data, "address"));
        addContentValue(values, Email.DISPLAY_NAME, getString(data, "displayName"));
        return values;
    }

    private int getPostalType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "home":
                return StructuredPostal.TYPE_HOME;
            case "work":
                return StructuredPostal.TYPE_WORK;
            case "other":
                return StructuredPostal.TYPE_OTHER;
            default:
                return StructuredPostal.TYPE_CUSTOM;
        }
    }

    private void addPostalLabel(ContentValues values, String label) {
        int type = getPostalType(label);
        if (type != NOT_SET) {
            addContentValue(values, StructuredPostal.TYPE, type);
        }
        if (type == StructuredPostal.TYPE_CUSTOM) {
            addContentValue(values, StructuredPostal.LABEL, label);
        }
    }

    private ContentValues getPostalContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, StructuredPostal.CONTENT_ITEM_TYPE);
        addPostalLabel(values, getString(data, "label"));
        addContentValue(values, StructuredPostal.FORMATTED_ADDRESS, getString(data, "formattedAddress"));
        addContentValue(values, StructuredPostal.STREET, getString(data, "street"));
        addContentValue(values, StructuredPostal.POBOX, getString(data, "pobox"));
        addContentValue(values, StructuredPostal.NEIGHBORHOOD, getString(data, "neighborhood"));
        addContentValue(values, StructuredPostal.CITY, getString(data, "city"));
        addContentValue(values, StructuredPostal.REGION, getString(data, "region"));
        addContentValue(values, StructuredPostal.POSTCODE, getString(data, "postcode"));
        addContentValue(values, StructuredPostal.COUNTRY, getString(data, "country"));
        return values;
    }

    private int getImType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "home":
                return Im.TYPE_HOME;
            case "work":
                return Im.TYPE_WORK;
            case "other":
                return Im.TYPE_OTHER;
            default:
                return Im.TYPE_CUSTOM;
        }
    }

    private void addImLabel(ContentValues values, String label) {
        int type = getImType(label);
        if (type != NOT_SET) {
            addContentValue(values, Im.TYPE, type);
        }
        if (type == Im.TYPE_CUSTOM) {
            addContentValue(values, Im.LABEL, label);
        }
    }

    private int getImProtocolType(String value) {
        if (value == null || value.isEmpty()) {
            return NOT_SET;
        }
        switch (value.toLowerCase()) {
            case "custom":
                return Im.PROTOCOL_CUSTOM;
            case "aim":
                return Im.PROTOCOL_AIM;
            case "msn":
                return Im.PROTOCOL_MSN;
            case "yahoo":
                return Im.PROTOCOL_YAHOO;
            case "skype":
                return Im.PROTOCOL_SKYPE;
            case "qq":
                return Im.PROTOCOL_QQ;
            case "googletalk":
            case "google talk":
            case "google_talk":
                return Im.PROTOCOL_GOOGLE_TALK;
            case "icq":
                return Im.PROTOCOL_ICQ;
            case "jabber":
                return Im.PROTOCOL_JABBER;
            case "netmeeting":
                return Im.PROTOCOL_NETMEETING;
            default:
                return Im.PROTOCOL_CUSTOM;
        }
    }

    private void addImProtocol(ContentValues values, String value) {
        int type = getImProtocolType(value);
        if (type != NOT_SET) {
            addContentValue(values, Im.PROTOCOL, type);
        }
        if (type == Im.PROTOCOL_CUSTOM) {
            addContentValue(values, Im.CUSTOM_PROTOCOL, value);
        }
    }

    private ContentValues getImContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Im.CONTENT_ITEM_TYPE);
        addImLabel(values, getString(data, "label"));
        addImProtocol(values, getString(data, "protocol"));
        addContentValue(values, Im.DATA, getString(data, "username"));
        return values;
    }

    private int getOrganizationType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "work":
                return Organization.TYPE_WORK;
            case "other":
                return Organization.TYPE_OTHER;
            default:
                return Organization.TYPE_CUSTOM;
        }
    }

    private void addOrganizationLabel(ContentValues values, String label) {
        int type = getOrganizationType(label);
        if (type != NOT_SET) {
            addContentValue(values, Organization.TYPE, type);
        }
        if (type == Organization.TYPE_CUSTOM) {
            addContentValue(values, Organization.LABEL, label);
        }
    }

    private ContentValues getOrganizationContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Organization.CONTENT_ITEM_TYPE);
        addOrganizationLabel(values, getString(data, "label"));
        addContentValue(values, Organization.COMPANY, getString(data, "company"));
        addContentValue(values, Organization.TITLE, getString(data, "title"));
        addContentValue(values, Organization.DEPARTMENT, getString(data, "department"));
        addContentValue(values, Organization.JOB_DESCRIPTION, getString(data, "jobDescription"));
        addContentValue(values, Organization.SYMBOL, getString(data, "symbol"));
        addContentValue(values, Organization.PHONETIC_NAME, getString(data, "phoneticName"));
        addContentValue(values, Organization.OFFICE_LOCATION, getString(data, "officeLocation"));
        // addContentValue(values, Organization.PHONETIC_NAME_STYLE, getString(data, "phoneticNameStyle"));
        return values;
    }

    private int getRelationType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "assistant":
                return Relation.TYPE_ASSISTANT;
            case "brother":
                return Relation.TYPE_BROTHER;
            case "child":
                return Relation.TYPE_CHILD;
            case "domesticpartner":
            case "domestic partner":
            case "domestic_partner":
                return Relation.TYPE_DOMESTIC_PARTNER;
            case "father":
                return Relation.TYPE_FATHER;
            case "friend":
                return Relation.TYPE_FRIEND;
            case "manager":
                return Relation.TYPE_MANAGER;
            case "mother":
                return Relation.TYPE_MOTHER;
            case "parent":
                return Relation.TYPE_PARENT;
            case "partner":
                return Relation.TYPE_PARTNER;
            case "referredby":
            case "referred by":
            case "referred_by":
                return Relation.TYPE_REFERRED_BY;
            case "relative":
                return Relation.TYPE_RELATIVE;
            case "sister":
                return Relation.TYPE_SISTER;
            case "spouse":
                return Relation.TYPE_SPOUSE;
            default:
                return Relation.TYPE_CUSTOM;
        }
    }

    private void addRelationLabel(ContentValues values, String label) {
        int type = getRelationType(label);
        if (type != NOT_SET) {
            addContentValue(values, Relation.TYPE, type);
        }
        if (type == Relation.TYPE_CUSTOM) {
            addContentValue(values, Relation.LABEL, label);
        }
    }

    private ContentValues getRelationContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Relation.CONTENT_ITEM_TYPE);
        addRelationLabel(values, getString(data, "label"));
        addContentValue(values, Relation.NAME, getString(data, "name"));
        return values;
    }

    private int getEventType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "anniversary":
                return Event.TYPE_ANNIVERSARY;
            case "other":
                return Event.TYPE_OTHER;
            case "birthday":
                return Event.TYPE_BIRTHDAY;
            default:
                return Event.TYPE_CUSTOM;
        }
    }

    private void addEventLabel(ContentValues values, String label) {
        int type = getEventType(label);
        if (type != NOT_SET) {
            addContentValue(values, Event.TYPE, type);
        }
        if (type == Event.TYPE_CUSTOM) {
            addContentValue(values, Event.LABEL, label);
        }
    }

    private ContentValues getEventContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Event.CONTENT_ITEM_TYPE);
        addEventLabel(values, getString(data, "label"));
        addContentValue(values, Event.LABEL, getString(data, "label"));
        addContentValue(values, Event.START_DATE, getString(data, "startDate"));
        return values;
    }

    private ContentValues getPhotoContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Photo.CONTENT_ITEM_TYPE);
        addContentValue(values, Photo.PHOTO_FILE_ID, getInt(data, "photoFileId"));
        addContentValue(values, Photo.PHOTO, getBlob(data, "photo"));
        return values;
    }

    private ContentValues getNoteContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Note.CONTENT_ITEM_TYPE);
        addContentValue(values, Note.NOTE, getString(data, "note"));
        return values;
    }

    private int getWebsiteType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "homepage":
                return Website.TYPE_HOMEPAGE;
            case "blog":
                return Website.TYPE_BLOG;
            case "profile":
                return Website.TYPE_PROFILE;
            case "home":
                return Website.TYPE_HOME;
            case "work":
                return Website.TYPE_WORK;
            case "ftp":
                return Website.TYPE_FTP;
            case "other":
                return Website.TYPE_OTHER;
            default:
                return Website.TYPE_CUSTOM;
        }
    }

    private void addWebsiteLabel(ContentValues values, String label) {
        int type = getWebsiteType(label);
        if (type != NOT_SET) {
            addContentValue(values, Website.TYPE, type);
        }
        if (type == Website.TYPE_CUSTOM) {
            addContentValue(values, Website.LABEL, label);
        }
    }

    private ContentValues getWebsiteContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Website.CONTENT_ITEM_TYPE);
        addWebsiteLabel(values, getString(data, "label"));
        addContentValue(values, Website.URL, getString(data, "url"));
        return values;
    }

    private int getSipAddressType(String label) {
        if (label == null || label.isEmpty()) {
            return NOT_SET;
        }
        switch (label.toLowerCase()) {
            case "home":
                return SipAddress.TYPE_HOME;
            case "work":
                return SipAddress.TYPE_WORK;
            case "other":
                return SipAddress.TYPE_OTHER;
            default:
                return SipAddress.TYPE_CUSTOM;
        }
    }

    private void addSipAddressLabel(ContentValues values, String label) {
        int type = getSipAddressType(label);
        if (type != NOT_SET) {
            addContentValue(values, SipAddress.TYPE, type);
        }
        if (type == SipAddress.TYPE_CUSTOM) {
            addContentValue(values, SipAddress.LABEL, label);
        }
    }

    private ContentValues getSipAddressContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, SipAddress.CONTENT_ITEM_TYPE);
        addSipAddressLabel(values, getString(data, "label"));
        addContentValue(values, SipAddress.SIP_ADDRESS, getString(data, "sipAddress"));
        return values;
    }

    private ContentValues getIdentityContentValues(ReadableMap data) {
        ContentValues values = new ContentValues();
        values.put(Data.MIMETYPE, Identity.CONTENT_ITEM_TYPE);
        addContentValue(values, Identity.IDENTITY, getString(data, "identity"));
        addContentValue(values, Identity.NAMESPACE, getString(data, "namespace"));
        return values;
    }

    @ReactMethod
    public void addContact(ReadableMap data, Promise promise) {
        if (mPromise != null) {
            mPromise.reject(E_TIMEOUT, "Insert or edit timed out");
        }
        mPromise = promise;
        Intent intent = new Intent(Intent.ACTION_INSERT_OR_EDIT);
        intent.setType(Contacts.CONTENT_ITEM_TYPE);
        intent.putExtra(Insert.FULL_MODE, true);
        putExtra(intent, Insert.NAME, getString(data, "name"));
        putExtra(intent, Insert.PHONETIC_NAME, getString(data, "phoneticName"));
        intent.putParcelableArrayListExtra(Insert.DATA, getContactValues(data));
        getCurrentActivity().startActivityForResult(intent, ACTIVITY_INSERT_OR_EDIT);
    }
}
