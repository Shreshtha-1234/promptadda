import Feed from "@components/feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="text-center head_text">Discover and Share 
        <br className="md:hidden" />
        <span className="text-center orange_gradient">A.I. powered prompts</span>
        </h1>
        <p className="desc text-center">promptAdda is an open sorce AI prompting tool for modern world to discover , craete and share creative prompts</p>
        <Feed />
    </section>
  )
}

export default Home