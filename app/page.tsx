// app/page.tsx
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author?.name}</p>
        </div>
      ))}
    </div>
  );
}
