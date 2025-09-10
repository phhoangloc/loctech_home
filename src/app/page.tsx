'use client'
import Article from "@/component/article";
import Items from "@/component/items";

export type ItemType = {
  archive: string,
  name: string,
  image: string,
  slug: string,
  content: string,
  category: {
    name: string
  },
  createdAt: Date,
  host: {
    username: string
  }
}
export default function Home() {
  return (

    <div className=" max-w-(--md) " >
      {/* <News limit={3} /> */}
      <Article blogName="bài viết" limit={3} />
      <Items archive="news" limit={3} />
    </div>
  );
}
