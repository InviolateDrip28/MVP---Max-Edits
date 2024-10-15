export default function BlogPost({ params: { articleId } }: any) {
  return (
    <section>
      <p className="text-2xl">
        Showing the blog post for <strong>{articleId}</strong>
      </p>
    </section>
  );
}
