import Container from './container';
import Footer from './footer';
// import itemData from '../data/itemkopi.json';
import dataJerawat from '../data/jerawat.json';

function About() {
  return (
    <>
      <Container className="flex flex-wrap mb-10 ">
        <div className="w-full pb-6 grid xl:grid-cols-3 justify-center gap-6">
          {dataJerawat.map((item) => (
            <div class="xl:max-w-sm bg-[#A93761] border rounded-lg shadow">
              {/* <a href="#"> */}
              <img class="rounded-t-lg h-52 object-cover w-full" src={item.src} alt="" />
              {/* </a> */}
              <div class="p-5">
                {/* <a href="#"> */}
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Jerawat {item.name}
                </h5>
                {/* </a> */}
                <div className='pt-2'>
                <span className='text-white font-bold'>Karakteristik: </span>
                <p class="mb-3 font-normal text-white text-justify">
                  {item.karakteristik}
                </p>
                </div>

                <div className='pt-2'>
                <span className='text-white font-bold'>Penyebab: </span>
                <p class="mb-3 font-normal text-white text-justify">
                  {item.penyebab}
                </p>
                </div>
                {/* <a
                  href="#"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default About;
