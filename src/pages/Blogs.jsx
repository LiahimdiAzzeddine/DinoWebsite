// pages/Blogs.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { Plus, Minus, ChevronDown, Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import Block from "../components/ui/Block";
import { Canvas } from '@react-three/fiber';
import GradientSkybox from "../components/experience/SceneColor";
import { AnimationContext } from "../components/experience/AnimationContext";
import { useNavigate } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Hybrid Casual Games in 2025: The Future Is Already Here",
    excerpt: "Hybrid casual isn’t just a genre. It’s a business model, a creative shift, and a growth engine for the mobile gaming industry.",
    content: `
If you’ve been watching the mobile gaming space closely, you’ll know that 2025 isn’t just another year, it’s a turning point.
And at the heart of it all?, Hybrid casual games.

**From Trend to Transformation**
Back in the early days, hyper-casual ruled the charts. Fast downloads, quick fun, and simple monetization through ads made it the king of mobile. But like every kingdom, there's a successor. And it's smarter, stickier, and far more profitable.

**Hybrid Casual Revenues Are Exploding**
In 2021, hybrid casual games generated $500 million.
By 2023? $1.5 billion.
In 2024 alone, in-app purchase revenue from hybrid casuals jumped by 37%, helping push global IAP totals to $82 billion.

**Why the Shift?**
- Balanced monetization (ads + IAP)
- High retention
- Better ARPU

**How We Fit In: Dinomite Studio**
We’re a hybrid casual game studio based in Tangier since 2019. We help publishers build high-performing, high-retention titles.

**Takeaway**
Hybrid casual is a winning formula. Now’s the time to go hybrid.
    `,
    author: "Dinomite Studio",
    date: "2025-06-15",
    readTime: "6 min read",
    category: "Trends",
    tags: ["hybrid-casual", "mobile", "gaming"],
    image: "/src/assets/blogs/Hybrid Casual Games in 2025.png",
    featured: true
  },
  {
    id: 2,
    title: "Why Cloning Games No Longer Works in 2025",
    excerpt: "Game cloning used to be a shortcut to success. In 2025, it’s a recipe for irrelevance. Here’s why the mobile gaming industry is moving toward originality and engagement.",
    content: `
**Fewer Downloads, More Engagement**
Game downloads are down, but player engagement and spending are up. Gamers are more selective, seeking quality over quantity.

**The Hyper Casual Challenge**
The simplicity of hyper-casual games makes them easy to copy. But the market is shifting away from clones.

**Case Study: Screw Jam**
A Zynga game that got cloned in weeks and led to lawsuits.

**Dinomite Studio’s Response**
We focus on originality, quality, and experiences that can’t be cloned.

**The Path Forward**
Don’t chase trends. Set them. In 2025 and beyond, originality wins.
    `,
    author: "Dinomite Studio",
    date: "2025-06-25",
    readTime: "5 min read",
    category: "Opinion",
    tags: ["cloning", "game-dev", "originality"],
    image: "/src/assets/blogs/More Play, Less Download linkedin post.png",
    featured: false
  }
];


export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const {
    progress, setProgress,
    fadeOut, setFadeOut,
    setIsLoading,
  } = useContext(AnimationContext);

  useEffect(() => {
    setProgress(0);
    setFadeOut(false);
    setIsLoading(false);
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on category and search
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });


  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <>
      <div className="h-screen w-full fixed top-0 z-10 pointer-events-none">
        <Canvas
          scale={0.5}
          camera={{ position: [0, 0, 1] }}
          style={{ background: 'transparent' }}
        >
          <GradientSkybox />
        </Canvas>
      </div>

      <Block
        title="Blog"
        subtitle="Insights, tutorials, and updates from our team"
        paragraphs={[]}
        links={[]}
        buttons={[]}
      >
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-white/40 transition-all duration-200 text-white placeholder-white/60"
            />
            <svg className="absolute left-3 top-3.5 h-4 w-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${selectedCategory === category
                  ? 'bg-blue-500/80 text-white shadow-md border border-blue-400/50'
                  : 'bg-white/15 text-white/80 hover:bg-white/25 border border-white/20'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-16">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12 text-white/70">
              <div className="text-lg mb-2">No articles found</div>
              <div className="text-sm opacity-70">Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className={`blog-card relative ${blog.featured ? 'featured' : ''
                  }`}
              >
                <div className="blog-content">
                  <div className="md:flex">
                    {/* Blog Image */}
                    <div className="md:w-1/3 relative flex items-center justify-center">
                      <div className="w-full h-auto">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-auto object-contain rounded-xl"
                        />
                      </div>

                      {blog.featured && (
                        <div className="absolute top-4 left-4 bg-yellow-400/90 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                          <Tag className="w-3 h-3 mr-1" />
                          {blog.category}
                        </span>
                        <div className="flex items-center text-white/70 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(blog.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-white/70 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {blog.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-300 transition-colors duration-200">
                        {blog.title}
                      </h3>

                      <p className="text-white/80 mb-4 leading-relaxed">
                        {blog.excerpt}
                      </p>


                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-white/60 mr-2" />
                          <span className="text-sm text-white/80 font-medium">
                            {blog.author}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">


                          <button
                            onClick={() => handleReadMore(blog.id)}
                            className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm border border-white/30"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/15 text-white/80 rounded-md text-xs hover:bg-white/25 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredBlogs.length > 0 && (
          <div className="text-center pt-8 text-white/60 text-sm">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </div>
        )}
      </Block>
    </>
  );
}