'use client'
import { ApiItem } from "@/api/client";
import Article from "@/component/article";
import News from "@/component/news";
import { useEffect, useState } from "react";

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

  const [_category, set_category] = useState<{ name: string }[]>([])
  const getCategory = async () => {
    const result = await ApiItem({ archive: "category" })
    if (result.success) {
      set_category(result.data)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (

    <div className=" max-w-(--md) " >
      <News limit={3} />
      {/* <Article blogName="bài viết" limit={3} /> */}
      {_category.map((_cate, index) => <Article blogName={_cate.name} limit={3} key={index} />)}
    </div>
  );
}
