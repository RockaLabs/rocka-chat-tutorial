import { Mongo } from 'meteor/mongo';

class ChatsCollection extends Mongo.Collection {
    insert(doc, callback) {
        doc.createdAt = new Date();
        doc.updatedAt = new Date();

        const result = super.insert(doc, callback);
        return result;
    }
    update(selector, modifier, options, callback) {
        modifier['$set'].updatedAt = new Date();
        const result = super.update(selector, modifier, options, callback);
        return result;
    }
    remove(selector, callback) {
        const result = super.remove(selector, callback);
        return result;
    }
}

export const Chats = new ChatsCollection('chats');

// Deny all client-side updates since we will be using methods to manage this collection
Chats.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});