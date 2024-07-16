package models

var (
	insertPetQuery           = "INSERT INTO pet (owner_id, name, breed, age, gender, is_sterilized) VALUES (?,?,?,?,?,?)"
	insertOwnerQuery         = "INSERT INTO owner (phone, alternate_phone, name, alternate_name, address) VALUES (?,?,?,?,?)"
	insertReservationQuery   = "INSERT INTO reservations (owner_id, pet_id, deworming_status, anti_tick, diet, previous_boarding, existing_injury, start_date, status) VALUES (?,?,?,?,?,?,?,?,?)"
	insertBillingQuery       = "INSERT INTO billing (owner_id, pet_id, reservation_id, no_of_days, day_care_hours, day_care_minutes, boarding_charge_per_day, boarding_charge, daycare_charge, discount, amount) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
	insertOldDataQuery       = "INSERT INTO olddata (client_name, amount, pet_name, date) VALUES (?,?,?,?)"
	insertIdentityQuery      = "INSERT INTO files (linked_id, doc_type, file_name, extension, data) VALUES (?,?,?,?,?)"
	insertVaccinationQuery   = "INSERT INTO files (linked_id, doc_type, file_name, extension, data, expiry) VALUES (?,?,?,?,?,?)"
	updateReservationQuery   = "UPDATE reservations SET end_date = ?, status = ? WHERE id = ?"
	getReservationByIDQuery  = "SELECT r.id, o.name as owner_name, o.address as address, o.phone as phone, p.name as pet_name, p.breed, diet, existing_injury, start_date, end_date, status FROM reservations as r JOIN pet as p on r.pet_id=p.id JOIN owner as o on o.id=r.owner_id WHERE r.id = ?"
	getReservationByPetQuery = "SELECT id, diet, existing_injury, start_date, end_date, status FROM reservations WHERE pet_id = ?"
	getReservationsQuery     = "SELECT r.id, o.id as owner_id, o.name as owner_name, o.phone as phone, p.id as pet_id, p.name as pet_name, o.address ,p.breed, diet, existing_injury, start_date, end_date, status FROM reservations as r JOIN pet as p on r.pet_id=p.id JOIN owner as o on o.id=r.owner_id WHERE status = ?"
	getPetQuery              = "SELECT id, name, breed, age, gender, is_sterilized FROM pet WHERE id = ?"
	getOwnerQuery            = "SELECT id, phone, alternate_phone, name, alternate_name, address, created_at, updated_at FROM owner WHERE phone = ?"
	getOwnersQuery           = "SELECT id, phone, alternate_phone, name, alternate_name, address FROM owner"
	getOwnerPetsQuery        = "SELECT pet.id, owner.id as owner_id, pet.name, pet.age, pet.breed, pet.gender, pet.is_sterilized FROM pet JOIN owner on pet.owner_id=owner.id WHERE owner.phone = ?"
	getFileQuery             = "SELECT file_name, extension, data, expiry FROM files WHERE linked_id = ? AND doc_type = ?"
	getExpiryQuery           = "SELECT expiry from files where linked_id = ? AND doc_type = 'pet'"
	getBillingIDQuery        = "SELECT id FROM billing WHERE id = ?"
	getBillingDetailQuery    = "SELECT id, owner_id, pet_id, reservation_id, no_of_days, day_care_hours, day_care_minutes, boarding_charge_per_day, boarding_charge, daycare_charge, discount, amount, created_at, updated_at FROM billing WHERE reservation_id = ?"
	listOldDataQuery         = "SELECT client_name, amount, date, pet_name FROM olddata"
)
