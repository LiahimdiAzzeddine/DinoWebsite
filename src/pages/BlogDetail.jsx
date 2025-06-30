import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import GradientSkybox from "../components/experience/SceneColor";
import { AnimationContext } from "../components/experience/AnimationContext";
import Block from "../components/ui/Block";
import { Calendar, Clock, User, Tag } from "lucide-react";

export default function BlogSingle() {
    const { id } = useParams();
    const navigate = useNavigate();

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

    // Blog 1 - Hybrid Casual Games
    if (id === "1") {
        return (
            <>
                <div className="h-screen w-full fixed top-0 z-10 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'transparent' }}>
                        <GradientSkybox />
                    </Canvas>
                </div>

                <Block
                    title="Hybrid Casual Games in 2025: The Future Is Already Here"
                    subtitle={null}
                    paragraphs={[]}
                    links={[]}
                    buttons={[]}
                >
                    {/* Blog Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-white/80 text-sm">
                        <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            Trends
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            June 15, 2025
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            6 min read
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Dinomite Studio
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mb-8 rounded-xl overflow-hidden aspect-video max-w-4xl mx-auto">
                        <img
                            src="/src/assets/blogs/Hybrid Casual Games in 2025.png"
                            alt="Hybrid Casual Games in 2025: The Future Is Already Here"
                            className="w-full h-full object-cover"
                        />
                    </div>


                    {/* Content */}
                    <div className="prose prose-invert max-w-5xl mx-auto prose-p:leading-relaxed prose-headings:text-white prose-p:text-white/90 prose-a:text-blue-300 py-2">
                        <div className="pPerso">If you've been watching the mobile gaming space closely, you'll know that 2025 isn't just another year, it's a turning point.</div>
                        <div className="pPerso" >And at the heart of it all? Hybrid casual games.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">From Trend to Transformation</h2>
                        <div className="pPerso">Back in the early days, hyper-casual ruled the charts. Fast downloads, quick fun, and simple monetization through ads made it the king of mobile. But like every kingdom, there's a successor. And it's smarter, stickier, and far more profitable.</div>
                        <div className="pPerso">Say hello to hybrid casual Games.</div>
                        <div className="pPerso">According to recent reports from Sensor Tower and AppMagic, hyper-casual still claims around 25% of all mobile game downloads as of Q1 2025. Impressive? Sure. But the real action is happening in the hybrid lane. If you studied their growth rate over the past years you'll know they're taking over the market. It just a matter of time</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Hybrid Casual Revenues Are Exploding</h2>
                        <div className="pPerso">In 2021, hybrid casual games generated $500 million.</div>
                        <div className="pPerso">By 2023? $1.5 billion.</div>
                        <div className="pPerso">And in 2024 alone, in-app purchase revenue from hybrid casuals jumped by 37%, helping push global IAP totals to a staggering $82 billion.</div>
                        <div className="pPerso">That's not just growth, it's a gold rush.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Why the Shift? What's Behind the Boom?</h2>
                        <div className="pPerso">The rise of hybrid casual isn't random. It's built on a smarter business model and better player experience. Here's why it's dominating:</div>
                        <ul className="text-white/90">
                            <li><div className="pPerso"><strong>Balanced monetization:</strong> Around 40/50% of revenue comes from IAP, with the rest from ads. That means stability for developers and scale for publishers.</div></li>
                            <li><div className="pPerso"><strong>Strong retention:</strong> Top-performing hybrid games are showing Day 1 retention rates of 40% or more. That's serious staying power.</div></li>
                            <li><div className="pPerso"><strong>Higher ARPU:</strong> Players don't just play—they engage, invest, and come back for more.</div></li>
                        </ul>
                        <div className="pPerso">In a world where ad-only games are becoming riskier, hybrid casual offers a safer, more profitable path forward.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">How We Fit In: Dinomite Studio</h2>
                        <div className="pPerso">At Dinomite Studio, hybrid casual is more than just a trend, it's our business.</div>
                        <div className="pPerso">We're a hybrid casual game studio based in Tangier, and since 2019 we've helped publishers bring high-performing, high-retention titles to life. Our focus on speed, quality, and cost efficiency makes us the ideal partner for publishers ready to break into the next mobile hit.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">The Takeaway</h2>
                        <div className="pPerso">Hybrid casual isn't just a genre.</div>
                        <div className="pPerso">It's a business decision in order to stay in the industry, a creative opportunity, and a winning formula for 2026 and beyond.</div>
                        <div className="pPerso">If you're a publisher looking to ride the next wave in mobile gaming, now's the time to go hybrid.</div>
                        <div className="pPerso">Follow us here at Dinomite Studio for more insights, trends, and tips from the fast-evolving world of mobile games.</div>
                        <div className="pPerso">Let's build the next big thing together.</div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8 text-white/80">
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#hybrid-casual</span>
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#mobile</span>
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#gaming</span>
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#trends</span>
                    </div>
                </Block>
            </>
        );
    }

    // Blog 2 - Cloning Games
    if (id === "2") {
        return (
            <>
                <div className="h-screen w-full fixed top-0 z-10 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'transparent' }}>
                        <GradientSkybox />
                    </Canvas>
                </div>

                <Block
                    title="Why Cloning Games No Longer Works in 2025"
                    subtitle={null}
                    paragraphs={[]}
                    links={[]}
                    buttons={[]}
                >
                    {/* Blog Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-white/80 text-sm">
                        <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            Opinion
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            June 25, 2025
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            5 min read
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            Dinomite Studio
                        </div>
                    </div>

                    {/* Image */}
                    <div className="mb-8 overflow-hidden aspect-video max-w-4xl mx-auto rounded-xl">
                        <img
                            src="/src/assets/blogs/More Play, Less Download linkedin post.png"
                            alt="Hybrid Casual Games in 2025: The Future Is Already Here"
                            className="w-full h-full object-contain rounded-xl"
                        />
                    </div>
                    {/* Content */}
                    <div className="prose prose-invert max-w-5xl mx-auto prose-p:leading-relaxed prose-headings:text-white prose-p:text-white/90 prose-a:text-blue-300 py-2">
                        <div className="pPerso">The mobile gaming space in 2025 isn't just competitive, it's saturated.</div>
                        <div className="pPerso">According to Sensor Tower, mobile game downloads declined by 6.5% in 2024, dropping to 49.3 billion. That's a 14% decrease since the peak in 2020.</div>
                        <div className="pPerso">Sounds like trouble right?</div>
                        <div className="pPerso">Despite the drop in downloads, players spent more time than ever gaming, a staggering 390 billion hours, which marks a 7.7% increase year-over-year. And more importantly, in-app purchase revenue climbed to $81.7 billion.</div>
                        <div className="pPerso">So what's going on?</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Fewer Downloads, More Engagement</h2>
                        <div className="pPerso">This apparent contradiction tells a deeper story: the mobile gaming audience isn't shrinking. It's evolving.</div>
                        <div className="pPerso">Gamers today are more selective, more experienced, and more invested. They're choosing quality over quantity, games that offer real engagement, emotional depth, and fresh mechanics.</div>
                        <div className="pPerso">And this shift is reshaping the entire market, especially in the hyper-hybrid-casual genre.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">The Hyper Casual Challenge: Creativity vs. Cloning</h2>
                        <div className="pPerso">The very simplicity that made hyper-casual games explode in popularity has now become a double-edged sword.</div>
                        <div className="pPerso">Take the example of Zynga's Screw Jam, a game that racked up over 1 million downloads and $20 million in revenue. Just weeks later, a strikingly similar title Screw Pin Jam Puzzle appeared, not only mimicking the gameplay but surpassing it with 10 million downloads.</div>
                        <div className="pPerso">The result? A lawsuit. And a wake-up call.</div>
                        <div className="pPerso">In this fast-moving ecosystem, replication is easy, but real innovation is rare.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">Dinomite Studio's Response: Build What Can't Be Cloned at the same quality</h2>
                        <div className="pPerso">At Dinomite Studio, we see this shift as an opportunity, not a threat.</div>
                        <div className="pPerso">We've doubled down on originality, quality, and lasting impact. In a market where thousands of games are launched every month, we aim to create experiences that can't be copied overnight.</div>
                        <div className="pPerso">Because in 2026, innovation isn't optional. It's essential.</div>
                        <div className="pPerso">Games must do more than fill time, they must offer moments players remember, stories they share, and gameplay they come back to.</div>

                        <h2 className="text-2xl font-bold text-white mt-4 mb-2">The Path Forward</h2>
                        <div className="pPerso">For game developers and publishers alike, the message is clear:</div>
                        <div className="pPerso">Don't chase trends. Set them.</div>
                        <div className="pPerso">In a world where engagement is climbing but attention is scarce, the winners will be those who dare to build differently.</div>
                        <div className="pPerso">And at Dinomite Studio, that's exactly what we're here to do.</div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-8 text-white/80">
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#cloning</span>
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#game-dev</span>
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#originality</span>
                        <span className="px-3 py-1 bg-white/15 text-sm rounded-md backdrop-blur-sm">#innovation</span>
                    </div>
                </Block>
            </>
        );
    }

    // 404 - Blog not found
    return (
        <>
            <div className="h-screen w-full fixed top-0 z-10 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 1] }} style={{ background: 'transparent' }}>
                    <GradientSkybox />
                </Canvas>
            </div>

            <Block title="Not Found" subtitle="Sorry, article not found.">
                <div className="text-white/70 text-center py-20">
                    This blog post doesn't exist.
                    <button
                        onClick={() => navigate(-1)}
                        className="block mx-auto mt-6 px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                    >
                        Go back
                    </button>
                </div>
            </Block>
        </>
    );
}