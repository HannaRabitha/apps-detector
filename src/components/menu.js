import Container from './container';

function Menu() {
  return (
    <>
      <div className="bg-[#CB5E86] bg-full min-h-screen">
        <Container className="flex flex-wrap ">
          <div className="w-full pb-6 flex flex-wrap justify-center gap-6">
            <div class="max-w-sm p-6 bg-white rounded-lg shadow ">
              <img
                class="rounded-t-lg"
                src={'undraw_Camera.png'}
                alt=""
              />

              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-[#A93761]">
                Mulai Deteksi
              </h5>

              <p class="mb-3 font-normal text-gray-500">
                Go to this step process on how to detect your face:
              </p>

              {/* <a href="https://demo.roboflow.com/coffee-quality-detection-x4zl2/1?publishable_key=rf_xoEHzd9Rtgcu3YHFTWXE4NiBwXE3"> */}
              <a href="/detect">
                <button
                  type="button"
                  class="w-full flex items-center justify-center text-white bg-[#CB5E86] hover:bg-[#A93761] font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Deteksi Sekarang
                  <svg
                    class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </button>
              </a>

            
            </div>

            <div class="max-w-sm p-6 bg-white rounded-lg shadow ">
              <img class="rounded-t-lg" src={'undraw_Publish.png'} alt="" />
              <a href="/about">
               <h5 class="mb-2 text-2xl font-semibold tracking-tight text-[#A93761]">
                  Jenis-Jenis Jerawat
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-500">
                Go to this step to know more about your acne:
              </p>
              <a href="/about">
                <button
                  type="button"
                  class="w-full flex items-center justify-center text-white bg-[#CB5E86] hover:bg-[#A93761] font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Baca Lebih Lanjut
                  <svg
                    class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                    />
                  </svg>
                </button>
              </a>
            </div>

            <div class="max-w-sm p-6 bg-white rounded-lg shadow ">
              <img class="rounded-t-lg" src={'undraw_Questions.png'} alt="" />
              <a href="/help">
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-[#A93761]">
                  Need a help?
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-500">
                Go to this step by step guideline process on how to detect your face:
              </p>
              <a
                href="/help"
                class="inline-flex items-center text-blue-600 hover:underline"
              >
                See our guideline
                <svg
                  class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
export default Menu;
