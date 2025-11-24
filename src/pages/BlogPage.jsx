import { blogs } from "../data/blogs";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Blog</h1>

      {Object.entries(blogs).map(([category, posts]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 capitalize border-b pb-2">
            {category === "spices" && "🌶 Spices"}
            {category === "pulses" && "🍲 Pulses"}
            {category === "herbal" && "🌿 Herbal Products"}
            {category === "dryfruits" && "🥜 Dry Fruits"}
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-2xl shadow p-4">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover rounded-xl"
                  />
                )}
                <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
                <p className="text-gray-500 text-sm">{post.date}</p>
                <p className="mt-2 text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
