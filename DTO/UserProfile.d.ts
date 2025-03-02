export interface Profile {
    id:      number;
    contact: Contact;
    user:    number;
    owner:   number;
}

export interface Contact {
    id:           number;
    name:         string;
    phone_number: string;
    address:      string;
    email:        string;
    created_at:   null;
    middle_name:  string;
    last_name:    string;
    gender:       string;
    birth_date:   null;
    owner:        number;
}
