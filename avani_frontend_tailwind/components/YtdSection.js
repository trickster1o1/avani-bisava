import Container from "./Container";

export default function YtdSection() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-10 org-cont pt-10 ytd-cont">
        <div className="duration-300 cursor-pointer pt-[80px] bg-[url('/testiA.jpeg')] bg-cover h-[450px]">
          <p className="p-10 text-[#d29240] text-2xl overflow-hidden bg-[#edfae9]">
            Start your Ayurvedic Journey! Book a complimentary video
            consultation customised to your skin & hair concerns in the comfort
            & safety of your home.{" "}
          </p>
        </div>

        <div className="duration-300 cursor-pointer flex flex-col justify-center items-center overflow-hidden">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CNloqpXwyMg?si=HrQcXztAKXvImwK_"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <span className="flex items-center w-ful h-12 text-center text-2xl">
            Virtual Consultation
          </span>
          <a className="custom-btn uppercase border pt-[.5em] pb-[.5em] pl-[3em] pr-[3em] border-[#d29240] block text-[#d29240]">
            Book your free session
          </a>
        </div>
      </div>
    </Container>
  );
}
