import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
const DB = require('../data/contact.json')
const DB_MOC_NAME = 'contact_DB'

export const contactService = {
    query,
    remove,
    save,
}

async function query( first) {
    var contacts = await storageService.query(DB_MOC_NAME)
    console.log(contacts)
    if (!contacts.length && first) {
        console.log('DB', DB)
        contacts = JSON.parse(JSON.stringify(DB))
        utilService.saveToStorage(DB_MOC_NAME, DB)
    }
    return contacts
}

function remove(id) {
    return storageService.removeById(DB_MOC_NAME, id)

}

async function save(contact) {
    if (contact._id) {
        return storageService.put(DB_MOC_NAME, contact)
    } else {
        return storageService.post(DB_MOC_NAME, contact)
    }
}