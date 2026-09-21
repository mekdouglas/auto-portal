import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { MOCK_USERS } from '../src/data/mockUsers.js';
import { MOCK_VEHICLES } from '../src/data/mockVehicles.js';
import { MOCK_CHATS } from '../src/data/mockChats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connectionString = "postgres://postgres.opnovxlqmfcsduzncjow:vDhz37PtHTegS1Jp@aws-0-sa-east-1.pooler.supabase.com:5432/postgres?sslmode=require";

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function runSetup() {
  try {
    console.log('🔌 Connecting to Supabase PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully.');

    const schemaSql = fs.readFileSync(path.join(__dirname, '../supabase/schema.sql'), 'utf8');
    console.log('📋 Running schema migration...');
    await client.query(schemaSql);
    console.log('✅ Schema tables & policies applied.');

    // Seed Users
    console.log('🌱 Seeding profiles...');
    for (const u of MOCK_USERS) {
      await client.query(`
        INSERT INTO public.profiles (id, name, username, role, avatar, cover_image, city, bio, verified, plan, phone, rating)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          role = EXCLUDED.role,
          avatar = EXCLUDED.avatar;
      `, [u.id, u.name, u.username, u.role, u.avatar, u.coverImage || null, u.city, u.bio, u.verified || false, u.plan || 'Grátis', u.phone, u.rating || 5.0]);
    }

    // Seed Vehicles
    console.log('🌱 Seeding vehicles...');
    for (const v of MOCK_VEHICLES) {
      await client.query(`
        INSERT INTO public.vehicles (
          id, title, category, make, model, year, mileage, fuel, transmission, color,
          price, hide_price, featured, featured_tag, photos, description, audio_transcript,
          audio_duration, location, seller_id, seller_data, likes_count, views_count, specs
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
        ON CONFLICT (id) DO UPDATE SET
          price = EXCLUDED.price,
          hide_price = EXCLUDED.hide_price,
          description = EXCLUDED.description;
      `, [
        v.id, v.title, v.category, v.make, v.model, v.year, v.mileage, v.fuel, v.transmission, v.color,
        v.price, v.hidePrice, v.featured, v.featuredTag || null, v.photos, v.description, v.audioTranscript || null,
        v.audioDuration || null, v.location, v.seller.id, JSON.stringify(v.seller), v.likesCount, v.viewsCount, v.specs
      ]);
    }

    // Seed Chats
    console.log('🌱 Seeding chats...');
    for (const c of MOCK_CHATS) {
      await client.query(`
        INSERT INTO public.chats (
          id, vehicle_id, vehicle_title, vehicle_photo, vehicle_price, participant, last_message, last_message_time, unread_count, messages
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO NOTHING;
      `, [
        c.id, c.vehicleId, c.vehicleTitle, c.vehiclePhoto, c.vehiclePrice, JSON.stringify(c.participant),
        c.lastMessage, c.lastMessageTime, c.unreadCount, JSON.stringify(c.messages)
      ]);
    }

    console.log('🎉 Supabase database setup & seeding complete!');
  } catch (err) {
    console.error('❌ Error during database setup:', err);
  } finally {
    await client.end();
  }
}

runSetup();
