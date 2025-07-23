import React from "react";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-yanbaru-charcoal">会社概要</h1>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">ミッション</h2>
        <p className="text-yanbaru-charcoal/80 mb-4">やんばるドライブは、沖縄の自然と文化を守りながら、地域とともに成長し、安心・快適な移動体験を提供します。</p>
        <h2 className="text-2xl font-semibold mb-2">ビジョン</h2>
        <p className="text-yanbaru-charcoal/80">地域社会と観光客の架け橋となり、持続可能な観光と地域活性化に貢献します。</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">沿革</h2>
        <ul className="text-yanbaru-charcoal/80 space-y-1">
          <li>2020年4月　やんばるドライブ株式会社設立</li>
          <li>2021年3月　車両台数50台突破</li>
          <li>2022年7月　観光サポート事業開始</li>
          <li>2023年12月　累計利用者1万人達成</li>
        </ul>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">代表メッセージ</h2>
        <p className="text-yanbaru-charcoal/80">「沖縄の魅力をより多くの方に伝え、地域とともに歩む企業でありたいと考えています。お客様一人ひとりの旅が素晴らしい思い出となるよう、スタッフ一同心を込めてサポートいたします。」<br />代表取締役　山田 太郎</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">会社情報</h2>
        <ul className="text-yanbaru-charcoal/80 space-y-1">
          <li>会社名：やんばるドライブ株式会社</li>
          <li>所在地：沖縄県名護市○○○-○○</li>
          <li>設立：2020年4月</li>
          <li>資本金：1,000万円</li>
          <li>代表者：山田 太郎</li>
          <li>事業内容：レンタカー事業、観光サポート</li>
        </ul>
      </section>
    </main>
  );
} 