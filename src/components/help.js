function Help() {
  return (
    <>
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-4xl text-center">
            {/* <h2 class="text-base font-semibold leading-7 text-teal-600">
              Tutorial
            </h2> */}
            <img
              className="h-20 w-fit m-auto justify-center"
              src="logo.png"
              alt="Logo Acne Detector"
            />
            <p class="mt-2 text-4xl font-bold tracking-tight text-yellow-800 sm:text-5xl">
              Halaman Tutorial
            </p>
          </div>
          <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-yellow-600">
          Jerawat Detector adalah aplikasi yang dapat mendeteksi jenis jerawat secara realtime. 
          Aplikasi ini dibuat untuk memudahkan user dalam mendeteksi jerawat pada wajah secara realtime.
          </p>

          <div class="isolate justify-center mx-auto mt-10 grid max-w-md gap-8 lg:max-w-none lg:w-fit">
            <div class="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-700">
              {/* <h3
                id="tier-startup"
                class="text-lg font-semibold leading-8 text-gray-900"
              >
                Tutorial
              </h3> */}

              <ol class="list-decimal space-y-3 text-sm leading-6  text-pink-600">
                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-purple-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Klik tombol "Get Started" pada halaman utama
                </li>
                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-yellow-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Klik tombol "Deteksi Sekarang" pada halaman menu
                </li>
                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Halaman akan diarahkan pada kamera, klik "allow" untuk
                  mengakses kamera pada browser
                </li>
                <li class="flex gap-x-3">
                  <svg
                    class="h-6 w-5 flex-none text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Arahkan kamera pada objek dan kemudian akan terlihat hasil
                  dari deteksi wajah tersebut secara realtime
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
