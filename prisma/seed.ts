import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // 既存のデータをクリア
  await prisma.review.deleteMany();
  await prisma.store.deleteMany();

  // サンプル店舗を作成
  const store1 = await prisma.store.create({
    data: {
      name: "山田ラーメン",
      address: "東京都渋谷区道玄坂1-2-3",
      area: "東京",
      category: "ラーメン",
      phone: "03-1234-5678",
      businessHours: "11:00〜23:00（定休日：月曜）",
      budgetRange: "〜1000円",
      description: "昔ながらの醤油ラーメンが自慢のお店です。スープは鶏ガラベースで、長時間じっくり煮込んだ深い味わいが特徴。チャーシューも柔らかくて絶品です。",
      editPassword: "password123",
    },
  });

  const store2 = await prisma.store.create({
    data: {
      name: "カフェ・ド・パリ",
      address: "東京都港区青山1-2-3",
      area: "東京",
      category: "カフェ",
      phone: "03-2345-6789",
      businessHours: "8:00〜22:00（年中無休）",
      budgetRange: "1000〜3000円",
      description: "おしゃれな雰囲気のカフェ。こだわりのコーヒーと手作りスイーツが人気です。Wi-Fi完備で作業もできます。",
      editPassword: "password123",
    },
  });

  const store3 = await prisma.store.create({
    data: {
      name: "焼肉 大阪",
      address: "大阪府大阪市北区梅田1-2-3",
      area: "大阪",
      category: "焼肉",
      phone: "06-1234-5678",
      businessHours: "17:00〜24:00（定休日：火曜）",
      budgetRange: "3000〜5000円",
      description: "上質な和牛を使用した焼肉店。特製のタレと新鮮なお肉が自慢です。落ち着いた店内で、大切な方とのお食事にもぴったり。",
      editPassword: "password123",
    },
  });

  const store4 = await prisma.store.create({
    data: {
      name: "寿司処 銀座",
      address: "東京都中央区銀座5-1-1",
      area: "東京",
      category: "寿司",
      phone: "03-3456-7890",
      businessHours: "11:30〜14:00、17:00〜22:00（定休日：日曜）",
      budgetRange: "5000円〜",
      description: "新鮮なネタと熟練の技が光る寿司店。カウンター席では職人の技を間近で見られます。接待やデートにおすすめです。",
      editPassword: "password123",
    },
  });

  const store5 = await prisma.store.create({
    data: {
      name: "イタリアン食堂 ボナペティ",
      address: "東京都世田谷区三軒茶屋1-2-3",
      area: "東京",
      category: "イタリアン",
      phone: "03-4567-8901",
      businessHours: "11:00〜15:00、17:00〜23:00（定休日：水曜）",
      budgetRange: "1000〜3000円",
      description: "カジュアルに本格イタリアンが楽しめるお店。ピザとパスタが人気で、ランチタイムはお得なセットもあります。",
      editPassword: "password123",
    },
  });

  // サンプルレビューを作成
  await prisma.review.create({
    data: {
      storeId: store1.id,
      rating: 5,
      nickname: "ラーメン太郎",
      title: "最高の醤油ラーメン！",
      body: "スープが本当に美味しい！深いコクがあって、麺との相性も抜群です。チャーシューも柔らかくて、何度でも通いたくなるお店です。",
      visitDate: "2024-11-20",
      editPassword: "review123",
    },
  });

  await prisma.review.create({
    data: {
      storeId: store1.id,
      rating: 4,
      nickname: "グルメ花子",
      title: "懐かしい味",
      body: "昔ながらの醤油ラーメンで、ほっとする味わいです。量もちょうど良くて、ランチにぴったり。",
      visitDate: "2024-11-18",
      editPassword: "review123",
    },
  });

  await prisma.review.create({
    data: {
      storeId: store2.id,
      rating: 5,
      nickname: "カフェ好き",
      title: "作業にぴったり",
      body: "Wi-Fiと電源があって、コーヒーも美味しい。長時間いても居心地が良くて、お気に入りのカフェです。",
      visitDate: "2024-11-22",
      editPassword: "review123",
    },
  });

  await prisma.review.create({
    data: {
      storeId: store2.id,
      rating: 4,
      nickname: "スイーツ大好き",
      title: "ケーキが絶品",
      body: "手作りのケーキがとても美味しかったです。コーヒーとの相性も良くて、また行きたいと思います。",
      visitDate: "2024-11-19",
      editPassword: "review123",
    },
  });

  await prisma.review.create({
    data: {
      storeId: store3.id,
      rating: 5,
      nickname: "肉好き",
      title: "お肉が最高！",
      body: "和牛の質が素晴らしい！柔らかくて、口の中でとろけます。特製のタレも絶品で、大満足でした。",
      visitDate: "2024-11-15",
      editPassword: "review123",
    },
  });

  await prisma.review.create({
    data: {
      storeId: store4.id,
      rating: 5,
      nickname: "寿司通",
      title: "ネタが新鮮",
      body: "どのネタも新鮮で美味しかったです。職人さんの技術も素晴らしく、接客も丁寧でした。特別な日におすすめです。",
      visitDate: "2024-11-10",
      editPassword: "review123",
    },
  });

  await prisma.review.create({
    data: {
      storeId: store5.id,
      rating: 4,
      nickname: "パスタ好き",
      title: "コスパ最高",
      body: "本格的なパスタがリーズナブルな価格で食べられます。ランチセットがお得で、サラダとドリンクも付いてきます。",
      visitDate: "2024-11-21",
      editPassword: "review123",
    },
  });

  console.log("Seed completed successfully!");
  console.log("Created stores:", 5);
  console.log("Created reviews:", 7);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

