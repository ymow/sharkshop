<script>
import { ref } from 'vue'
export default {
  setup() {
    const showMenu = ref(false)
    const show = ref(false)
    const toggleNav = () => (showMenu.value = !showMenu.value)
    return { showMenu, show, toggleNav }
  },
}
</script>

<template>
  <div>
    <nav
      class="px-6 py-8 bg-indigo-600 md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="
            text-xl
            font-bold
            text-gray-100
            md:text-2xl
            hover:text-indigo-400
          "
        >
          Logo
        </router-link>
        <!-- Mobile menu button -->
        <div class="flex md:hidden" @click="toggleNav">
          <button
            type="button"
            class="
              text-gray-100
              hover:text-gray-400
              focus:outline-none focus:text-gray-400
            "
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex' : 'hidden'"
        class="
          flex-col
          mt-8
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        "
      >
        <li class="text-gray-100 hover:text-indigo-400">
          Home
        </li>
        <li>
          <div class="relative">
            <!-- Dropdown toggle button -->
            <button
              class="
                flex
                items-center
                text-indigo-100
                bg-indigo-600
                rounded-md
                focus:outline-none
              "
              @click="show = !show"
            >
              <span class="mr-4">Dropdown Menu</span>
              <svg
                class="w-5 h-5 text-indigo-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="show"
              class="
                py-2
                mt-2
                bg-indigo-500
                rounded-md
                shadow-xl
                lg:absolute lg:right-0
                w-44
              "
            >
              <router-link
                to="/"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-indigo-100
                  hover:bg-indigo-400 hover:text-indigo-100
                "
              >
                Dropdown List 1
              </router-link>
              <router-link
                to="/"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-indigo-100
                  hover:bg-indigo-400 hover:text-indigo-100
                "
              >
                Dropdown List 2
              </router-link>
              <router-link
                to="/"
                class="
                  block
                  px-4
                  py-2
                  text-sm text-indigo-100
                  hover:bg-indigo-400 hover:text-indigo-100
                "
              >
                Dropdown List 3
              </router-link>
            </div>
          </div>
        </li>
        <li class="text-gray-100 hover:text-indigo-400">
          Product
        </li>
      </ul>
    </nav>
  </div>
</template>
