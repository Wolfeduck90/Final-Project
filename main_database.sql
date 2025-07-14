CREATE TABLE User_Profile_Table (
    user_id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('Farmer', 'Buyer')),
    location TEXT,
    produce_type TEXT,
    farm_size_hectares FLOAT,
    expected_yield_kg FLOAT,
    harvest_date DATE,
    experience_years INT,
    badge_level TEXT
);

-- Sample Data
INSERT INTO User_Profile_Table (full_name, role, location, produce_type, farm_size_hectares, expected_yield_kg, harvest_date, experience_years, badge_level)
VALUES
('Thabo Mokoena', 'Farmer', 'Gauteng', 'Tomatoes', 2.5, 1200, '2025-07-30', 10, 'Mentor'),
('Lindiwe Khumalo', 'Buyer', 'Mpumalanga', 'Maize', NULL, NULL, NULL, NULL, NULL),
('Sipho Dlamini', 'Farmer', 'Limpopo', 'Maize', 5.0, 5000, '2025-08-15', 5, 'Contributor');
CREATE TABLE Marketplace_Listing_Table (
    listing_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES User_Profile_Table(user_id),
    produce_type TEXT,
    expected_yield_kg FLOAT,
    estimated_price_ZAR FLOAT,
    status TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO Marketplace_Listing_Table (farmer_id, produce_type, expected_yield_kg, estimated_price_ZAR, status)
VALUES
(1, 'Tomatoes', 1200, 18.68, 'Available'),
(3, 'Maize', 5000, 4.50, 'Available');
CREATE TABLE Mentorship_Connections_Table (
    connection_id SERIAL PRIMARY KEY,
    mentor_id INT REFERENCES User_Profile_Table(user_id),
    mentee_id INT REFERENCES User_Profile_Table(user_id),
    status TEXT,
    shared_produce TEXT,
    location_match BOOLEAN,
    badge_awarded TEXT
);

-- Sample Data
INSERT INTO Mentorship_Connections_Table (mentor_id, mentee_id, status, shared_produce, location_match, badge_awarded)
VALUES
(1, 3, 'Active', 'Maize', FALSE, 'Knowledge Sharer');
CREATE TABLE Peer_Learning_Forum_Table (
    post_id SERIAL PRIMARY KEY,
    author_id INT REFERENCES User_Profile_Table(user_id),
    topic TEXT,
    content TEXT,
    media_url TEXT,
    votes INT DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO Peer_Learning_Forum_Table (author_id, topic, content, media_url)
VALUES
(1, 'Tomato Pest Control', 'How do you manage whiteflies in outdoor beds?', NULL),
(3, 'Maize Yield', 'What fertilizer ratio works best for dryland maize?', NULL);
CREATE TABLE Equipment_Barter_Table (
    equipment_id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES User_Profile_Table(user_id),
    requester_id INT REFERENCES User_Profile_Table(user_id),
    equipment_type TEXT,
    availability TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO Equipment_Barter_Table (owner_id, requester_id, equipment_type, availability)
VALUES
(1, 3, 'Tractor', 'Loaned');
CREATE TABLE Produce_Trade_Table (
    trade_id SERIAL PRIMARY KEY,
    buyer_id INT REFERENCES User_Profile_Table(user_id),
    farmer_id INT REFERENCES User_Profile_Table(user_id),
    produce_type TEXT,
    quantity_kg FLOAT,
    price_per_kg FLOAT,
    total_price_ZAR FLOAT,
    trade_date DATE
);

-- Sample Data
INSERT INTO Produce_Trade_Table (buyer_id, farmer_id, produce_type, quantity_kg, price_per_kg, total_price_ZAR, trade_date)
VALUES    
(2, 1, 'Tomatoes', 500, 18.68, 9340, '2025-07-01'),
(2, 3, 'Maize', 1000, 4.50, 4500, '2025-08-01');