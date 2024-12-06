import Container from "./Container";

export default function Organic() {
  return (
    <Container>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 pb-10 org-cont bg-[#fffafe] pt-10 mb-5">
        <div className="duration-300 cursor-pointer flex flex-col justify-center items-center">
          <img src="/organic/organic.png" alt="Scientifically Formulated" />
          <span className="flex items-center w-ful h-12 uppercase text-center">Organic</span>
        </div>
        <div className="duration-300 cursor-pointer flex flex-col justify-center items-center">
          <img src="/organic/crueltyfree.png" alt="Scientifically Formulated" />
          <span className="flex items-center w-ful h-12 uppercase text-center" >Cruelty Free</span>
        </div>
        <div className="duration-300 cursor-pointer flex flex-col justify-center items-center">
          <img src="/organic/certified.png" alt="Scientifically Formulated" />
          <span className="flex items-center w-ful h-12 uppercase text-center">Certified</span>
        </div>
        <div className="duration-300 cursor-pointer flex flex-col justify-center items-center">
          <img src="/organic/recycle.png" alt="Scientifically Formulated" />
          <span className="flex items-center w-ful h-12 uppercase text-center">Sustainable</span>
        </div>
        <div className="duration-300 cursor-pointer flex flex-col justify-center items-center">
          <img src="/organic/antioxident.png" alt="Scientifically Formulated" />
          <span className="flex items-center w-ful h-12 uppercase text-center">antioxidant</span>
        </div>
      </div>
    </Container>
  );
}
