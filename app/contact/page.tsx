import React from "react";

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-yanbaru-charcoal">お問い合わせ</h1>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">ご連絡先</h2>
        <ul className="text-yanbaru-charcoal/80 space-y-1 mb-4">
          <li>電話: 098-XXX-XXXX</li>
          <li>メール: info@yanbaru-drive.co.jp</li>
          <li>所在地: 沖縄県名護市○○○-○○</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">アクセス</h2>
        <div className="mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.123456789!2d127.977!3d26.588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e4f0b0b0b0b0b0%3A0x0!2z5rKW57iE44Gu44KJ44O844Or!5e0!3m2!1sja!2sjp!4v0000000000000!5m2!1sja!2sjp"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="会社所在地マップ"
          ></iframe>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">お問い合わせフォーム</h2>
        <form className="space-y-6 bg-white rounded-lg shadow p-8">
          <div>
            <label htmlFor="name" className="block text-yanbaru-charcoal font-semibold mb-1">お名前</label>
            <input type="text" id="name" name="name" className="w-full border border-yanbaru-emerald/30 rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block text-yanbaru-charcoal font-semibold mb-1">メールアドレス</label>
            <input type="email" id="email" name="email" className="w-full border border-yanbaru-emerald/30 rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="message" className="block text-yanbaru-charcoal font-semibold mb-1">お問い合わせ内容</label>
            <textarea id="message" name="message" rows={4} className="w-full border border-yanbaru-emerald/30 rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white w-full py-2 rounded">送信</button>
        </form>
      </section>
    </main>
  );
} 