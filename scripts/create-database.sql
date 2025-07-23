-- やんばるドライブ データベース作成スクリプト

-- ユーザー情報テーブル
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    license_image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 車両情報テーブル
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    image_urls TEXT[], -- 複数の画像URL
    base_price INTEGER NOT NULL, -- 1日あたりの基本料金（円）
    passengers INTEGER NOT NULL,
    transmission VARCHAR(10) NOT NULL, -- 'AT' or 'MT'
    fuel_type VARCHAR(20) NOT NULL,
    engine_size VARCHAR(10),
    doors INTEGER,
    luggage_size VARCHAR(10),
    description TEXT,
    features TEXT[], -- 装備・特徴の配列
    total_units INTEGER NOT NULL DEFAULT 1, -- 同じ車種の総台数
    location VARCHAR(100) NOT NULL, -- 店舗所在地
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 予約情報テーブル
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    base_amount INTEGER NOT NULL, -- 基本料金
    options_amount INTEGER DEFAULT 0, -- オプション料金
    total_amount INTEGER NOT NULL, -- 合計金額
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
    payment_method VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 予約オプションテーブル
CREATE TABLE booking_options (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    option_name VARCHAR(100) NOT NULL,
    option_price INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1
);

-- レビュー情報テーブル
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    booking_id INTEGER REFERENCES bookings(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- お気に入り情報テーブル
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, vehicle_id)
);

-- メッセージテーブル
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_type VARCHAR(20) NOT NULL, -- 'admin' or 'user'
    receiver_id INTEGER,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 料金変動設定テーブル
CREATE TABLE pricing_rules (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id),
    rule_type VARCHAR(20) NOT NULL, -- 'peak', 'off_peak', 'weekend', 'holiday'
    multiplier DECIMAL(3,2) NOT NULL, -- 料金倍率
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス作成
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_vehicle ON bookings(vehicle_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_reviews_vehicle ON reviews(vehicle_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
