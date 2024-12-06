import Container from "./Container";

export default function IgSection() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center bg-[#fffafe] ig-cont pb-5 mb-10">
        <span className="text-xl pt-10">@avaninepal</span>
        <a
          href="https://www.instagram.com/avaninepal/"
          target="_blank"
          className="custom-btn mt-2 border pt-[.5em] pb-[.5em] pl-[3em] pr-[3em] border-black text-[rgba(0,0,0,.5)]"
        >
          Follow us
        </a>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 pb-10 pt-5">
          <div className="cursor-pointer h-[200px] overflow-hidden">
            <a href="https://www.instagram.com/p/CrLyChctJWH/" target="_blank">
              <img src="/ig/a.png" className="w-full" />
            </a>
          </div>
          <div className="cursor-pointer h-[200px] overflow-hidden">
            <a href="https://www.instagram.com/p/CqVg9PvtVjU/" target="_blank">
              <img src="/ig/b.png" />
            </a>
          </div>
          <div className="cursor-pointer h-[200px] overflow-hidden">
            <a href="https://www.instagram.com/p/CqQgNAgtiaQ/" target="_blank">
              <img src="/ig/c.png" />
            </a>
          </div>
          <div className="cursor-pointer h-[200px] overflow-hidden">
            <a href="https://www.instagram.com/p/CknSWwVse3J/" target="_blank">
              <img src="/ig/d.png" />
            </a>
          </div>
          <div className="cursor-pointer h-[200px] overflow-hidden">
            <a href="https://www.instagram.com/p/Cg6OokAsnnX/" target="_blank">
              <img src="/ig/e.png" />
            </a>
          </div>
        </div>
        <a
          href="https://www.instagram.com/avaninepal/"
          target="_blank"
          className="custom-btn pt-[.5em] pb-[.5em] pl-[3em] pr-[3em] bg-[#0095f6] text-white hover:text-[rgba(0,0,0,.5)]"
        >
          <img src="/ig.svg" alt="IG" className="w-[.8em] mr-1 inline" /> View
          on Instagram
        </a>
      </div>
    </Container>
  );
}
