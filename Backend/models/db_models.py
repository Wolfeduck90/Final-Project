# Backend/models/db_models.py

from sqlalchemy import Column, Integer, Float, String, Boolean, Date, Text, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = 'User_Profile_Table'

    user_id = Column(Integer, primary_key=True)
    full_name = Column(Text, nullable=False)
    role = Column(String)
    location = Column(String)
    produce_type = Column(String)
    farm_size_hectares = Column(Float)
    expected_yield_kg = Column(Float)
    harvest_date = Column(Date)
    experience_years = Column(Integer)
    badge_level = Column(String)

class MarketplaceListing(Base):
    __tablename__ = 'Marketplace_Listing_Table'

    listing_id = Column(Integer, primary_key=True)
    farmer_id = Column(Integer, ForeignKey('User_Profile_Table.user_id'))
    produce_type = Column(String)
    expected_yield_kg = Column(Float)
    estimated_price_ZAR = Column(Float)
    status = Column(String)
    timestamp = Column(TIMESTAMP, server_default=func.now())

class MentorshipConnection(Base):
    __tablename__ = 'Mentorship_Connections_Table'

    connection_id = Column(Integer, primary_key=True)
    mentor_id = Column(Integer, ForeignKey('User_Profile_Table.user_id'))
    mentee_id = Column(Integer, ForeignKey('User_Profile_Table.user_id'))
    status = Column(String)
    shared_produce = Column(String)
    location_match = Column(Boolean)
    badge_awarded = Column(String)

class ForumPost(Base):
    __tablename__ = 'Peer_Learning_Forum_Table'

    post_id = Column(Integer, primary_key=True)
    author_id = Column(Integer, ForeignKey('User_Profile_Table.user_id'))
    topic = Column(String)
    content = Column(Text)
    media_url = Column(String)
    votes = Column(Integer, default=0)
    timestamp = Column(TIMESTAMP, server_default=func.now())

class EquipmentBarter(Base):
    __tablename__ = 'Equipment_Barter_Table'

    equipment_id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey('User_Profile_Table.user_id'))
    requester_id = Column(Integer, ForeignKey('User_Profile_Table.user_id'))
    equipment_type = Column(String)
    availability = Column(String)
    timestamp = Column(TIMESTAMP, server_default=func.now())
