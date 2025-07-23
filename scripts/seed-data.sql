-- やんばるドライブ サンプルデータ投入スクリプト

-- 車両データの投入
INSERT INTO vehicles (name, license_plate, image_urls, base_price, passengers, transmission, fuel_type, engine_size, doors, luggage_size, description, features, total_units, location) VALUES
('トヨタ プリウス', '沖縄500あ1234', ARRAY['/placeholder.svg?height=400&width=600'], 5500, 5, 'AT', 'ハイブリッド', '1.8L', 5, '大', '燃費性能に優れたハイブリッド車です。静かで快適な乗り心地で、沖縄の美しい景色をゆったりとお楽しみいただけます。', ARRAY['カーナビ', 'ETC', 'バックカメラ', 'ハイブリッド'], 3, '名護店'),

('ホンダ フィット', '沖縄500あ5678', ARRAY['/placeholder.svg?height=400&width=600'], 4800, 5, 'AT', 'ガソリン', '1.3L', 5, '中', 'コンパクトで運転しやすく、燃費も良好です。街乗りから観光まで幅広くご利用いただけます。', ARRAY['カーナビ', 'ETC'], 2, '名護店'),

('日産 セレナ', '沖縄500あ9012', ARRAY['/placeholder.svg?height=400&width=600'], 8500, 8, 'AT', 'ガソリン', '2.0L', 5, '特大', 'ファミリーやグループでの旅行に最適な8人乗りミニバンです。荷物もたっぷり積めます。', ARRAY['カーナビ', 'ETC', '両側スライドドア', 'バックカメラ'], 2, '本部店'),

('スズキ ジムニー', '沖縄500あ3456', ARRAY['/placeholder.svg?height=400&width=600'], 7200, 4, 'MT', 'ガソリン', '0.66L', 3, '小', '本格的な4WD性能で、やんばるの山道や海岸線のドライブを存分にお楽しみいただけます。', ARRAY['4WD', 'カーナビ'], 2, '名護店'),

('トヨタ ヴォクシー', '沖縄500あ7890', ARRAY['/placeholder.svg?height=400&width=600'], 9200, 8, 'AT', 'ガソリン', '2.0L', 5, '特大', '広々とした室内空間と使い勝手の良さが魅力のファミリーカーです。', ARRAY['カーナビ', 'ETC', '両側スライドドア', 'バックカメラ'], 1, '本部店'),

('ホンダ ヴェゼル', '沖縄500あ2468', ARRAY['/placeholder.svg?height=400&width=600'], 6800, 5, 'AT', 'ハイブリッド', '1.5L', 5, '大', 'スタイリッシュなSUVで、街乗りからアウトドアまで対応できます。', ARRAY['SUV', 'ハイブリッド', 'カーナビ', 'ETC'], 3, '名護店');

-- サンプルユーザーデータ
INSERT INTO users (first_name, last_name, email, password_hash, phone, license_image_url) VALUES
('太郎', '田中', 'tanaka@example.com', '$2b$10$example_hash_1', '090-1234-5678', '/uploads/license1.jpg'),
('花子', '佐藤', 'sato@example.com', '$2b$10$example_hash_2', '090-2345-6789', '/uploads/license2.jpg'),
('次郎', '山田', 'yamada@example.com', '$2b$10$example_hash_3', '090-3456-7890', '/uploads/license3.jpg');

-- サンプル予約データ
INSERT INTO bookings (user_id, vehicle_id, start_date, end_date, start_time, end_time, base_amount, options_amount, total_amount, status, payment_status) VALUES
(1, 1, '2024-01-20', '2024-01-22', '10:00', '18:00', 11000, 1000, 12000, 'confirmed', 'paid'),
(2, 2, '2024-01-21', '2024-01-23', '09:00', '17:00', 9600, 0, 9600, 'pending', 'pending'),
(3, 3, '2024-01-19', '2024-01-21', '11:00', '19:00', 17000, 500, 17500, 'completed', 'paid');

-- サンプル予約オプションデータ
INSERT INTO booking_options (booking_id, option_name, option_price, quantity) VALUES
(1, 'チャイルドシート', 500, 1),
(1, '免責補償アップグレード', 500, 1),
(3, 'Wi-Fiルーター', 500, 1);

-- サンプルレビューデータ
INSERT INTO reviews (user_id, vehicle_id, booking_id, rating, comment) VALUES
(1, 1, 1, 5, 'とても綺麗な車で、燃費も良く快適でした。スタッフの対応も丁寧で満足です。'),
(2, 2, 2, 4, 'カーナビが使いやすく、初めての沖縄旅行でも安心して運転できました。'),
(3, 3, 3, 5, '家族4人でちょうど良いサイズでした。また利用したいと思います。');

-- サンプルお気に入りデータ
INSERT INTO favorites (user_id, vehicle_id) VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1);

-- 料金変動設定のサンプル
INSERT INTO pricing_rules (vehicle_id, rule_type, multiplier, start_date, end_date, is_active) VALUES
(1, 'peak', 1.2, '2024-07-01', '2024-08-31', true),
(1, 'off_peak', 0.8, '2024-01-01', '2024-02-29', true),
(2, 'peak', 1.2, '2024-07-01', '2024-08-31', true),
(3, 'peak', 1.3, '2024-07-01', '2024-08-31', true);
