-- Schema for a The pet's downtown platform

-- Table to store petwoner information
CREATE TABLE owner (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(15) NOT NULL UNIQUE,
    alternate_phone VARCHAR(15) NOT NULL,
    name varchar(50) NOT NULL,
    alternate_name VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store pet information
CREATE TABLE pet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    breed VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female'),
    is_sterilized BOOL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owner(id)
);

-- Table to store reservations information
CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    pet_id INT NOT NULL,
    deworming_status BOOL NOT NULL,
    anti_tick BOOL NOT NULL,
    diet VARCHAR(200) NOT NULL,
    previous_boarding VARCHAR(200) NOT NULL,
    existing_injury VARCHAR(200) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    status VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owner(id),
    FOREIGN KEY (pet_id) REFERENCES pet(id)
);

-- Table to store billing information
CREATE TABLE billing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    pet_id INT NOT NULL,
    reservation_id INT NOT NULL,
    no_of_days INT NOT NULL,
    -- mode_of_payment ENUM('cash', 'upi', 'bank transfer', 'card'),
    boarding_charge_per_day INT NOT NULL,
    day_care_hours INT NOT NULL,
    day_care_minutes INT NOT NULL,
    daycare_charge INT NOT NULL,
    boarding_charge INT NOT NULL,
    discount INT NOT NULL,
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owner(id),
    FOREIGN KEY (pet_id) REFERENCES pet(id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);


-- Table to store images of vaccination and identity proof
CREATE TABLE files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    linked_id INT NOT NULL,
    doc_type VARCHAR(10) NOT NULL,
    expiry DATE,
    file_name VARCHAR(200) NOT NULL,
    extension VARCHAR(20) NOT NULL,
    data MEDIUMBLOB NOT NULL
);

-- Table to store images of vaccination and identity proof
CREATE TABLE olddata (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    client_name VARCHAR(25) NOT NULL,
    pet_name VARCHAR(25),
    amount INT NOT NULL,
);

-- CREATE TABLE expenses (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     desrciption VARCHAR(100) NOT NULL UNIQUE,
--     vendor VARCHAR(20) NOT NULL,
--     amount INT NOT NULL,
--     -- gender ENUM('debit', 'credit'),
--     -- category ENUM('rent', 'salary', 'fooding', 'medical', 'maintenance','others'),
--     category varchar(50) NOT NULL,
--     mode_of_payment ENUM('cash', 'upi', 'bank transfer', 'card'),
--     date_of_payment TIMESTAMP NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );